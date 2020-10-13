import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, forkJoin, merge, Subject } from 'rxjs';
import { map, flatMap, shareReplay } from 'rxjs/operators';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import * as _ from 'lodash';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogType, PopupDialogProperties, PopupDialogService } from '@omnicell/webcorecomponents';
import { OutputDeviceAction } from '../../shared/enums/output-device-actions';
import { IGridSelectionChanged } from '../../shared/events/i-grid-selection-changed';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';
import { GlobalDispenseSyncRequest } from '../../api-xr2/data-contracts/global-dispense-sync-request';
import { PickListLineDetail } from '../../api-xr2/data-contracts/pick-list-line-detail';
import { WindowService } from '../../shared/services/window-service';
import { RobotPrintRequest } from '../../api-xr2/data-contracts/robot-print-request';


@Component({
  selector: 'app-xr2-queue-details-queue-page',
  templateUrl: './xr2-queue-details-page.component.html',
  styleUrls: ['./xr2-queue-details-page.component.scss']
})
export class Xr2QueueDetailsPageComponent implements OnInit {

  private _multiSelectMode = false;

  picklistsQueueItems: Observable<IPicklistQueueItem[]>;
  selectedItems: PicklistQueueItem[];
  actionDisableMap: Map<OutputDeviceAction, Set<PicklistQueueItem>> = new Map();
  updateMultiSelectModeSubject: Subject<boolean> = new Subject();
  outputDeviceAction: typeof OutputDeviceAction = OutputDeviceAction;

  selectAllActionsDisableMap = new Map([
    [OutputDeviceAction.Release, true],
    [OutputDeviceAction.Print, true],
    [OutputDeviceAction.Reroute, true]
  ]);

  set multiSelectMode(value: boolean) {
    this._multiSelectMode = value;
    if (value === false) {
      this.clearActionDisableMap();
    }
  }

  get multiSelectMode(): boolean {
    return this._multiSelectMode;
  }

  searchTextFilter: string;
  translatables = [
    'OK',
    'FAILEDTOSAVE_HEADER_TEXT',
    'FAILEDTOSAVE_BODY_TEXT',
    'YES',
    'NO',
    'REROUTE',
    'XR2_QUEUE_REROUTE_SELECTED_DIALOG_MESSAGE',
    'FAILEDTOREROUTE_HEADER_TEXT',
    'FAILEDTOREROUTE_BODY_TEXT',
  ];
  translations$: Observable<any>;

  constructor(
    private picklistsQueueService: PicklistsQueueService,
    private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
    private location: Location,
    private translateService: TranslateService,
    private dialogService: PopupDialogService,
    private windowService: WindowService,
    ) {
      this.configureEventHandlers();
  }

  ngOnInit() {
    this.setTranslations();
    this.loadPicklistsQueueItems();
    this.initializeActionDisableMap();
  }

  onSearchTextFilter(filterText: string) {
    this.searchTextFilter = filterText;
  }

  onBackClick() {
    this.location.back();
  }

  processReroute(picklistQueueItems: PicklistQueueItem[]) {

    this.displayRerouteDialog().subscribe(result => {
      if (!result) {
        return;
      }
      // TODO: reroute selected items
      this.skip(picklistQueueItems[0]); // For testing UI
      this.clearMultiSelectedItems();
    });
  }

  processRelease(picklistQueueItems: PicklistQueueItem[]) {
    // TODO: release selected items
    this.sendToRobot(picklistQueueItems[0]); // For testing UI
    this.clearMultiSelectedItems();
  }

  processPrint(picklistQueueItems: PicklistQueueItem[]) {
    // TODO: print selected items
    this.printLabels(picklistQueueItems[0]); // For testing UI
    this.clearMultiSelectedItems();
  }

  displayXr2QueueError() {
    this.displayFailedToSaveDialog();
  }

