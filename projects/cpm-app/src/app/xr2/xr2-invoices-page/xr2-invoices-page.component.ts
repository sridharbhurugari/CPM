import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogComponent, PopupDialogProperties, PopupDialogService, PopupDialogType } from '@omnicell/webcorecomponents';
import { LogVerbosity } from 'oal-core';
import { forkJoin, merge, Observable, Subject, Subscription } from 'rxjs';
import { flatMap, map, shareReplay, takeUntil } from 'rxjs/operators';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';
import { LogService } from '../../api-core/services/log-service';
import { IRestockTray } from '../../api-xr2/data-contracts/i-restock-tray';
import { InvoicesService } from '../../api-xr2/services/invoices.service';
import { Xr2RestockTrayService } from '../../api-xr2/services/xr2-restock-tray.service';
import { WpfActionPaths } from '../../core/constants/wpf-action-paths';
import { LoggingCategory } from '../../shared/constants/logging-category';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Xr2Stocklist } from '../../shared/model/xr2-stocklist';
import { CpBarcodeScanService } from '../../shared/services/cp-barcode-scan.service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { Xr2InvoicesQueueComponent } from '../xr2-invoices-queue/xr2-invoices-queue.component';

@Component({
  selector: 'app-xr2-stocking-page',
  templateUrl: './xr2-invoices-page.component.html',
  styleUrls: ['./xr2-invoices-page.component.scss']
})
export class Xr2InvoicesPageComponent implements OnInit {

  @ViewChild(Xr2InvoicesQueueComponent, null) childInvoiceQueueComponent: Xr2InvoicesQueueComponent;

  ngUnsubscribe = new Subject();
  searchTextFilter: string;
  invoiceItems$: Observable<any>;
  selectedDeviceInformation: SelectableDeviceInfo;
  translations$: Observable<any>;
  translatables = [
    'YES',
    'NO',
    "INVOICE_DELETE_HEADER",
    "INVOICE_DELETE_BODY"
  ];

  private _componentName: string = "xr2InvoicesPageComponent"
  private _loggingCategory: string = LoggingCategory.Xr2Stocking;
  private barcodeScannedSubscription: Subscription;
  displayedDialog: PopupDialogComponent;

  constructor(
    private wpfActionController: WpfActionControllerService,
    private invoiceService: InvoicesService,
    private logService: LogService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private simpleDialogService: SimpleDialogService,
    private barcodeScanService: CpBarcodeScanService,
    private barcodeDataService: BarcodeDataService,
    private xr2RestockTrayService : Xr2RestockTrayService,
  ) { }

  ngOnInit() {
    this.hookupEventHandlers();
    this.setTranslations();
    this.loadInvoiceItems();
  }

  onBackEvent(): void {
    this.wpfActionController.ExecuteBackAction();
  }

  onSearchTextFilterEvent(filterText: string): void {
    this.searchTextFilter = filterText;
  }

  onDeviceSelectionChanged($event): void {
    this.selectedDeviceInformation = $event;
    this.childInvoiceQueueComponent.changeDeviceSelection(this.selectedDeviceInformation);
  }

  onDisplayYesNoDialogEvent(invoice: IXr2Stocklist): void {

    this.displayDeleteDialog().subscribe(result => {
      if (!result) {
        return;
      }

      this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
        this._componentName + ' delete clicked - deleting current invoice item');

      this.invoiceService.deleteInvoice(invoice).subscribe((success) => {
        if(!success) {
          this.handleDeleteInvoiceError();
        }
        this.handleDeleteInvoiceSuccess(invoice);
      }, (err) => {
        this.handleDeleteInvoiceError(err);
      });
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.unhookEventHandlers();
  }

  processScannedBarcodeData(result: IBarcodeData): void {
    //Clear Popup For Invalid Tray Barcode 
    this.clearDisplayedDialog();
    console.log("Barcode Scanned Data: ", result);

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

    this.getRestockTrayInfo(result.BarCodeScanned)
  }

    private getRestockTrayInfo(trayId: string){
      this.xr2RestockTrayService.getRestockTrayById(trayId).subscribe(restockTray =>{
        if(!restockTray){
          this.createNewRestockTray(trayId);
        }
        if(restockTray.IsReturn)
        {
          this.clearDisplayedDialog();
          this.simpleDialogService.getWarningOkPopup("INVALID_SCAN_TITLE", "INVOICE_ITEM_SCAN_RETURN_TRAY_MESSAGE").subscribe(x=>{
            this.displayedDialog = x;
          })
          return;
        }
        

      });
    }

    private createNewRestockTray(trayId: string){
      let RestockTray =  {
        DeviceId: this.selectedDeviceInformation.DeviceId,
        IsReturn: false,
        RestockTrayStatus: 0,
        TrayId: trayId,
        IsInvoiceTray: true,
      } as IRestockTray;
  
      this.wpfActionController.ExecuteActionNameWithData(WpfActionPaths.XR2AddTrayPath, { RestockTray });
    }

    /* istanbul ignore next */
    private hookupEventHandlers(): void {
      if (this.isInvalidSubscription(this.barcodeScanService)) {
        return;
      }
  
      this.barcodeScannedSubscription = this.barcodeScanService.BarcodeScannedSubject.pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((scannedBarcode: string) =>
        this.barcodeDataService
          .getData(scannedBarcode)
          .subscribe((result: IBarcodeData) =>
            this.processScannedBarcodeData(result)
          )
      );
    }

  private loadInvoiceItems() {
    this.invoiceItems$ = this.invoiceService.getInvoiceItems()
    .pipe(map(x => x.map(invoiceItem => new Xr2Stocklist(invoiceItem))), shareReplay())
  }

  private handleDeleteInvoiceSuccess(invoice: IXr2Stocklist) {
    this.childInvoiceQueueComponent.deleteInvoice(invoice);
    this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
      this._componentName + ' delete successful on poNumber: ' + invoice.PoNumber);
  }

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
      const properties = new PopupDialogProperties('Standard-Popup-Dialog-Font');
      properties.titleElementText = translations.INVOICE_DELETE_HEADER;
      properties.messageElementText = translations.INVOICE_DELETE_BODY;
      properties.showPrimaryButton = true;
      properties.primaryButtonText = translations.YES;
      properties.showSecondaryButton = true;
      properties.secondaryButtonText = translations.NO;
      properties.primaryOnRight = false;
      properties.showCloseIcon = false;
      properties.dialogDisplayType = PopupDialogType.Info;
      properties.timeoutLength = 0;
      const component = this.dialogService.showOnce(properties);
      const primaryClick$ = component.didClickPrimaryButton.pipe(map(x => true));
      const secondaryClick$ = component.didClickSecondaryButton.pipe(map(x => false));
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
}
