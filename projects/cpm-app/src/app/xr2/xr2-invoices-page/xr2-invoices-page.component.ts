import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogProperties, PopupDialogService, PopupDialogType } from '@omnicell/webcorecomponents';
import { LogVerbosity } from 'oal-core';
import { forkJoin, merge, Observable, Subject } from 'rxjs';
import { filter, flatMap, map, shareReplay, takeUntil } from 'rxjs/operators';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
import { LogService } from '../../api-core/services/log-service';
import { InvoicesService } from '../../api-xr2/services/invoices.service';
import { LoggingCategory } from '../../shared/constants/logging-category';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Xr2Stocklist } from '../../shared/model/xr2-stocklist';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { WindowService } from '../../shared/services/window-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { Xr2InvoicesQueueComponent } from '../xr2-invoices-queue/xr2-invoices-queue.component';

@Component({
  selector: 'app-xr2-stocking-page',
  templateUrl: './xr2-invoices-page.component.html',
  styleUrls: ['./xr2-invoices-page.component.scss']
})
export class Xr2InvoicesPageComponent implements OnInit {

  @ViewChild(Xr2InvoicesQueueComponent, {static: false}) childInvoiceQueueComponent: Xr2InvoicesQueueComponent;

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

  onBackEvent(): void {
    this.wpfActionController.ExecuteBackAction();
  }

  onSearchTextFilterEvent(filterText: string): void {
    this.searchTextFilter = filterText;
  }

  onDeviceSelectionChanged($event): void {
    this.selectedDeviceInformation = $event;
    if(!this.childInvoiceQueueComponent) {
      setTimeout(() => {
        this.childInvoiceQueueComponent.changeDeviceSelection(this.selectedDeviceInformation);
      }, 0);
    } else {
      this.childInvoiceQueueComponent.changeDeviceSelection(this.selectedDeviceInformation);
    }
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

  /* istanbul ignore next */
  private setupDataRefresh() {
    let hash = this.windowService.getHash();
    this.wpfInteropService.wpfViewModelActivated
      .pipe(filter(x => x == hash),takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
