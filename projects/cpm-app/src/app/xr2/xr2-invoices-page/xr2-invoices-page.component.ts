import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogComponent, PopupDialogProperties, PopupDialogService, PopupDialogType } from '@omnicell/webcorecomponents';
import { LogVerbosity } from 'oal-core';
import { forkJoin, merge, Observable, Subject } from 'rxjs';
import { filter, flatMap, map, shareReplay, takeUntil } from 'rxjs/operators';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
import { LogService } from '../../api-core/services/log-service';
import { InvoicesService } from '../../api-xr2/services/invoices.service';
import { LoggingCategory } from '../../shared/constants/logging-category';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { groupAndSum } from '../../shared/functions/groupAndSum';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Xr2Stocklist } from '../../shared/model/xr2-stocklist';
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

  constructor(
    private wpfActionController: WpfActionControllerService,
    private invoiceService: InvoicesService,
    private logService: LogService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private simpleDialogService: SimpleDialogService,
    private windowService: WindowService,
    private wpfInteropService: WpfInteropService
  ) {
    this.setupDataRefresh();
  }

  ngOnInit() {
    this.setTranslations();
    this.loadInvoiceItems();
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

  onDisplayYesNoDialogEvent(invoice: IXr2Stocklist): void {
    this.clearDisplayedDialog();
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

    /* istanbul ignore next */
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
