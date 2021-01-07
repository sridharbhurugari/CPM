import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GridComponent } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { Observable } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { Xr2VerificationDestinationItem } from '../model/xr2-verification-destination-item';

@Component({
  selector: 'app-xr2-verification-destination-queue',
  templateUrl: './xr2-verification-destination-queue.component.html',
  styleUrls: ['./xr2-verification-destination-queue.component.scss']
})
export class Xr2VerificationDestinationQueueComponent implements OnInit {

  @Output() gridRowClickEvent: EventEmitter<Guid> = new EventEmitter();

  @Input()
  set searchTextFilter(value: string) {
    if (!this.verificationDestinationItems) {
      return;
    }
    this._searchTextFilter = value;
  }
  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  @Input()
  set verificationDestinationItems(value: Xr2VerificationDestinationItem[]) {
    this._verificationDestinationItems = value;
    this.resizeGrid();
  }
  get verificationDestinationItems(): Xr2VerificationDestinationItem[] {
    return this._verificationDestinationItems;
  }

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  private  _verificationDestinationItems: Xr2VerificationDestinationItem[];

  readonly sequenceOrderPropertyName = nameof<Xr2VerificationDestinationItem>('SequenceOrder');
  readonly destinationPropertyName = nameof<Xr2VerificationDestinationItem>('Destination');
  readonly verificationPropertyName = nameof<Xr2VerificationDestinationItem>('CompleteVerifications');
  readonly exceptionsPropertyName = nameof<Xr2VerificationDestinationItem>('CompleteExceptions');
  readonly requiredPropertyName = nameof<Xr2VerificationDestinationItem>('RequiredVerifications');
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

  onGridRowClick(clickedVerificationDestinationItem: Xr2VerificationDestinationItem) {
    this.gridRowClickEvent.emit(clickedVerificationDestinationItem.DestinationId);
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.verificationDestinationItems = this.sort(this.verificationDestinationItems, event.SortDirection);
  }

  sort(xr2VerificationDestinationItems: Xr2VerificationDestinationItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): Xr2VerificationDestinationItem[] {
    return _.orderBy(xr2VerificationDestinationItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  /* istanbul ignore next */
  trackByItemId(index: number, verificationDestinationItem: any): Guid {
    if (!verificationDestinationItem) {
      return null;
    }

    return verificationDestinationItem.Id;
  }

  private resizeGrid() {
    setTimeout(() => {
      if (this.ocGrid) {
        this.ocGrid.checkTableBodyOverflown();
      }
    }, 250);
  }

}
