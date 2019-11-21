import { Injectable } from '@angular/core';
import { IPicklistQueueItem } from '../data-contracts/i-picklist-queue-item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PicklistsQueueService {

  constructor() { }

  get(): Observable<IPicklistQueueItem[]> {
    return of(this.createMockPicklistQueueItems());
  }

  createMockPicklistQueueItems(): IPicklistQueueItem[] {
    const picklistQueueItem = {
      PriorityCode: 'CABINET',
      PriorityCodeColor: 'Red',
      Destination: 'Cab 01',
      PriorityCodeDescription: 'Cabinet',
      ItemCount: 5,
      Status: 'NOT SENT',
      StatusDisplay: 'NOT SENT',
      DeviceDescription: 'Dave XR2',
      OutputDevice: 'CART'
    };

    const picklistQueueItem2 = {
      PriorityCode: 'CABINET',
      PriorityCodeColor: 'Red',
      Destination: 'Cab 02',
      PriorityCodeDescription: 'Cabinet',
      ItemCount: 8,
      Status: 'NOT SENT',
      StatusDisplay: 'NOT SENT',
      DeviceDescription: 'Dave XR2',
      OutputDevice: 'CART'
    };

    const picklistQueueItem3 = {
      PriorityCode: 'AREA',
      PriorityCodeColor: 'Green',
      Destination: 'OCLD_PP',
      PriorityCodeDescription: 'Area',
      ItemCount: 12,
      Status: 'NOT SENT',
      StatusDisplay: 'NOT SENT',
      DeviceDescription: 'Dave XR2',
      OutputDevice: 'CART'
    };

    var picklistQueueItems = [picklistQueueItem, picklistQueueItem2, picklistQueueItem3];
    return picklistQueueItems;
  }
}
