import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { QuickPickDrawerData } from './../model/quick-pick-drawer-data';
import { Observable, of, Subscription } from 'rxjs';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { switchMap } from 'rxjs/operators';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import {
  SearchBoxComponent, SingleselectRowItem, PopupDialogService, PopupDialogType,
  PopupDialogProperties
} from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { Xr2QuickPickQueueDeviceService } from '../../api-xr2/services/xr2-quick-pick-queue-device.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { QuickPickEventConnectionService } from '../../xr2/services/quick-pick-event-connection.service';
import { QuickPickErrorService } from '../../xr2/services/quick-pick-error.service';
import { IQuickPickQueueItem } from '../../api-xr2/data-contracts/i-quick-pick-queue-item';
import { ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { BarcodeScanService } from 'oal-core';
import { BarcodeScanMessage } from '../model/barcode-scan-message';
import { QuickPickError } from '../model/quick-pick-error';

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
  outputDeviceDisplayList: SingleselectRowItem[] = [];
  defaultDeviceDisplyItem: SingleselectRowItem;
  selectedDeviceId: string;
  inputLevelScan: string;
  nonBarcodeKeyboardInput = '';
  nonBarcodeInputFocus = false;
  inputLevelScanFocused = true;
  rawBarcodeMessage = '';
  scanInput: BarcodeScanMessage;

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
    private barcodeScanService: BarcodeScanService,
    private quickPickErrorService: QuickPickErrorService
  ) {
    this.quickPickQueueItems = of([]);
  }

  ngOnInit() {
    this.hookupEventHandlers();
    this.getActiveXr2Devices();
  }

  ngOnDestroy(): void {
    this.unhookEventHandlers();
  }

  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.quickPickEventConnectionService.QuickPickQueueUpdateSubject.subscribe(event => this.onQuickPickQueueUpdate(event));

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

  async getActiveXr2Devices() {
    const results = await this.quickPickDeviceService.get().toPromise();
    const newList: SingleselectRowItem[] = [];

    const currentClientId = this.ocapHttpConfigurationService.get().clientId;
    let defaultFound: SingleselectRowItem;
    results.forEach(selectableDeviceInfo => {
      const selectRow = new SingleselectRowItem(selectableDeviceInfo.Description, selectableDeviceInfo.DeviceId.toString());
      newList.push(selectRow);

      if (!defaultFound && selectableDeviceInfo.CurrentLeaseHolder.toString() === currentClientId) {
        defaultFound = selectRow;
      }
    });

    this.outputDeviceDisplayList = newList;

    if (defaultFound) {
      this.selectedDeviceId = defaultFound.value;
      this.defaultDeviceDisplyItem = this.outputDeviceDisplayList.find(x => x.value === this.selectedDeviceId);
      this.loadDrawersData();
      this.loadPicklistsQueueItems();
    }
  }

  onQuickPickActive(isActive: boolean) {
    this.robotSelectionDisabled = isActive;
  }

  /* istanbul ignore next */
  onDeviceSelectionChanged($event) {
    if (this.selectedDeviceId !== $event.value) {
      this.searchElement.clearSearch(null);
      this.selectedDeviceId = $event.value;
      this.loadDrawersData();
      this.loadPicklistsQueueItems();
    }
  }

  onRerouteQuickPick($event: IQuickPickQueueItem) {
    this.quickPickQueueService.reroute($event).subscribe(
      () => {
        this.loadPicklistsQueueItems();
      }, error => {
        this.displayFailedDialog(QuickPickError.RerouteFailure);
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
  displayFailedDialog(error: QuickPickError): void {
    this.quickPickErrorService.display(error);
  }

  private onQuickPickQueueUpdate(event) {
    if (event.DeviceId !== undefined && event.DeviceId.toString() !== this.selectedDeviceId) {
      return;
    }

    this.loadPicklistsQueueItems();
  }

  private loadPicklistsQueueItems(): void {
    if (!this.selectedDeviceId) {
      return;
    }

    this.quickPickQueueService.get(this.selectedDeviceId).subscribe(items => {
      this.quickPickQueueItems = of(items);
    });
  }

  private loadDrawersData() {
    if (!this.selectedDeviceId) {
      return;
    }

    this.quickPickDrawerService.getAllDrawers(this.selectedDeviceId).subscribe(data => {
      this.quickpickDrawers = of(data);
    });
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
