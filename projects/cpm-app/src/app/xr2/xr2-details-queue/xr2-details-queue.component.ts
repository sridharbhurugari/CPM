import { Component, Input, ViewChild, OnInit, OnDestroy, ElementRef, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { nameof } from '../../shared/functions/nameof';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { SingleselectRowItem, OcSingleselectDropdownComponent } from '@omnicell/webcorecomponents';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { TranslateService } from '@ngx-translate/core';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WindowService } from '../../shared/services/window-service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
import { IRemovePicklistQueueItemMessage } from '../../api-xr2/events/i-remove-picklist-queue-item-message';
import { IAddOrUpdatePicklistQueueItemMesssage } from '../../api-xr2/events/i-add-or-update-picklist-queue-item-message';
import { CheckboxValues } from '../../shared/constants/checkbox-values';
import { DestinationTypes } from '../../shared/constants/destination-types';
import { OutputDeviceTypeId } from '../../shared/constants/output-device-type-id';
import { IGridSelectionChanged } from '../../shared/events/i-grid-selection-changed';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';


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
  @Output() selectionChangedEvent: EventEmitter<IGridSelectionChanged<PicklistQueueItem>> = new EventEmitter();
  @Output() itemUpdatedEvent: EventEmitter<PicklistQueueItem> = new EventEmitter();
  @Output() itemRemovedEvent: EventEmitter<PicklistQueueItem> = new EventEmitter();

  private _picklistQueueItems: PicklistQueueItem[];
  private updateMultiSelectMode$: Subscription;
  private updateSelectedItems$: Subscription;

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

  @Input() updateMultiSelectModeEvent: Observable<any>;

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

  @ViewChild('checkBox', {static: false}) checkBox: ElementRef;

  @ViewChild('searchBox', {
    static: true
  })

  searchElement: SearchBoxComponent;
  searchFields = [nameof<PicklistQueueItem>('Destination'), nameof<PicklistQueueItem>('OrderId'),
    , nameof<PicklistQueueItem>('DeviceDescription')];

  @ViewChild('outputDeviceSingleSelect', { static: true })
  outputDeviceSingleSelect: OcSingleselectDropdownComponent;


  constructor(
    private windowService: WindowService,
    private translateService: TranslateService,
    private location: Location,
    private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
    private wpfActionController: WpfActionControllerService) {
      this.configureEventHandlers();
  }

  ngOnInit(): void {
    this.setTranslations();
    this.selectedItems = new Set<PicklistQueueItem>();
    this.updateMultiSelectMode$ = this.updateMultiSelectModeEvent
      .subscribe(message => this.onMultiSelectModeUpdate(message));
  }

  ngOnDestroy(): void {
    this.updateMultiSelectMode$.unsubscribe();
  }


  back() {
    this.wpfActionController.ExecuteContinueAction();
  }

  onRerouteClick(picklistQueueItem: PicklistQueueItem) {
    this.rerouteEvent.emit([picklistQueueItem]);
  }

  onReleaseClick(picklistQueueItem: PicklistQueueItem) {
    this.releaseEvent.emit([picklistQueueItem]);
  }

  onPrintClick(picklistQueueItem: PicklistQueueItem) {
    this.printEvent.emit([picklistQueueItem]);
  }

  /* istanbul ignore next */
  trackByPickListQueueItemId(index: number, picklistQueueItem: PicklistQueueItem) {
    if (!picklistQueueItem) {
      return null;
    }
    return picklistQueueItem.TrackById;
  }

  getItemPriorityLabel(picklistQueueItem: PicklistQueueItem) {
    let label = '';

    if (picklistQueueItem.ItemCount > 1) {
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
      disabled : picklistQueueItem.Saving ||  !this.getSelectedOutputDeviceRow(picklistQueueItem),
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
      disabled: picklistQueueItem.Status <= 2 || !picklistQueueItem.IsPrintable || picklistQueueItem.Saving,
      text
    };
  }

  getSelectedOutputDeviceRow(picklistQueueItem: PicklistQueueItem) {
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

  getOrderSplitDataString(picklistQueueItem: PicklistQueueItem) {
    let dataString = '';
    let translatedLabel = '';
    this.translateService.get('OF').subscribe((res: string) => {
      translatedLabel = res;
    });

    dataString = `${picklistQueueItem.FilledBoxCount} ${translatedLabel} ${picklistQueueItem.BoxCount}`;

    return dataString;
  }

  getOrderSplitDataLabel(picklistQueueItem: PicklistQueueItem) {
    let label = '';
    if (picklistQueueItem.OutputDeviceId === OutputDeviceTypeId.AutoPackagerCPM) {
      label = picklistQueueItem.BoxCount > 1 ? this.translationMap.BAGS : this.translationMap.BAG;
    } else {
      label = picklistQueueItem.BoxCount > 1 ? this.translationMap.BINS : this.translationMap.BIN;
    }

    return label;
  }

  onBackClick() {
    this.location.back();
  }

  onSelectAllCheckBox(boxState: any) {
    if (boxState.selectedState) {
      this.picklistQueueItems.map((item) => this.selectedItems.add(item));
    } else {
      this.selectedItems.clear();
    }

    this.selectionChangedEvent.emit({
      changeType: boxState.selectedState ? SelectionChangeType.selected : SelectionChangeType.unselected,
      changedValue: null,
      selectedValues: [...this.selectedItems],
      unselectedValues: []
    });
  }

  onSelectItemCheckBox(boxState: any, picklistQueueItem: PicklistQueueItem) {
    if (boxState.selectedState) {
      this.selectedItems.add(picklistQueueItem);
    } else {
      this.selectedItems.delete(picklistQueueItem);
    }

    this.selectionChangedEvent.emit({
      changeType: boxState.selectedState ? SelectionChangeType.selected : SelectionChangeType.unselected,
      changedValue: picklistQueueItem,
      selectedValues: [...this.selectedItems],
      unselectedValues: []
    });
  }

  isContainedInSelected(picklistQueueItem: PicklistQueueItem) {
    return this.selectedItems.has(picklistQueueItem);
  }

  /* istanbul ignore next */
  onOutputDeviceSelectionChanged($event, picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.OutputDeviceId = $event.value;
  }

  columnSelected(event: IColHeaderSortChanged) {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.picklistQueueItems = this.sort(this.picklistQueueItems, event.SortDirection);
  }

  sort(picklistItems: PicklistQueueItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): PicklistQueueItem[] {
    return _.orderBy(picklistItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }
    this.picklistQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject
      .subscribe(message => this.onAddOrUpdatePicklistQueueItem(message));
    this.picklistQueueEventConnectionService.removePicklistQueueItemSubject
      .subscribe(message => this.onRemovePicklistQueueItem(message));
  }


  private setTranslations() {
    this.translations$ = this.translateService.get(this.translatables);
  }

  private onMultiSelectModeUpdate(state: boolean) {
    if (state === false) {
      this.selectedItems.clear();
    }
  }

  private onAddOrUpdatePicklistQueueItem(addOrUpdatePicklistQueueItemMessage: IAddOrUpdatePicklistQueueItemMesssage): void {
    const picklistQueueItem = PicklistQueueItem.fromNonstandardJson(addOrUpdatePicklistQueueItemMessage.PicklistQueueItem);
    const matchingRobotGroupLine = _.find(this.picklistQueueItems, (x) => {
      return x.RobotPickGroupId != null && x.RobotPickGroupId == picklistQueueItem.RobotPickGroupId;
    });
    const matchingPicklistQueueItem = matchingRobotGroupLine || _.find(this.picklistQueueItems, (x) => {
      return x.RobotPickGroupId === null &&
      x.OrderId === picklistQueueItem.OrderId &&
      x.OrderGroupDestinationId === picklistQueueItem.OrderGroupDestinationId &&
      x.DeviceLocationId === picklistQueueItem.DeviceLocationId;
    });
    if (matchingPicklistQueueItem == null) {
      this.picklistQueueItems.push(picklistQueueItem);
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
      return;
    }
    matchingPicklistQueueItem.ItemCount = picklistQueueItem.ItemCount;
    matchingPicklistQueueItem.Status = picklistQueueItem.Status;
    matchingPicklistQueueItem.FilledBoxCount = picklistQueueItem.FilledBoxCount;
    matchingPicklistQueueItem.BoxCount = picklistQueueItem.BoxCount;
    matchingPicklistQueueItem.ItemPicklistLines = picklistQueueItem.ItemPicklistLines;
    matchingPicklistQueueItem.IsPrintable = picklistQueueItem.IsPrintable;
    matchingPicklistQueueItem.RobotPickGroupId = picklistQueueItem.RobotPickGroupId;
    this.resyncPickListQueueItem(picklistQueueItem);
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  private onRemovePicklistQueueItem(addOrUpdatePicklistQueueItemMessage: IRemovePicklistQueueItemMessage): void {
    const xr2OrderGroupKey = addOrUpdatePicklistQueueItemMessage.Xr2OrderGroupKey;

    _.remove(this.picklistQueueItems, (x) => {
      return x.OrderId === xr2OrderGroupKey.OrderId &&
      x.OrderGroupDestinationId === xr2OrderGroupKey.OrderGroupDestinationId &&
      x.DeviceLocationId === xr2OrderGroupKey.DeviceLocationId && x.RobotPickGroupId == xr2OrderGroupKey.RobotPickGroupId;
    });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  private resyncPickListQueueItem(picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.TrackById = Guid.create();
  }
}
