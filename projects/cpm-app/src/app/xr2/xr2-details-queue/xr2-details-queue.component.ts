import { Component, Input, ViewChild, OnInit, OnDestroy, ElementRef, EventEmitter, Output } from '@angular/core';
import { nameof } from '../../shared/functions/nameof';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { SingleselectRowItem, OcSingleselectDropdownComponent, GridComponent } from '@omnicell/webcorecomponents';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { TranslateService } from '@ngx-translate/core';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
import { CheckboxValues } from '../../shared/constants/checkbox-values';
import { DestinationTypes } from '../../shared/constants/destination-types';
import { OutputDeviceTypeId } from '../../shared/constants/output-device-type-id';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { IXr2OrderGroupKey } from '../../api-xr2/events/i-xr2-order-group-key';
import { SearchPipe } from '../../shared/pipes/search.pipe';


@Component({
  selector: 'app-xr2-details-queue',
  templateUrl: './xr2-details-queue.component.html',
  styleUrls: ['./xr2-details-queue.component.scss']
})
export class Xr2DetailsQueueComponent implements OnInit, OnDestroy {

  @Output() failedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() rerouteEvent: EventEmitter<PicklistQueueItem[]> = new EventEmitter();
  @Output() releaseEvent: EventEmitter<PicklistQueueItem[]> = new EventEmitter();
  @Output() printEvent: EventEmitter<PicklistQueueItem[]> = new EventEmitter();
  @Output() selectionChangedEvent: EventEmitter<any> = new EventEmitter();
  @Output() addOrUpdateMultiSelectEvent: EventEmitter<PicklistQueueItem[]> = new EventEmitter();
  @Output() removeMultiSelectEvent: EventEmitter<PicklistQueueItem[]> = new EventEmitter();

  @Input() multiSelectMode: boolean;

  @Input() clearSelectedItemsEvent: Observable<any>;

  @Input()
  set unfilteredPicklistQueueItems(value: PicklistQueueItem[]) {
    this._unfilteredPicklistQueueItems = value;
    this._filteredPicklistQueueItems = value;
  }
  get unfilteredPicklistQueueItems(): PicklistQueueItem[] {
    return this._unfilteredPicklistQueueItems;
  }

  @Input()
  set filteredPicklistQueueItems(value: PicklistQueueItem[]) {
    this._filteredPicklistQueueItems = value;
    this.resizeGrid();
  }
  get filteredPicklistQueueItems(): PicklistQueueItem[] {
    return this._filteredPicklistQueueItems;
  }

  @Input()
  set searchTextFilter(value: string) {
    this._searchTextFilter = value;
    this.applyDetailsQueueFilters();
  }
  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  private _filteredPicklistQueueItems: PicklistQueueItem[];
  private _unfilteredPicklistQueueItems: PicklistQueueItem[];

  selectedItems = new Set<PicklistQueueItem>();

  readonly sequenceOrderPropertyName = nameof<PicklistQueueItem>('SequenceOrder');
  readonly destinationPropertyName = nameof<PicklistQueueItem>('Destination');
  readonly itemPropertyName = nameof<PicklistQueueItem>('ItemCount');
  readonly deviceDescriptionPropertyName = nameof<PicklistQueueItem>('DeviceDescription');
  firstTime = true;
  checkboxToggleAll: string = CheckboxValues.ToggleAll;
  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;
  searchPipe: SearchPipe = new SearchPipe();
  _searchTextFilter;

  translationMap = {
    RELEASE: 'RELEASE',
    PRINT: 'PRINT',
    REPRINT: 'REPRINT',
    REROUTE: 'REROUTE',
    PATIENT: 'PATIENT',
    PATIENTS: 'PATIENTS',
    ITEM: 'ITEM',
    ITEMS: 'ITEMS',
    BIN: 'BIN',
    BINS: 'BINS',
    BAG: 'BAG',
    BAGS: 'BAGS',
  };
  translatables = [
    'OF',
    'NOTRELEASED',
    'PROCESSING',
  ];
  translations$: Observable<any>;
  ngUnsubscribe = new Subject();
  searchFields = [nameof<PicklistQueueItem>('Destination'), nameof<PicklistQueueItem>('OrderId'),
    , nameof<PicklistQueueItem>('DeviceDescription'), nameof<PicklistQueueItem>('RouteName')];

  @ViewChild('ocgrid', { static: false }) ocGrid: GridComponent;
  @ViewChild('checkBox', {static: false}) checkBox: ElementRef;
  @ViewChild('outputDeviceSingleSelect', { static: true })
  outputDeviceSingleSelect: OcSingleselectDropdownComponent;


  constructor(
    private translateService: TranslateService,
    ) {}

