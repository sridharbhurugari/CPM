import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GridComponent } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';

@Component({
  selector: 'app-xr2-invoices-queue',
  templateUrl: './xr2-invoices-queue.component.html',
  styleUrls: ['./xr2-invoices-queue.component.scss']
})
export class Xr2InvoicesQueueComponent implements OnInit {


  @Output() sortEvent: EventEmitter<IColHeaderSortChanged> = new EventEmitter();

  @Input()
  set unfilteredInvoiceItems(value: any[]) {
    this._unfilteredInvoiceItems = value;
    this._filteredInvoiceItems = value
    this.resizeGrid();
  }
  get unfilteredInvoiceItems(): any[] {
    return this._unfilteredInvoiceItems;
  }

  set filteredInvoiceItems(value: any[]) {
    this._filteredInvoiceItems = value;
    this.resizeGrid();
  }
  get filteredInvoiceItems(): any[] {
    return this._filteredInvoiceItems;
  }

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;


  currentSortPropertyName: string;
  columnSortDirection: string;
  readonly invoiceIdPropertyName = nameof<any>('Id');
  readonly poNumberPropertyName = nameof<any>('PoNumber');
  readonly orderDatePropertyName = nameof<any>('OrderDate');
  readonly sourcePropertyName = nameof<any>('Source');


  private  _unfilteredInvoiceItems: any[];
  private _filteredInvoiceItems: any[];
  private  _searchTextFilter: string;

  constructor() { }

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

  /* istanbul ignore next */
  trackByItemId(index: number, invoiceItem: any): Guid {
    if (!invoiceItem) {
      return null;
    }

    return invoiceItem.Id;
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
