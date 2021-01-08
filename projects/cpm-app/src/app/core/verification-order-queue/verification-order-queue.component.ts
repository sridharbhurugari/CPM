import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GridComponent } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { Observable } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { VerificationOrderItem } from '../../shared/model/verification-order-item';

@Component({
  selector: 'app-verification-order-queue',
  templateUrl: './verification-order-queue.component.html',
  styleUrls: ['./verification-order-queue.component.scss']
})
export class VerificationOrderQueueComponent implements OnInit {

  @Output() gridRowClickEvent: EventEmitter<VerificationOrderItem> = new EventEmitter();

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
  verificationOrderItems: VerificationOrderItem[];

  @Input()
  set verficationOrderItems(value: VerificationOrderItem[]) {
    this._verficationOrderItems = value;
    this.resizeGrid();
  }
  get verficationOrderItems(): VerificationOrderItem[] {
    return this._verficationOrderItems;
  }

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  private  _verficationOrderItems: VerificationOrderItem[];

  readonly sequenceOrderPropertyName = nameof<VerificationOrderItem>('SequenceOrder');
  readonly typePropertyName = nameof<VerificationOrderItem>('PriorityCodeDescription');
  readonly orderIdPropertyName = nameof<VerificationOrderItem>('OrderId');
  readonly completePropertyName = nameof<VerificationOrderItem>('CompleteVerifications');
  readonly requiredPropertyName = nameof<VerificationOrderItem>('RequiredVerificationPercentage');
  readonly exceptionsPropertyName = nameof<VerificationOrderItem>('RequiredExceptions');
  readonly datePropertyName = nameof<VerificationOrderItem>('Date');
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

  onGridRowClick(clickedVerificationOrderItem: VerificationOrderItem) {
    this.gridRowClickEvent.emit(clickedVerificationOrderItem);
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.verificationOrderItems = this.sort(this.verificationOrderItems, event.SortDirection);
  }

  sort(verificationOrderItems: VerificationOrderItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): VerificationOrderItem[] {
    return _.orderBy(verificationOrderItems, x => x[this.currentSortPropertyName], sortDirection);
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
