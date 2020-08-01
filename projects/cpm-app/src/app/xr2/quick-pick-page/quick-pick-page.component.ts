import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { QuickPickDrawerData } from './../model/quick-pick-drawer-data';
import { Observable, of, Subscription, forkJoin } from 'rxjs';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { switchMap, } from 'rxjs/operators';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { TranslateService } from '@ngx-translate/core';
import {
  SearchBoxComponent, SingleselectRowItem, PopupDialogService, PopupDialogType,
  PopupDialogProperties
} from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { Xr2QuickPickQueueDeviceService } from '../../api-xr2/services/xr2-quick-pick-queue-device.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { QuickPickEventConnectionService } from '../../xr2/services/quick-pick-event-connection.service';
import { IQuickPickQueueItem } from '../../api-xr2/data-contracts/i-quick-pick-queue-item';
import { ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { BarcodeScanService } from 'oal-core';
import { BarcodeScanMessage } from '../model/barcode-scan-message';
import { QuickPickError } from '../model/quick-pick-error';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { resolve } from 'url';

@Component({
  selector: 'app-quick-pick-page',
  templateUrl: './quick-pick-page.component.html',
  styleUrls: ['./quick-pick-page.component.scss']
})

export class QuickPickPageComponent implements OnInit {

  private barcodeScannedSubscription: Subscription;

  quickpickDrawers: Observable<QuickPickDrawerData[]>;
  quickPickQueueItems: Observable<QuickPickQueueItem[]>;
  searchTextFilter: Observable<string>;

  robotSelectionDisabled = false;
  activeQuickPickDevice: boolean;
  selectedDeviceInformation: SelectableDeviceInfo;
  deviceInformationList: SelectableDeviceInfo[];
  outputDeviceDisplayList: SingleselectRowItem[] = [];
  defaultDeviceDisplyItem: SingleselectRowItem;
  popupTimeoutSeconds = 60;
  inputLevelScan: string;
  nonBarcodeKeyboardInput = '';
  nonBarcodeInputFocus = false;
  inputLevelScanFocused = true;
  rawBarcodeMessage = '';
  scanInput: BarcodeScanMessage;
  translatables = [
    'OK',
    'INVALID_SCAN_BARCODE_HEADER',
    'INVALID_SCAN_BARCODE',
    'INVALID_SCAN_QUICKPICK_UNAVAILABLE_HEADER_TEXT',
    'INVALID_SCAN_QUICKPICK_INPROGRESS_BODY_TEXT',
    'INVALID_SCAN_QUICKPICK_INACTIVE_BODY_TEXT',
    'PRINTFAILED_HEADER_TEXT',
    'PRINTFAILED_BODY_TEXT',
    'FAILEDTOUNLOCKDOOR_HEADER_TEXT',
    'FAILEDTOUNLOCKDOOR_BODY_TEXT',
    'FAILEDTOREROUTE_HEADER_TEXT',
    'FAILEDTOREROUTE_BODY_TEXT',
    'FAILEDTOSAVE_HEADER_TEXT',
    'FAILEDTOSAVE_BODY_TEXT',
    'XR2_QUICK_PICK_ERROR_HEADER',
    'XR2_QUICK_PICK_ERROR_BODY',
  ];
  translations$: any;

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;


  constructor(
    private quickPickQueueService: Xr2QuickPickQueueService,
    private quickPickDeviceService: Xr2QuickPickQueueDeviceService,
    private quickPickDrawerService: Xr2QuickPickDrawerService,
    private quickPickEventConnectionService: QuickPickEventConnectionService,
    private windowService: WindowService,
    private ocapHttpConfigurationService: OcapHttpConfigurationService,
    private changeDetector: ChangeDetectorRef,
    private translateService: TranslateService,
    private barcodeScanService: BarcodeScanService,
    private dialogService: PopupDialogService,
    private systemConfigurationService: SystemConfigurationService
  ) {
    this.quickPickQueueItems = of([]);
  }

  ngOnInit() {
    this.hookupEventHandlers();
    this.setTranslations();
    this.setConfigurations();
    this.getXr2Devices();
  }

  ngOnDestroy(): void {
    this.unhookEventHandlers();
  }

  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.quickPickEventConnectionService.QuickPickQueueUpdateSubject.subscribe(event => this.onQuickPickQueueUpdate(event));
    this.quickPickEventConnectionService.QuickPickErrorUpdateSubject.subscribe(event => this.onQuickPickErrorUpdate(event));
    this.quickPickEventConnectionService.QuickPickDeviceStatusUpdateSubject.subscribe(event => this.onQuickPickDeviceStatusUpdate(event));

    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = of(data);
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  async getXr2Devices() {
    this.deviceInformationList = await this.quickPickDeviceService.get().toPromise();
    const newList: SingleselectRowItem[] = [];

    const currentClientId = this.ocapHttpConfigurationService.get().clientId;
    let defaultFound: SingleselectRowItem;

    if (this.deviceInformationList.length === 1) {
      defaultFound = new SingleselectRowItem(this.deviceInformationList[0].Description, this.deviceInformationList[0].DeviceId.toString());
      newList.push(defaultFound);
    } else {
      this.deviceInformationList.forEach(selectableDeviceInfo => {
        const selectRow = new SingleselectRowItem(selectableDeviceInfo.Description,
          selectableDeviceInfo.DeviceId.toString(), selectableDeviceInfo.IsActive);
        newList.push(selectRow);

        if (!defaultFound && selectableDeviceInfo.CurrentLeaseHolder.toString() === currentClientId) {
          defaultFound = selectRow;
        }
      });
    }

    this.outputDeviceDisplayList = newList;

    if (defaultFound) {
      this.defaultDeviceDisplyItem = this.outputDeviceDisplayList.find(x => x.value === defaultFound.value);
      this.loadSelectedDeviceInformation(defaultFound.value);
      this.loadDrawersData();
      this.loadPicklistsQueueItems();
    }
  }

  onQuickPickActive(isActive: boolean) {
    this.robotSelectionDisabled = isActive;
  }

  /* istanbul ignore next */
  onDeviceSelectionChanged($event) {
    if (this.selectedDeviceInformation.DeviceId !== $event.value) {
      this.searchElement.clearSearch(null);
      this.loadSelectedDeviceInformation($event.value);
      this.loadDrawersData();
      this.loadPicklistsQueueItems();
    }
  }

  onRerouteQuickPick($event: IQuickPickQueueItem) {
    this.quickPickQueueService.reroute($event).subscribe(
      () => {
        this.loadPicklistsQueueItems();
      }, error => {
        this.displayQuickPickError(QuickPickError.RerouteFailure);
        this.loadPicklistsQueueItems();
      });
  }

  // Page Level Listener for barcode scanner
  /* istanbul ignore next */
  @HostListener('document:keypress', ['$event']) onKeypressHandler(event: KeyboardEvent) {
    if (this.nonBarcodeInputFocus) {
      return;
    }

    const isInputComplete = this.barcodeScanService.handleKeyInput(event);

    // If not from barcode scanner ignore the character
    if (!this.barcodeScanService.isScannerInput()) {
      this.barcodeScanService.reset();
    }

    if (isInputComplete) {
      // populating the page level input into text box.
      this.rawBarcodeMessage = this.barcodeScanService.BarcodeInputCharacters;
      this.barcodeScanService.reset();
    }
  }

  /* istanbul ignore next */
  displayQuickPickError(error: QuickPickError, customHeader = null, customBody = null): void {
    console.log(this.quickpickDrawers);
    switch (error) {
      case QuickPickError.ScanNotFound:
        this.translations$.subscribe(r => {
          const headerText = customHeader ? customHeader : r['INVALID_SCAN_BARCODE_HEADER'];
          const bodyText = customBody ? customBody : r['INVALID_SCAN_BARCODE'];
          const okText = r['OK'];
          this.displayWarningDialog(headerText, bodyText, okText);
        });
        break;
      case QuickPickError.ScanUnavailable:
        this.translations$.subscribe(r => {
          const headerText = customHeader ? customHeader : r['INVALID_SCAN_QUICKPICK_INPROGRESS_HEADER_TEXT'];
          const bodyText = customBody ? customBody : r['INVALID_SCAN_QUICKPICK_INPROGRESS_BODY_TEXT'];
          const okText = r['OK'];
          this.displayWarningDialog(headerText, bodyText, okText);
        });
        break;
      case QuickPickError.InActive:
        this.translations$.subscribe(r => {
          const headerText = customHeader ? customHeader : r['INVALID_SCAN_QUICKPICK_UNAVAILABLE_HEADER_TEXT'];
          const bodyText = customBody ? customBody : r['INVALID_SCAN_QUICKPICK_INACTIVE_BODY_TEXT'];
          const okText = r['OK'];
          this.displayWarningDialog(headerText, bodyText, okText);
        });
        break;
      case QuickPickError.PrintFailure:
        this.translations$.subscribe(r => {
          const headerText = customHeader ? customHeader : r['PRINTFAILED_HEADER_TEXT'];
          const bodyText = customBody ? customBody : r['PRINTFAILED_BODY_TEXT'];
          const okText = r['OK'];
          this.displayErrorDialog(headerText, bodyText, okText);
        });
        break;
      case QuickPickError.UnlockFailure:
        this.translations$.subscribe(r => {
          const headerText = customHeader ? customHeader : r['FAILEDTOUNLOCKDOOR_HEADER_TEXT'];
          const bodyText = customBody ? customBody : r['FAILEDTOUNLOCKDOOR_BODY_TEXT'];
          const okText = r['OK'];
          this.displayErrorDialog(headerText, bodyText, okText);
        });
        break;
      case QuickPickError.RerouteFailure:
        this.translations$.subscribe(r => {
          const headerText = customHeader ? customHeader : r['FAILEDTOREROUTE_HEADER_TEXT'];
          const bodyText = customBody ? customBody : r['FAILEDTOREROUTE_BODY_TEXT'];
          const okText = r['OK'];
          this.displayErrorDialog(headerText, bodyText, okText);
        });
        break;
      case QuickPickError.HardwareFailure:
        this.translations$.subscribe(r => {
          const headerText = customHeader ? customHeader : r['XR2_QUICK_PICK_ERROR_HEADER'];
          const bodyText = customBody ? customBody : r['XR2_QUICK_PICK_ERROR_BODY'];
          const okText = r['OK'];
          this.displayErrorDialog(headerText, bodyText, okText);
        });
        break;
      case QuickPickError.FailedToSave:
        this.translations$.subscribe(r => {
          const headerText = customHeader ? customHeader : r['FAILEDTOSAVE_HEADER_TEXT'];
          const bodyText = customBody ? customBody : r['FAILEDTOSAVE_BODY_TEXT'];
          const okText = r['OK'];
          this.displayErrorDialog(headerText, bodyText, okText);
        });
        break;
    }
  }

  private onQuickPickQueueUpdate(event) {
    if (event.DeviceId !== undefined && event.DeviceId !== this.selectedDeviceInformation.DeviceId) {
      return;
    }

    this.loadPicklistsQueueItems();
  }

  private onQuickPickErrorUpdate(event) {
    if (event.DeviceId !== undefined && event.DeviceId !== this.selectedDeviceInformation.DeviceId) {
      return;
    }

    this.displayQuickPickError(QuickPickError.HardwareFailure, null, event.ErrorMessage);
  }

  private onQuickPickDeviceStatusUpdate(event) {
    if (!event.DeviceId) {
      return;
    }

    const indexToUpdate =  this.deviceInformationList.findIndex((deviceInformation) => {
      return deviceInformation.DeviceId.toString() === event.DeviceId;
    });

    if (indexToUpdate !== -1) {
      this.deviceInformationList[indexToUpdate].IsActive = event.Status;
    }
  }

  private loadPicklistsQueueItems(): void {
    if (!this.selectedDeviceInformation || !this.selectedDeviceInformation.DeviceId) {
      return;
    }

    this.quickPickQueueService.get(this.selectedDeviceInformation.DeviceId.toString()).subscribe(items => {
      this.quickPickQueueItems = of(items);
    });
  }

  private loadDrawersData() {
    if (!this.selectedDeviceInformation || !this.selectedDeviceInformation.DeviceId) {
      return;
    }

    this.quickPickDrawerService.getAllDrawers(this.selectedDeviceInformation.DeviceId.toString()).subscribe(data => {
      this.quickpickDrawers = of(data);
    });
  }

  private loadSelectedDeviceInformation(deviceId: string) {
    const indexToLoad =  this.deviceInformationList.findIndex((deviceInformation) => {
      return deviceInformation.DeviceId.toString() === deviceId;
    });

    if (indexToLoad !== -1) {
      this.selectedDeviceInformation = this.deviceInformationList[indexToLoad];
    }
  }

  /* istanbul ignore next */
  private displayWarningDialog(headerText, bodyText, okButtonText): void {
    const properties = new PopupDialogProperties('Role-Status-Warning');
    properties.titleElementText = headerText;
    properties.messageElementText = bodyText;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = okButtonText;
    properties.dialogDisplayType = PopupDialogType.Warning;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.dialogService.showOnce(properties);
  }

  /* istanbul ignore next */
  private displayErrorDialog(headerText, bodyText, okButtonText): void {
    const properties = new PopupDialogProperties('Role-Status-Warning');
    properties.titleElementText = headerText;
    properties.messageElementText = bodyText;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = okButtonText;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.dialogService.showOnce(properties);
  }

  private setConfigurations() {
    this.systemConfigurationService.GetConfigurationValues('TIMEOUTS', 'POP_UP_MESSAGE_TIMEOUT').subscribe(result => {
      this.popupTimeoutSeconds = (Number(result.Value));
    });
  }

  private setTranslations() {
    this.translations$ = this.translateService.get(this.translatables);
  }

  private processScannedBarcode(scannedBarcode: string): void {
    this.barcodeScanService.reset();
    this.rawBarcodeMessage = scannedBarcode;
    this.handleInputLevelScan(scannedBarcode);
  }

  private handleInputLevelScan(scannedBarcode: string): void {
    if (this.isInvalidSubscription(this.inputLevelScan)) {
      this.inputLevelScan = '';
    }

    this.inputLevelScan = `${scannedBarcode}`;
    this.scanInput = new BarcodeScanMessage(this.inputLevelScan);
  }

  /* istanbul ignore next */
  private hookupEventHandlers(): void {
    if (this.isInvalidSubscription(this.barcodeScanService)) {
      return;
    }

    this.barcodeScannedSubscription = this.barcodeScanService.BarcodeScannedSubject.subscribe((scannedBarcode: string) =>
      this.processScannedBarcode(scannedBarcode)
    );
  }

  /* istanbul ignore next */
  private unhookEventHandlers(): void {
    if (this.isInvalidSubscription(this.barcodeScanService)) {
      return;
    }

    this.unsubscribeIfValidSubscription(this.barcodeScannedSubscription);
    this.unsubscribeIfValidSubscription(this.translations$);
  }

  private unsubscribeIfValidSubscription(subscription: Subscription): void {
    if (this.isValidSubscription(subscription)) {
      subscription.unsubscribe();
    }
  }

  private isValidSubscription(variable: any): boolean {
    return variable !== undefined && variable !== null;
  }

  private isInvalidSubscription(variable: any): boolean {
    return !this.isValidSubscription(variable);
  }
}
