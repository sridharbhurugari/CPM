import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Xr2QueueGroupingPageComponent } from './xr2-queue-grouping-page.component';
import { Xr2QueueGroupingHeaderComponent } from '../xr2-queue-grouping-header/xr2-queue-grouping-header.component';
import { Xr2GroupingQueueComponent } from '../xr2-grouping-queue/xr2-grouping-queue.component';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { Subject, of, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { Input, Component } from '@angular/core';
import { ButtonActionModule, SingleselectDropdownModule, GridModule, PopupDialogService, PopupDialogModule,
         FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { PicklistQueueGrouped } from '../model/picklist-queue-grouped';
import { IPicklistQueueGroupedNonstandardJson } from '../../api-xr2/events/i-picklist-queue-grouped-nonstandard-json';
import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { IPicklistQueueGrouped } from '../../api-xr2/data-contracts/i-picklist-queue-grouped';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('Xr2QueueGroupingPageComponent', () => {
  let component: Xr2QueueGroupingPageComponent;
  let fixture: ComponentFixture<Xr2QueueGroupingPageComponent>;
  let picklistsQueueEventConnectionService: Partial<PicklistsQueueEventConnectionService>;
  let picklistQueueService: Partial<PicklistsQueueService>;
  let spyChildchildGroupingQueueComponent: jasmine.Spy;

  let outputDevice: OutputDevice = {DeviceId: '1', IsActive: true, Label: 'XR2'};
  const availableOutputDeviceList = [ outputDevice ] as Array<OutputDevice>;
  const picklistQueueGrouped = new PicklistQueueGrouped(null);
  picklistQueueGrouped.PriorityCode = 'Patient';
  picklistQueueGrouped.DeviceId = 1;
  picklistQueueGrouped.AvailableOutputDeviceList = availableOutputDeviceList;
  const pickListQueueGroupedList = [picklistQueueGrouped] as IPicklistQueueGrouped[];

  picklistQueueService = {
    sendToRobotGrouped: () => of(),
    getGrouped: () => of(),
    getGroupedFiltered: () => of()
  };

  beforeEach(async(() => {
    picklistsQueueEventConnectionService = {
      picklistQueueGroupedListUpdateSubject: new Subject(),
      picklistQueueGroupedUpdateSubject: new Subject(),
      reloadPicklistQueueItemsSubject: new Subject()
    };

    spyOn(picklistQueueService, 'sendToRobotGrouped').and.returnValue(of(picklistQueueService));
    spyOn(picklistQueueService, 'getGrouped').and.returnValue(of(pickListQueueGroupedList));
    spyOn(picklistQueueService, 'getGroupedFiltered').and.returnValue(of(new PicklistQueueGrouped(null)));

    spyOn(picklistsQueueEventConnectionService.picklistQueueGroupedUpdateSubject, 'subscribe').and.callThrough();
    spyOn(picklistsQueueEventConnectionService.picklistQueueGroupedListUpdateSubject, 'subscribe').and.callThrough();
    spyOn(picklistsQueueEventConnectionService.reloadPicklistQueueItemsSubject, 'subscribe').and.callThrough();

    TestBed.configureTestingModule({
      declarations: [ Xr2QueueGroupingPageComponent, Xr2GroupingQueueComponent,
        Xr2QueueGroupingHeaderComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox,
        MockAppHeaderContainer, MockColHeaderSortable, MockCpClickableIconComponent, MockCpDataLabelComponent ],
      imports: [ GridModule, ButtonActionModule, SingleselectDropdownModule, PopupDialogModule, FooterModule, LayoutModule ],
      providers: [
        { provide: PicklistsQueueService, useValue: picklistQueueService },
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
    fixture = TestBed.createComponent(Xr2QueueGroupingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  describe('Services', () => {
    it('should call picklistQueueService', fakeAsync(() => {
      component.ngOnInit();
      tick();
      expect(picklistQueueService.getGrouped).toHaveBeenCalled();
    }));
  });

  describe('Eventing', () => {
    it('should subscribe to events', () => {
      expect(component).toBeTruthy();
      expect(picklistsQueueEventConnectionService.picklistQueueGroupedUpdateSubject.subscribe).toHaveBeenCalled();
      expect(picklistsQueueEventConnectionService.picklistQueueGroupedListUpdateSubject.subscribe).toHaveBeenCalled();
      expect(picklistsQueueEventConnectionService.reloadPicklistQueueItemsSubject.subscribe).toHaveBeenCalled();
    });

    it('should update on picklistQueueGroupedUpdateSubject event', fakeAsync(() => {
       spyChildchildGroupingQueueComponent =
         spyOn(component.childGroupingQueueComponent, 'updatePickListQueueGroupedGrouping');
       component.ngOnInit();
       tick();
       expect(picklistQueueService.getGrouped).toHaveBeenCalled();

       const availableOutputDeviceList: NonstandardJsonArray<OutputDevice> = {$values: []};
       const pickListQueueGroupedUpdate = {} as IPicklistQueueGroupedNonstandardJson;
       pickListQueueGroupedUpdate.PriorityCode = 'Patient';
       pickListQueueGroupedUpdate.DeviceId = 1;
       pickListQueueGroupedUpdate.AvailableOutputDeviceList = availableOutputDeviceList;

       const priorityCode = 'Patient';
       const deviceId = 1;
       const fakeUpdateEvent = {PicklistQueueGrouped: pickListQueueGroupedUpdate, PriorityCode: priorityCode, DeviceId: deviceId};
       picklistsQueueEventConnectionService.picklistQueueGroupedUpdateSubject.next(fakeUpdateEvent);
       tick(500);
       expect(spyChildchildGroupingQueueComponent).toHaveBeenCalled();
    }));

    it('should remove on picklistQueueGroupedUpdateSubject event', fakeAsync(() => {
      spyChildchildGroupingQueueComponent =
        spyOn(component.childGroupingQueueComponent, 'removePicklistQueueGroup');

      component.ngOnInit();
      component.childGroupingQueueComponent.picklistQueueGrouped = [];
      tick();
      expect(picklistQueueService.getGrouped).toHaveBeenCalled();

      const priorityCode = 'Patient';
      const deviceId = 1;
      const fakeUpdateEvent = {PicklistQueueGrouped: null, PriorityCode: priorityCode, DeviceId: deviceId};
      picklistsQueueEventConnectionService.picklistQueueGroupedUpdateSubject.next(fakeUpdateEvent);
      tick(500);
      expect(spyChildchildGroupingQueueComponent).toHaveBeenCalled();
    }));

    it('should refreshDataOnScreen with list on picklistQueueGroupedListUpdateSubject event', fakeAsync(() => {
      spyChildchildGroupingQueueComponent =
        spyOn(component.childGroupingQueueComponent, 'refreshDataOnScreen');

      component.ngOnInit();
      component.childGroupingQueueComponent.picklistQueueGrouped = [];
      tick();
      expect(picklistQueueService.getGrouped).toHaveBeenCalled();

      const availableOutputDeviceList: NonstandardJsonArray<OutputDevice> = {$values: []};
      const pickListQueueGroupedUpdate = {} as IPicklistQueueGroupedNonstandardJson;
      pickListQueueGroupedUpdate.PriorityCode = 'Patient';
      pickListQueueGroupedUpdate.DeviceId = 1;
      pickListQueueGroupedUpdate.AvailableOutputDeviceList = availableOutputDeviceList;

      const pickListQueueGroupedUpdateList: NonstandardJsonArray<IPicklistQueueGroupedNonstandardJson>
        = {$values: [ pickListQueueGroupedUpdate ]};

      const fakeListUpdateEvent = { PicklistQueueGroupedList: pickListQueueGroupedUpdateList };

      picklistsQueueEventConnectionService.picklistQueueGroupedListUpdateSubject.next(fakeListUpdateEvent);
      tick(500);
      expect(spyChildchildGroupingQueueComponent).toHaveBeenCalled();

    }));

    it('should refreshDataOnScreen with empty list on picklistQueueGroupedListUpdateSubject event', fakeAsync(() => {
      spyChildchildGroupingQueueComponent =
        spyOn(component.childGroupingQueueComponent, 'refreshDataOnScreen');

      component.ngOnInit();
      component.childGroupingQueueComponent.picklistQueueGrouped = [];
      tick();
      expect(picklistQueueService.getGrouped).toHaveBeenCalled();

      const pickListQueueGroupedUpdateList: NonstandardJsonArray<IPicklistQueueGroupedNonstandardJson>
        = {$values: [ ]};

      const fakeListUpdateEvent = { PicklistQueueGroupedList: pickListQueueGroupedUpdateList };

      picklistsQueueEventConnectionService.picklistQueueGroupedListUpdateSubject.next(fakeListUpdateEvent);
      tick(500);
      expect(spyChildchildGroupingQueueComponent).toHaveBeenCalled();

    }));

    it('should update search filter text on search filter event', () => {
      const filter = 'filter';

      component.onSearchTextFilter(filter);

      expect(component.searchTextFilter).toBe(filter);
    });
  });

  describe('Queue API Actions', () => {
    it('should call PicklistQueue service to send to robot grouped on release click', fakeAsync(() => {
      const fakePicklistQueueGrouped = new PicklistQueueGrouped(null);
      component.processRelease(fakePicklistQueueGrouped);
      tick();
      expect(picklistQueueService.sendToRobotGrouped).toHaveBeenCalledTimes(1);
    }));

    it('should call picklistqueue service and refresh data on specific grouping', fakeAsync(() => {
      const fakePicklistQueueGrouped = new PicklistQueueGrouped(null);
      fakePicklistQueueGrouped.PriorityCode = 'Patient';
      fakePicklistQueueGrouped.DeviceId  = 1;
      component.processRelease(fakePicklistQueueGrouped);
      tick();
      expect(picklistQueueService.getGroupedFiltered).toHaveBeenCalledTimes(1);
    }));
  });
});
