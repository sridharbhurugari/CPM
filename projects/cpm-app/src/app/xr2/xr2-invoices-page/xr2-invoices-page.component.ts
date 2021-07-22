import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, pipe, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
import { InvoicesService } from '../../api-core/services/invoices.service';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Xr2Stocklist } from '../../shared/model/xr2-stocklist';
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

  constructor(
    private wpfActionController: WpfActionControllerService,
    private invoiceService: InvoicesService
  ) { }

  ngOnInit() {
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

  onDeleteEvent(invoice: IXr2Stocklist): void {
    this.invoiceService.deleteInvoice(invoice).subscribe((success) => {
      if(success) {
        this.childInvoiceQueueComponent.deleteInvoice(invoice);
      }
    });
  }

  onRowClickEvent(invoice: IXr2Stocklist): void {
    // WPF route to next page with invoice data
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private loadInvoiceItems() {
    this.invoiceItems$ = this.invoiceService.getInvoiceItems()
    .pipe(map(x => x.map(invoiceItem => new Xr2Stocklist(invoiceItem))), shareReplay())
  }
}