  ngOnInit(): void {
    this.setTranslations();
    this.selectedItems = new Set<PicklistQueueItem>();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onRerouteClick(picklistQueueItem: PicklistQueueItem): void {
    this.rerouteEvent.emit([picklistQueueItem]);
  }

  onReleaseClick(picklistQueueItem: PicklistQueueItem): void {
    this.releaseEvent.emit([picklistQueueItem]);
  }

  onPrintClick(picklistQueueItem: PicklistQueueItem): void {
    this.printEvent.emit([picklistQueueItem]);
  }

  /* istanbul ignore next */
  trackByPicklistQueueItemId(index: number, picklistQueueItem: PicklistQueueItem): Guid {
    if (!picklistQueueItem) {
      return null;
    }
    return picklistQueueItem.TrackById;
  }

  getItemPriorityLabel(picklistQueueItem: PicklistQueueItem): string {
    let label = '';

    if (picklistQueueItem.DestinationType === DestinationTypes.Patient) {
      label = picklistQueueItem.PatientCount > 1 ? this.translationMap.PATIENTS : this.translationMap.PATIENT;
    } else {
      label = picklistQueueItem.ItemCount > 1 ? this.translationMap.ITEMS : this.translationMap.ITEM;
    }

    return label;
  }

  getItemCountForDisplay(picklistQueueItem: PicklistQueueItem): number {
    if (picklistQueueItem.DestinationType === DestinationTypes.Patient) {
      return picklistQueueItem.PatientCount;
    }

    return picklistQueueItem.ItemCount;
  }

  getActiveOutputDeviceList(picklistQueueItem: PicklistQueueItem) {
    const outputDeviceDisplayList = [];
    _.forEach(picklistQueueItem.AvailableOutputDeviceList, (outputDevice) => {
      if (outputDevice.IsActive) {
        let translatedLabel = '';
        this.translateService.get(outputDevice.Label).subscribe((res: string) => {
        translatedLabel = res;
      });
        outputDeviceDisplayList.push(new SingleselectRowItem(translatedLabel, outputDevice.DeviceId));
      }
    });
    return outputDeviceDisplayList;
  }

  getReleaseButtonProperties(picklistQueueItem: PicklistQueueItem) {
    return {
      disabled : picklistQueueItem.Saving
      ||  !this.getSelectedOutputDeviceRow(picklistQueueItem)
      || this.multiSelectMode,
      text: this.translationMap.RELEASE
    };
  }

  getPrintButtonProperties(picklistQueueItem: PicklistQueueItem) {
    let text = '';

    if (picklistQueueItem.Status === 2 || picklistQueueItem.Status === 3) {
      text = this.translationMap.PRINT;
    } else if (picklistQueueItem.Status === 4) {
      text = picklistQueueItem.IsPrintable ? this.translationMap.REPRINT : this.translationMap.PRINT;
    }

    return {
      disabled: !picklistQueueItem.Printable || this.multiSelectMode,
      text
    };
  }

  getRerouteButtonProperties(picklistQueueItem: PicklistQueueItem) {
    return {
      disabled: !picklistQueueItem.Reroutable || this.multiSelectMode,
      text: this.translationMap.REROUTE
    };
  }

  getSelectedOutputDeviceRow(picklistQueueItem: PicklistQueueItem): SingleselectRowItem {
    let selectedDevice = null;
    if (picklistQueueItem.Status === 1) {
      selectedDevice = picklistQueueItem.AvailableOutputDeviceList.find(x => x.DeviceId === picklistQueueItem.OutputDeviceId
         && x.IsActive);
        } else {
      selectedDevice = picklistQueueItem.AvailableOutputDeviceList.find(x => x.DeviceId === picklistQueueItem.OutputDeviceId);
    }
    if (!selectedDevice) {
      return null;
    }
    let translatedLabel = '';
    this.translateService.get(selectedDevice.Label).subscribe((res: string) => {
      translatedLabel = res;
    });

    return new SingleselectRowItem(translatedLabel, selectedDevice.DeviceId);
  }

  getOrderSplitDataString(picklistQueueItem: PicklistQueueItem): string {
    let dataString = '';
    let translatedLabel = '';
    this.translations$.subscribe(r => {
      translatedLabel = r.OF;
    });

    dataString = `${picklistQueueItem.FilledBoxCount} ${translatedLabel} ${picklistQueueItem.BoxCount}`;

    return dataString;
  }

  getOrderSplitDataLabel(picklistQueueItem: PicklistQueueItem): string {
    let label = '';
    if (picklistQueueItem.OutputDeviceId === OutputDeviceTypeId.AutoPackagerCPM) {
      label = picklistQueueItem.BoxCount > 1 ? this.translationMap.BAGS : this.translationMap.BAG;
    } else {
      label = picklistQueueItem.BoxCount > 1 ? this.translationMap.BINS : this.translationMap.BIN;
    }

    return label;
  }

  getStatusLabel(picklistQueueItem: PicklistQueueItem): string {
    let label = '';
    if (picklistQueueItem.Status === 1) {
      this.translations$.subscribe(r => {
        label = r.NOTRELEASED;
      });
    } else if (picklistQueueItem.Status === 2) {
      this.translations$.subscribe(r => {
        label = r.PROCESSING;
      });
    }

    return label;
  }

  onSelectAllCheckBox(boxState: any): void {
    if (boxState.selectedState) {
      this.filteredPicklistQueueItems.map((item) => this.selectedItems.add(item));
    } else {
      this.clearSelectedItems();
    }

    this.selectionChangedEvent.emit({
      changeType: boxState.selectedState ? SelectionChangeType.selected : SelectionChangeType.unselected,
      changedValue: null,
      selectedValues: this.selectedItems
    });
  }

  onSelectItemCheckBox(boxState: any, picklistQueueItem: PicklistQueueItem): void {
    if (boxState.selectedState) {
      this.selectedItems.add(picklistQueueItem);
    } else {
      this.selectedItems.delete(picklistQueueItem);
    }

    this.selectionChangedEvent.emit({
      changeType: boxState.selectedState ? SelectionChangeType.selected : SelectionChangeType.unselected,
      changedValue: picklistQueueItem,
      selectedValues: this.selectedItems,
    });
  }

  isContainedInSelected(picklistQueueItem: PicklistQueueItem): boolean {
    return this.selectedItems.has(picklistQueueItem);
  }

  /* istanbul ignore next */
  onOutputDeviceSelectionChanged($event, picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.OutputDeviceId = $event.value;
  }

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.filteredPicklistQueueItems = this.sort(this.filteredPicklistQueueItems, event.SortDirection);
  }