  onGridSelectionChanged(event: IGridSelectionChanged<PicklistQueueItem>) {
    this.selectedItems = event.selectedValues;
    const singleItemSelected = event.changedValue;
    const itemsToProcess = singleItemSelected ? [singleItemSelected] : this.selectedItems;

    if (this.selectedItems.length === 0) {
      this.multiSelectMode = false;
      this.updateDisableSelectAllActionButtons();
      return;
    }

    this.multiSelectMode = true;
    this.addOrRemoveFromActionDisableMap(itemsToProcess, event.changeType);
    this.updateDisableSelectAllActionButtons();
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }
    this.picklistQueueEventConnectionService.reloadPicklistQueueItemsSubject
      .subscribe(() => this.onReloadPicklistQueueItems());
  }

  private clearMultiSelectedItems(): void {
    this.clearActionDisableMap();
  }

  private initializeActionDisableMap(): void {
    this.selectAllActionsDisableMap.forEach((isDisabled,  action) => {
      this.actionDisableMap.set(action, new Set<PicklistQueueItem>());
    });
  }

  private clearActionDisableMap(): void {
    this.actionDisableMap.forEach((picklistSet, action) => {
      picklistSet.clear();
    });
  }

  private addOrRemoveFromActionDisableMap(itemsToProcess: PicklistQueueItem[], changeType): void {

    _.forEach(itemsToProcess, (item) => {
      if (!item.Releaseable) {
        const currentSet  = this.actionDisableMap.get(OutputDeviceAction.Release);
        changeType === SelectionChangeType.selected ? currentSet.add(item)
         : currentSet.delete(item);
        this.actionDisableMap.set(OutputDeviceAction.Release, currentSet);
      }

      if (!item.Printable) {
        const currentSet  = this.actionDisableMap.get(OutputDeviceAction.Print);
        changeType === SelectionChangeType.selected ? currentSet.add(item)
         : currentSet.delete(item);
        this.actionDisableMap.set(OutputDeviceAction.Print, currentSet);
      }

      if (!item.Reroutable) {
        const currentSet  = this.actionDisableMap.get(OutputDeviceAction.Reroute);
        changeType === SelectionChangeType.selected ? currentSet.add(item)
         : currentSet.delete(item);
        this.actionDisableMap.set(OutputDeviceAction.Reroute, currentSet);
      }
    });
  }

  private updateDisableSelectAllActionButtons(): void {

    this.selectAllActionsDisableMap.forEach((isDisabled,  action) => {
      const updatedDisableState = this.actionDisableMap.get(action).size > 0 ? true : false;
      this.selectAllActionsDisableMap.set(action, updatedDisableState);
    });
  }

  private onReloadPicklistQueueItems(): void {
    this.loadPicklistsQueueItems();
  }

  private loadPicklistsQueueItems(): void {
    this.picklistsQueueItems = this.picklistsQueueService.get().pipe(map(x => {
      const displayObjects = x.map(picklistQueueItem => new PicklistQueueItem(picklistQueueItem));
      return displayObjects;
    }), shareReplay(1));
  }

  private setTranslations(): void {
    this.translations$ = this.translateService.get(this.translatables);
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
  private displayRerouteDialog(): Observable<boolean> {
    return forkJoin(this.translations$).pipe(flatMap(r => {
      const translations = r[0];
      const properties = new PopupDialogProperties('Standard-Popup-Dialog-Font');
      properties.titleElementText = translations.REROUTE;
      properties.messageElementText = translations.XR2_QUEUE_REROUTE_SELECTED_DIALOG_MESSAGE;
      properties.showPrimaryButton = true;
      properties.primaryButtonText = translations.YES;
      properties.showSecondaryButton = true;
      properties.secondaryButtonText = translations.NO;
      properties.primaryOnRight = false;
      properties.showCloseIcon = false;
      properties.dialogDisplayType = PopupDialogType.Info;
      properties.timeoutLength = 0;
      let component = this.dialogService.showOnce(properties);
      let primaryClick$ = component.didClickPrimaryButton.pipe(map(x => true));
      let secondaryClick$ = component.didClickSecondaryButton.pipe(map(x => false));
      return merge(primaryClick$, secondaryClick$);
    }));
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
}
