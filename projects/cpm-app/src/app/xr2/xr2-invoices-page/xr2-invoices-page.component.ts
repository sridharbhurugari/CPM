import { Component, OnInit } from '@angular/core';
import { Observable, pipe, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoicesService } from '../../api-core/services/invoices.service';
import { Xr2Stocklist } from '../../shared/model/xr2-stocklist';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

@Component({
  selector: 'app-xr2-stocking-page',
  templateUrl: './xr2-invoices-page.component.html',
  styleUrls: ['./xr2-invoices-page.component.scss']
})
export class Xr2InvoicesPageComponent implements OnInit {

  ngUnsubscribe = new Subject();
  searchTextFilter: string;
  invoiceItems$: Observable<any>;

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
    console.log(this.searchTextFilter);
    this.searchTextFilter = filterText;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private loadInvoiceItems() {
    this.invoiceItems$ = this.invoiceService.getInvoiceItems()
    .pipe(map(x => x.map(invoiceItem => new Xr2Stocklist(invoiceItem))))
  }
}
