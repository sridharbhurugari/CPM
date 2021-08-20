import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogComponent, PopupDialogProperties, PopupDialogService, PopupDialogType, PopupWindowProperties, PopupWindowService } from '@omnicell/webcorecomponents';
import { LogVerbosity } from 'oal-core';
import { forkJoin, merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, flatMap, map, shareReplay, take, takeUntil } from 'rxjs/operators';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';
import { LogService } from '../../api-core/services/log-service';
import { IRestockTray } from '../../api-xr2/data-contracts/i-restock-tray';
import { ITrayType } from '../../api-xr2/data-contracts/i-tray-type';
import { InvoicesService } from '../../api-xr2/services/invoices.service';
import { Xr2RestockTrayService } from '../../api-xr2/services/xr2-restock-tray.service';
import { WpfActionPaths } from '../../core/constants/wpf-action-paths';
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';
import { GridPopupComponent } from '../../shared/components/grid-popup/grid-popup.component';
import { LoggingCategory } from '../../shared/constants/logging-category';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { groupAndSum } from '../../shared/functions/groupAndSum';
import { IGridPopupData } from '../../shared/model/i-grid-popup-data';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Xr2Stocklist } from '../../shared/model/xr2-stocklist';
import { CpBarcodeScanService } from '../../shared/services/cp-barcode-scan.service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { WindowService } from '../../shared/services/window-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { Xr2DeviceSelectionHeaderComponent } from '../xr2-device-selection-header/xr2-device-selection-header.component';
import { Xr2InvoicesQueueComponent } from '../xr2-invoices-queue/xr2-invoices-queue.component';

@Component({
  selector: 'app-xr2-stocking-page',
  templateUrl: './xr2-invoices-page.component.html',
  styleUrls: ['./xr2-invoices-page.component.scss']
})
export class Xr2InvoicesPageComponent implements OnInit {

  @ViewChild(Xr2DeviceSelectionHeaderComponent, {static: true}) childHeaderComponent: Xr2DeviceSelectionHeaderComponent;

  @ViewChild(Xr2InvoicesQueueComponent, {static: false})
  set childInvoiceQueueComponent(value: Xr2InvoicesQueueComponent) {
    if(!value) return;
    this._childInvoiceQueueComponent = value;
    this._childInvoiceQueueComponent.changeDeviceSelection(this.selectedDeviceInformation);
  }

  get childInvoiceQueueComponent(): Xr2InvoicesQueueComponent {
    return this._childInvoiceQueueComponent;
  }

  ngUnsubscribe = new Subject();
  searchTextFilter: string;
  trayTypes$: NonstandardJsonArray<ITrayType>;
  invoiceItems$: Observable<any>;
  selectedDeviceInformation: SelectableDeviceInfo;
  translations$: Observable<any>;
  translatables = [
    'INVOICE_DELETE_BUTTON_TEXT',
    'CANCEL',
    "INVOICE_DELETE_HEADER",
    "INVOICE_DELETE_BODY"
  ];
  displayedDialog: PopupDialogComponent;

  private _componentName: string = "xr2InvoicesPageComponent"
  private _loggingCategory: string = LoggingCategory.Xr2Stocking;
  private _groupingKeyNames = ["ItemId", "DeviceId"];
  private _sumKeyNames = [ "QuantityReceived", "QuantityStocked"];
  private _childInvoiceQueueComponent: Xr2InvoicesQueueComponent;
  private barcodeScannedSubscription: Subscription;

  constructor(
    private wpfActionController: WpfActionControllerService,
    private invoiceService: InvoicesService,
    private logService: LogService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private simpleDialogService: SimpleDialogService,
    private barcodeScanService: CpBarcodeScanService,
    private barcodeDataService: BarcodeDataService,
    private xr2RestockTrayService: Xr2RestockTrayService,
    private windowService: WindowService,
    private wpfInteropService: WpfInteropService,
    private popupWindowService: PopupWindowService
  ) { this.setupDataRefresh(); }

  ngOnInit() {
    this.hookupEventHandlers();
    this.setTranslations();
    this.loadInvoiceItems();
    this.loadTrayTypes();
  }

  /* istanbul ignore next */
  fromWPFInit() {
    this.clearDisplayedDialog();
    this.ngOnInit();
  }

  onBackEvent(): void {
    this.wpfActionController.ExecuteBackAction();
  }

  onSearchTextFilterEvent(filterText: string): void {
    this.searchTextFilter = filterText;
  }

  onDeviceSelectionChanged($event): void {
    this.selectedDeviceInformation = $event;
    if(this.childInvoiceQueueComponent) {
      this.childInvoiceQueueComponent.changeDeviceSelection($event);
    }
  }

