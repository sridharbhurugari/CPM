import { Component, OnInit, ViewChild } from '@angular/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';
import * as _ from 'lodash';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { TranslateService } from '@ngx-translate/core';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { IPicklistQueueGrouped } from '../../api-xr2/data-contracts/i-picklist-queue-grouped';
import { Xr2GroupingQueueComponent } from '../xr2-grouping-queue/xr2-grouping-queue.component';
import { PicklistQueueGrouped } from '../model/picklist-queue-grouped';

@Component({
  selector: 'app-xr2-queue-grouping-page',
  templateUrl: './xr2-queue-grouping-page.component.html',
  styleUrls: ['./xr2-queue-grouping-page.component.scss']
})
export class Xr2QueueGroupingPageComponent implements OnInit {

  picklistsQueueGrouped: Observable<IPicklistQueueGrouped[]>;
  searchTextFilter: string;
  selectedDeviceInformation: SelectableDeviceInfo;

  @ViewChild(Xr2GroupingQueueComponent, null) childGroupingQueueComponent: Xr2GroupingQueueComponent;

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

  onDeviceSelectionChanged($event) {
    this.selectedDeviceInformation = $event;
    if (!this.selectedDeviceInformation) {
      this.childGroupingQueueComponent.loadAllPicklistQueueGrouped();
      return;
    }

    if (this.childGroupingQueueComponent.loadedPicklistQueueGrouped) {
      this.childGroupingQueueComponent.filterPicklistQueueGroupedByDeviceId(this.selectedDeviceInformation.DeviceId);
    }
  }

  processRelease(picklistQueueGrouped: PicklistQueueGrouped) {
    picklistQueueGrouped.Saving = true;
    console.log('Sending PickList Group');
    console.log(picklistQueueGrouped);
    this.picklistsQueueService.sendToRobotGrouped(picklistQueueGrouped).subscribe(
      result => {
        console.log('PickListGroup Sent. Refreshing Group Data');
        this.picklistsQueueService.getGroupedFiltered(
          picklistQueueGrouped.DeviceId,
          picklistQueueGrouped.PickPriorityIdentity).subscribe(getGroupedResult => {
              console.log('Data Refreshed. Updating UI');
              if (!getGroupedResult) {
                picklistQueueGrouped.Saving = false;
                this.childGroupingQueueComponent.removePicklistQueueGroup(picklistQueueGrouped.PriorityCode, picklistQueueGrouped.DeviceId);
                console.log('Send Complete Item removed');
              } else {
                picklistQueueGrouped.Saving = false;
                this.UpdatePickListQueueGroupedList(new PicklistQueueGrouped(getGroupedResult));
                console.log('Send and Refresh complete.');
              }
          }, getGroupedResult => {
              console.log('Failed to refresh data');
              picklistQueueGrouped.Saving = false;
              this.displayFailedToRefresh();
          });
      }, result => {
        console.log('Failed to save');
        picklistQueueGrouped.Saving = false;
        this.displayFailedToSaveDialog();
      });
  }

  private UpdatePickListQueueGroupedList(picklistQueueGrouped: IPicklistQueueGrouped) {
    this.childGroupingQueueComponent.updatePickListQueueGroupedGrouping(picklistQueueGrouped);
  }

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }

    this.picklistQueueEventConnectionService.picklistQueueGroupedUpdateSubject
      .subscribe((x) => {
        if (!x.PicklistQueueGrouped) {
          console.log('!picklistqueuegrouped removing using priority and device');
          this.childGroupingQueueComponent.removePicklistQueueGroup(x.PriorityCode, x.DeviceId);
        } else {
          const pickListQueueGrouped = PicklistQueueGrouped.fromNonstandardJson(x.PicklistQueueGrouped);
          this.UpdatePickListQueueGroupedList(pickListQueueGrouped);
        }
      });

    this.picklistQueueEventConnectionService.picklistQueueGroupedListUpdateSubject
      .subscribe((x) => {
        console.log('picklistQueueGroupedListUpdateSubject called');
        if (!x.PicklistQueueGroupedList.$values || x.PicklistQueueGroupedList.$values.length === 0) {
          console.log('Empty List just clear screen');
          this.childGroupingQueueComponent.refreshDataOnScreen(null);
        } else {
          const picklistQueueGroupedList = x.PicklistQueueGroupedList.$values.map((picklistQueueGrouped) => {
            return PicklistQueueGrouped.fromNonstandardJson(picklistQueueGrouped);
          });

          this.childGroupingQueueComponent.refreshDataOnScreen(picklistQueueGroupedList);
        }
      });
  }

  private loadPicklistsQueueGrouped(): void {
    this.picklistsQueueGrouped = this.picklistsQueueService.getGrouped().pipe(map(x => {
      const displayObjects = x.map(picklistQueueGrouped => new PicklistQueueGrouped(picklistQueueGrouped));
      console.log('loadPicklistsQueueGrouped : ');
      console.log(displayObjects);
      return displayObjects;
    }), shareReplay(1));
  }

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

    /* istanbul ignore next */
    private displayFailedToRefresh(): void {
      const properties = new PopupDialogProperties('Role-Status-Warning');
      this.translateService.get('FAILEDTREFRESH').subscribe(result => { properties.titleElementText = result; });
      this.translateService.get('FAILEDTREFRESH').subscribe(result => { properties.messageElementText = result; });
      this.translateService.get('OK').subscribe((result) => { properties.primaryButtonText = result; });
      properties.showPrimaryButton = true;
      properties.showSecondaryButton = false;
      properties.dialogDisplayType = PopupDialogType.Error;
      properties.timeoutLength = 60;
      this.dialogService.showOnce(properties);
    }
}
