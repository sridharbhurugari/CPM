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
      // TODO: reroute selected items
      this.skip([...picklistQueueItems][0]); // For testing UI
      this.clearMultiSelect();
    });
  }

  processRelease(picklistQueueItems: Set<PicklistQueueItem>): void {
    // TODO: release selected items
    this.sendToRobot([...picklistQueueItems][0]); // For testing UI
  }

  processPrint(picklistQueueItems: Set<PicklistQueueItem>): void {
    // TODO: print selected items
    this.printLabels([...picklistQueueItems][0]); // For testing UI
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

  sendToRobot(picklistQueueItem: PicklistQueueItem): void {
    picklistQueueItem.Saving = true;
    const globalDispenseSyncRequest = new GlobalDispenseSyncRequest(picklistQueueItem);
    this.picklistsQueueService.sendToRobot(picklistQueueItem.DeviceId, globalDispenseSyncRequest).subscribe(
      success => {
        // force the status to 2 at this point
        picklistQueueItem.Status = 2;
        picklistQueueItem.Saving = false;
      }, error => {
        picklistQueueItem.Saving = false;
        this.displayFailedToSaveDialog();
      });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  skip(picklistQueueItem: PicklistQueueItem): void {
    picklistQueueItem.Saving = true;
    const globalDispenseSyncRequest = new GlobalDispenseSyncRequest(picklistQueueItem);
    this.picklistsQueueService.skip(picklistQueueItem.DeviceId, globalDispenseSyncRequest).subscribe(
      success => {
        picklistQueueItem.Saving = false;
      }, error => {
        picklistQueueItem.Saving = false;
        this.displayFailedToSaveDialog();
      });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  printLabels(picklistQueueItem: PicklistQueueItem): void {
    picklistQueueItem.Saving = true;
    // TODO: Xr2 Cleanup - clean robot print request when we remove old queue
    const robotPrintRequest = new RobotPrintRequest(picklistQueueItem.PicklistId, picklistQueueItem.RobotPickGroupId, picklistQueueItem);
    this.picklistsQueueService.printLabels(picklistQueueItem.DeviceId, robotPrintRequest).subscribe(
      success => {
        picklistQueueItem.Saving = false;
      }, error => {
        picklistQueueItem.Saving = false;
        this.displayFailedToSaveDialog();
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
    this.picklistQueueEventConnectionService.reloadPicklistQueueItemsSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.onReloadPicklistQueueItems());

    this.picklistQueueEventConnectionService.picklistQueueItemUpdateSubject
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(x => {
      try {
        this.handlePicklistQueueItemUpdateSubject(x);
      } catch (e) {
        this.logService.logMessageAsync(LogVerbosity.Normal, CpmLogLevel.Information, this._loggingCategory,
          this.constructor.name + ' picklistQueueItemUpdateSubject - handlePicklistQueueItemUpdateSubject failed: ' + e);
      }
  });

    this.picklistQueueEventConnectionService.picklistQueueItemListUpdateSubject
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(x => {
      try {
        this.handlePicklistQueueItemListUpdateSubject(x);
      } catch (exception) {
        console.log('addOrUpdatePicklistQueueItemSubject - onAddOrUpdatePicklistQueueItem failed!');
      }
    });
  }

  private handlePicklistQueueItemUpdateSubject(x: IPicklistQueueItemUpdateMessage) {
    if (!x.PicklistQueueItem) {
      console.log('!picklistqueueitem removing using xr2groupkey, priority and device');
      const pickListQueueItem = PicklistQueueItem.fromNonstandardJson(x.PicklistQueueItem);
      this.childDetailsQueueComponent.removePicklistQueueItem(pickListQueueItem);
    } else {
      const pickListQueueItem = PicklistQueueItem.fromNonstandardJson(x.PicklistQueueItem);
      this.childDetailsQueueComponent.updatePicklistQueueItem(pickListQueueItem);
    }
  }

  private handlePicklistQueueItemListUpdateSubject(x: IPicklistQueueItemListUpdateMessage) {
    console.log('picklistQueueItemListUpdateSubject called');
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

  private onReloadPicklistQueueItems(): void {
    try {
      this.loadPicklistsQueueItems();
    } catch (e) {
      console.log('Xr2QueueDetailsPageComponent.onReloadPicklistQueueItems ERROR');
      console.log(e);
    }
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