  sort(picklistItems: PicklistQueueItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): PicklistQueueItem[] {
    return _.orderBy(picklistItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  removePicklistQueueItemByOrderGroupKey(xr2OrderGroupKey: IXr2OrderGroupKey): void {

    const matchingItemIndex = _.findIndex(this.unfilteredPicklistQueueItems, (x) => {
      const queueRobotPickGroup = x.RobotPickGroupId  != null ? x.RobotPickGroupId.toString() : null;
      const orderGroupKeyPickGroupId = xr2OrderGroupKey.RobotPickGroupId != null ? xr2OrderGroupKey.RobotPickGroupId.toString() : null;
      return x.OrderId === xr2OrderGroupKey.OrderId &&
      x.OrderGroupDestinationId === xr2OrderGroupKey.OrderGroupDestinationId &&
      x.DeviceLocationId === xr2OrderGroupKey.DeviceLocationId &&
      queueRobotPickGroup === orderGroupKeyPickGroupId;
    });

    this.removePicklistQueueItemAtIndex(matchingItemIndex);
  }

  addOrUpdatePicklistQueueItem(updatedQueueItem: IPicklistQueueItem) {
    let matchingPicklistQueueItemIndex = _.findIndex(this.unfilteredPicklistQueueItems, (x) => {
      return x.RobotPickGroupId != null && x.RobotPickGroupId === updatedQueueItem.RobotPickGroupId;
    });

    if (matchingPicklistQueueItemIndex < 0) {
      matchingPicklistQueueItemIndex =  _.findIndex(this.unfilteredPicklistQueueItems, (x) => {
        return x.RobotPickGroupId === null &&
        x.OrderId === updatedQueueItem.OrderId &&
        x.OrderGroupDestinationId === updatedQueueItem.OrderGroupDestinationId &&
        x.DeviceLocationId === updatedQueueItem.DeviceLocationId;
      });
    }

    if ((matchingPicklistQueueItemIndex < 0)) {
      this.unfilteredPicklistQueueItems.push(new PicklistQueueItem(updatedQueueItem));
      this.applyDetailsQueueFilters();
      return;
    }

    this.unfilteredPicklistQueueItems[matchingPicklistQueueItemIndex].ItemCount =  updatedQueueItem.ItemCount;
    this.unfilteredPicklistQueueItems[matchingPicklistQueueItemIndex].Status =  updatedQueueItem.Status;
    this.unfilteredPicklistQueueItems[matchingPicklistQueueItemIndex].FilledBoxCount =  updatedQueueItem.FilledBoxCount;
    this.unfilteredPicklistQueueItems[matchingPicklistQueueItemIndex].BoxCount =  updatedQueueItem.BoxCount;
    this.unfilteredPicklistQueueItems[matchingPicklistQueueItemIndex].ItemPicklistLines =  updatedQueueItem.ItemPicklistLines;
    this.unfilteredPicklistQueueItems[matchingPicklistQueueItemIndex].IsPrintable =  updatedQueueItem.IsPrintable;
    this.unfilteredPicklistQueueItems[matchingPicklistQueueItemIndex].RobotPickGroupId =  updatedQueueItem.RobotPickGroupId;
    this.applyDetailsQueueFilters();

    if (this.isContainedInSelected(this.unfilteredPicklistQueueItems[matchingPicklistQueueItemIndex])) {
      this.addOrUpdateMultiSelectEvent.emit([this.unfilteredPicklistQueueItems[matchingPicklistQueueItemIndex]]);
    }
  }

  removePicklistQueueItem(removedQueueItem: IPicklistQueueItem) {

    const matchingItemIndex = _.findIndex(this.unfilteredPicklistQueueItems, (x) => {
      return x.OrderId === removedQueueItem.OrderId &&
      x.OrderGroupDestinationId === removedQueueItem.OrderGroupDestinationId &&
      x.DeviceLocationId === removedQueueItem.DeviceLocationId &&
      x.RobotPickGroupId === removedQueueItem.RobotPickGroupId &&
      x.DeviceId === removedQueueItem.DeviceId && x.PriorityCode === removedQueueItem.PriorityCode;
    });

    this.removePicklistQueueItemAtIndex(matchingItemIndex);
  }

  refreshDataOnScreen(updatedItemList: IPicklistQueueItem[]) {
    if (!updatedItemList) {
        this.unfilteredPicklistQueueItems = [];
        this.applyDetailsQueueFilters();
        this.removeMultiSelectEvent.emit(this.unfilteredPicklistQueueItems);
    } else {
        for (let i = this.unfilteredPicklistQueueItems.length - 1; i >= 0; i--) {
          const itemFoundIndex = this.findNonExistingPicklistQueueItemIndex(this.unfilteredPicklistQueueItems[i], updatedItemList);
          if (itemFoundIndex === -1) {
            this.removePicklistQueueItemAtIndex(i);
          }
        }
        updatedItemList.forEach((x) => {
            this.addOrUpdatePicklistQueueItem(x);
        });
    }
  }

  getOrderDate(picklistQueueItem: PicklistQueueItem): string {
    const orderDate = new Date(picklistQueueItem.OrderDate).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
   }

  isEveryItemSelected(items: PicklistQueueItem[]) {
    if (!items || items.length === 0) {
      return false;
    }

    return this.filteredPicklistQueueItems.every((item) => {
      return this.isContainedInSelected(item);
    });
  }

  private applyDetailsQueueFilters() {
    this.filteredPicklistQueueItems = this.filterBySearchText(this.searchTextFilter, this.unfilteredPicklistQueueItems);
  }

  private filterBySearchText(text: string, unfilteredArray: PicklistQueueItem[]) {
    return this.searchPipe.transform(unfilteredArray, text, this.searchFields);
  }

  private findNonExistingPicklistQueueItemIndex(itemToRemove: IPicklistQueueItem, sourceList: IPicklistQueueItem[]) {
    const matchingItemIndex = _.findIndex(sourceList, (x) => {
      return x.OrderId === itemToRemove.OrderId &&
      x.OrderGroupDestinationId === itemToRemove.OrderGroupDestinationId &&
      x.DeviceLocationId === itemToRemove.DeviceLocationId &&
      x.RobotPickGroupId === itemToRemove.RobotPickGroupId &&
      x.DeviceId === itemToRemove.DeviceId && x.PriorityCode === itemToRemove.PriorityCode;
    });

    return matchingItemIndex;
  }

  private removePicklistQueueItemAtIndex(matchingItemIndex: number) {
    if (matchingItemIndex > -1 && matchingItemIndex < this.unfilteredPicklistQueueItems.length) {
      if (this.isContainedInSelected(this.unfilteredPicklistQueueItems[matchingItemIndex])) {
        this.removeMultiSelectEvent.emit([this.unfilteredPicklistQueueItems[matchingItemIndex]]);
      }
      this.unfilteredPicklistQueueItems.splice(matchingItemIndex, 1);
      this.applyDetailsQueueFilters();
    }
  }

  private clearSelectedItems(): void {
    _.forEach(this.filteredPicklistQueueItems, (item) => {
      this.selectedItems.delete(item);
    });
  }

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
  }

  private resizeGrid() {
    setTimeout(() => {
      if (this.ocGrid) {
        this.ocGrid.checkTableBodyOverflown();
      }
    }, 250);
  }
}
