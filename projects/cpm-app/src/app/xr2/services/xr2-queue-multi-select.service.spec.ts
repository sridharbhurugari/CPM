import { TestBed } from '@angular/core/testing';
import { OutputDeviceAction } from '../../shared/enums/output-device-actions';
import { PicklistQueueItem } from '../model/picklist-queue-item';

import { Xr2QueueMultiSelectService } from './xr2-queue-multi-select.service';

describe('Xr2QueueMultiSelectService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service: Xr2QueueMultiSelectService = TestBed.get(Xr2QueueMultiSelectService);
    expect(service).toBeTruthy();
  });

  describe('Internal map functionality', () => {
    it('should create action disable map', () => {
      const service: Xr2QueueMultiSelectService = TestBed.get(Xr2QueueMultiSelectService);

      service.createActionDisableMap();

      service.actionDisableMap.forEach((picklistSet, action) => {
        expect(picklistSet.size).toBe(0);
      });
    });

    it('should clear action disable map', () => {
      const service: Xr2QueueMultiSelectService = TestBed.get(Xr2QueueMultiSelectService);
      const items = [];
      for (let i = 0; i < 5; i++) {
        items.push(new PicklistQueueItem(null));
      }

      service.createActionDisableMap();
      service.addToActionDisableMap([...items]);
      service.clearActionDisableMap();

      service.actionDisableMap.forEach((picklistSet, action) => {
        expect(picklistSet.size).toBe(0);
      });
    });

    it('should add to action disable map', () => {
      const service: Xr2QueueMultiSelectService = TestBed.get(Xr2QueueMultiSelectService);
      const expectedSize = 5;
      const nonReleasableItems = new Array<PicklistQueueItem>(expectedSize);
      const nonPrintableItems = new Array<PicklistQueueItem>(expectedSize);
      for (let i = 0; i < expectedSize; i++) {
        const nonPrintableItem = new PicklistQueueItem(null);
        const nonReleasableItem = new PicklistQueueItem(null);
        nonReleasableItem.Status = 3;
        nonReleasableItem.IsPrintable = true;
        nonReleasableItem.Saving = false;
        nonPrintableItem.IsPrintable = false;
        nonPrintableItem.Status = 1;
        nonPrintableItem.Saving = false;
        nonReleasableItems[i] = (nonReleasableItem);
        nonPrintableItems[i] = (nonPrintableItem);
      }

      service.createActionDisableMap();
      service.addToActionDisableMap([...nonReleasableItems, ...nonPrintableItems]);

      expect(service.actionDisableMap.get(OutputDeviceAction.Release).size).toBe(expectedSize);
      expect(service.actionDisableMap.get(OutputDeviceAction.Print).size).toBe(expectedSize);
      expect(service.actionDisableMap.get(OutputDeviceAction.Reroute).size).toBe(0);
    });

    it('should remove item from action disable map', () => {
      const service: Xr2QueueMultiSelectService = TestBed.get(Xr2QueueMultiSelectService);
      const expectedSize = 5;
      const nonReleasableItems = new Array<PicklistQueueItem>(expectedSize);
      const nonPrintableItems = new Array<PicklistQueueItem>(expectedSize);
      for (let i = 0; i < expectedSize; i++) {
        const nonPrintableItem = new PicklistQueueItem(null);
        const nonReleasableItem = new PicklistQueueItem(null);
        nonReleasableItem.Status = 3;
        nonReleasableItem.IsPrintable = true;
        nonReleasableItem.Saving = false;
        nonPrintableItem.IsPrintable = false;
        nonPrintableItem.Status = 1;
        nonPrintableItem.Saving = false;
        nonReleasableItems[i] = nonReleasableItem;
        nonPrintableItems[i] = nonPrintableItem;
      }
      const itemsToAdd = [...nonReleasableItems, ...nonPrintableItems];
      const itemToRemove1 = nonReleasableItems[0];
      const itemToRemove2 = nonPrintableItems[0];
      const expectedNewSizes = [expectedSize - 1, expectedSize - 1, 0];

      service.createActionDisableMap();
      service.addToActionDisableMap(itemsToAdd);
      service.removeFromActionDisableMap([itemToRemove1, itemToRemove2]);

      let index = 0;
      service.actionDisableMap.forEach((picklistSet, action) => {
        expect(picklistSet.size).toBe(expectedNewSizes[index++]);
      });
    });

    it('should update action disable map', () => {
      const service: Xr2QueueMultiSelectService = TestBed.get(Xr2QueueMultiSelectService);
      const expectedSize = 5;
      const nonReleasableItems = new Array<PicklistQueueItem>(expectedSize);
      const nonPrintableItems = new Array<PicklistQueueItem>(expectedSize);
      for (let i = 0; i < expectedSize; i++) {
        const nonReleasableItem = new PicklistQueueItem(null);
        const nonPrintableItem = new PicklistQueueItem(null);
        nonReleasableItem.Status = 3;
        nonReleasableItem.IsPrintable = true;
        nonReleasableItem.Saving = false;
        nonPrintableItem.IsPrintable = true;
        nonPrintableItem.Status = 1;
        nonPrintableItem.Saving = false;
        nonReleasableItems[i] = nonReleasableItem;
        nonPrintableItems[i] = nonPrintableItem;
      }

      const itemsToAdd = [...nonReleasableItems, ...nonPrintableItems];
      const itemsToUpdate = itemsToAdd;

      service.createActionDisableMap();
      service.addToActionDisableMap(itemsToAdd);

      itemsToUpdate[0].Status++; // non-releasable item
      itemsToUpdate[itemsToUpdate.length - 1].Status += 2; // non-printable item
      // item1 status 3 -> 4 = no change
      // item10 status 1-> 2 = non-releasable + 1, non-printable - 1
      const expectedSizes = [expectedSize + 1, expectedSize - 1, 0];
      service.updateActionDisableMap(itemsToUpdate);


      let index = 0;
      service.actionDisableMap.forEach((picklistSet, action) => {
        expect(picklistSet.size).toBe(expectedSizes[index++]);
      });
    });

  });
});
