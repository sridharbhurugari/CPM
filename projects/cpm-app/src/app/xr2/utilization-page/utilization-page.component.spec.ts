import { EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { finalize, catchError, map, shareReplay, tap, takeUntil } from 'rxjs/operators';
import { UtilizationService } from '../../api-xr2/services/utilization.service';
import { nameof } from '../../shared/functions/nameof';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { UtilizationEventConnectionService } from '../services/utilization-event-connection.service';
import { UtilizationDataEvent } from '../model/utilization-data-event';
import { TranslateService } from '@ngx-translate/core';
import { ProgressAnimationComponent, FooterModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { MockUtilizationHeaderComponent } from '../../shared/testing/mock-utilization-header-component.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { UtilizationPageComponent } from './utilization-page.component';
import { WindowService } from '../../shared/services/window-service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { UnassignedMedicationInfo } from '../model/utilization-unassigned-medication-info';
import { ExpiringMedicationInfo } from '../model/utilization-expiring-medication-info';
import { doesNotThrow } from 'assert';
import { ErroredMedicationInfo } from '../model/utilization-errored-medication-info';
import { EventEventId } from '../../shared/constants/event-event-id';
import { stubFalse } from 'lodash';
import { Xr2StorageCapacityDisplay } from '../model/xr2-storage-capacity-display';
/*
describe('UtilizationPageComponent', () => {
  let component: UtilizationPageComponent ;
  let fixture: ComponentFixture<UtilizationPageComponent>;
  let translateService: Partial<TranslateService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let utilizationService: Partial<UtilizationService>;
  let utilizationEventConnectionService: Partial<UtilizationEventConnectionService>;

  beforeEach(async(() => {
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService))
    };
    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };
    utilizationService = {
      get: jasmine.createSpy('get').and.returnValue(of(UtilizationService)),
    };

    utilizationEventConnectionService = {
      UtilizationIncomingDataSubject: new Subject<UtilizationDataEvent>(),
      UtilizationIncomingDataErrorSubject: new Subject<any>(),
      Xr2StorageCapacityDisplayEventSubject: new Subject<Xr2StorageCapacityDisplay[]>(),
      ngUnsubscribe: new Subject()
    };

    TestBed.configureTestingModule({
      declarations: [ UtilizationPageComponent, MockUtilizationHeaderComponent, ProgressAnimationComponent, MockTranslatePipe ],
      imports: [ ButtonActionModule,
        FooterModule ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: UtilizationService, useValue: utilizationService},
        { provide: UtilizationEventConnectionService, useValue: utilizationEventConnectionService},
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() } },
        { provide: WindowService, useValue: { getHash: () => '' } }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDataReceived NotAssigned', () => {

    beforeEach(() => {
      component.notAssignedItems = 0;
      component.notAssignedDoses = 0;
      component.notAssignedLoaded = false;
      component.selectedDeviceInformation.DeviceId = 4;
    });

    it('Check when empty', () => {
      let data: UnassignedMedicationInfo[]
      component.notAssignedData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.UnassignedMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data};
      component.onDataReceived(event);

      expect(component.notAssignedItems).toBe(0);
      expect(component.notAssignedDoses).toBe(0);
      expect(component.notAssignedLoaded).toBe(true);
    });

    it('Check Count and Sums', () => {
      let a1: UnassignedMedicationInfo = {
        ItemCode: 'a',
        PocketTypeId: 1,
        Inventory: 11
       };
       let b1: UnassignedMedicationInfo = {
        ItemCode: 'b',
        PocketTypeId: 1,
        Inventory: 21
       };
       let b2: UnassignedMedicationInfo = {
        ItemCode: 'b',
        PocketTypeId: 2,
        Inventory: 22
       };
      let data: UnassignedMedicationInfo[] = [ a1, b1, b2 ]
      component.notAssignedData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.UnassignedMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data};
      component.onDataReceived(event);

      expect(component.notAssignedItems).toBe(2);
      expect(component.notAssignedDoses).toBe(11 + 21 + 22);
      expect(component.notAssignedLoaded).toBe(true);
    });

    it('Check Different DeviceId gets rejected', () => {
      let a1: UnassignedMedicationInfo = {
        ItemCode: 'a',
        PocketTypeId: 1,
        Inventory: 11
       };
       let b1: UnassignedMedicationInfo = {
        ItemCode: 'b',
        PocketTypeId: 1,
        Inventory: 21
       };
       let b2: UnassignedMedicationInfo = {
        ItemCode: 'b',
        PocketTypeId: 2,
        Inventory: 22
       };
      let data: UnassignedMedicationInfo[] = [ a1, b1, b2 ]
      component.notAssignedData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.UnassignedMedsReceived,
        DeviceId: 999,
        EventDateTime: new Date(),
        UtilizationData: data};
      component.onDataReceived(event);

      expect(component.notAssignedItems).toBe(0);
      expect(component.notAssignedDoses).toBe(0);
      expect(component.notAssignedLoaded).toBe(false);
    });

    it('Check for Error', () => {
      component.onDataReceived(null);
      expect(component.screenState).toBe(UtilizationPageComponent.ListState.Error);
    });
  });

  describe('Set PocketsWithErrors', () => {

    beforeEach(() => {
      component.pocketsWithErrorsLoaded = false;
      component.selectedDeviceInformation.DeviceId = 4;
    });

    it('Check when empty', () => {
      let data: ErroredMedicationInfo[];
      component.pocketsWithErrorsData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ErroredMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data};
      component.onDataReceived(event);

      expect(component.pocketsWithErrorsItems).toBe(0);
      expect(component.pocketsWithErrorsDoses).toBe(0);
      expect(component.pocketsWithErrorsLoaded).toBe(true);
    });

    it('Check Count and Sums', () => {
      let a1: ErroredMedicationInfo = {
        ItemCode: 'a',
        PocketTypeId: 1,
        ErrorsCount: 11
       };
       let b1: ErroredMedicationInfo = {
        ItemCode: 'b',
        PocketTypeId: 1,
        ErrorsCount: 21
       };
       let b2: ErroredMedicationInfo = {
        ItemCode: 'b',
        PocketTypeId: 2,
        ErrorsCount: 22
       };
      let data: ErroredMedicationInfo[] = [ a1, b1, b2 ]
      component.pocketsWithErrorsData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ErroredMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data};
      component.onDataReceived(event);

      expect(component.pocketsWithErrorsItems).toBe(2);
      expect(component.pocketsWithErrorsDoses).toBe(11 + 21 + 22);
      expect(component.pocketsWithErrorsLoaded).toBe(true);
    });
  });

  describe('Set Expired()', () => {

    beforeEach(() => {
      component.expiredLoaded = false;
      component.selectedDeviceInformation.DeviceId = 4;
    });

    it('Check when empty', () => {
      let data: ExpiringMedicationInfo[];
      component.expiringData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ExpiringMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data};
      component.onDataReceived(event);

      expect(component.expiredItems).toBe(0);
      expect(component.expiredDoses).toBe(0);
      expect(component.expiredLoaded).toBe(true);

      expect(component.expiringThisMonthItems).toBe(0);
      expect(component.expiringThisMonthDoses).toBe(0);
      expect(component.expiringThisMonthLoaded).toBe(true);
    });

    it('Check Count and Sums', () => {
      let a1: ExpiringMedicationInfo = {
        ExpiredCount: 11,
        ExpiringCount: 0,
        ItemCode: 'a',
        PocketTypeId: 1,
        Inventory: 111
       };
       let b1: ExpiringMedicationInfo = {
        ExpiredCount: 21,
        ExpiringCount: 2,
        ItemCode: 'b',
        PocketTypeId: 1,
        Inventory: 221
       };
       let b2: ExpiringMedicationInfo = {
        ExpiredCount: 22,
        ExpiringCount: 3,
        ItemCode: 'b',
        PocketTypeId: 2,
        Inventory: 222
       };
       let c1: ExpiringMedicationInfo = {
        ExpiredCount: 0,
        ExpiringCount: 4,
        ItemCode: 'c',
        PocketTypeId: 1,
        Inventory: 331
       };
      let data: ExpiringMedicationInfo[] = [ a1, b1, b2, c1 ]
      component.expiringData = data;
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ExpiringMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: data};
      component.onDataReceived(event);

      expect(component.expiredItems).toBe(2);
      expect(component.expiredDoses).toBe(11 + 21 + 22 + 0);
      expect(component.expiredLoaded).toBe(true);

      expect(component.expiringThisMonthItems).toBe(2);
      expect(component.expiringThisMonthDoses).toBe(0 + 2 + 3 + 4);
      expect(component.expiringThisMonthLoaded).toBe(true);
    });
  });

  it('onRefreshClick', () => {

    component.screenState = UtilizationPageComponent.ListState.Error;
    component.expiredLoaded = true;
    component.expiringThisMonthLoaded = true;
    component.notAssignedLoaded = true;
    component.pocketsWithErrorsLoaded = true;
    component.onRefreshClick();

    expect(utilizationService.get).toHaveBeenCalled();
    expect(component.screenState).not.toBe(UtilizationPageComponent.ListState.Error);
    expect(component.expiredLoaded).not.toBe(true);
    expect(component.expiringThisMonthLoaded).not.toBe(true);
    expect(component.notAssignedLoaded).not.toBe(true);
    expect(component.pocketsWithErrorsLoaded).not.toBe(true);

  });

  describe('onDataError', () => {

    beforeEach(() => {
      component.screenState = UtilizationPageComponent.ListState.WaitingForData;
      component.selectedDeviceInformation.DeviceId = 4;
    });
    it('Same Device', () => {
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ExpiringMedsReceived,
        DeviceId: 4,
        EventDateTime: new Date(),
        UtilizationData: null };
      component.onDataError(event);
      expect(component.screenState).toBe(UtilizationPageComponent.ListState.Error);
    });

    it('Wrong device', () => {
      let event: UtilizationDataEvent = {
        EventId: EventEventId.ExpiringMedsReceived,
        DeviceId: 999,
        EventDateTime: new Date(),
        UtilizationData: null };
      component.onDataError(event);
      expect(component.screenState).toBe(UtilizationPageComponent.ListState.WaitingForData);
    });
    it('Missing related event info', () => {
      component.onDataError(null);
      expect(component.screenState).toBe(UtilizationPageComponent.ListState.Error);
    });

  });

});
*/
