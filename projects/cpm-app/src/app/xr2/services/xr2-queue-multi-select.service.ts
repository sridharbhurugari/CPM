import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { OutputDeviceAction } from '../../shared/enums/output-device-actions';
import { PicklistQueueItem } from '../model/picklist-queue-item';

@Injectable({
  providedIn: 'root'
})
export class Xr2QueueMultiSelectService {

  public actionDisableMap: Map<OutputDeviceAction, Set<PicklistQueueItem>> = new Map();
  outputDeviceAction: typeof OutputDeviceAction = OutputDeviceAction;

  constructor() { }

  createActionDisableMap(): void {
    this.actionDisableMap = new Map([
      [this.outputDeviceAction.Release, new Set<PicklistQueueItem>()],
    [this.outputDeviceAction.Print, new Set<PicklistQueueItem>()],
    [this.outputDeviceAction.Reroute, new Set<PicklistQueueItem>()],
    ]);
  }

  clearActionDisableMap(): void {
    if (!this.actionDisableMap) {
      return;
    }

    this.actionDisableMap.forEach((picklistSet, action) => {
      picklistSet.clear();
    });
  }

  updateActionDisableMap(picklistQueueItems: PicklistQueueItem[]): void {
    if (!this.actionDisableMap) {
      return;
    }

    console.log('updateActionPicklistItemDisableMap');
    this.removeFromActionDisableMap(picklistQueueItems);
    this.addToActionDisableMap(picklistQueueItems);
  }

  addToActionDisableMap(itemsToProcess: PicklistQueueItem[]) {
    if (!this.actionDisableMap) {
      return;
    }

    _.forEach(itemsToProcess, (item) => {
      console.log('Adding to action disable map:');
      console.log(item);
      if (!item.Releaseable) {
        const currentSet  = this.actionDisableMap.get(OutputDeviceAction.Release);
        currentSet.add(item);
      }

      if (!item.Printable) {
        const currentSet  = this.actionDisableMap.get(OutputDeviceAction.Print);
        currentSet.add(item);
      }

      if (!item.Reroutable) {
        const currentSet  = this.actionDisableMap.get(OutputDeviceAction.Reroute);
        currentSet.add(item);
      }
      console.log(this.actionDisableMap);
    });
  }

  removeFromActionDisableMap(itemsToProcess: PicklistQueueItem[]) {
    if (!this.actionDisableMap) {
      return;
    }

    console.log(this.actionDisableMap);
    _.forEach(itemsToProcess, (item) => {
      this.actionDisableMap.forEach((picklistSet, action) => {
        picklistSet.delete(item);
      });
    });
  }
}
