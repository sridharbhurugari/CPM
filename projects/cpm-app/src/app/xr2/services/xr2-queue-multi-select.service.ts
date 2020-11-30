import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { OutputDeviceAction } from '../../shared/enums/output-device-actions';
import { PicklistQueueItem } from '../model/picklist-queue-item';

@Injectable({
  providedIn: 'root'
})
export class Xr2QueueMultiSelectService {

  public actionPicklistItemsDisableMap: Map<OutputDeviceAction, Set<PicklistQueueItem>> = new Map();
  outputDeviceAction: typeof OutputDeviceAction = OutputDeviceAction;

  constructor() { }

  createActionDisableMap(): void {
    this.actionPicklistItemsDisableMap = new Map([
      [this.outputDeviceAction.Release, new Set<PicklistQueueItem>()],
    [this.outputDeviceAction.Print, new Set<PicklistQueueItem>()],
    [this.outputDeviceAction.Reroute, new Set<PicklistQueueItem>()],
    ]);
  }

  clearActionDisableMap(): void {
    this.actionPicklistItemsDisableMap.forEach((picklistSet, action) => {
      picklistSet.clear();
    });
  }

  updateActionDisableMap(picklistQueueItems: PicklistQueueItem[]): void {
    console.log('updateActionPicklistItemDisableMap');
    this.removeFromActionDisableMap(picklistQueueItems);
    this.addToActionDisableMap(picklistQueueItems);
  }

  addToActionDisableMap(itemsToProcess: PicklistQueueItem[]) {
    _.forEach(itemsToProcess, (item) => {
      console.log('Adding to action disable map:');
      console.log(item);
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
      console.log(this.actionPicklistItemsDisableMap);
    });
  }

  removeFromActionDisableMap(itemsToProcess: PicklistQueueItem[]) {
    console.log(this.actionPicklistItemsDisableMap);
    _.forEach(itemsToProcess, (item) => {
      this.actionPicklistItemsDisableMap.forEach((picklistSet, action) => {
        picklistSet.delete(item);
      });
    });
  }
}
