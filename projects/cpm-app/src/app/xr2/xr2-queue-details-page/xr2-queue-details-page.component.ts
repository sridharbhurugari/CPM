import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, single } from 'rxjs/operators';
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

@Component({
  selector: 'app-xr2-queue-details-queue-page',
  templateUrl: './xr2-queue-details-page.component.html',
  styleUrls: ['./xr2-queue-details-page.component.scss']
})
export class Xr2QueueDetailsPageComponent implements OnInit {
  picklistsQueueItems: Observable<IPicklistQueueItem[]>;
  actionDisableMap: Map<OutputDeviceAction, Set<PicklistQueueItem>> =
    new Map<OutputDeviceAction, Set<PicklistQueueItem>>();
  updateDisableSelectAllEvent: Subject<Map<OutputDeviceAction, Set<PicklistQueueItem>>> =
    new Subject<Map<OutputDeviceAction, Set<PicklistQueueItem>>>();
  updateMultiSelectModeEvent: Subject<boolean> = new Subject<boolean>();
  releaseAllDisabled: boolean;
  printAllDisabled: boolean;
  rerouteAllDisabled: boolean;

  searchTextFilter: string;
  translatables = [
    'OK',
    'FAILEDTOSAVE_HEADER_TEXT',
    'FAILEDTOSAVE_BODY_TEXT',
  ];
  translations$: Observable<any>;

  constructor(
    private picklistsQueueService: PicklistsQueueService,
    private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
    private location: Location,
    private translateService: TranslateService,
    private dialogService: PopupDialogService
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

  displayXr2QueueError() {
    this.displayFailedToSaveDialog();
  }

  onGridSelectionChanged(event: IGridSelectionChanged<PicklistQueueItem[]>) {
    const itemsToProcess = event.changedValue;
    const selectedItems = event.selectedValues;

    if (selectedItems.length === 0) {
      this.updateMultiSelectModeEvent.next(false);
      this.clearActionDisableMap();
      this.updateDisableSelectAllEvent.next(this.actionDisableMap);
      return;
    }

    this.updateMultiSelectModeEvent.next(true);

    _.forEach(itemsToProcess, (item) => {
      if (this.releasedIsDisabled(item)) {
        const currentSet  = this.actionDisableMap.get(OutputDeviceAction.Release);
        event.changeType === SelectionChangeType.selected ? currentSet.add(item)
         : currentSet.delete(item);
        this.actionDisableMap.set(OutputDeviceAction.Release, currentSet);
      }

      if (this.printIsDisabled(item)) {
        const currentSet  = this.actionDisableMap.get(OutputDeviceAction.Print);
        event.changeType === SelectionChangeType.selected ? currentSet.add(item)
         : currentSet.delete(item);
        this.actionDisableMap.set(OutputDeviceAction.Print, currentSet);
      }

      if (this.rerouteIsDisabled(item)) {
        const currentSet  = this.actionDisableMap.get(OutputDeviceAction.Reroute);
        event.changeType === SelectionChangeType.selected ? currentSet.add(item)
         : currentSet.delete(item);
        this.actionDisableMap.set(OutputDeviceAction.Reroute, currentSet);
      }
    });

    this.updateDisableSelectAllEvent.next(this.actionDisableMap);
  }

  private releasedIsDisabled(picklistQueueItem: PicklistQueueItem) {
    return picklistQueueItem.Status !== 1;
  }

  private printIsDisabled(picklistQueueItem: PicklistQueueItem) {
    return picklistQueueItem.Status <= 1 || !picklistQueueItem.IsPrintable;
  }

  private rerouteIsDisabled(picklistQueueItem: PicklistQueueItem) {
    return false;
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }
    this.picklistQueueEventConnectionService.reloadPicklistQueueItemsSubject
      .subscribe(() => this.onReloadPicklistQueueItems());
  }

  private initializeActionDisableMap(): void {
    for (const action in OutputDeviceAction) {
      if (!isNaN(Number(action))) {
        this.actionDisableMap.set(Number(action), new Set<PicklistQueueItem>());
      }
    }
  }

  private clearActionDisableMap(): void {
    for (const action in OutputDeviceAction) {
      if (!isNaN(Number(action))) {
        const currentSet = this.actionDisableMap.get(Number(action));
        currentSet.clear();
      }
    }
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

  private setTranslations() {
    this.translations$ = this.translateService.get(this.translatables);
  }
}
