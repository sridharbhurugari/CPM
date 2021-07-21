import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GridComponent } from '@omnicell/webcorecomponents';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { Xr2Stocklist } from '../../shared/model/xr2-stocklist';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-xr2-invoices-queue',
  templateUrl: './xr2-invoices-queue.component.html',
  styleUrls: ['./xr2-invoices-queue.component.scss']
})
export class Xr2InvoicesQueueComponent implements OnInit {


  @Output() sortEvent: EventEmitter<IColHeaderSortChanged> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<IXr2Stocklist> = new EventEmitter();
  searchPipe: SearchPipe = new SearchPipe();

  @Input()
  set unfilteredInvoiceItems(value: Xr2Stocklist[]) {
    this._unfilteredInvoiceItems = value;
    this._filteredInvoiceItems = value
    this.resizeGrid();
  }
  get unfilteredInvoiceItems(): Xr2Stocklist[] {
    return this._unfilteredInvoiceItems;
  }

  @Input()
  set searchTextFilter(value: string) {
    this._searchTextFilter = value;
    this.applyQueueFilters();
  }
  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  set filteredInvoiceItems(value: Xr2Stocklist[]) {
    this._filteredInvoiceItems = value;
    this.resizeGrid();
  }
  get filteredInvoiceItems(): Xr2Stocklist[] {
    return this._filteredInvoiceItems;
  }

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  searchFields = [nameof<Xr2Stocklist>("InvoiceNumber"), nameof<Xr2Stocklist>("PoNumber"), nameof<Xr2Stocklist>("SourceId")];
  currentSortPropertyName: string;
  columnSortDirection: string;
  readonly invoiceIdPropertyName = nameof<Xr2Stocklist>('InvoiceNumber');
  readonly poNumberPropertyName = nameof<Xr2Stocklist>('PoNumber');
  readonly orderDatePropertyName = nameof<Xr2Stocklist>('OrderDate');
  readonly sourcePropertyName = nameof<Xr2Stocklist>('SourceId');


  private  _unfilteredInvoiceItems: Xr2Stocklist[];
  private _filteredInvoiceItems: Xr2Stocklist[];
  private  _searchTextFilter: string;

  constructor(private translateService: TranslateService
  ) { }

  ngOnInit() {
  }


  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.columnSortDirection = event.SortDirection;
    this.filteredInvoiceItems = this.sort(this.filteredInvoiceItems, event.SortDirection);
    this.sortEvent.emit(event);
  }

  sort(invoiceItems: any[], sortDirection: Many<boolean | 'asc' | 'desc'>): any[] {
    return _.orderBy(invoiceItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  convertDate(date: Date): string {
    const orderDate = new Date(date).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
  }

  onDeleteClick(invoice: IXr2Stocklist): void {
    this.deleteEvent.emit(invoice);
  }

  /* istanbul ignore next */
  trackByItemId(index: number, invoiceItem: IXr2Stocklist): string {
    if (!invoiceItem) {
      return null;
    }

    return invoiceItem.PoNumber;
  }

  private applyQueueFilters() {
    this.filteredInvoiceItems = this.filterBySearchText(this.searchTextFilter, this.unfilteredInvoiceItems);
  }

  private filterBySearchText(text: string, unfilteredArray: Xr2Stocklist[]) {
    return this.searchPipe.transform(unfilteredArray, text, this.searchFields);
  }

  /* istanbul ignore next */
  private resizeGrid() {
    setTimeout(() => {
      if (this.ocGrid) {
        this.ocGrid.checkTableBodyOverflown();
      }
    }, 250);
  }
}
