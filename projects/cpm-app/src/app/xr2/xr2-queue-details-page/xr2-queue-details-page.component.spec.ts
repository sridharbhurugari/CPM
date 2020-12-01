import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Xr2QueueDetailsPageComponent } from './xr2-queue-details-page.component';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { Xr2QueueDetailsHeaderComponent } from '../xr2-queue-details-header/xr2-queue-details-header.component';
import { Xr2DetailsQueueComponent } from '../xr2-details-queue/xr2-details-queue.component';
import { Input, Component } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { Xr2QueueButtonPanelComponent } from '../xr2-queue-button-panel/xr2-queue-button-panel.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { ButtonActionModule, CheckboxModule, GridModule, PopupDialogModule, PopupDialogService,
         SingleselectDropdownModule } from '@omnicell/webcorecomponents';
import { Location } from '@angular/common';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { HttpClientModule } from '@angular/common/http';
import { LogService } from '../../api-core/services/log-service';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { OutputDeviceAction } from '../../shared/enums/output-device-actions';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';
import { Guid } from 'guid-typescript';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { IPicklistQueueItemNonstandardJson } from '../../api-xr2/events/i-picklist-queue-item-nonstandard-json';
import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { IPicklistQueueItemListUpdateMessage } from '../../api-xr2/events/i-picklist-queue-item-list-update-message';
import { IRemovePicklistQueueItemMessage } from '../../api-xr2/events/i-remove-picklist-queue-item-message';
import { Xr2QueueMultiSelectService } from '../services/xr2-queue-multi-select.service';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}


