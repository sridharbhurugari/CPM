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
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';

@Component({
  selector: 'app-verification-destination-queue',
  templateUrl: './verification-destination-queue.component.html',
  styleUrls: ['./verification-destination-queue.component.scss']
})
export class VerificationDestinationQueueComponent implements OnInit {

  @Output() gridRowClickEvent: EventEmitter<VerificationDestinationItem> = new EventEmitter();
  @Output() sortEvent: EventEmitter<IColHeaderSortChanged> = new EventEmitter();

  @Input()
  set unfilteredVerificationDestinationItems(value: VerificationDestinationItem[]) {
    this._unfilteredVerificationDestinationItems = value;
    this.filteredVerificationDestinationItems = value
    if(this.savedPageConfiguration) {
      this.loadSavedConfigurations();
    }
    this.resizeGrid();
  }
  get unfilteredVerificationDestinationItems(): VerificationDestinationItem[] {
    return this._unfilteredVerificationDestinationItems;
  }

  set filteredVerificationDestinationItems(value: VerificationDestinationItem[]) {
    this._filteredVerificationDestinationItems = value;
    this.resizeGrid();
  }
  get filteredVerificationDestinationItems(): VerificationDestinationItem[] {
    return this._filteredVerificationDestinationItems;
  }

  @Input() searchTextFilter: string;
  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  private  _unfilteredVerificationDestinationItems: VerificationDestinationItem[];
  private _filteredVerificationDestinationItems: VerificationDestinationItem[];

  readonly destinationPropertyName = nameof<VerificationDestinationItem>('DestinationLine1');
  readonly requiredVerificationPropertyName = nameof<VerificationDestinationItem>('CompleteRequiredVerifications');
  firstTime = true;

  currentSortPropertyName: string;
  _searchTextFilter;
  searchFields = [nameof<VerificationDestinationItem>('DestinationLine1'), nameof<VerificationDestinationItem>('DestinationLine2')];
  destinationTypes: typeof DestinationTypes = DestinationTypes;
  columnSortDirection: string;

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
    this.columnSortDirection = event.SortDirection;
    this.filteredVerificationDestinationItems = this.sort(this.filteredVerificationDestinationItems, event.SortDirection);
    this.sortEvent.emit(event);
  }

  sort(verificationDestinationItems: VerificationDestinationItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): VerificationDestinationItem[] {
    return _.orderBy(verificationDestinationItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  private loadSavedConfigurations() {
    if (!this.savedPageConfiguration) {
      return;
    }

    if (this.savedPageConfiguration.colHeaderSortDestination) {
      this.columnSelected(this.savedPageConfiguration.colHeaderSortDestination);
      this.columnSortDirection = this.savedPageConfiguration.colHeaderSortDestination.SortDirection;
    }
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