  onDisplayYesNoDialogEvent(stocklist: IXr2Stocklist): void {
    this.clearDisplayedDialog();
    this.displayDeleteDialog().subscribe(result => {
      if (!result) {
        return;
      }

      this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
        this._componentName + ' delete clicked - deleting current invoice item');

      this.invoiceService.deleteInvoice(stocklist).subscribe((success) => {
        if(!success) {
          this.handleDeleteInvoiceError();
        }
        this.handleDeleteInvoiceSuccess(stocklist);
      }, (err) => {
        this.handleDeleteInvoiceError(err);
      });
    });
  }

  onDetailsClickEvent(stocklist: IXr2Stocklist) {
    const properties = new PopupWindowProperties();
    const data: IGridPopupData = {
      popuptitle: "INVOICE_ITEM_DETAILS"
    };

    properties.data = data;

    let component = this.popupWindowService.show(GridPopupComponent, properties) as unknown as GridPopupComponent;
    component.dismiss.pipe(take(1)).subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  processScannedBarcodeData(result: IBarcodeData): void {
    this.barcodeScanService.reset();
    this.clearDisplayedDialog();

    if(!this.selectedDeviceInformation){
      this.simpleDialogService.getWarningOkPopup('DEVICE_SELECTION_TEXT', 'DEVICE_SELECTION_SCANNING_MESSAGE').subscribe((dialog) => {
        this.displayedDialog = dialog;
      });
      return;
    }

    if(!result.IsTrayBarcode){
      this.simpleDialogService.getWarningOkPopup('BARCODESCAN_DIALOGWARNING_TITLE', 'BARCODESCAN_DIALOGWARNING_MESSAGE').subscribe((dialog) => {
        this.displayedDialog = dialog;
      });
      return;
    }

    if(!this.ValidateTrayTypeDevice(result)){
      return;
    }

    this.getRestockTrayInfo(result.BarCodeScanned)
  }

  getRestockTrayInfo(trayId: string){
    this.xr2RestockTrayService.getRestockTrayById(trayId).subscribe(restockTray =>{
      if(!restockTray){
        this.createRestockTray(trayId);
        return;
      }
      this.editRestockTray(restockTray);
    });
  }

  editRestockTray(restockTray: IRestockTray){
    if(this.validScannedTray(restockTray)){

      let newRestockTray = {
        RestockTrayId: restockTray.RestockTrayId,
        DeviceId: restockTray.DeviceId,
        DeviceDescription: restockTray.DeviceDescription,
        TrayId: restockTray.TrayId,
        TrayTypeId: restockTray.TrayTypeId,
        IsReturn: restockTray.IsReturn,
        TrayExpDate: restockTray.TrayExpDate,
        TrayDescription: restockTray.TrayDescription,
        RestockTrayStatus: restockTray.RestockTrayStatus,
        CreatedDateTime: restockTray.CreatedDateTime,
        LastUpdatedDateTime: restockTray.LastUpdatedDateTime,
        CompletedDateTime: restockTray.CompletedDateTime,
        CorrelationId: restockTray.CorrelationId,
        MultiDoseEnabled: restockTray.MultiDoseEnabled,
        UserId: restockTray.UserId,
        IsStockInternal: restockTray.IsStockInternal,
        IsInvoiceTray: true,
        InvoiceOriginScreen: true,
      } as IRestockTray;
      this.navigateEditTray(newRestockTray);
    }
  }

  createRestockTray(trayId: string){
    let RestockTray =  {
      DeviceId: this.selectedDeviceInformation.DeviceId,
      IsReturn: false,
      RestockTrayStatus: 0,
      TrayId: trayId,
      IsInvoiceTray: true,
      InvoiceOriginScreen: true,
    } as IRestockTray;

    this.navigateCreateTray(RestockTray);
  }
    private ValidateTrayTypeDevice(scan: IBarcodeData): boolean{
      let trayPrefix = scan.BarCodeScanned.substr(0,2);
      if(!this.trayTypes$.$values.find(x=>x.TrayPrefix == trayPrefix && x.DeviceId == this.selectedDeviceInformation.DeviceId))
      {
        this.simpleDialogService.getWarningOkPopup('INVALID_TRAY_SCAN', 'INVALID_TRAY_SCAN_DESC').subscribe((dialog) => {
          this.displayedDialog = dialog;
        });
        return false;
      }
      return true;
    }

    private validScannedTray(restockTray: IRestockTray): boolean{
      if(restockTray.IsReturn)
      {
        this.clearDisplayedDialog();
        this.simpleDialogService.getWarningOkPopup("INVALID_SCAN_TITLE", "INVOICE_ITEM_SCAN_RETURN_TRAY_MESSAGE").subscribe(x=>{
          this.displayedDialog = x;
        });
        return false;;
      }

      if(restockTray.DeviceId != this.selectedDeviceInformation.DeviceId){
        this.clearDisplayedDialog();
        this.simpleDialogService.getWarningOkPopup("INVALID_SCAN_TITLE", "DEVICE_SELECTION_TRAY_SCANNING_MESSAGE").subscribe(x=>{
          this.displayedDialog = x;
        });
        return false;
      }

      return true;
    }

    private navigateCreateTray(RestockTray: IRestockTray){
      this.wpfActionController.ExecuteActionNameWithData(WpfActionPaths.XR2AddTrayPath, RestockTray);
    }

    private navigateEditTray(RestockTray: IRestockTray){
      this.wpfActionController.ExecuteActionNameWithData(WpfActionPaths.XR2EditTrayPath, RestockTray);
    }

    /* istanbul ignore next */
    private hookupEventHandlers(): void {
       if (this.isInvalidSubscription(this.barcodeScanService)) {
         return;
       }

      if(this.barcodeScanService.BarcodeScannedSubject.observers.length == 0){
        this.barcodeScannedSubscription = this.barcodeScanService.BarcodeScannedSubject.pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe((scannedBarcode: string) =>
        {
          this.barcodeScanService.reset();
          this.barcodeDataService
            .getData(scannedBarcode)
            .subscribe((result: IBarcodeData) =>
              this.processScannedBarcodeData(result)
            )
        });
      }
    }

  private loadTrayTypes(){
    this.xr2RestockTrayService.getTrayTypes().subscribe(x => {
      this.trayTypes$ = x;
    })
  }

  private loadInvoiceItems() {
    this.invoiceItems$ = this.invoiceService.getInvoiceItems()
    .pipe(map(x => {
      const items = x.map(invoiceItem => new Xr2Stocklist(invoiceItem))
      return groupAndSum(items, this._groupingKeyNames, this._sumKeyNames);
    }), shareReplay())
  }

  /* istanbul ignore next */
  private handleDeleteInvoiceSuccess(invoice: IXr2Stocklist) {
    this.childInvoiceQueueComponent.deleteInvoice(invoice);
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this._componentName + ' delete successful on item ID: ' + invoice.ItemId);
  }

  /* istanbul ignore next */
  private handleDeleteInvoiceError(err?) {
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this._componentName + ' delete failed: ' + err);
    this.simpleDialogService.displayErrorOk('FAILEDTOSAVE_HEADER_TEXT','FAILEDTOSAVE_BODY_TEXT');
  }

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
  }

  /* istanbul ignore next */
  private displayDeleteDialog(): Observable<boolean> {
    return forkJoin(this.translations$).pipe(flatMap(r => {
      const translations = r[0];
      if(!translations) return;
      const properties = new PopupDialogProperties('Standard-Popup-Dialog-Font');
      properties.titleElementText = translations.INVOICE_DELETE_HEADER;
      properties.messageElementText = translations.INVOICE_DELETE_BODY;
      properties.showPrimaryButton = true;
      properties.primaryButtonText = translations.CANCEL;
      properties.showSecondaryButton = true;
      properties.secondaryButtonText = translations.INVOICE_DELETE_BUTTON_TEXT;
      properties.primaryOnRight = false;
      properties.showCloseIcon = false;
      properties.dialogDisplayType = PopupDialogType.Warning;
      properties.timeoutLength = 0;
      this.displayedDialog = this.dialogService.showOnce(properties);
      const primaryClick$ = this.displayedDialog.didClickPrimaryButton.pipe(map(x => false));
      const secondaryClick$ = this.displayedDialog.didClickSecondaryButton.pipe(map(x => true));
      return merge(primaryClick$, secondaryClick$);
    }));
  }

  private isValidSubscription(variable: any): boolean {
    return variable !== undefined && variable !== null;
  }

  private isInvalidSubscription(variable: any): boolean {
    return !this.isValidSubscription(variable);
  }

  private clearDisplayedDialog() {
    try {
      if (this.displayedDialog) {
        this.displayedDialog.onCloseClicked();
      }
    } catch (err) {
      // Eat it - this happens if it was closed - this should be fixed in the Dialog so it doesnt crash
    }
  }

  /* istanbul ignore next */
  private setupDataRefresh() {
    let hash = this.windowService.getHash();
    this.wpfInteropService.wpfViewModelActivated
      .pipe(filter(x => x == hash),takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.fromWPFInit();
        if(this.childHeaderComponent) {
          this.childHeaderComponent.fromWPFInit();
        }

        if(this.childInvoiceQueueComponent) {
          this.childInvoiceQueueComponent.fromWPFInit();
        }
      });
  }
}
