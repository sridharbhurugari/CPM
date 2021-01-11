import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GridComponent } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { Observable } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';

@Component({
  selector: 'app-verification-destination-queue',
  templateUrl: './verification-destination-queue.component.html',
  styleUrls: ['./verification-destination-queue.component.scss']
})
export class VerificationDestinationQueueComponent implements OnInit {

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
  set verificationDestinationItems(value: VerificationDestinationItem[]) {
    this._verificationDestinationItems = value;
    this.resizeGrid();
  }
  get verificationDestinationItems(): VerificationDestinationItem[] {
    return this._verificationDestinationItems;
  }

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  private  _verificationDestinationItems: VerificationDestinationItem[];

  readonly sequenceOrderPropertyName = nameof<VerificationDestinationItem>('SequenceOrder');
  readonly destinationPropertyName = nameof<VerificationDestinationItem>('Destination');
  readonly verificationPropertyName = nameof<VerificationDestinationItem>('CompleteVerifications');
  readonly exceptionsPropertyName = nameof<VerificationDestinationItem>('CompleteExceptions');
  readonly requiredPropertyName = nameof<VerificationDestinationItem>('RequiredVerifications');
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

  onGridRowClick(clickedVerificationDestinationItem: VerificationDestinationItem) {
    this.gridRowClickEvent.emit(clickedVerificationDestinationItem.DestinationId);
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.verificationDestinationItems = this.sort(this.verificationDestinationItems, event.SortDirection);
  }

  sort(verificationDestinationItems: VerificationDestinationItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): VerificationDestinationItem[] {
    return _.orderBy(verificationDestinationItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  /* istanbul ignore next */
  trackByItemId(index: number, verificationDestinationItem: any): Guid {
    if (!verificationDestinationItem) {
      return null;
    }

    return verificationDestinationItem.Id;
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
