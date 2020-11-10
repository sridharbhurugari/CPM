import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
import { SelectionChangeType } from '../../shared/constants/selection-change-type';
import { GlobalDispenseSyncRequest } from '../../api-xr2/data-contracts/global-dispense-sync-request';
import { WindowService } from '../../shared/services/window-service';
import { RobotPrintRequest } from '../../api-xr2/data-contracts/robot-print-request';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';


@Component({
  selector: 'app-xr2-queue-details-queue-page',
  templateUrl: './xr2-queue-details-page.component.html',
  styleUrls: ['./xr2-queue-details-page.component.scss']
})
export class Xr2QueueDetailsPageComponent implements OnInit {

  @Output() detailsPageBackButtonEvent = new EventEmitter<void>();

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;

  private _multiSelectMode = false;

  picklistsQueueItems: Observable<IPicklistQueueItem[]>;
  selectedItems: Set<PicklistQueueItem>;
  actionPicklistItemsDisableMap: Map<OutputDeviceAction, Set<PicklistQueueItem>> = new Map();
  updateMultiSelectModeSubject: Subject<boolean> = new Subject();
  outputDeviceAction: typeof OutputDeviceAction = OutputDeviceAction;

  set multiSelectMode(value: boolean) {
    this._multiSelectMode = value;
    if (value === false) {
      this.clearActionPicklistItemsDisableMap();
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
    private translateService: TranslateService,
    private dialogService: PopupDialogService,
    private windowService: WindowService,
    ) {
      this.configureEventHandlers();
  }

  ngOnInit() {
    this.setTranslations();
    this.loadPicklistsQueueItems();
    this.initializeActionPicklistItemsDisableMap();
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
    this.clearMultiSelect();
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
    this.addOrRemoveFromActionDisableMap(itemsToProcess, event.changeType);
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
    this.addOrRemoveFromActionDisableMap([picklistQueueItem], SelectionChangeType.unselected);
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }
    this.picklistQueueEventConnectionService.reloadPicklistQueueItemsSubject
      .subscribe(() => this.onReloadPicklistQueueItems());
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
    this.addOrRemoveFromActionDisableMap(picklistQueueItems, SelectionChangeType.unselected);
    this.addOrRemoveFromActionDisableMap(picklistQueueItems, SelectionChangeType.selected);
  }

  private clearSelectedItems(): void {
    this.selectedItems.clear();
  }

  private addOrRemoveFromActionDisableMap(itemsToProcess: PicklistQueueItem[], changeType: SelectionChangeType): void {

    _.forEach(itemsToProcess, (item) => {
      if (!item.Releaseable) {
        const currentSet  = this.actionPicklistItemsDisableMap.get(OutputDeviceAction.Release);
        changeType === SelectionChangeType.selected ? currentSet.add(item)
         : currentSet.delete(item);
        this.actionPicklistItemsDisableMap.set(OutputDeviceAction.Release, currentSet);
      }

      if (!item.Printable) {
        const currentSet  = this.actionPicklistItemsDisableMap.get(OutputDeviceAction.Print);
        changeType === SelectionChangeType.selected ? currentSet.add(item)
         : currentSet.delete(item);
        this.actionPicklistItemsDisableMap.set(OutputDeviceAction.Print, currentSet);
      }

      if (!item.Reroutable) {
        const currentSet  = this.actionPicklistItemsDisableMap.get(OutputDeviceAction.Reroute);
        changeType === SelectionChangeType.selected ? currentSet.add(item)
         : currentSet.delete(item);
        this.actionPicklistItemsDisableMap.set(OutputDeviceAction.Reroute, currentSet);
      }
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
      let component = this.dialogService.showOnce(properties);
      let primaryClick$ = component.didClickPrimaryButton.pipe(map(x => true));
      let secondaryClick$ = component.didClickSecondaryButton.pipe(map(x => false));
      return merge(primaryClick$, secondaryClick$);
    }));
  }

}
