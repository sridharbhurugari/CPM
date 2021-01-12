import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  @Input()
  set searchTextFilter(value: string) {
    this._searchTextFilter = value;
    this.filteredVerificationOrderItems = this.filterBySearchText(value, this.unfilteredVerificationOrderItems);
  }

  @Input()
  set unfilteredVerificationOrderItems(value: VerificationOrderItem[]) {
    this._verficationOrderItems = value;
    this.filteredVerificationOrderItems = value;
    this.resizeGrid();
  }
  get unfilteredVerificationOrderItems(): VerificationOrderItem[] {
    return this._verficationOrderItems;
  }

  @Input()
  set savedPageConfiguration(value: IVerificationPageConfiguration) {
    this._savedPageConfiguration = value;
    if(this.savedPageConfiguration) {
      this.loadSavedConfigurations();
    }
  }
  get savedPageConfiguration(): IVerificationPageConfiguration {
    return this._savedPageConfiguration;
  }

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  private  _verficationOrderItems: VerificationOrderItem[];
  private _savedPageConfiguration: IVerificationPageConfiguration;

  readonly sequenceOrderPropertyName = nameof<VerificationOrderItem>('SequenceOrder');
  readonly typePropertyName = nameof<VerificationOrderItem>('PriorityCodeDescription');
  readonly orderIdPropertyName = nameof<VerificationOrderItem>('OrderId');
  readonly completePropertyName = nameof<VerificationOrderItem>('CompleteVerificationPercentage');
  readonly requiredPropertyName = nameof<VerificationOrderItem>('RequiredVerificationPercentage');
  readonly exceptionsPropertyName = nameof<VerificationOrderItem>('CompleteExceptions');
  readonly datePropertyName = nameof<VerificationOrderItem>('Date');

  filteredVerificationOrderItems: VerificationOrderItem[];
  firstTime = true;
  searchPipe: SearchPipe = new SearchPipe();
  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;
  _searchTextFilter;
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
    this.sortOrder = event.SortDirection;
    this.unfilteredVerificationOrderItems = this.sort(this.unfilteredVerificationOrderItems, event.SortDirection);
    this.sortEvent.emit(event);
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

  getOrderDate(verificationOrderItem: VerificationOrderItem): string {
    const orderDate = new Date(verificationOrderItem.Date).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
   }

  private loadSavedConfigurations() {
    if (!this.savedPageConfiguration) {
      return;
    }

    if(this.savedPageConfiguration.searchTextFilter) {
      this.filteredVerificationOrderItems = this.filterBySearchText(this.savedPageConfiguration.searchTextFilter, this.unfilteredVerificationOrderItems)
    }

    if (this.savedPageConfiguration.colHeaderSort) {
      this.columnSelected(this.savedPageConfiguration.colHeaderSort);
    }
  }

  private filterBySearchText(text: string, unfilteredArray: any[]) {
    if(text === undefined || !unfilteredArray) return;
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
