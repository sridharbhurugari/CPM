import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GridComponent } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { Observable } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { nameof } from '../../shared/functions/nameof';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { VerificationOrderItem } from '../../shared/model/verification-order-item';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-verification-order-queue',
  templateUrl: './verification-order-queue.component.html',
  styleUrls: ['./verification-order-queue.component.scss']
})
export class VerificationOrderQueueComponent implements OnInit {

  @Output() gridRowClickEvent: EventEmitter<VerificationOrderItem> = new EventEmitter();
  @Output() sortEvent: EventEmitter<IColHeaderSortChanged> = new EventEmitter();

  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  @Input()
  set searchTextFilter(value: string) {
    this._searchTextFilter = value;
    if(this.unfilteredVerificationOrderItems) {
      this.filteredVerificationOrderItems = this.filterBySearchText(value, this.unfilteredVerificationOrderItems);
    }
  }
  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  @Input()
  set unfilteredVerificationOrderItems(value: VerificationOrderItem[]) {
    this._unfilteredVerficationOrderItems = value;
    this.filteredVerificationOrderItems = value
    if(this.savedPageConfiguration) {
      this.loadSavedConfigurations();
    }
    this.resizeGrid();
  }
  get unfilteredVerificationOrderItems(): VerificationOrderItem[] {
    return this._unfilteredVerficationOrderItems;
  }

  set filteredVerificationOrderItems(value: VerificationOrderItem[]) {
    this._filteredVerificationOrderItems = value;
    this.resizeGrid();
  }
  get filteredVerificationOrderItems(): VerificationOrderItem[] {
    return this._filteredVerificationOrderItems;
  }


  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  private  _unfilteredVerficationOrderItems: VerificationOrderItem[];
  private  _filteredVerificationOrderItems: VerificationOrderItem[];
  private _searchTextFilter: string;


  readonly sequenceOrderPropertyName = nameof<VerificationOrderItem>('SequenceOrder');
  readonly typePropertyName = nameof<VerificationOrderItem>('PriorityCodeDescription');
  readonly devicePropertyName = nameof<VerificationOrderItem>('DeviceDescription');
  readonly completePropertyName = nameof<VerificationOrderItem>('CompleteVerificationPercentage');
  readonly requiredPropertyName = nameof<VerificationOrderItem>('RequiredVerificationPercentage');
  readonly datePropertyName = nameof<VerificationOrderItem>('FillDate');

  searchPipe: SearchPipe = new SearchPipe();
  firstTime = true;
  currentSortPropertyName: string;
  columnSortDirection: SortDirection;
  searchFields = [nameof<VerificationOrderItem>('PriorityCodeDescription'), nameof<VerificationOrderItem>('OrderId')];
  translatables = [];
  translations$: Observable<any>;


  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  onGridRowClick(clickedVerificationOrderItem: VerificationOrderItem) {
    this.gridRowClickEvent.emit(clickedVerificationOrderItem);
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.columnSortDirection = event.SortDirection;
    this.filteredVerificationOrderItems = this.sort(this.filteredVerificationOrderItems, event.SortDirection);
    this.sortEvent.emit(event);
  }

  sort(verificationOrderItems: VerificationOrderItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): VerificationOrderItem[] {
    return _.orderBy(verificationOrderItems, x => x[this.currentSortPropertyName], sortDirection);
  }


  getOrderDate(verificationOrderItem: VerificationOrderItem): string {
    const orderDate = new Date(verificationOrderItem.FillDate).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
  }

  /* istanbul ignore next */
  trackByItemId(index: number, verificationOrderItem: VerificationOrderItem): Guid {
    if (!verificationOrderItem) {
      return null;
    }

    return verificationOrderItem.Id;
  }

  private loadSavedConfigurations() {
    if (!this.savedPageConfiguration) {
      return;
    }

    if (this.savedPageConfiguration.colHeaderSortOrder) {
      this.columnSelected(this.savedPageConfiguration.colHeaderSortOrder);
      this.columnSortDirection = this.savedPageConfiguration.colHeaderSortOrder.SortDirection;
    }

    if (this.savedPageConfiguration.searchTextFilterOrder) {
      this.searchTextFilter = this.savedPageConfiguration.searchTextFilterOrder;
    }
  }

   /* istanbul ignore next */
   private filterBySearchText(text: string, unfilteredArray: VerificationOrderItem[]) {
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
