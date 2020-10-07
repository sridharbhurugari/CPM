import { Component, Input, ViewChild, OnInit, OnDestroy, ElementRef, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { nameof } from '../../shared/functions/nameof';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { PopupDialogProperties, PopupDialogType, PopupDialogService,
  SingleselectRowItem, OcSingleselectDropdownComponent } from '@omnicell/webcorecomponents';
import { GlobalDispenseSyncRequest } from '../../api-xr2/data-contracts/global-dispense-sync-request';
import { RobotPrintRequest } from '../../api-xr2/data-contracts/robot-print-request';
import { PickListLineDetail } from '../../api-xr2/data-contracts/pick-list-line-detail';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { TranslateService } from '@ngx-translate/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WindowService } from '../../shared/services/window-service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
import { IRemovePicklistQueueItemMessage } from '../../api-xr2/events/i-remove-picklist-queue-item-message';
import { IAddOrUpdatePicklistQueueItemMesssage } from '../../api-xr2/events/i-add-or-update-picklist-queue-item-message';
import { CheckboxValues } from '../../shared/constants/checkbox-values';
import { PriorityCodeTypes } from '../../shared/constants/priority-code-types';
import { SelectControlValueAccessor } from '@angular/forms';
@Component({
  selector: 'app-xr2-details-queue',
  templateUrl: './xr2-details-queue.component.html',
  styleUrls: ['./xr2-details-queue.component.scss']
})
export class Xr2DetailsQueueComponent implements OnInit, OnDestroy {

  @Output() failedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() rerouteEvent: EventEmitter<any> = new EventEmitter<any>();

  private _picklistQueueItems: PicklistQueueItem[];

  readonly sequenceOrderPropertyName = nameof<PicklistQueueItem>('SequenceOrder');
  readonly destinationPropertyName = nameof<PicklistQueueItem>('Destination');
  readonly itemPropertyName = nameof<PicklistQueueItem>('ItemCount');
  readonly deviceDescriptionPropertyName = nameof<PicklistQueueItem>('DeviceDescription');
  firstTime = true;
  checkboxToggleAll: string = CheckboxValues.ToggleAll;
  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;
  _searchTextFilter;

  translatables = [
    'RELEASE',
    'PRINT',
    'REPRINT',
    'PATIENT',
    'PATIENTS',
    'ITEM',
    'ITEMS'
  ];
  translations$: Observable<any>;

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
  searchFields = [nameof<PicklistQueueItem>('Destination'), nameof<PicklistQueueItem>('PriorityCodeDescription'),
    , nameof<PicklistQueueItem>('DeviceDescription')];

  @ViewChild('outputDeviceSingleSelect', { static: true })
  outputDeviceSingleSelect: OcSingleselectDropdownComponent;


  constructor(
    private windowService: WindowService,
    private picklistsQueueService: PicklistsQueueService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private location: Location,
    private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
    private wpfActionController: WpfActionControllerService) {
      this.configureEventHandlers();
  }

  ngOnInit(): void {
    this.setTranslations();
  }

  ngOnDestroy(): void {
  }


  back() {
    this.wpfActionController.ExecuteContinueAction();
  }

  onRerouteClick(picklistQueueItem: PicklistQueueItem) {
    const selectedItems = this.getSelectedPicklistQueueItems();

    if (selectedItems.length > 0) {
      // TODO: Reroute multiple items at once
    } else {
      this.reroute(picklistQueueItem);
    }
  }

  onReleaseClick(picklistQueueItem: PicklistQueueItem) {
    this.release(picklistQueueItem);
  }

  onPrintClick(picklistQueueItem: PicklistQueueItem) {
    this.printLabels(picklistQueueItem);
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
      this.translations$.subscribe(r => {
        label = picklistQueueItem.PriorityCode === PriorityCodeTypes.Patient ?  r['PATIENTS'] : r['ITEMS'];
      });
    } else {
      this.translations$.subscribe(r => {
        label = picklistQueueItem.PriorityCode === PriorityCodeTypes.Patient ?  r['PATIENT'] : r['ITEM'];
      });
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
    let text = '';
    this.translations$.subscribe(r => {
      text = r['RELEASE'];
     });

    return {
      disabled : picklistQueueItem.Saving ||  !this.getSelectedOutputDeviceRow(picklistQueueItem),
      text
    };
  }

  getPrintButtonProperties(picklistQueueItem: PicklistQueueItem) {
    let printTranslated = '';
    let reprintTranslated = '';
    let text = '';

    this.translations$.subscribe(r => {
      printTranslated = r['PRINT'];
      reprintTranslated = r['REPRINT'];
     });

    if (picklistQueueItem.Status === 2 || picklistQueueItem.Status === 3) {
      text = printTranslated;
    } else if (picklistQueueItem.Status === 4) {
      text = picklistQueueItem.IsPrintable ? reprintTranslated : printTranslated;
    }
    return {
      disabled: !picklistQueueItem.IsPrintable || picklistQueueItem.Saving,
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

  onBackClick() {
    this.location.back();
  }

  getSelectedPicklistQueueItems() {
    return this._picklistQueueItems.filter((item) => item.isSelected);
  }

  onSelectAllCheckBox(boxState: any) {
    this.picklistQueueItems.map((item) => item.isSelected = boxState.selectedState);
  }

  onSelectItemCheckBox(boxState: any, picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.isSelected = boxState.selectedState;
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
      return x.OrderId === xr2OrderGroupKey.OrderId && x.OrderGroupDestinationId === xr2OrderGroupKey.OrderGroupDestinationId &&
      x.DeviceLocationId === xr2OrderGroupKey.DeviceLocationId && x.RobotPickGroupId == xr2OrderGroupKey.RobotPickGroupId;
    });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }


  private release(picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.Saving = true;
    const globalDispenseSyncRequest = new GlobalDispenseSyncRequest();
    globalDispenseSyncRequest.PickListIdentifier = picklistQueueItem.PicklistId;
    globalDispenseSyncRequest.DestinationType = picklistQueueItem.DestinationType;
    globalDispenseSyncRequest.OutputDeviceId = picklistQueueItem.OutputDeviceId;
    _.forEach(picklistQueueItem.ItemPicklistLines, (itemPicklistLine) => {
      const pickListLineDetail = new PickListLineDetail();
      pickListLineDetail.PickListLineIdentifier = itemPicklistLine.PicklistLineId;
      pickListLineDetail.DestinationId = itemPicklistLine.DestinationId;
      pickListLineDetail.ItemId = itemPicklistLine.ItemId;
      pickListLineDetail.Quantity = itemPicklistLine.Qty;
      pickListLineDetail.PickLocationDeviceLocationId = itemPicklistLine.PickLocationDeviceLocationId;
      globalDispenseSyncRequest.PickListLineDetails.push(pickListLineDetail);
    });
    this.picklistsQueueService.sendToRobot(picklistQueueItem.DeviceId, globalDispenseSyncRequest).subscribe(
      result => {
        picklistQueueItem.Saving = false;
      }, result => {
        picklistQueueItem.Saving = false;
        this.failedEvent.emit();
      });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  private reroute(picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.Saving = true;
    const globalDispenseSyncRequest = new GlobalDispenseSyncRequest();
    globalDispenseSyncRequest.PickListIdentifier = picklistQueueItem.PicklistId;
    globalDispenseSyncRequest.DestinationType = picklistQueueItem.DestinationType;
    globalDispenseSyncRequest.OutputDeviceId = picklistQueueItem.OutputDeviceId;
    _.forEach(picklistQueueItem.ItemPicklistLines, (itemPicklistLine) => {
      const pickListLineDetail = new PickListLineDetail();
      pickListLineDetail.PickListLineIdentifier = itemPicklistLine.PicklistLineId;
      pickListLineDetail.DestinationId = itemPicklistLine.DestinationId;
      pickListLineDetail.ItemId = itemPicklistLine.ItemId;
      pickListLineDetail.Quantity = itemPicklistLine.Qty;
      pickListLineDetail.PickLocationDeviceLocationId = itemPicklistLine.PickLocationDeviceLocationId;
      globalDispenseSyncRequest.PickListLineDetails.push(pickListLineDetail);
    });
    this.picklistsQueueService.skip(picklistQueueItem.DeviceId, globalDispenseSyncRequest).subscribe(
      result => {
        picklistQueueItem.Saving = false;
      }, result => {
        picklistQueueItem.Saving = false;
        this.failedEvent.emit();
      });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  private printLabels(picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.Saving = true;
    const robotPrintRequest = new RobotPrintRequest(picklistQueueItem.PicklistId, picklistQueueItem.RobotPickGroupId);
    _.forEach(picklistQueueItem.ItemPicklistLines, (itemPicklistLine) => {
      const pickListLineDetail = new PickListLineDetail();
      pickListLineDetail.PickListLineIdentifier = itemPicklistLine.PicklistLineId;
      pickListLineDetail.ItemId = itemPicklistLine.ItemId;
      pickListLineDetail.Quantity = itemPicklistLine.Qty;
      pickListLineDetail.DestinationType = picklistQueueItem.DestinationType;
      pickListLineDetail.PickLocationDeviceLocationId = itemPicklistLine.PickLocationDeviceLocationId;
      pickListLineDetail.PickLocationDescription = itemPicklistLine.PickLocationDescription;
      robotPrintRequest.PickListLineDetails.push(pickListLineDetail);
    });
    this.picklistsQueueService.printLabels(picklistQueueItem.DeviceId, robotPrintRequest).subscribe(
      result => {
        picklistQueueItem.Saving = false;
      }, result => {
        picklistQueueItem.Saving = false;
        this.failedEvent.emit();
      });
  }


  private resyncPickListQueueItem(picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.TrackById = Guid.create();
  }
}