describe('Xr2QueueDetailsPageComponent', () => {
  let component: Xr2QueueDetailsPageComponent;
  let fixture: ComponentFixture<Xr2QueueDetailsPageComponent>;

  let picklistsQueueEventConnectionService: Partial<PicklistsQueueEventConnectionService>;
  let picklistsQueueService: Partial<PicklistsQueueService>;
  let xr2QueueMultiSelectService: Partial<Xr2QueueMultiSelectService>;
  let childDetailsQueueComponentSpy: jasmine.Spy;
  const outputDeviceAction: typeof OutputDeviceAction = OutputDeviceAction;

  beforeEach(async(() => {

    picklistsQueueEventConnectionService = {
      addOrUpdatePicklistQueueItemSubject: new Subject(),
      picklistQueueItemListUpdateSubject: new Subject(),
      removePicklistQueueItemSubject: new Subject()
    };

    picklistsQueueService = {
      rerouteQueueItems: jasmine.createSpy('rerouteQueueItems').and.returnValue(of(PicklistsQueueService)),
      sendQueueItemsToRobot: jasmine.createSpy('sendQueueItemsToRobot').and.returnValue(of(PicklistsQueueService)),
      printQueueItemsLabels: jasmine.createSpy('printQueueItemsLabels').and.returnValue(of(PicklistsQueueService)),
      getGroupDetails: jasmine.createSpy('getGroupDetails').and.returnValue(of([]))
    };

    xr2QueueMultiSelectService = {
      actionDisableMap: new Map([
        [outputDeviceAction.Release, new Set<PicklistQueueItem>()],
      [outputDeviceAction.Print, new Set<PicklistQueueItem>()],
      [outputDeviceAction.Reroute, new Set<PicklistQueueItem>()],
      ]),
      createActionDisableMap: jasmine.createSpy('createActionDisableMap').and.callThrough(),
      clearActionDisableMap: jasmine.createSpy('clearActionDisableMap'),
      updateActionDisableMap: jasmine.createSpy('updateActionDisableMap'),
      addToActionDisableMap: jasmine.createSpy('addToActionDisableMap'),
      removeFromActionDisableMap: jasmine.createSpy('removeFromActionDisableMap')
    };

    TestBed.configureTestingModule({
      declarations: [ Xr2QueueDetailsPageComponent, Xr2QueueDetailsHeaderComponent, Xr2DetailsQueueComponent,
        Xr2QueueButtonPanelComponent, MockCpClickableIconComponent, MockSearchBox, MockTranslatePipe,
        MockColHeaderSortable, MockSearchPipe, MockCpDataLabelComponent],
      imports: [SingleselectDropdownModule, CheckboxModule, GridModule, ButtonActionModule, PopupDialogModule, HttpClientModule],
      providers: [
        { provide: PicklistsQueueService, useValue: picklistsQueueService },
        { provide: Xr2QueueMultiSelectService, useValue: xr2QueueMultiSelectService },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: { } },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
        { provide: LogService, useValue: { logMessageAsync: () => {}}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueDetailsPageComponent);
    component = fixture.componentInstance;

    component.xr2QueueNavigationParameters = {
      priorityCodeDescription: 'code',
      pickPriorityIdentity: '1',
      deviceId: '1'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Queue API Actions', () => {
    it('should call PicklistQueue service to send to robot on release click', () => {
      const failedDialogSpy = spyOn<any>(component, 'displayFailedToSaveDialog');

      const item = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      item.ItemPicklistLines = [itemPicklistLine];
      component.selectedItems = new Set();

      component.processRelease(new Set([item]));

      expect(picklistsQueueService.sendQueueItemsToRobot).toHaveBeenCalledTimes(1);
      expect(item.Saving).toBeFalsy();
      expect(failedDialogSpy).toHaveBeenCalledTimes(0);
    });
    it('should call PicklistQueue service to reroute on reroute click on true dialog result', () => {
      spyOn<any>(component, 'displayRerouteDialog').and.returnValue(of(true));
      const failedDialogSpy = spyOn<any>(component, 'displayFailedToSaveDialog');

      const item = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      item.ItemPicklistLines = [itemPicklistLine];
      component.selectedItems = new Set();

      component.processReroute(new Set([item]));

      expect(picklistsQueueService.rerouteQueueItems).toHaveBeenCalledTimes(1);
      expect(item.Saving).toBeFalsy();
      expect(failedDialogSpy).toHaveBeenCalledTimes(0);
    });

    it('should not reroute on false dialog result', () => {
      const rerouteDialogSpy = spyOn<any>(component, 'displayRerouteDialog').and.returnValue(of(false));
      const failedDialogSpy = spyOn<any>(component, 'displayFailedToSaveDialog');

      const item = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      item.ItemPicklistLines = [itemPicklistLine];
      component.selectedItems = new Set();

      component.processReroute(new Set([item]));

      expect(rerouteDialogSpy).toHaveBeenCalledTimes(1);
      expect(picklistsQueueService.rerouteQueueItems).toHaveBeenCalledTimes(0);
      expect(failedDialogSpy).toHaveBeenCalledTimes(0);
    });
    it('should call PicklistQueue service to print label on print click', () => {
      const failedDialogSpy = spyOn<any>(component, 'displayFailedToSaveDialog');

      const item = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      item.ItemPicklistLines = [itemPicklistLine];
      component.selectedItems = new Set();

      component.processPrint(new Set([item]));

      expect(picklistsQueueService.printQueueItemsLabels).toHaveBeenCalledTimes(1);
      expect(failedDialogSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('Subscription Eventing', () => {
    it('should ignore add or update event as an invalid client', () => {
      childDetailsQueueComponentSpy = spyOn(component.childDetailsQueueComponent, 'addOrUpdatePicklistQueueItem');

      const fakeRobotGroupId = Guid.create();
      const pickListItemUpdate = {} as IPicklistQueueItemNonstandardJson;
      pickListItemUpdate.DeviceId = 2; // Different Device ID
      pickListItemUpdate.PickPriorityIdentity = 2; // Different PPID
      const itemPicklistLines: NonstandardJsonArray<IItemPicklistLine> = {$values: []};
      const availableOutputDeviceList: NonstandardJsonArray<OutputDevice> = {$values: []};

      pickListItemUpdate.RobotPickGroupId = fakeRobotGroupId;
      pickListItemUpdate.ItemPicklistLines = itemPicklistLines;
      pickListItemUpdate.AvailableOutputDeviceList = availableOutputDeviceList;
      const fakeAddEvent = {PicklistQueueItem: pickListItemUpdate};


      picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject.next(fakeAddEvent);

      expect(childDetailsQueueComponentSpy).toHaveBeenCalledTimes(0);
    });

    it('should call child component to add or update data on update as a valid client', () => {
      childDetailsQueueComponentSpy = spyOn(component.childDetailsQueueComponent, 'addOrUpdatePicklistQueueItem');

      const fakeRobotGroupId = Guid.create();
      const pickListItemUpdate = {} as IPicklistQueueItemNonstandardJson;
      pickListItemUpdate.DeviceId = 1;
      pickListItemUpdate.PickPriorityIdentity = 1;
      const itemPicklistLines: NonstandardJsonArray<IItemPicklistLine> = {$values: []};
      const availableOutputDeviceList: NonstandardJsonArray<OutputDevice> = {$values: []};

      pickListItemUpdate.RobotPickGroupId = fakeRobotGroupId;
      pickListItemUpdate.ItemPicklistLines = itemPicklistLines;
      pickListItemUpdate.AvailableOutputDeviceList = availableOutputDeviceList;
      const fakeAddEvent = {PicklistQueueItem: pickListItemUpdate};


      picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject.next(fakeAddEvent);

      expect(childDetailsQueueComponentSpy).toHaveBeenCalledTimes(1);
    });

    it('should call child component to refresh/clear data on screen on list update with invalid group keys', () => {
      childDetailsQueueComponentSpy = spyOn(component.childDetailsQueueComponent, 'refreshDataOnScreen');

      const picklistItemsUpdate = {} as IPicklistQueueItemListUpdateMessage;
      picklistItemsUpdate.DeviceId = 1;
      picklistItemsUpdate.PickPriorityIdentity = 1;
      picklistItemsUpdate.AvailablePicklistQueueGroupKeys = {$values: [
        {
          DeviceId: 2,
          PickPriorityIdentity: 2
        }
      ]};
      picklistItemsUpdate.PicklistQueueItems = {$values: [
        {} as IPicklistQueueItemNonstandardJson
      ]};

      picklistsQueueEventConnectionService.picklistQueueItemListUpdateSubject.next(picklistItemsUpdate);

      expect(childDetailsQueueComponentSpy).toHaveBeenCalledTimes(1);
    });

    it('should ignore list update event as an invalid client', () => {
      childDetailsQueueComponentSpy = spyOn(component.childDetailsQueueComponent, 'refreshDataOnScreen');

      const picklistItemsUpdate = {} as IPicklistQueueItemListUpdateMessage;
      picklistItemsUpdate.DeviceId = 2;
      picklistItemsUpdate.PickPriorityIdentity = 2;
      picklistItemsUpdate.AvailablePicklistQueueGroupKeys = {$values: [
        {
          DeviceId: 1,
          PickPriorityIdentity: 1
        }
      ]};
      picklistItemsUpdate.PicklistQueueItems = {$values: [
        {} as IPicklistQueueItemNonstandardJson
      ]};

      picklistsQueueEventConnectionService.picklistQueueItemListUpdateSubject.next(picklistItemsUpdate);

      expect(childDetailsQueueComponentSpy).toHaveBeenCalledTimes(0);
    });

    it('should call child component to clear data on empty list update as a valid client', () => {
      childDetailsQueueComponentSpy = spyOn(component.childDetailsQueueComponent, 'refreshDataOnScreen');


      const picklistItemsUpdate = {} as IPicklistQueueItemListUpdateMessage;
      const ItemPicklistLines: NonstandardJsonArray<IItemPicklistLine> = {$values: []};
      const AvailableOutputDeviceList: NonstandardJsonArray<OutputDevice> = {$values: []};
      picklistItemsUpdate.DeviceId = 1;
      picklistItemsUpdate.PickPriorityIdentity = 1;
      picklistItemsUpdate.AvailablePicklistQueueGroupKeys = {$values: [
        {
          DeviceId: 1,
          PickPriorityIdentity: 1
        }
      ]};

      picklistItemsUpdate.PicklistQueueItems = {$values: [
      ]};

      picklistsQueueEventConnectionService.picklistQueueItemListUpdateSubject.next(picklistItemsUpdate);

      expect(childDetailsQueueComponentSpy).toHaveBeenCalledTimes(1);
    });


    it('should call child component to refresh data on list update as a valid client', () => {
      childDetailsQueueComponentSpy = spyOn(component.childDetailsQueueComponent, 'refreshDataOnScreen');

      const picklistItemsUpdate = {} as IPicklistQueueItemListUpdateMessage;
      const ItemPicklistLines: NonstandardJsonArray<IItemPicklistLine> = {$values: []};
      const AvailableOutputDeviceList: NonstandardJsonArray<OutputDevice> = {$values: []};
      picklistItemsUpdate.DeviceId = 1;
      picklistItemsUpdate.PickPriorityIdentity = 1;
      picklistItemsUpdate.AvailablePicklistQueueGroupKeys = {$values: [
        {
          DeviceId: 1,
          PickPriorityIdentity: 1
        }
      ]};

      picklistItemsUpdate.PicklistQueueItems = {$values: [
        {
          ItemPicklistLines,
          AvailableOutputDeviceList
        } as IPicklistQueueItemNonstandardJson
      ]};

      picklistsQueueEventConnectionService.picklistQueueItemListUpdateSubject.next(picklistItemsUpdate);

      expect(childDetailsQueueComponentSpy).toHaveBeenCalledTimes(1);
    });


    it('should call child component to remove item on remove event', () => {
      childDetailsQueueComponentSpy = spyOn(component.childDetailsQueueComponent, 'removePicklistQueueItemByOrderGroupKey');

      const removeMessage = {} as IRemovePicklistQueueItemMessage;

      picklistsQueueEventConnectionService.removePicklistQueueItemSubject.next(removeMessage);

      expect(childDetailsQueueComponentSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Output Eventing', () => {
    it('should set filter text on filter event', () => {
      const filterText = 'filter';

      component.onSearchTextFilter(filterText);

      expect(component.searchTextFilter).toBe(filterText);
    });

    it('should set muli-select mode off and call multi-select service to clear items on unselect all event', () => {
      const item = new PicklistQueueItem(null);
      const deselectEvent = {
        selectedValues: new Set(),
        changedValue: null,
        changeType: SelectionChangeType.unselected
      };

      component.onGridSelectionChanged(deselectEvent);

      expect(component.multiSelectMode).toBe(false);
      expect(xr2QueueMultiSelectService.clearActionDisableMap).toHaveBeenCalled();
    });

    it('should call multi-select service to add all items on select all event', () => {
      const nonReleasableItem = new PicklistQueueItem(null);
      const nonPrintableItem = new PicklistQueueItem(null);
      nonReleasableItem.Status = 3;
      nonReleasableItem.IsPrintable = true;
      nonReleasableItem.Saving = false;
      nonPrintableItem.IsPrintable = false;
      nonPrintableItem.Status = 1;
      nonPrintableItem.Saving = false;

      const selectEvent = {
        selectedValues: new Set([
          nonReleasableItem,
          nonPrintableItem
        ]),
        changedValue: null,
        changeType: SelectionChangeType.selected
      };

      component.onGridSelectionChanged(selectEvent);

      expect(component.multiSelectMode).toBe(true);
      expect(xr2QueueMultiSelectService.addToActionDisableMap).toHaveBeenCalled();
    });

    it('should turn multi-select mode off when deselecting 1 selected item', () => {
      const item = new PicklistQueueItem(null);
      const unselectEvent = {
        selectedValues: new Set(),
        changedValue: item,
        changeType: SelectionChangeType.unselected
      };

      component.onGridSelectionChanged(unselectEvent);

      expect(component.multiSelectMode).toBe(false);
    });

    it('should call multi-select service to remove item on deselect event', () => {
      const item1 = new PicklistQueueItem(null);
      const item2 = new PicklistQueueItem(null);
      const unselectEvent = {
        selectedValues: new Set([item1, item2]),
        changedValue: item1,
        changeType: SelectionChangeType.unselected
      };

      component.onGridSelectionChanged(unselectEvent);

      expect(component.multiSelectMode).toBe(true);
      expect(xr2QueueMultiSelectService.removeFromActionDisableMap).toHaveBeenCalled();
    });

    it('should call multi-select service to remove item and deselect item on remove event', () => {
      const item = new PicklistQueueItem(null);
      component.selectedItems = new Set<PicklistQueueItem>();
      component.selectedItems.add(item);
      component.picklistsQueueItems = of([item]);

      component.onRemoveMultiSelectEvent([item]);

      expect(component.selectedItems.has(item)).toBeFalsy();
      expect(xr2QueueMultiSelectService.removeFromActionDisableMap).toHaveBeenCalled();
      expect(component.multiSelectMode).toBeFalsy();
    });

    it('should call multi-select service to add item and select item on add event', () => {
      const item = new PicklistQueueItem(null);
      item.Status = 1;
      item.Saving = false;
      component.selectedItems = new Set<PicklistQueueItem>();
      component.selectedItems.add(item);

      component.onAddOrUpdateMultiSelectEvent([item]);

      expect(xr2QueueMultiSelectService.updateActionDisableMap).toHaveBeenCalled();
    });

    it('should call multi-select service to add item on select event', () => {
      const item = new PicklistQueueItem(null);
      item.Status = 1;
      item.Saving = false;
      const selectEvent = {
        selectedValues: new Set([
          item
        ]),
        changedValue: item,
        changeType: SelectionChangeType.selected
      };

      component.onGridSelectionChanged(selectEvent);

      expect(component.multiSelectMode).toBe(true);
      expect(xr2QueueMultiSelectService.addToActionDisableMap).toHaveBeenCalled();
    });
  });
});
