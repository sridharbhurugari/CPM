import { Component, OnInit, ViewChild, HostListener, AfterViewChecked, OnDestroy, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { QuickPickDrawerData } from './../model/quick-pick-drawer-data';
import { Observable, of, Subscription, forkJoin, merge, Subject } from 'rxjs';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { switchMap, map, flatMap, takeUntil, } from 'rxjs/operators';
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
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { Guid } from 'guid-typescript';
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

export class QuickPickPageComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked {

  private barcodeScannedSubscription: Subscription;

  quickpickDrawers: Observable<QuickPickDrawerData[]>;
  quickPickQueueItems: Observable<QuickPickQueueItem[]>;
  searchTextFilter: Observable<string>;

  ngUnsubscribe = new Subject();

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
    'YES',
    'NO',
    'OK',
    'REROUTE',
    'QUICK_PICK_REROUTE_DIALOG_MESSAGE',
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
  translations$: Observable<any>;

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;
  quickPickQueueItemsComplete: QuickPickQueueItem[];


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
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.unhookEventHandlers();
  }

  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.quickPickEventConnectionService.QuickPickQueueUpdateSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => this.onQuickPickQueueUpdate(event));
    this.quickPickEventConnectionService.QuickPickErrorUpdateSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => this.onQuickPickErrorUpdate(event));
    this.quickPickEventConnectionService.QuickPickDeviceStatusUpdateSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => this.onQuickPickDeviceStatusUpdate(event));

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
    this.searchElement.clearSearch(null);
    this.loadSelectedDeviceInformation($event.value);
    this.loadDrawersData();
    this.loadPicklistsQueueItems();
  }

  onRerouteQuickPickFromDrawer($event: Guid) {
    const quickPickItemToReroute = this.quickPickQueueItemsComplete.find(item => item.RobotDispenseBoxIds.includes($event));
    this.rerouteQuickPickItem(quickPickItemToReroute);
  }

  onRerouteQuickPick($event: IQuickPickQueueItem) {
    this.rerouteQuickPickItem($event);
  }

  private rerouteQuickPickItem($event: IQuickPickQueueItem) {
    this.displayRerouteDialog().subscribe(result => {
      if (!result) {
        return;
      }

      this.quickPickQueueService.reroute($event).subscribe(
        () => {
          this.loadPicklistsQueueItems();
          this.loadDrawersData();
        }, error => {
          this.displayQuickPickError(QuickPickError.RerouteFailure);
          this.loadPicklistsQueueItems();
          this.loadDrawersData();
        });
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
  private displayRerouteDialog(): Observable<boolean> {
    return forkJoin(this.translations$).pipe(flatMap(r => {
      const translations = r[0];
      const properties = new PopupDialogProperties('Standard-Popup-Dialog-Font');
      properties.titleElementText = translations.REROUTE;
      properties.messageElementText = translations.QUICK_PICK_REROUTE_DIALOG_MESSAGE;
      properties.showPrimaryButton = true;
      properties.primaryButtonText = translations.YES;
      properties.showSecondaryButton = true;
      properties.secondaryButtonText = translations.NO;
      properties.primaryOnRight = false;
      properties.showCloseIcon = false;
      properties.dialogDisplayType = PopupDialogType.Info;
      properties.timeoutLength = 0;
      let component = this.dialogService.showOnce(properties);
      let primaryClick$ = component.didClickPrimaryButton.pipe(map(x => true));
      let secondaryClick$ = component.didClickSecondaryButton.pipe(map(x => false));
      return merge(primaryClick$, secondaryClick$);
    }));
  }

  /* istanbul ignore next */
  displayQuickPickError(error: QuickPickError, customHeader = null, customBody = null): void {
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
          const headerText = customHeader ? customHeader : r['INVALID_SCAN_QUICKPICK_UNAVAILABLE_HEADER_TEXT'];
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
    try {
      if (event.DeviceId !== undefined && event.DeviceId !== this.selectedDeviceInformation.DeviceId) {
        return;
      }

      this.loadPicklistsQueueItems();
    } catch (e) {
      console.log('QuickPickPageComponent.onQuickPickQueueUpdate ERROR');
      console.log(e);
    }
  }

  private onQuickPickErrorUpdate(event) {
    try {
      if (event.DeviceId !== undefined && event.DeviceId !== this.selectedDeviceInformation.DeviceId) {
        return;
      }

      this.displayQuickPickError(QuickPickError.HardwareFailure, null, event.ErrorMessage);
    } catch (e) {
      console.log('QuickPickPageComponent.onQuickPickErrorUpdate ERROR');
      console.log(e);
    }
  }

  private onQuickPickDeviceStatusUpdate(event) {
    try {
      if (event.DeviceId === undefined) {
        return;
      }

      const indexToUpdate =  this.deviceInformationList.findIndex((deviceInformation) => {
        return deviceInformation.DeviceId === event.DeviceId;
      });

      if (indexToUpdate !== -1) {
        this.deviceInformationList[indexToUpdate].IsActive = event.Status;
      }
    } catch (e) {
      console.log('QuickPickPageComponent.onQuickPickDeviceStatusUpdate ERROR');
      console.log(e);
    }
  }

  private loadPicklistsQueueItems(): void {
    if (!this.selectedDeviceInformation || !this.selectedDeviceInformation.DeviceId) {
      return;
    }

    this.quickPickQueueService.get(this.selectedDeviceInformation.DeviceId.toString()).subscribe(items => {
      this.quickPickQueueItems = of(items.filter(item => item.IncompleteBoxCount > 0));
      this.quickPickQueueItemsComplete = items;
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
    properties.timeoutLength = this.popupTimeoutSeconds;
    // timeout if another scan comes in:
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = of(data);
        if (this.windowService.nativeWindow) {
         // this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
         properties.timeoutLength = 0;
        }
      });
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
