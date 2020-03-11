import { Component, Input, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { WindowService } from '../../shared/services/window-service';
import { nameof } from '../../shared/functions/nameof';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { GlobalDispenseSyncRequest } from '../../api-xr2/data-contracts/global-dispense-sync-request';
import * as _ from 'lodash';
import { PickListLineDetail } from '../../api-xr2/data-contracts/pick-list-line-detail';
import { PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { ActivatedRoute } from '@angular/router';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

@Component({
  selector: 'app-picklists-queue',
  templateUrl: './picklists-queue.component.html',
  styleUrls: ['./picklists-queue.component.scss']
})
export class PicklistsQueueComponent implements AfterViewInit, OnDestroy {

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
      this.connectToEvents();
  }

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  searchTextFilter: string;

  searchFields = [nameof<PicklistQueueItem>('Destination'), nameof<PicklistQueueItem>('PriorityCodeDescription'),
    , nameof<PicklistQueueItem>('DeviceDescription'), , nameof<PicklistQueueItem>('OutputDevice')]

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
      /*this.shutdownSignalR();*/
  }

  back() {
    /*this.shutdownSignalR();*/
    this.wpfActionController.ExecuteContinueAction();
  }

  private async connectToEvents(): Promise<void> {
    await this.picklistQueueEventConnectionService.openEventConnection();
    this.configureEventHandlers();
  }

  /*private shutdownSignalR(): void {
    if (this.eventConnectionService) {
      this.eventConnectionService.shutdown();
    }
  }*/

  private configureEventHandlers(): void {
    if (!this.picklistQueueEventConnectionService) {
      return;
    }

    this.picklistQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject.subscribe(message => this.onAddOrUpdatePicklistQueueItem(message));
    this.picklistQueueEventConnectionService.removePicklistQueueItemSubject.subscribe(message => this.onRemovePicklistQueueItem(message));
  }

  private onAddOrUpdatePicklistQueueItem(addOrUpdatePicklistQueueItemMessage): void {
    const picklistQueueItem = addOrUpdatePicklistQueueItemMessage.PicklistQueueItem;
    const matchingPicklistQueueItem = _.find(this.picklistQueueItems, (x) => {
      return x.OrderId === picklistQueueItem.OrderId && x.Destination === picklistQueueItem.Destination &&
      x.DeviceLocationId === picklistQueueItem.DeviceLocationId;
    });

    if (matchingPicklistQueueItem == null) {
      this.picklistQueueItems.push(picklistQueueItem);
      return;
    }

    matchingPicklistQueueItem.Status = picklistQueueItem.Status;
    matchingPicklistQueueItem.FilledBoxCount = picklistQueueItem.FilledBoxCount;
    matchingPicklistQueueItem.BoxCount = picklistQueueItem.BoxCount;
  }

  private onRemovePicklistQueueItem(addOrUpdatePicklistQueueItemMessage): void {
    const orderDestinationPickLocationKey = addOrUpdatePicklistQueueItemMessage.OrderDestinationPickLocationKey;
    _.remove(this.picklistQueueItems, (x) => {
      return x.OrderId === orderDestinationPickLocationKey.OrderId && x.DestinationId === orderDestinationPickLocationKey.DestinationId &&
      x.DeviceLocationId === orderDestinationPickLocationKey.DeviceLocationId;
    });
  }

  sendToRobot(picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.Saving = true;
    const globalDispenseSyncRequest = new GlobalDispenseSyncRequest();
    globalDispenseSyncRequest.PickListIdentifier = picklistQueueItem.PicklistId;
    _.forEach(picklistQueueItem.ItemPicklistLines, (itemPicklistLine) => {
      const pickListLineDetail = new PickListLineDetail();
      pickListLineDetail.PickListLineIdentifier = itemPicklistLine.PicklistLineId;
      pickListLineDetail.ItemId = itemPicklistLine.ItemId;
      pickListLineDetail.Quantity = itemPicklistLine.Qty;
      globalDispenseSyncRequest.PickListLineDetails.push(pickListLineDetail);
    });
    this.picklistsQueueService.sendToRobot(picklistQueueItem.DeviceId, globalDispenseSyncRequest).subscribe(
      result => {
        picklistQueueItem.Status = 2;
        picklistQueueItem.Saving = false;
      }, result => {
        picklistQueueItem.Saving = false;
        this.displayFailedToSaveDialog();
      });
    this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
  }

  printLabels(picklistQueueItem: PicklistQueueItem) {
    picklistQueueItem.Saving = true;
    const picklistLineDetails = new Array<PickListLineDetail>();
    _.forEach(picklistQueueItem.ItemPicklistLines, (itemPicklistLine) => {
      const pickListLineDetail = new PickListLineDetail();
      pickListLineDetail.PickListLineIdentifier = itemPicklistLine.PicklistLineId;
      pickListLineDetail.ItemId = itemPicklistLine.ItemId;
      pickListLineDetail.Quantity = itemPicklistLine.Qty;
      pickListLineDetail.PickLocationDeviceLocationId = itemPicklistLine.PickLocationDeviceLocationId;
      pickListLineDetail.PickLocationDescription = itemPicklistLine.PickLocationDescription;
      picklistLineDetails.push(pickListLineDetail);
    });
    this.picklistsQueueService.printLabels(picklistQueueItem.DeviceId, picklistLineDetails).subscribe(
      result => {
        picklistQueueItem.Status = 4;
        picklistQueueItem.Saving = false;
      }, result => {
        picklistQueueItem.Saving = false;
        this.displayFailedToSaveDialog();
      });
  }

  private displayFailedToSaveDialog(): void {

    const properties = new PopupDialogProperties('Role-Status-Warning');
    this.translateService.get('FAILEDTOSAVE_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get('FAILEDTOSAVE_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'Ok';
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = 60;
    this.dialogService.showOnce(properties);
  }
}
