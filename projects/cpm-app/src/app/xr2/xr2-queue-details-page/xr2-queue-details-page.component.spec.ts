import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Xr2QueueDetailsPageComponent } from './xr2-queue-details-page.component';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { Xr2QueueDetailsHeaderComponent } from '../xr2-queue-details-header/xr2-queue-details-header.component';
import { Xr2DetailsQueueComponent } from '../xr2-details-queue/xr2-details-queue.component';
import { Input, Component } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Xr2QueueButtonPanelComponent } from '../xr2-queue-button-panel/xr2-queue-button-panel.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { ButtonActionModule, CheckboxModule, ComponentTypes, GridModule, PopupDialogModule, PopupDialogService,
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
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';
import { OutputDeviceAction } from '../../shared/enums/output-device-actions';

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

  beforeEach(async(() => {

    picklistsQueueEventConnectionService = {
      addOrUpdatePicklistQueueItemSubject: new Subject(),
      removePicklistQueueItemSubject: new Subject(),
      reloadPicklistQueueItemsSubject: new Subject()
    };

    picklistsQueueService = {
      get: jasmine.createSpy('get').and.returnValue(of()),
      skip: jasmine.createSpy('skip').and.returnValue(of(PicklistsQueueService)),
      sendToRobot: jasmine.createSpy('sendToRobot').and.returnValue(of(PicklistsQueueService)),
      printLabels: jasmine.createSpy('printLabels').and.returnValue(of(PicklistsQueueService))
    };

    spyOn(picklistsQueueEventConnectionService.reloadPicklistQueueItemsSubject, 'subscribe').and.callThrough();

    TestBed.configureTestingModule({
      declarations: [ Xr2QueueDetailsPageComponent, Xr2QueueDetailsHeaderComponent, Xr2DetailsQueueComponent,
        Xr2QueueButtonPanelComponent, MockCpClickableIconComponent, MockSearchBox, MockTranslatePipe,
        MockColHeaderSortable, MockSearchPipe, MockCpDataLabelComponent],
      imports: [SingleselectDropdownModule, CheckboxModule, GridModule, ButtonActionModule, PopupDialogModule],
      providers: [
        { provide: PicklistsQueueService, useValue: picklistsQueueService },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: { } },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Queue API Actions', () => {
    it('should call PicklistQueue service to send to robot on release click', () => {
      const item = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      item.ItemPicklistLines = [itemPicklistLine];
      component.selectedItems = new Set();

      component.processRelease([item]);

      expect(picklistsQueueService.sendToRobot).toHaveBeenCalledTimes(1);
      expect(item.Saving).toBeFalsy();
    });

    it('should call PicklistQueue service to reroute on reroute click on true dialogue result', () => {
      const item = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      item.ItemPicklistLines = [itemPicklistLine];
      component.selectedItems = new Set();
      const dialogueSpy = spyOn<any>(component, 'displayRerouteDialog').and.returnValue(of(true));

      component.processReroute([item]);

      expect(dialogueSpy).toHaveBeenCalledTimes(1);
      expect(picklistsQueueService.skip).toHaveBeenCalledTimes(1);
      expect(item.Saving).toBeFalsy();
    });

    it('should not reroute on false dialogue result', () => {
      const item = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      item.ItemPicklistLines = [itemPicklistLine];
      component.selectedItems = new Set();
      const dialogueSpy = spyOn<any>(component, 'displayRerouteDialog').and.returnValue(of(false));

      component.processReroute([item]);

      expect(dialogueSpy).toHaveBeenCalledTimes(1);
      expect(picklistsQueueService.skip).toHaveBeenCalledTimes(0);
    });

    it('should call PicklistQueue service to print label on print click', () => {
      const item = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      item.ItemPicklistLines = [itemPicklistLine];
      component.selectedItems = new Set();

      component.processPrint([item]);

      expect(picklistsQueueService.printLabels).toHaveBeenCalledTimes(1);
    });
  });

  describe('Eventing', () => {
    it('should set filter text on filter event', () => {
      const filterText = 'filter';

      component.onSearchTextFilter(filterText);

      expect(component.searchTextFilter).toBe(filterText);
    });

    it('should set muli-select mode off and clear action disable map on unselect all event', () => {
      const item = new PicklistQueueItem(null);
      component.actionPicklistItemsDisableMap = new Map([
        [OutputDeviceAction.Release, new Set<PicklistQueueItem>([item])],
       [OutputDeviceAction.Print, new Set<PicklistQueueItem>([item])],
       [OutputDeviceAction.Reroute, new Set<PicklistQueueItem>([item])],
      ]);
      const deselectEvent = {
        selectedValues: new Set(),
        changedValue: null,
        changeType: SelectionChangeType.unselected
      };

      component.onGridSelectionChanged(deselectEvent);

      expect(component.multiSelectMode).toBe(false);
      component.actionPicklistItemsDisableMap.forEach((picklistSet, action) => {
        expect(picklistSet.size).toBe(0);
      });
    });

    it('should set muli-select mode on and add selected picklist items to action disable map on select all event', () => {
      component.actionPicklistItemsDisableMap = new Map([
        [OutputDeviceAction.Release, new Set<PicklistQueueItem>()],
       [OutputDeviceAction.Print, new Set<PicklistQueueItem>()],
       [OutputDeviceAction.Reroute, new Set<PicklistQueueItem>()],
      ]);
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
      expect(component.actionPicklistItemsDisableMap.get(OutputDeviceAction.Release).size).toBe(1);
      expect(component.actionPicklistItemsDisableMap.get(OutputDeviceAction.Print).size).toBe(1);
      expect(component.actionPicklistItemsDisableMap.get(OutputDeviceAction.Reroute).size).toBe(0);
    });

    it('remove item from action disable map on deselect event', () => {
      const item = new PicklistQueueItem(null);
      component.actionPicklistItemsDisableMap = new Map([
        [OutputDeviceAction.Release, new Set<PicklistQueueItem>([item])],
       [OutputDeviceAction.Print, new Set<PicklistQueueItem>([item])],
       [OutputDeviceAction.Reroute, new Set<PicklistQueueItem>([item])],
      ]);

      const unselectEvent = {
        selectedValues: new Set(),
        changedValue: item,
        changeType: SelectionChangeType.unselected
      };

      component.onGridSelectionChanged(unselectEvent);

      expect(component.multiSelectMode).toBe(false);
      component.actionPicklistItemsDisableMap.forEach((picklistSet, action) => {
        expect(picklistSet.size).toBe(0);
      });
    });

    it('add item to action disable map on select event', () => {
      const item = new PicklistQueueItem(null);
      item.Status = 1;
      item.Saving = false;
      component.actionPicklistItemsDisableMap = new Map([
        [OutputDeviceAction.Release, new Set<PicklistQueueItem>()],
       [OutputDeviceAction.Print, new Set<PicklistQueueItem>()],
       [OutputDeviceAction.Reroute, new Set<PicklistQueueItem>()],
      ]);

      const selectEvent = {
        selectedValues: new Set([
          item
        ]),
        changedValue: item,
        changeType: SelectionChangeType.selected
      };

      component.onGridSelectionChanged(selectEvent);

      expect(component.multiSelectMode).toBe(true);
      expect(component.actionPicklistItemsDisableMap.get(OutputDeviceAction.Release).size).toBe(0);
      expect(component.actionPicklistItemsDisableMap.get(OutputDeviceAction.Print).size).toBe(1);
      expect(component.actionPicklistItemsDisableMap.get(OutputDeviceAction.Reroute).size).toBe(0);
    });
  });
});
