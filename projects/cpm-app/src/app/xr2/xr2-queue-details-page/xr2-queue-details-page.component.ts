import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, forkJoin, merge, Subject, Subscription } from 'rxjs';
import { map, flatMap, shareReplay, takeUntil } from 'rxjs/operators';
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import * as _ from 'lodash';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogType, PopupDialogProperties, PopupDialogService } from '@omnicell/webcorecomponents';
import { OutputDeviceAction } from '../../shared/enums/output-device-actions';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';
import { GlobalDispenseSyncRequest } from '../../api-xr2/data-contracts/global-dispense-sync-request';
import { WindowService } from '../../shared/services/window-service';
import { RobotPrintRequest } from '../../api-xr2/data-contracts/robot-print-request';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { LogVerbosity } from 'oal-core';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { LogService } from '../../api-core/services/log-service';
import { IPicklistQueueItemUpdateMessage } from '../../api-xr2/events/i-picklist-queue-item-update-message';
import { Xr2DetailsQueueComponent } from '../xr2-details-queue/xr2-details-queue.component';
import { IPicklistQueueItemListUpdateMessage } from '../../api-xr2/events/i-picklist-queue-item-list-update-message';
import { IAddOrUpdatePicklistQueueItemMesssage } from '../../api-xr2/events/i-add-or-update-picklist-queue-item-message';
import { PicklistQueueGroupKey } from '../model/picklist-queue-group-key';


@Component({
  selector: 'app-xr2-queue-details-queue-page',
  templateUrl: './xr2-queue-details-page.component.html',
  styleUrls: ['./xr2-queue-details-page.component.scss']
})
export class Xr2QueueDetailsPageComponent implements OnInit, OnDestroy {

  @Output() detailsPageBackButtonEvent = new EventEmitter<void>();

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;

  private _multiSelectMode = false;
  private _loggingCategory: string;

  picklistsQueueItems: Observable<IPicklistQueueItem[]>;
  selectedItems: Set<PicklistQueueItem>;
  actionPicklistItemsDisableMap: Map<OutputDeviceAction, Set<PicklistQueueItem>> = new Map();
  outputDeviceAction: typeof OutputDeviceAction = OutputDeviceAction;
  pickPriorityIdentity: string;
  deviceId: string;
  searchTextFilter: string;
  translations$: Observable<any>;
  ngUnsubscribe = new Subject();

  set multiSelectMode(value: boolean) {
    this._multiSelectMode = value;
    if (value === false) {
      this.clearActionPicklistItemsDisableMap();
    }
  }

  get multiSelectMode(): boolean {
    return this._multiSelectMode;
  }

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

  @ViewChild(Xr2DetailsQueueComponent, null) childDetailsQueueComponent: Xr2DetailsQueueComponent;

  constructor(
    private picklistsQueueService: PicklistsQueueService,
    private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
    private translateService: TranslateService,
    private dialogService: PopupDialogService,
    private windowService: WindowService,
    private logService: LogService
    ) {
      this.configureEventHandlers();
  }

