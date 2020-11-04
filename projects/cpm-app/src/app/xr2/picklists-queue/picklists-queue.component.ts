import { Component, Input, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { nameof } from '../../shared/functions/nameof';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Guid } from 'guid-typescript';
import * as _ from 'lodash';
import { PopupDialogProperties, PopupDialogType, PopupDialogService, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { ActivatedRoute } from '@angular/router';
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
import { ReroutePickListLine } from '../../api-xr2/data-contracts/reroute-pick-list-line';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SortDirection } from '../../shared/constants/sort-direction';
import { Many } from 'lodash';
import { IRemovePicklistQueueItemMessage } from '../../api-xr2/events/i-remove-picklist-queue-item-message';
import { IAddOrUpdatePicklistQueueItemMesssage } from '../../api-xr2/events/i-add-or-update-picklist-queue-item-message';

@Component({
  selector: 'app-picklists-queue',
  templateUrl: './picklists-queue.component.html',
  styleUrls: ['./picklists-queue.component.scss']
})
export class PicklistsQueueComponent implements AfterViewInit, OnDestroy {
  readonly sequenceOrderPropertyName = nameof<PicklistQueueItem>('SequenceOrder');
  readonly destinationPropertyName = nameof<PicklistQueueItem>('Destination');
  readonly itemPropertyName = nameof<PicklistQueueItem>('ItemCount');
  readonly deviceDescriptionPropertyName = nameof<PicklistQueueItem>('DeviceDescription');

  firstTime = true;

  currentSortPropertyName: string;
  sortOrder: SortDirection = SortDirection.ascending;

  private _picklistQueueItems: PicklistQueueItem[];

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

  constructor(
    private windowService: WindowService,
    private picklistsQueueService: PicklistsQueueService,
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private actr: ActivatedRoute,
    private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
    private wpfActionController: WpfActionControllerService) {
      this.configureEventHandlers();
    }

  @ViewChild('searchBox', {
    static: true
  })

  searchElement: SearchBoxComponent;

  searchTextFilter: string;

  searchFields = [nameof<PicklistQueueItem>('Destination'), nameof<PicklistQueueItem>('PriorityCodeDescription'),
    , nameof<PicklistQueueItem>('DeviceDescription')];

  ngAfterViewInit(): void {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = data;
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }

  ngOnDestroy(): void {
  }

  back() {
    this.wpfActionController.ExecuteContinueAction();
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

  private onAddOrUpdatePicklistQueueItem(addOrUpdatePicklistQueueItemMessage: IAddOrUpdatePicklistQueueItemMesssage): void {
    try {
      const picklistQueueItem = PicklistQueueItem.fromNonstandardJson(addOrUpdatePicklistQueueItemMessage.PicklistQueueItem);
      const matchingRobotGroupLine = _.find(this.picklistQueueItems, (x) => {
        return x.RobotPickGroupId != null && x.RobotPickGroupId == picklistQueueItem.RobotPickGroupId;
      });
      const matchingPicklistQueueItem = matchingRobotGroupLine || _.find(this.picklistQueueItems, (x) => {
        return x.RobotPickGroupId === null && x.OrderId === picklistQueueItem.OrderId && x.OrderGroupDestinationId === picklistQueueItem.OrderGroupDestinationId &&
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
    } catch (e) {
      console.log('PicklistsQueueComponent.onAddOrUpdatePicklistQueueItem ERROR');
      console.log(e);
    }
  }

  private onRemovePicklistQueueItem(addOrUpdatePicklistQueueItemMessage: IRemovePicklistQueueItemMessage): void {
    try {
      const xr2OrderGroupKey = addOrUpdatePicklistQueueItemMessage.Xr2OrderGroupKey;
      _.remove(this.picklistQueueItems, (x) => {
        return x.OrderId === xr2OrderGroupKey.OrderId && x.OrderGroupDestinationId === xr2OrderGroupKey.OrderGroupDestinationId &&
        x.DeviceLocationId === xr2OrderGroupKey.DeviceLocationId && x.RobotPickGroupId == xr2OrderGroupKey.RobotPickGroupId;
      });
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    } catch (e) {
      console.log('PicklistsQueueComponent.onRemovePicklistQueueItem ERROR');
      console.log(e);
    }
  }

  private resyncPickListQueueItem(picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.TrackById = Guid.create();
  }

  sendToRobot(picklistQueueItem: PicklistQueueItem) {
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
        // force the status to 2 at this point
        picklistQueueItem.Status = 2;
        picklistQueueItem.Saving = false;
      }, result => {
        picklistQueueItem.Saving = false;
        this.displayFailedToSaveDialog();
      });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  skip(picklistQueueItem: PicklistQueueItem) {
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
        this.displayFailedToSaveDialog();
      });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  printLabels(picklistQueueItem: PicklistQueueItem) {
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
        this.displayFailedToSaveDialog();
      });
  }

  /* istanbul ignore next */
  private displayFailedToSaveDialog(): void {

    const properties = new PopupDialogProperties('Role-Status-Warning');
    this.translateService.get('FAILEDTOSAVE_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get('FAILEDTOSAVE_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
    this.translateService.get('OK').subscribe((result) => { properties.primaryButtonText = result; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 60;
    this.dialogService.showOnce(properties);
  }

  /* istanbul ignore next */
  trackByPickListQueueItemId(index: number, picklistQueueItem: PicklistQueueItem) {
    if (!picklistQueueItem) {
      return null;
    }
    return picklistQueueItem.TrackById;
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
    const releaseTranslatable = 'RELEASE';
    let text = '';

    this.translateService.get(releaseTranslatable).subscribe((res: string) => {
      text = res;
    });

    return {
      disabled : picklistQueueItem.Saving ||  !this.getSelectedOutputDeviceRow(picklistQueueItem),
      text
    };
  }

  getPrintButtonProperties(picklistQueueItem: PicklistQueueItem) {
    const printTranslatable = 'PRINT';
    const reprintTranslatable = 'REPRINT';
    let printTranslated = '';
    let reprintTranslated = '';
    let text = '';

    this.translateService.get(printTranslatable).subscribe((res: string) => {
      printTranslated = res;
    });
    this.translateService.get(reprintTranslatable).subscribe((res: string) => {
      reprintTranslated = res;
    });

    if (picklistQueueItem.Status === 2 || picklistQueueItem.Status === 3) {
      text = printTranslated;
    } else if (picklistQueueItem.Status === 4) {
      text = picklistQueueItem.IsPrintable ? reprintTranslated : printTranslated;
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
}
