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

@Component({
  selector: 'app-verification-order-queue',
  templateUrl: './verification-order-queue.component.html',
  styleUrls: ['./verification-order-queue.component.scss']
})
export class VerificationOrderQueueComponent implements OnInit {

  @Output() gridRowClickEvent: EventEmitter<VerificationOrderItem> = new EventEmitter();
  @Output() sortEvent: EventEmitter<IColHeaderSortChanged> = new EventEmitter();

  @Input() savedPageConfiguration: IVerificationPageConfiguration;
  @Input() searchTextFilter;

  @Input()
  set verificationOrderItems(value: VerificationOrderItem[]) {
    this._verficationOrderItems = value;
    if(this.savedPageConfiguration) {
      this.loadSavedConfigurations();
    }
    this.resizeGrid();
  }
  get verificationOrderItems(): VerificationOrderItem[] {
    return this._verficationOrderItems;
  }


  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;

  private  _verficationOrderItems: VerificationOrderItem[];;

  readonly sequenceOrderPropertyName = nameof<VerificationOrderItem>('SequenceOrder');
  readonly typePropertyName = nameof<VerificationOrderItem>('PriorityCodeDescription');
  readonly orderIdPropertyName = nameof<VerificationOrderItem>('OrderId');
  readonly completePropertyName = nameof<VerificationOrderItem>('CompleteVerificationPercentage');
  readonly requiredPropertyName = nameof<VerificationOrderItem>('RequiredVerificationPercentage');
  readonly exceptionsPropertyName = nameof<VerificationOrderItem>('CompleteExceptions');
  readonly datePropertyName = nameof<VerificationOrderItem>('FillDate');

  filteredVerificationOrderItems: VerificationOrderItem[];
  firstTime = true;
  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;
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
    this.verificationOrderItems = this.sort(this.verificationOrderItems, event.SortDirection);
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
    const orderDate = new Date(verificationOrderItem.FillDate).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
   }

  private loadSavedConfigurations() {
    if (!this.savedPageConfiguration) {
      return;
    }
    const colHeaderSort = this.savedPageConfiguration.colHeaderSort;
    this.savedPageConfiguration = null;

    if (colHeaderSort) {
      this.columnSelected(colHeaderSort);
    }
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
