import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { Xr2QueueGroupingPageComponent } from './xr2-queue-grouping-page.component';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { Subject, of, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { ButtonActionModule, SingleselectDropdownModule, GridModule, PopupDialogService, PopupDialogModule,
         FooterModule, LayoutModule, LoggingService } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { DevicesService } from '../../api-core/services/devices.service';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { MockXr2QueueGroupingHeaderComponent } from '../../shared/testing/mock-xr2-queue-grouping-header-component.spec';
import { PicklistQueueGrouped } from '../model/picklist-queue-grouped';
import { IPicklistQueueGroupedNonstandardJson } from '../../api-xr2/events/i-picklist-queue-grouped-nonstandard-json';
import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { IPicklistQueueGrouped } from '../../api-xr2/data-contracts/i-picklist-queue-grouped';
import { Xr2GroupingQueueComponent } from '../xr2-grouping-queue/xr2-grouping-queue.component';
import { LogService } from '../../api-core/services/log-service';
import { Mock } from 'protractor/built/driverProviders';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { Guid } from 'guid-typescript';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';


describe('Xr2QueueGroupingPageComponent', () => {
  let component: Xr2QueueGroupingPageComponent;
  let fixture: ComponentFixture<Xr2QueueGroupingPageComponent>;
  let picklistsQueueEventConnectionService: Partial<PicklistsQueueEventConnectionService>;
  let picklistQueueService: Partial<PicklistsQueueService>;
  let devicesService: Partial<DevicesService>;

  let spyChildGroupingQueueComponent: jasmine.Spy;
  let selectedDeviceInformation: SelectableDeviceInfo;
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
    selectedDeviceInformation = new SelectableDeviceInfo(null);
    selectedDeviceInformation.DeviceId = 1;

    picklistsQueueEventConnectionService = {
      picklistQueueGroupedListUpdateSubject: new Subject(),
      picklistQueueGroupedUpdateSubject: new Subject(),
    };

    spyOn(picklistQueueService, 'sendToRobotGrouped').and.returnValue(of(picklistQueueService));
    spyOn(picklistQueueService, 'getGrouped').and.returnValue(of(pickListQueueGroupedList));
    spyOn(picklistQueueService, 'getGroupedFiltered').and.returnValue(of(new PicklistQueueGrouped(null)));

    devicesService = {
      getAllXr2Devices: () => of([])
    };

    spyOn(picklistsQueueEventConnectionService.picklistQueueGroupedUpdateSubject, 'subscribe').and.callThrough();
    spyOn(picklistsQueueEventConnectionService.picklistQueueGroupedListUpdateSubject, 'subscribe').and.callThrough();

    TestBed.configureTestingModule({
      declarations: [ Xr2QueueGroupingPageComponent, Xr2GroupingQueueComponent,
        MockXr2QueueGroupingHeaderComponent, MockTranslatePipe, MockSearchPipe,
        MockAppHeaderContainer, MockColHeaderSortable, MockCpClickableIconComponent, MockCpDataLabelComponent ],
      imports: [ GridModule, ButtonActionModule, SingleselectDropdownModule, PopupDialogModule, FooterModule, LayoutModule ],
      providers: [
        { provide: PicklistsQueueService, useValue: picklistQueueService },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useValue: { } },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: DevicesService, useValue: devicesService},
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
        { provide: LogService, useValue: { logMessageAsync: () => null } }
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
    });

    it('should update on picklistQueueGroupedUpdateSubject event', fakeAsync(() => {
       spyChildGroupingQueueComponent =
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
       expect(spyChildGroupingQueueComponent).toHaveBeenCalled();
    }));

    it('should remove on picklistQueueGroupedUpdateSubject event', fakeAsync(() => {
      spyChildGroupingQueueComponent =
        spyOn(component.childGroupingQueueComponent, 'removePicklistQueueGroup');

      component.ngOnInit();
      component.childGroupingQueueComponent.filteredPicklistQueueGrouped = [];
      tick();
      expect(picklistQueueService.getGrouped).toHaveBeenCalled();

      const priorityCode = 'Patient';
      const deviceId = 1;
      const fakeUpdateEvent = {PicklistQueueGrouped: null, PriorityCode: priorityCode, DeviceId: deviceId};
      picklistsQueueEventConnectionService.picklistQueueGroupedUpdateSubject.next(fakeUpdateEvent);
      tick(500);
      expect(spyChildGroupingQueueComponent).toHaveBeenCalled();
    }));

    it('should refreshDataOnScreen with list on picklistQueueGroupedListUpdateSubject event', fakeAsync(() => {
      spyChildGroupingQueueComponent =
        spyOn(component.childGroupingQueueComponent, 'refreshDataOnScreen');

      component.ngOnInit();
      component.childGroupingQueueComponent.filteredPicklistQueueGrouped = [];
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
      expect(spyChildGroupingQueueComponent).toHaveBeenCalled();

    }));

    it('should refreshDataOnScreen with empty list on picklistQueueGroupedListUpdateSubject event', fakeAsync(() => {
      spyChildGroupingQueueComponent =
        spyOn(component.childGroupingQueueComponent, 'refreshDataOnScreen');

      component.ngOnInit();
      component.childGroupingQueueComponent.filteredPicklistQueueGrouped = [];
      tick();
      expect(picklistQueueService.getGrouped).toHaveBeenCalled();

      const pickListQueueGroupedUpdateList: NonstandardJsonArray<IPicklistQueueGroupedNonstandardJson>
        = {$values: [ ]};

      const fakeListUpdateEvent = { PicklistQueueGroupedList: pickListQueueGroupedUpdateList };

      picklistsQueueEventConnectionService.picklistQueueGroupedListUpdateSubject.next(fakeListUpdateEvent);
      tick(500);
      expect(spyChildGroupingQueueComponent).toHaveBeenCalled();

    }));

    it('should update search filter text on search filter event', () => {
      const filter = 'filter';

      component.onSearchTextFilterEvent(filter);

      expect(component.searchTextFilter).toBe(filter);
    });
  });

  describe('Queue API Actions', () => {
    it('should call PicklistQueue service to send to robot grouped on release click and true dialog', fakeAsync(() => {
      const releaseDialogSpy = spyOn<any>(component, 'displayReleaseDialog').and.returnValue(of(true));
      const fakePicklistQueueGrouped = new PicklistQueueGrouped(null);
      fakePicklistQueueGrouped.DeviceId = 1;
      fakePicklistQueueGrouped.PriorityCode = 'Patient';
      component.processRelease(fakePicklistQueueGrouped);
      tick(500);
      expect(picklistQueueService.sendToRobotGrouped).toHaveBeenCalledTimes(1);
    }));

    it('should not call PicklistQueue service to send to robot grouped on release click and false dialog', fakeAsync(() => {
      const releaseDialogSpy = spyOn<any>(component, 'displayReleaseDialog').and.returnValue(of(false));
      const fakePicklistQueueGrouped = new PicklistQueueGrouped(null);
      fakePicklistQueueGrouped.DeviceId = 1;
      fakePicklistQueueGrouped.PriorityCode = 'Patient';
      component.processRelease(fakePicklistQueueGrouped);
      tick(500);
      expect(picklistQueueService.sendToRobotGrouped).toHaveBeenCalledTimes(0);
    }));

    it('should call picklistqueue service and refresh data on specific grouping', fakeAsync(() => {
      const releaseDialogSpy = spyOn<any>(component, 'displayReleaseDialog').and.returnValue(of(true));
      const fakePicklistQueueGrouped = new PicklistQueueGrouped(null);
      fakePicklistQueueGrouped.PriorityCode = 'Patient';
      fakePicklistQueueGrouped.DeviceId  = 1;
      component.processRelease(fakePicklistQueueGrouped);
      tick(500);
      expect(picklistQueueService.getGroupedFiltered).toHaveBeenCalledTimes(1);
    }));

    it('should call filterPicklistQueueGroupedByDeviceId  when onDeviceSelectionChanged', () => {
      spyChildGroupingQueueComponent =
      spyOn(component.childGroupingQueueComponent, 'loadAllPicklistQueueGrouped');
      let selectedDeviceInfo = new SelectableDeviceInfo(null);
      selectedDeviceInfo.DeviceId = 0;
      selectedDeviceInfo.Description = '';
      selectedDeviceInfo.DefaultOwnerName = '';
      selectedDeviceInfo.IsActive = true;
      selectedDeviceInfo.CurrentLeaseHolder = Guid.create();

      component.selectedDeviceInformation = selectedDeviceInfo;

      let selectedDeviceInfoNew = new SelectableDeviceInfo(null);
      selectedDeviceInfo.DeviceId = 1;
      selectedDeviceInfo.Description = '';
      selectedDeviceInfo.DefaultOwnerName = '';
      selectedDeviceInfo.IsActive = true;
      selectedDeviceInfo.CurrentLeaseHolder = Guid.create();

      component.onDeviceSelectionChanged(selectedDeviceInfoNew);

      expect(spyChildGroupingQueueComponent).toHaveBeenCalledTimes(1);
    });

    it('should save config and emit on processDetailsNavigate', () => {
      const continueSpy = spyOn(component.detailsPageContinueEvent, 'emit');
      const configUpdateSpy = spyOn(component.xr2PageConfigurationUpdateEvent, 'emit');
      const navparams = {} as IXr2QueueNavigationParameters;
      navparams.deviceId = '1';
      navparams.pickPriorityIdentity = 'dummy';
      component.processDetailsNavigate(navparams);
      expect(continueSpy).toHaveBeenCalledTimes(1);
      expect(configUpdateSpy).toHaveBeenCalledTimes(1);
    });

    it('should set columnHeaderSort on event', () => {
      const fakeEvent = {} as IColHeaderSortChanged;
      fakeEvent.ColumnPropertyName = 'Test';
      fakeEvent.SortDirection = 'asc';
      component.onSortEvent(fakeEvent);
      expect(component.colHeaderSort.ColumnPropertyName).toBe('Test');
      expect(component.colHeaderSort.SortDirection).toBe('asc');
    });
  });
});
