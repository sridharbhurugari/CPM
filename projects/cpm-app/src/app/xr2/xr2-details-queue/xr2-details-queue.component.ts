import { Component, Input, ViewChild, OnInit, OnDestroy, ElementRef, EventEmitter, Output } from '@angular/core';
import { nameof } from '../../shared/functions/nameof';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { SingleselectRowItem, OcSingleselectDropdownComponent } from '@omnicell/webcorecomponents';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { TranslateService } from '@ngx-translate/core';
import { WindowService } from '../../shared/services/window-service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
import { CheckboxValues } from '../../shared/constants/checkbox-values';
import { DestinationTypes } from '../../shared/constants/destination-types';
import { OutputDeviceTypeId } from '../../shared/constants/output-device-type-id';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';


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
  @Output() picklistQueueItemAddorUpdatedEvent: EventEmitter<PicklistQueueItem> = new EventEmitter();
  @Output() picklistQueueItemRemovedEvent: EventEmitter<PicklistQueueItem> = new EventEmitter();

  @Input() multiSelectMode: boolean;

  @Input() clearSelectedItemsEvent: Observable<any>;

  @Input()
  set picklistQueueItems(value: PicklistQueueItem[]) {
    this._picklistQueueItems = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }
  get picklistQueueItems(): PicklistQueueItem[] {
    return this._picklistQueueItems;
  }

  @Input()
  set searchTextFilter(value: string) {
    this._searchTextFilter = value;
  }
  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  private _picklistQueueItems: PicklistQueueItem[];

  selectedItems = new Set<PicklistQueueItem>();

  readonly sequenceOrderPropertyName = nameof<PicklistQueueItem>('SequenceOrder');
  readonly destinationPropertyName = nameof<PicklistQueueItem>('Destination');
  readonly itemPropertyName = nameof<PicklistQueueItem>('ItemCount');
  readonly deviceDescriptionPropertyName = nameof<PicklistQueueItem>('DeviceDescription');
  firstTime = true;
  checkboxToggleAll: string = CheckboxValues.ToggleAll;
  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;
  _searchTextFilter;

  translationMap = {
    RELEASE: 'RELEASE',
    PRINT: 'PRINT',
    REPRINT: 'REPRINT',
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
    'OF'
  ];
  translations$: Observable<any>;
  ngUnsubscribe = new Subject();


  @ViewChild('checkBox', {static: false}) checkBox: ElementRef;

  searchFields = [nameof<PicklistQueueItem>('Destination'), nameof<PicklistQueueItem>('OrderId'),
    , nameof<PicklistQueueItem>('DeviceDescription')];

  @ViewChild('outputDeviceSingleSelect', { static: true })
  outputDeviceSingleSelect: OcSingleselectDropdownComponent;


  constructor(
    private windowService: WindowService,
    private translateService: TranslateService
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
  trackByPickListQueueItemId(index: number, picklistQueueItem: PicklistQueueItem): Guid {
    if (!picklistQueueItem) {
      return null;
    }
    return picklistQueueItem.TrackById;
  }

  getItemPriorityLabel(picklistQueueItem: PicklistQueueItem): string {
    let label = '';

    if (picklistQueueItem.PatientCount > 1) {
      label = picklistQueueItem.DestinationType === DestinationTypes.Patient ?
        this.translationMap.PATIENTS : this.translationMap.ITEMS;
    } else {
      label = picklistQueueItem.DestinationType === DestinationTypes.Patient ?
        this.translationMap.PATIENT : this.translationMap.ITEM;
    }

    return label;
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
    this.translateService.get('OF').subscribe((res: string) => {
      translatedLabel = res;
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

  onSelectAllCheckBox(boxState: any): void {
    if (boxState.selectedState) {
      this.picklistQueueItems.map((item) => this.selectedItems.add(item));
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
    this.picklistQueueItems = this.sort(this.picklistQueueItems, event.SortDirection);
  }

  sort(picklistItems: PicklistQueueItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): PicklistQueueItem[] {
    return _.orderBy(picklistItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  addOrUpdatePicklistQueueItem(messagedPicklistQueueItem: IPicklistQueueItem) {
    console.log('addOrUpdatePickListQueueItem');
    console.log(messagedPicklistQueueItem);
    let matchingPicklistQueueItemIndex = _.findIndex(this.picklistQueueItems, (x) => {
      return x.RobotPickGroupId != null && x.RobotPickGroupId === messagedPicklistQueueItem.RobotPickGroupId;
    });

    if (matchingPicklistQueueItemIndex < 0) {
      matchingPicklistQueueItemIndex =  _.findIndex(this.picklistQueueItems, (x) => {
        return x.RobotPickGroupId === null &&
        x.OrderId === messagedPicklistQueueItem.OrderId &&
        x.OrderGroupDestinationId === messagedPicklistQueueItem.OrderGroupDestinationId &&
        x.DeviceLocationId === messagedPicklistQueueItem.DeviceLocationId;
      });
    }

    console.log(matchingPicklistQueueItemIndex);

    if ((matchingPicklistQueueItemIndex < 0)) {
      console.log('PicklistItem Not Found. Adding Entry');
      this.picklistQueueItems.push(new PicklistQueueItem(messagedPicklistQueueItem));
      return;
    }

    this.picklistQueueItems[matchingPicklistQueueItemIndex].ItemCount =  messagedPicklistQueueItem.ItemCount;
    this.picklistQueueItems[matchingPicklistQueueItemIndex].Status =  messagedPicklistQueueItem.Status;
    this.picklistQueueItems[matchingPicklistQueueItemIndex].FilledBoxCount =  messagedPicklistQueueItem.FilledBoxCount;
    this.picklistQueueItems[matchingPicklistQueueItemIndex].BoxCount =  messagedPicklistQueueItem.BoxCount;
    this.picklistQueueItems[matchingPicklistQueueItemIndex].ItemPicklistLines =  messagedPicklistQueueItem.ItemPicklistLines;
    this.picklistQueueItems[matchingPicklistQueueItemIndex].IsPrintable =  messagedPicklistQueueItem.IsPrintable;
    this.picklistQueueItems[matchingPicklistQueueItemIndex].RobotPickGroupId =  messagedPicklistQueueItem.RobotPickGroupId;
  }

  removePicklistQueueItem(messagedPicklistQueueItem: IPicklistQueueItem) {
    console.log('looking to remove xr2 item with order id:' + messagedPicklistQueueItem.OrderId +
    'device ID:' + messagedPicklistQueueItem.DeviceId + 'priority code: ' + messagedPicklistQueueItem.PriorityCode +
    'OrderGroupDestinationId' + messagedPicklistQueueItem.OrderGroupDestinationId +
    'DeviceLocationId' + messagedPicklistQueueItem.DeviceLocationId,
    'RobotPickGroupId' + messagedPicklistQueueItem.RobotPickGroupId
    );

    const matchingItemIndex = _.findIndex(this.picklistQueueItems, (x) => {
      return x.OrderId === messagedPicklistQueueItem.OrderId &&
      x.OrderGroupDestinationId === messagedPicklistQueueItem.OrderGroupDestinationId &&
      x.DeviceLocationId === messagedPicklistQueueItem.DeviceLocationId &&
      x.RobotPickGroupId === messagedPicklistQueueItem.RobotPickGroupId &&
      x.DeviceId === messagedPicklistQueueItem.DeviceId && x.PriorityCode === messagedPicklistQueueItem.PriorityCode;
    });

    if (matchingItemIndex > -1) {
      console.log('group exists removing it');
      this.picklistQueueItems.splice(matchingItemIndex, 1);
      console.log(this.picklistQueueItems);
    }
  }

  refreshDataOnScreen(picklistQueueItemList: IPicklistQueueItem[]) {
    console.log('refreshDataOnScreen');
    console.log('Current List');
    console.log(this.picklistQueueItems);
    console.log('New List for screen');
    console.log(picklistQueueItemList);
    if (!picklistQueueItemList) {
        console.log('No item in list clearing');
        this.picklistQueueItems = [];
        console.log(this.picklistQueueItems);
    } else {
        // Remove Items not in source list.
        for (let i = this.picklistQueueItems.length - 1; i >= 0; i--) {
          this.removePicklistQueueItem(this.picklistQueueItems[i]);
        }

        console.log('Removed Non matching Items.');
        console.log(this.picklistQueueItems);

        // Add or Update
        picklistQueueItemList.forEach((x) => {
            this.addOrUpdatePicklistQueueItem(x);
        });
    }
  }

  getOrderDate(picklistQueueItem: PicklistQueueItem): string {
    const orderDate = new Date(picklistQueueItem.OrderDate).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
   }

  private clearSelectedItems(): void {
    this.selectedItems.clear();
  }

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
  }
}
