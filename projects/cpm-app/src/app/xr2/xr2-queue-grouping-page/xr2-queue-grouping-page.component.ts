import { Component, OnInit, ViewChild } from '@angular/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
<<<<<<< HEAD
import { IPicklistQueueItem } from '../../api-xr2/data-contracts/i-picklist-queue-item';
import { Observable, forkJoin, merge, of } from 'rxjs';
import { map, flatMap, shareReplay } from 'rxjs/operators';
import { PopupDialogProperties, PopupDialogType, PopupDialogService, SingleselectRowItem, SingleselectComponent } from '@omnicell/webcorecomponents';
import { PicklistQueueItem } from '../model/picklist-queue-item';
=======
import { Observable, forkJoin, merge } from 'rxjs';
import { map, flatMap, shareReplay } from 'rxjs/operators';
import { PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';
import { PicklistQueueGrouped } from '../model/picklist-queue-grouped';
>>>>>>> fe-595615-xr2-grouping-details-refreshing
import * as _ from 'lodash';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { TranslateService } from '@ngx-translate/core';
<<<<<<< HEAD
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import {filter} from 'rxjs/operators';
=======
import { IPicklistQueueGrouped } from '../../api-xr2/data-contracts/i-picklist-queue-grouped';
import { Xr2GroupingQueueComponent } from '../xr2-grouping-queue/xr2-grouping-queue.component';
>>>>>>> fe-595615-xr2-grouping-details-refreshing

@Component({
  selector: 'app-xr2-queue-grouping-page',
  templateUrl: './xr2-queue-grouping-page.component.html',
  styleUrls: ['./xr2-queue-grouping-page.component.scss']
})
export class Xr2QueueGroupingPageComponent implements OnInit {

  picklistsQueueGrouped: Observable<IPicklistQueueGrouped[]>;
  searchTextFilter: string;
<<<<<<< HEAD
  selectedDeviceInformation: SelectableDeviceInfo;
=======
  @ViewChild(Xr2GroupingQueueComponent, null) chileGroupingQueueComponent: Xr2GroupingQueueComponent;
>>>>>>> fe-595615-xr2-grouping-details-refreshing

  translatables = [
    'YES',
    'NO',
    'REROUTE',
    'XR2_QUEUE_REROUTE_PRIORITY_DIALOG_MESSAGE',
    'FAILEDTOREROUTE_HEADER_TEXT',
    'FAILEDTOREROUTE_BODY_TEXT',
  ];
  translations$: Observable<any>;

  constructor(private picklistsQueueService: PicklistsQueueService,
              private picklistQueueEventConnectionService: PicklistsQueueEventConnectionService,
              private translateService: TranslateService,
              private dialogService: PopupDialogService
    ) {
      this.configureEventHandlers();
   }

  ngOnInit() {
    this.setTranslations();
    this.loadPicklistsQueueGrouped();
  }

  onSearchTextFilter(filterText: string) {
    this.searchTextFilter = filterText;
  }

<<<<<<< HEAD
  onDeviceSelectionChanged($event){
    this.selectedDeviceInformation = $event;
   // this.loadPicklistsQueueDeviceItems($event.value);
     }

  processReroute(picklistQueueItem: PicklistQueueItem[]) {

    this.displayRerouteDialog().subscribe(result => {
      if (!result) {
        return;
      }
      // TODO: load in all items and reroute
    });
=======
  processRelease(picklistQueueGrouped: PicklistQueueGrouped) {
    picklistQueueGrouped.Saving = true;
    this.picklistsQueueService.sendToRobotGrouped(picklistQueueGrouped).subscribe(
      result => {
        this.picklistsQueueService.getGroupedFiltered(
          picklistQueueGrouped.DeviceId,
          picklistQueueGrouped.PriorityCode).subscribe(getGroupedResult => {
              this.UpdatePickListQueueGroupedList(getGroupedResult);
              picklistQueueGrouped.Saving = false;
          }, getGroupedResult => {
              picklistQueueGrouped.Saving = false;
              this.displayFailedToSaveDialog(); //TODO: Change to failed to refresh dialog.
          });
      }, result => {
        picklistQueueGrouped.Saving = false;
        this.displayFailedToSaveDialog();
      });
>>>>>>> fe-595615-xr2-grouping-details-refreshing
  }

  private UpdatePickListQueueGroupedList(picklistQueueGrouped: IPicklistQueueGrouped) {
    this.chileGroupingQueueComponent.updatePickListQueueGroupedGrouping(picklistQueueGrouped);
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }

    this.picklistQueueEventConnectionService.reloadPicklistQueueItemsSubject
      .subscribe(() => this.loadPicklistsQueueGrouped());
  }

<<<<<<< HEAD
  private loadPicklistsQueueItems(): void {
        this.picklistsQueueItems = this.picklistsQueueService.get().pipe(map(x => {
      const displayObjects = x.map(picklistQueueItem => new PicklistQueueItem(picklistQueueItem));
=======
  private loadPicklistsQueueGrouped(): void {
    this.picklistsQueueGrouped = this.picklistsQueueService.getGrouped().pipe(map(x => {
      const displayObjects = x.map(picklistQueueGrouped => new PicklistQueueGrouped(picklistQueueGrouped));
      console.log(displayObjects);
>>>>>>> fe-595615-xr2-grouping-details-refreshing
      return displayObjects;
    }), shareReplay(1));
  }

  // private loadPicklistsQueueDeviceItems(deviceId: string): Observable<IPicklistQueueItem[]> {

  //      return this.picklistsQueueItems.pipe(map(picklistsQueueItems => picklistsQueueItems.filter(queueItem => queueItem.DeviceId.toString() === deviceId)));
  // }

  private setTranslations() {
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
}
