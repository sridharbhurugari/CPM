import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GridComponent } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { Observable } from 'rxjs';
import { DestinationTypes } from '../../shared/constants/destination-types';
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

  @Output() gridRowClickEvent: EventEmitter<VerificationDestinationItem> = new EventEmitter();

  @Input()
  set verificationDestinationItems(value: VerificationDestinationItem[]) {
    this._verificationDestinationItems = value;
    this.resizeGrid();
  }
  get verificationDestinationItems(): VerificationDestinationItem[] {
    return this._verificationDestinationItems;
  }

  @Input() searchTextFilter: string;

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  private  _verificationDestinationItems: VerificationDestinationItem[];

  readonly destinationPropertyName = nameof<VerificationDestinationItem>('DestinationLine1');
  readonly requiredVerificationPropertyName = nameof<VerificationDestinationItem>('CompleteRequiredVerifications');
  firstTime = true;

  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;
  _searchTextFilter;
  searchFields = [nameof<VerificationDestinationItem>('DestinationLine1'), nameof<VerificationDestinationItem>('DestinationLine2')];
  destinationTypes: typeof DestinationTypes = DestinationTypes;

  translatables = [];
  translations$: Observable<any>;


  constructor() { }

  ngOnInit() {
  }

  onGridRowClick(clickedVerificationDestinationItem: VerificationDestinationItem) {
    this.gridRowClickEvent.emit(clickedVerificationDestinationItem);
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
