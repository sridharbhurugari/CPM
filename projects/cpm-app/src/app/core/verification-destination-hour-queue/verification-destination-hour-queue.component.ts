import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GridComponent } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { Observable } from 'rxjs';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-verification-destination-hour-queue',
  templateUrl: './verification-destination-hour-queue.component.html',
  styleUrls: ['./verification-destination-hour-queue.component.scss']
})
export class VerificationDestinationHourQueueComponent implements OnInit {

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

  @Input()
  set searchTextFilter(value: string) {
    this._searchTextFilter = value;
    if(this.unfilteredVerificationDestinationItems) {
      this.filteredVerificationDestinationItems = this.filterBySearchText(value, this.unfilteredVerificationDestinationItems);
    }
  }
  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  private  _unfilteredVerificationDestinationItems: VerificationDestinationItem[];
  private _filteredVerificationDestinationItems: VerificationDestinationItem[];
  private  _searchTextFilter: string;

  readonly orderPropertyName = nameof<VerificationDestinationItem>('OrderId');
  readonly destinationPropertyName = nameof<VerificationDestinationItem>('DestinationStringValue');
  readonly outputDevicePropertyName = nameof<VerificationDestinationItem>('CompleteOutputDevice');
  firstTime = true;

  currentSortPropertyName: string;
  searchFields = [nameof<VerificationDestinationItem>('OrderId'), nameof<VerificationDestinationItem>('DestinationStringValue')];
  columnSortDirection: string;
  searchPipe: SearchPipe = new SearchPipe();

  translatables = [];
  translations$: Observable<any>;


  constructor(
    private translateService: TranslateService
  ) { }

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

    if (this.savedPageConfiguration.searchTextFilterDestination) {
      this.searchTextFilter = this.savedPageConfiguration.searchTextFilterDestination;
    }
  }

  transformDateTime(item: VerificationDestinationItem): string {
    const formattedDate = new Date(item.FillDateTime).toLocaleString(this.translateService.getDefaultLang());
    return formattedDate;
  }

  /* istanbul ignore next */
  trackByItemId(index: number, verificationDestinationItem: any): Guid {
    if (!verificationDestinationItem) {
      return null;
    }

    return verificationDestinationItem.Id;
  }

  /* istanbul ignore next */
  private filterBySearchText(text: string, unfilteredArray: VerificationDestinationItem[]) {
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
