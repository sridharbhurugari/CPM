import { Injectable, OnDestroy } from '@angular/core';
import { Subject, from } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { IRemovePicklistQueueItemMessage } from '../../api-xr2/events/i-remove-picklist-queue-item-message';
import { Guid } from 'guid-typescript';
import { IPicklistQueueGroupedUpdateMessage } from '../../api-xr2/events/i-picklist-queue-grouped-update-message';
import { IAddOrUpdatePicklistQueueItemMesssage } from '../../api-xr2/events/i-add-or-update-picklist-queue-item-message';
import { IPicklistQueueGroupedListUpdateMessage } from '../../api-xr2/events/i-picklist-queue-grouped-list-update-message';
import { takeUntil } from 'rxjs/operators';
import { IPicklistQueueItemListUpdateMessage } from '../../api-xr2/events/i-picklist-queue-item-list-update-message';
import { IPicklistQueueItemUpdateMessage } from '../../api-xr2/events/i-picklist-queue-item-update-message';


@Injectable({
  providedIn: 'root'
})
export class PicklistsQueueEventConnectionService implements OnDestroy {

  public addOrUpdatePicklistQueueItemSubject = new Subject<IAddOrUpdatePicklistQueueItemMesssage>();
  public removePicklistQueueItemSubject = new Subject<IRemovePicklistQueueItemMessage>();
  public reloadPicklistQueueItemsSubject = new Subject<any>();
  public picklistQueueGroupedUpdateSubject = new Subject<IPicklistQueueGroupedUpdateMessage>();
  public picklistQueueGroupedListUpdateSubject = new Subject<IPicklistQueueGroupedListUpdateMessage>();
  public picklistQueueItemListUpdateSubject = new Subject<IPicklistQueueItemListUpdateMessage>();
  public ngUnsubscribe = new Subject();

  constructor(
      private eventConnectionService: EventConnectionService
    ) {
      this.eventConnectionService.receivedSubject
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(message => this.configurePicklistEventHandlers(message));
   }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private configurePicklistEventHandlers(message: any): void {
    try {
      const messageTypeName: string = message.$type;

      if (message === undefined) {
        return;
      }

      if (message.EventId === undefined) {
        return;
      }

      if (message.EventId === 'AddOrUpdatePicklistQueueItemMessage') {
        console.log(message);
        this.addOrUpdatePicklistQueueItemSubject.next({
          PicklistQueueItem: message.PicklistQueueItem
        });
        return;
      }

      if (message.EventId === 'RemovePicklistQueueItemMessage') {
        console.log(message);
        let robotPickGroupId = null;
        if(message.Xr2OrderGroupKey.RobotPickGroupId) {
          robotPickGroupId = Guid.parse(message.Xr2OrderGroupKey.RobotPickGroupId)
        }

        this.removePicklistQueueItemSubject.next({
          Xr2OrderGroupKey: {
            OrderId: message.Xr2OrderGroupKey.OrderId,
            OrderGroupDestinationId: message.Xr2OrderGroupKey.OrderGroupDestinationId,
            DeviceLocationId: message.Xr2OrderGroupKey.DeviceLocationId,
            RobotPickGroupId: robotPickGroupId,
          }
        });
        return;
      }

      if (message.EventId === 'ReloadPicklistQueueItemsMessage') {
        console.log(message);
        this.reloadPicklistQueueItemsSubject.next(message);
        return;
      }

      if (message.EventId === 'PickListQueueGroupedUpdateMessage') {
        console.log(message);
        this.picklistQueueGroupedUpdateSubject.next(message);
        return;
      }

      if (message.EventId === 'PickListQueueGroupedListUpdateMessage') {
        console.log(message);
        this.picklistQueueGroupedListUpdateSubject.next(message);
        return;
      }

      if (message.EventId === 'PicklistQueueItemListUpdateMessage') {
        console.log(message);
        this.picklistQueueItemListUpdateSubject.next(message);
        return;
      }
    } catch (e) {
      console.log('PicklistsQueueEventConnectionService.configurePicklistEventHandlers ERROR');
      console.log(e);
    }
  }
}

