import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GridComponent } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { Observable } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { Xr2VerificationOrderItem } from '../model/xr2-verification-order-item';

@Component({
  selector: 'app-xr2-verification-order-queue',
  templateUrl: './xr2-verification-order-queue.component.html',
  styleUrls: ['./xr2-verification-order-queue.component.scss']
})
export class Xr2VerificationOrderQueueComponent implements OnInit {

  @Output() gridRowClickEvent: EventEmitter<Xr2VerificationOrderItem> = new EventEmitter();

  @Input()
  set searchTextFilter(value: string) {
    if (!this.verificationOrderItems) {
      return;
    }
    this._searchTextFilter = value;
  }
  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  @Input()
  verificationOrderItems: Xr2VerificationOrderItem[];

  @Input()
  set verficationOrderItems(value: Xr2VerificationOrderItem[]) {
    this._verficationOrderItems = value;
    this.resizeGrid();
  }
  get verficationOrderItems(): Xr2VerificationOrderItem[] {
    return this._verficationOrderItems;
  }

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  private  _verficationOrderItems: Xr2VerificationOrderItem[];

  readonly sequenceOrderPropertyName = nameof<Xr2VerificationOrderItem>('SequenceOrder');
  readonly typePropertyName = nameof<Xr2VerificationOrderItem>('PriorityCodeDescription');
  readonly orderIdPropertyName = nameof<Xr2VerificationOrderItem>('OrderId');
  readonly completePropertyName = nameof<Xr2VerificationOrderItem>('CompleteVerifications');
  readonly requiredPropertyName = nameof<Xr2VerificationOrderItem>('RequiredVerificationPercentage');
  readonly exceptionsPropertyName = nameof<Xr2VerificationOrderItem>('RequiredExceptions');
  readonly datePropertyName = nameof<Xr2VerificationOrderItem>('Date');
  firstTime = true;

  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;
  _searchTextFilter;
  searchFields = [];

  translatables = [];
  translations$: Observable<any>;


  constructor() { }

  ngOnInit() {
  }

  onGridRowClick(clickedVerificationOrderItem: Xr2VerificationOrderItem) {
    this.gridRowClickEvent.emit(clickedVerificationOrderItem);
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.verificationOrderItems = this.sort(this.verificationOrderItems, event.SortDirection);
  }

  sort(xr2VerificationOrderItems: Xr2VerificationOrderItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): Xr2VerificationOrderItem[] {
    return _.orderBy(xr2VerificationOrderItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  /* istanbul ignore next */
  trackByItemId(index: number, verificationOrderItem: any): Guid {
    if (!verificationOrderItem) {
      return null;
    }

    return verificationOrderItem.Id;
  }

  private resizeGrid() {
    setTimeout(() => {
      if (this.ocGrid) {
        this.ocGrid.checkTableBodyOverflown();
      }
    }, 250);
  }
}
