import { Injectable } from '@angular/core';
import { Subject, from } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { IRemovePicklistQueueItemMessage } from '../../api-xr2/events/i-remove-picklist-queue-item-message';
import { Guid } from 'guid-typescript';
import { IPicklistQueueGroupedUpdateMessage } from '../../api-xr2/events/i-picklist-queue-grouped-update-message';
import { IAddOrUpdatePicklistQueueItemMesssage } from '../../api-xr2/events/i-add-or-update-picklist-queue-item-message';


@Injectable({
  providedIn: 'root'
})
export class PicklistsQueueEventConnectionService {

  public addOrUpdatePicklistQueueItemSubject = new Subject<IAddOrUpdatePicklistQueueItemMesssage>();
  public removePicklistQueueItemSubject = new Subject<IRemovePicklistQueueItemMessage>();
  public reloadPicklistQueueItemsSubject = new Subject<any>();
  public picklistQueueGroupedUpdateSubject = new Subject<IPicklistQueueGroupedUpdateMessage>();

  constructor(
      private eventConnectionService: EventConnectionService
    ) {
      this.eventConnectionService.receivedSubject.subscribe(message => this.configurePicklistEventHandlers(message));
   }

  private configurePicklistEventHandlers(message: any): void {
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
      this.removePicklistQueueItemSubject.next({
        Xr2OrderGroupKey: {
          OrderId: message.Xr2OrderGroupKey.OrderId,
          OrderGroupDestinationId: message.Xr2OrderGroupKey.OrderGroupDestinationId,
          DeviceLocationId: message.Xr2OrderGroupKey.DeviceLocationId,
          RobotPickGroupId: Guid.parse(message.Xr2OrderGroupKey.RobotPickGroupId),
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
  }
}

