import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GridComponent } from '@omnicell/webcorecomponents';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Xr2Stocklist } from '../../shared/model/xr2-stocklist';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-xr2-invoices-queue',
  templateUrl: './xr2-invoices-queue.component.html',
  styleUrls: ['./xr2-invoices-queue.component.scss']
})
export class Xr2InvoicesQueueComponent implements OnInit {


  @Output() sortEvent: EventEmitter<IColHeaderSortChanged> = new EventEmitter();
  @Output() detailsClickEvent: EventEmitter<IXr2Stocklist> = new EventEmitter();
  @Output() displayYesNoDialogEvent: EventEmitter<IXr2Stocklist> = new EventEmitter();

  @Input()
  set unfilteredInvoiceItems(value: Xr2Stocklist[]) {
    this._unfilteredInvoiceItems = value;
    this.applyQueueFilters();
  }
  get unfilteredInvoiceItems(): Xr2Stocklist[] {
    return this._unfilteredInvoiceItems;
  }

  @Input()
  set selectedDeviceInformation(value: SelectableDeviceInfo) {
    this._selectedDeviceInformation = value;
  }
  get selectedDeviceInformation(): SelectableDeviceInfo {
    return this._selectedDeviceInformation;
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

  searchPipe: SearchPipe = new SearchPipe();
  searchFields = [nameof<Xr2Stocklist>("ItemFormattedGenericName"), nameof<Xr2Stocklist>("ItemTradeName"), nameof<Xr2Stocklist>("ItemId")];
  currentSortPropertyName: string;
  columnSortDirection: string;

  readonly inProgressPropertyName = nameof<Xr2Stocklist>('InProgress');
  readonly itemNamePropertyName = nameof<Xr2Stocklist>('ItemFormattedGenericName');
  readonly qtyReceivedPropertyName = nameof<Xr2Stocklist>('QuantityReceived');
  readonly qtyStockedPropertyName = nameof<Xr2Stocklist>('QuantityStocked');

  private  _unfilteredInvoiceItems: Xr2Stocklist[];
  private _filteredInvoiceItems: Xr2Stocklist[];
  private  _searchTextFilter: string;
  private _selectedDeviceInformation: SelectableDeviceInfo;

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

  onDetailsClick(invoiceItem: IXr2Stocklist): void {
    this.detailsClickEvent.emit(invoiceItem);
  }

  onDeleteClick(invoiceItem: IXr2Stocklist): void {
    this.displayYesNoDialogEvent.emit(invoiceItem);
  }

  /* istanbul ignore next */
  trackByItemId(index: number, invoiceItem: IXr2Stocklist): string {
    if (!invoiceItem) {
      return null;
    }

    return invoiceItem.PoNumber;
  }

  changeDeviceSelection(selectedDevice: SelectableDeviceInfo): void {
    this.selectedDeviceInformation = selectedDevice;
    this.filteredInvoiceItems = this.filterByDevice(selectedDevice.DeviceId, this.unfilteredInvoiceItems);
  }

  deleteInvoice(invoice: IXr2Stocklist): void {
    this.unfilteredInvoiceItems = this.unfilteredInvoiceItems.filter((item) => item.PoNumber !== invoice.PoNumber);
  }

  private applyQueueFilters(): void {
    if(!this.unfilteredInvoiceItems || !this.selectedDeviceInformation) return;

    let filterChain = [...this.unfilteredInvoiceItems];

    filterChain = this.filterByDevice(this.selectedDeviceInformation.DeviceId, filterChain);
    filterChain = this.filterBySearchText(this.searchTextFilter, filterChain);

    this.filteredInvoiceItems = filterChain;
  }

  private filterBySearchText(text: string, unfilteredArray: Xr2Stocklist[]) {
    if(!text || !unfilteredArray) return unfilteredArray;
    return this.searchPipe.transform(unfilteredArray, text, this.searchFields);
  }

  private filterByDevice(deviceId: number, unfilteredArray: Xr2Stocklist[]) {
    if(!deviceId || !unfilteredArray) return unfilteredArray;
    return unfilteredArray.filter((invoiceItem) => invoiceItem.DeviceId === deviceId);
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