  ngOnInit() {
    try {
      this.setTranslations();
      this.loadPicklistsQueueItems();
      this.initializeActionPicklistItemsDisableMap();
    } catch (e) {
      console.log('Xr2QueueDetailsPageComponent Failed in ngOnInit');
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSearchTextFilter(filterText: string): void {
    this.searchTextFilter = filterText;
  }

  onBackClick(): void {
    this.detailsPageBackButtonEvent.emit();
  }

  processReroute(picklistQueueItems: Set<PicklistQueueItem>): void {

    this.displayRerouteDialog().subscribe(result => {
      if (!result) {
        return;
      }

      this.rerouteQueueItems([...picklistQueueItems]);
      this.clearMultiSelect();
    });
  }

  processRelease(picklistQueueItems: Set<PicklistQueueItem>): void {
    this.sendQueueItemsToRobot([...picklistQueueItems]);
  }

  processPrint(picklistQueueItems: Set<PicklistQueueItem>): void {
    this.printQueueItemsLabels([...picklistQueueItems]);
    this.clearMultiSelect();
  }

  displayXr2QueueError(): void {
    this.displayFailedToSaveDialog();
  }

  onGridSelectionChanged(event: any): void {
    this.selectedItems = event.selectedValues;
    const singleItemSelected = event.changedValue;
    const itemsToProcess = singleItemSelected ? [singleItemSelected] : [...this.selectedItems];

    if (this.selectedItems.size === 0) {
      this.multiSelectMode = false;
      return;
    }

    this.multiSelectMode = true;

    if (event.changeType === SelectionChangeType.selected) {
      this.addToActionDisableMap(itemsToProcess);
    } else {
      this.removeFromActionDisableMap(itemsToProcess);
    }
  }

  sendQueueItemsToRobot(picklistQueueItems: Array<PicklistQueueItem>): void {
    const globalDispenseSyncRequestList = new Array<GlobalDispenseSyncRequest>();
    _.forEach(picklistQueueItems, (item) => {
      item.Saving = true;
      globalDispenseSyncRequestList.push(new GlobalDispenseSyncRequest(item));
    });
    this.picklistsQueueService.sendQueueItemsToRobot(globalDispenseSyncRequestList).subscribe(
      success => {
        this.handleSendQueueItemsToRobotSuccess(picklistQueueItems);
      }, error => {
        this.handleSendQueueItemsToRobotError(picklistQueueItems);
      });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  rerouteQueueItems(picklistQueueItems: PicklistQueueItem[]): void {
    const globalDispenseSyncRequestList = new Array<GlobalDispenseSyncRequest>();
    _.forEach(picklistQueueItems, (item) => {
      item.Saving = true;
      globalDispenseSyncRequestList.push(new GlobalDispenseSyncRequest(item));
    });
    this.picklistsQueueService.rerouteQueueItems(globalDispenseSyncRequestList).subscribe(
      success => {
        this.handleRerouteQueueItemsSuccess(picklistQueueItems);
      }, error => {
        this.handleRerouteQueueItemsError(picklistQueueItems);
      });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  printQueueItemsLabels(picklistQueueItems: Array<PicklistQueueItem>): void {
    const robotPrintRequestList = new Array<RobotPrintRequest>();
    _.forEach(picklistQueueItems, (item) => {
      item.Saving = true;
       // TODO: Xr2 Cleanup - clean robot print request when we remove old queue
      robotPrintRequestList.push(new RobotPrintRequest(item.PicklistId, item.RobotPickGroupId, item));
    });
    this.picklistsQueueService.printQueueItemsLabels(robotPrintRequestList).subscribe(
      success => {
        this.handlePrintQueueItemsLabelsSuccess(picklistQueueItems);
      }, error => {
        this.handlePrintQueueItemsLabelsError(picklistQueueItems);
      });
  }

  onPicklistQueueItemAddorUpdated(picklistQueueItem: PicklistQueueItem) {
    this.updateActionPicklistItemDisableMap([picklistQueueItem]);
  }

  onPicklistQueueItemRemoved(picklistQueueItem: PicklistQueueItem) {
    this.removeFromActionDisableMap([picklistQueueItem]);
    this.selectedItems.delete(picklistQueueItem);
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }

    this.picklistQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(x => {
      try {
        this.handlePicklistQueueItemAddorUpdateSubject(x);
      } catch (e) {
        this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
          this.constructor.name + ' addOrUpdatePicklistQueueItemSubject - onAddOrUpdatePicklistQueueItem failed: ' + e);
      }
  });

    this.picklistQueueEventConnectionService.picklistQueueItemListUpdateSubject
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(x => {
      try {
        this.handlePicklistQueueItemListUpdateSubject(x);
      } catch (exception) {
        console.log('picklistQueueItemListUpdateSubject - picklistQueueItemListUpdateSubject failed!');
      }
    });
  }

  private handleSendQueueItemsToRobotSuccess(picklistQueueItems: PicklistQueueItem[]) {
    // force the status to 2 at this point
    _.forEach(picklistQueueItems, (item) => {
      item.Status = 2;
      item.Saving = false;
    });
  }

  private handleSendQueueItemsToRobotError(picklistQueueItems: PicklistQueueItem[]) {
    _.forEach(picklistQueueItems, (item) => {
      item.Saving = false;
    });
    this.displayFailedToSaveDialog();
  }

  private handleRerouteQueueItemsSuccess(picklistQueueItems: PicklistQueueItem[]) {
    _.forEach(picklistQueueItems, (item) => {
      item.Saving = false;
    });
  }

  private handleRerouteQueueItemsError(picklistQueueItems: PicklistQueueItem[]) {
    _.forEach(picklistQueueItems, (item) => {
      item.Saving = false;
    });
    this.displayFailedToSaveDialog();
  }

  private handlePrintQueueItemsLabelsSuccess(picklistQueueItems: PicklistQueueItem[]) {
    _.forEach(picklistQueueItems, (item) => {
      item.Saving = false;
    });
  }

  private handlePrintQueueItemsLabelsError(picklistQueueItems: PicklistQueueItem[]) {
    _.forEach(picklistQueueItems, (item) => {
      item.Saving = false;
    });
    this.displayFailedToSaveDialog();
  }

  private handlePicklistQueueItemAddorUpdateSubject(x: IAddOrUpdatePicklistQueueItemMesssage) {
    console.log('picklistQueueItemAddorUpdateSubject called');
    if (!this.isValidMessageClient(x.PicklistQueueItem.DeviceId.toString(),
    x.PicklistQueueItem.PickPriorityIdentity.toString())) {
      console.log('Add or update queue item event recieved but not a valid client');
      return;
    }

    const pickListQueueItem = PicklistQueueItem.fromNonstandardJson(x.PicklistQueueItem);
    this.childDetailsQueueComponent.addOrUpdatePicklistQueueItem(pickListQueueItem);
  }

  private handlePicklistQueueItemListUpdateSubject(x: IPicklistQueueItemListUpdateMessage) {
    console.log('picklistQueueItemListUpdateSubject called');

    if (!this.hasValidGroupKey(x.AvailablePicklistQueueGroupKeys)) {
      this.childDetailsQueueComponent.refreshDataOnScreen(null);
      return;
    }
    if (!this.isValidMessageClient(x.DeviceId.toString(), x.PickPriorityIdentity.toString())) {
      console.log('Queue item List update recieved but not a valid client');
      return;
    }
    if (!x.PicklistQueueItems.$values || x.PicklistQueueItems.$values.length === 0) {
      console.log('Empty List just clear screen');
      this.childDetailsQueueComponent.refreshDataOnScreen(null);
    } else {
        const picklistQueueItemList = x.PicklistQueueItems.$values.map((picklistQueueItem) => {
          return PicklistQueueItem.fromNonstandardJson(picklistQueueItem);
        });
        this.childDetailsQueueComponent.refreshDataOnScreen(picklistQueueItemList);
    }
  }

  private hasValidGroupKey(availablePicklistQueueGroupKeys: PicklistQueueGroupKey[]): boolean {
    return availablePicklistQueueGroupKeys.some((key) => {
      return key.DeviceId.toString() === this.xr2QueueNavigationParameters.deviceId &&
      key.PickPriorityIdentifier.toString() === this.xr2QueueNavigationParameters.pickPriorityIdentity;
    });
  }

  private isValidMessageClient(deviceId: string, pickPriorityIdentity: string) {
    return this.xr2QueueNavigationParameters.deviceId === deviceId
    && this.xr2QueueNavigationParameters.pickPriorityIdentity === pickPriorityIdentity;
  }

  private clearMultiSelect(): void {
    this.multiSelectMode = false;
    this.clearSelectedItems();
  }

  private initializeActionPicklistItemsDisableMap(): void {
    this.actionPicklistItemsDisableMap = new Map([
      [this.outputDeviceAction.Release, new Set<PicklistQueueItem>()],
    [this.outputDeviceAction.Print, new Set<PicklistQueueItem>()],
    [this.outputDeviceAction.Reroute, new Set<PicklistQueueItem>()],
    ]);
  }

  private clearActionPicklistItemsDisableMap(): void {
    this.actionPicklistItemsDisableMap.forEach((picklistSet, action) => {
      picklistSet.clear();
    });
  }

  private updateActionPicklistItemDisableMap(picklistQueueItems: PicklistQueueItem[]): void {
    this.removeFromActionDisableMap(picklistQueueItems);
    this.addToActionDisableMap(picklistQueueItems);
  }

  private clearSelectedItems(): void {
    if (!this.selectedItems) {
      return;
    }

    this.selectedItems.clear();
  }

  private addToActionDisableMap(itemsToProcess: PicklistQueueItem[]) {
    _.forEach(itemsToProcess, (item) => {
      if (!item.Releaseable) {
        const currentSet  = this.actionPicklistItemsDisableMap.get(OutputDeviceAction.Release);
        currentSet.add(item);
      }

      if (!item.Printable) {
        const currentSet  = this.actionPicklistItemsDisableMap.get(OutputDeviceAction.Print);
        currentSet.add(item);
      }

      if (!item.Reroutable) {
        const currentSet  = this.actionPicklistItemsDisableMap.get(OutputDeviceAction.Reroute);
        currentSet.add(item);
      }
    });
  }

  private removeFromActionDisableMap(itemsToProcess: PicklistQueueItem[]) {
    _.forEach(itemsToProcess, (item) => {
      this.actionPicklistItemsDisableMap.forEach((picklistSet, action) => {
        picklistSet.delete(item);
      });
    });
  }

  private loadPicklistsQueueItems(): void {
    if (!this.xr2QueueNavigationParameters) {
      return;
    }

    this.picklistsQueueItems = this.picklistsQueueService.getGroupDetails(
      this.xr2QueueNavigationParameters.pickPriorityIdentity,
      this.xr2QueueNavigationParameters.deviceId).pipe(map(x => {
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
      const component = this.dialogService.showOnce(properties);
      const primaryClick$ = component.didClickPrimaryButton.pipe(map(x => true));
      const secondaryClick$ = component.didClickSecondaryButton.pipe(map(x => false));
      return merge(primaryClick$, secondaryClick$);
    }));
  }

}
