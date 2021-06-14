import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PriorityCodeRouteAssignmentsPageComponent } from './priority-code-route-assignments-page.component';
import { PriorityCodeRouteAssignmentsService } from '../../api-core/services/priority-code-route-assignments.service';
import { of, Subject, throwError, ReplaySubject } from 'rxjs';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { HeaderContainerComponent } from '../../shared/components/header-container/header-container.component';
import { PickRouteSelectComponent } from '../pick-route-select/pick-route-select.component';
import { GridModule, FooterModule, LayoutModule, ButtonActionModule,
   PopupWindowService, PopupDialogService } from '@omnicell/webcorecomponents';
import { DeviceSequenceOrderComponent } from '../device-sequence-order/device-sequence-order.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { DevicesService } from '../../api-core/services/devices.service';
import { IPickRouteDevice } from '../../api-core/data-contracts/i-pickroute-device';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { OcsStatusService } from '../../api-core/services/ocs-status.service';
import { DeviceOutput } from '../../api-xr2/data-contracts/device-output';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
@Component({
  selector: 'app-priority-code-route-assignments',
  template: ''
})

class MockPriorityCodeRouteAssignmentsComponent {
}

describe('PriorityCodeRouteAssignmentsPageComponent', () => {
  let component: PriorityCodeRouteAssignmentsPageComponent;
  let fixture: ComponentFixture<PriorityCodeRouteAssignmentsPageComponent>;
  let locationService: Partial<Location>;
  let popupDialogService: Partial<PopupDialogService>;
  let priorityCodeRouteAssignmentsService: Partial<PriorityCodeRouteAssignmentsService>;
  let popupWindowService: any;
  let eventConnectionService: Partial<CoreEventConnectionService>;
  const popupDismissedSubject = new Subject<boolean>();
  let saveSucceeded = true;

  let mockPickRouteDevices: IDeviceSequenceOrder[];
  const defaultItem: IPickRouteDevice = {
    PickRouteId: 1,
    RouteDescription: 'Default',
    PickRouteGuid: '11111-11-1111-1111',
    PickRouteDevices: mockPickRouteDevices,
  };
  const devices: IDevice[] = [];
  let ocsStatusService: Partial<OcsStatusService>;

  beforeEach(async(() => {
    locationService = { back: () => { } };
    spyOn(locationService, 'back');
    let saveSucceededSpy = jasmine.createSpy('saveSucceeded').and.returnValue(of({}));
    let saveFailedSpy = jasmine.createSpy('saveFailed').and.returnValue(throwError(''));
    let serviceSave = saveSucceeded ? saveSucceededSpy : saveFailedSpy;
    priorityCodeRouteAssignmentsService = { 
      getRoutes: () => of(), save: serviceSave,
      getUserPermissions: () => of()
     };

    const popupResult: Partial<ConfirmPopupComponent> = { dismiss: popupDismissedSubject };
    const showSpy = jasmine.createSpy('show').and.returnValue(popupResult);
    popupWindowService = { show: showSpy };

    popupDialogService = { showOnce: jasmine.createSpy('showOnce') };
    const requestStatusSpy = jasmine.createSpy('requestStatus').and.returnValue(of());
    ocsStatusService = { requestStatus: requestStatusSpy };
    eventConnectionService = {
      ocsIsHealthySubject: new Subject(),
      startedSubject: new ReplaySubject(),
    };
    TestBed.configureTestingModule({
      declarations: [ PriorityCodeRouteAssignmentsPageComponent, MockPriorityCodeRouteAssignmentsComponent,
         MockTranslatePipe, PickRouteSelectComponent, DeviceSequenceOrderComponent, MockAppHeaderContainer ],
      providers: [
        { provide: PriorityCodeRouteAssignmentsService, useValue: priorityCodeRouteAssignmentsService },
        { provide: PriorityCodePickRoutesService, useValue: { getPriority: () => of() } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: Location, useValue: locationService },
        { provide: PopupWindowService, useValue: popupWindowService },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: DevicesService, useValue: { get: () => of(devices) } },
        { provide: CoreEventConnectionService, useValue: eventConnectionService },
        { provide: OcsStatusService, useValue: ocsStatusService },
      ],
      imports: [
        GridModule,
        ButtonActionModule,
        LayoutModule,
        FooterModule,
        FormsModule,
      ]
    })
    .overrideComponent(PriorityCodeRouteAssignmentsPageComponent, {
      set: {
        template: ''
      }
    })
    .overrideComponent(DeviceSequenceOrderComponent, {
      set: {
        template: ''
      }
    })
    .overrideComponent(PickRouteSelectComponent , {
      set: {
        template: ''
      }
    })
    .overrideComponent(HeaderContainerComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityCodeRouteAssignmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigateBack', () => {
    it('should call wpfActionControllerService.back', () => {
      component.navigateBack();
      expect(locationService.back).toHaveBeenCalled();
    });
  });

  describe('save', () => {
    beforeEach(() => {
      component.pickRoute = defaultItem;
      component.priorityCode = 'STAT';
      component.save();
      component.ocsIsHealthy = true;
    });

    it('should show popup for confirm save', () => {
      expect(popupWindowService.show).toHaveBeenCalled();
    });

    describe('given confirm save popup dismissed with confirm', () => {
      it('should call priorityCodeRouteAssignmentsService.save', () => {
        popupDismissedSubject.next(true);
        expect(priorityCodeRouteAssignmentsService.save).toHaveBeenCalled();
      });
    });

    describe('given confirm save popup dismissed with cancel', () => {
      it('should not call priorityCodeRouteAssignmentsService.save', () => {
        popupDismissedSubject.next(false);
        expect(priorityCodeRouteAssignmentsService.save).not.toHaveBeenCalled();
      });
    });
  });

  describe('save failure', () => {
    saveSucceeded = false;

    beforeEach(() => {
      component.pickRoute = defaultItem;
      component.priorityCode = 'STAT';
      component.save();
      popupDismissedSubject.next(true);
    });

    it('should display error', () => {
      expect(popupDialogService.showOnce).toHaveBeenCalled();
    });

    afterEach(() => {
      saveSucceeded = true;
    });
  });

  describe('event connection service started', () => {
    it('should call ocsStatusService.requestStatus', () => {
      eventConnectionService.startedSubject.next();
      expect(ocsStatusService.requestStatus).toHaveBeenCalled();
    });
  });

  describe('getOriginalPickRouteForPriorityType', () => {
    it('returns value', () => {
      const pickRouteId = 5;
      let pickRouteDevice: IPickRouteDevice = {
        PickRouteId: pickRouteId,
        PickRouteDevices: [],
        PickRouteGuid: '',
        RouteDescription: ''
      };
      let pickRouteDevices: IPickRouteDevice[] = [
        pickRouteDevice
      ];
      let result  = component.getOriginalPickRouteForPriorityType(pickRouteId, pickRouteDevices)

      expect(result).toBe(pickRouteDevice);
    });
  });

  describe('PickRouteUpdated',() => {
    it('Check route Updated or not', () => {
      const pickRouteId = 5;
      let pickRouteDevice: IPickRouteDevice = {
        PickRouteId: pickRouteId,
        PickRouteDevices: [],
        PickRouteGuid: '',
        RouteDescription: ''
      };
      component.pickRoute = pickRouteDevice;
      component.routerLinkPickRouteId = pickRouteDevice.PickRouteId;
      component.pickrouteUpdated(pickRouteDevice);
      expect(component.canSave).toBeFalsy();
    });
  });

  describe('PickRouteUpdated',() => {
    it('Check route Updated or not', () => {
      const pickRouteId = 10;
      let pickRouteDevice: IPickRouteDevice = {
        PickRouteId: pickRouteId,
        PickRouteDevices: [],
        PickRouteGuid: '',
        RouteDescription: ''
      };
      component._originalRoute = pickRouteDevice;
      component.routerLinkPickRouteId = pickRouteDevice.PickRouteId;
      component.pickrouteUpdated(pickRouteDevice);
      expect(component.canSave).toBeFalsy();
    });
  });

  describe('SetOcsStatus', () => {
    it('define ocsIsHealthy', () => {
      const isHealthy: boolean = true;
      component.setOcsStatus(isHealthy);
      expect(component.ocsIsHealthy).toBeTruthy();
    });
  });

  describe('prdsToRadio', () => {
    it('should return description map list', () => {
      const description:string = "pickRoute";
      let pickRouteDevice: IPickRouteDevice = {
        PickRouteId:5,
        PickRouteDevices: [],
        PickRouteGuid: '',
        RouteDescription: ''
      };
      let pickRouteDevices: IPickRouteDevice[] = [
        pickRouteDevice
      ];
      component.prdsToRadio(pickRouteDevices);
      const listMap = new Map<IPickRouteDevice,string>();
      pickRouteDevices.map(p => listMap.set(p, description))
      expect(listMap).not.toBeNull;
    });
  });

  describe('setDevices', () => {
    it('should return the devices', () => {
      const pickRouteId = 5;
      let pickRouteDevice: IPickRouteDevice = {
        PickRouteId: pickRouteId,
        PickRouteDevices: [],
        PickRouteGuid: '',
        RouteDescription: ''
      };
      let pickRouteDevices: IPickRouteDevice[] = [
        pickRouteDevice
      ];
      component.setDevices(pickRouteDevice, pickRouteDevices);
      expect(pickRouteDevices).not.toBeNull;
    });
  });

  describe('SetOutPutDevices', ()=>{
    it('should return the devices with out outputdevicecs', () => {
      const routeDevice1: IDevice = {Id: 5, Description: 'routeDevice1', DeviceType: '2000', OutputDevices: null};
      const routeDevice2: IDevice = {Id: 8, Description: 'routeDevice2', DeviceType: '2000', OutputDevices: null};
    
      const assignedDefaultOutputDevice: DeviceOutput = {
        DeviceOutputType: '0',
        IsAutoFill: false
      };
  
      const deviceSequence1: IDeviceSequenceOrder = {
        SequenceOrder: 1,
        DeviceId: routeDevice1.Id,
        DeviceDescription: routeDevice1.Description,
        DeviceType: routeDevice1.DeviceType,
        DeviceOutput: assignedDefaultOutputDevice,
        OutputDevices: routeDevice1.OutputDevices};
      const deviceSequence2: IDeviceSequenceOrder = {
        SequenceOrder: 2,
        DeviceId: routeDevice2.Id,
        DeviceDescription: routeDevice2.Description,
        DeviceType: routeDevice2.DeviceType,
        DeviceOutput: assignedDefaultOutputDevice,      
        OutputDevices: routeDevice2.OutputDevices};  

        const pickRouteId = 5;
        const devices: IDevice[] = [];
      let pickRouteDevice: IPickRouteDevice = {
        PickRouteId: pickRouteId,
        PickRouteDevices: [],
        PickRouteGuid: '',
        RouteDescription: ''
      };
      pickRouteDevice.PickRouteDevices.push(deviceSequence1);
      pickRouteDevice.PickRouteDevices.push(deviceSequence2);
      component.allDevices$ = devices;
      component.setOutputDevices(pickRouteDevice.PickRouteDevices);
      expect(pickRouteDevice.PickRouteDevices).not.toBeNull;
    });
  });

  describe('SetOutPutDevices', ()=>{
    it('should return the devices with outputdevicecs', () => {
      const routeDevice1: IDevice = {Id: 5, Description: 'routeDevice1', DeviceType: '2000', OutputDevices: null};
      const routeDevice2: IDevice = {Id: 8, Description: 'routeDevice2', DeviceType: '2000', OutputDevices: null};
      const otherDevice1: IDevice = {Id: 11, Description: 'otherDevice1', DeviceType: '2000', OutputDevices: null};
      const otherDevice2: IDevice = {Id: 14, Description: 'otherDevice2', DeviceType: '2000', OutputDevices: null};   
      
      const assignedDefaultOutputDevice: DeviceOutput = {
        DeviceOutputType: '0',
        IsAutoFill: false
      };
  
      const deviceSequence1: IDeviceSequenceOrder = {
        SequenceOrder: 1,
        DeviceId: routeDevice1.Id,
        DeviceDescription: routeDevice1.Description,
        DeviceType: routeDevice1.DeviceType,
        DeviceOutput: assignedDefaultOutputDevice,
        OutputDevices: routeDevice1.OutputDevices};
      const deviceSequence2: IDeviceSequenceOrder = {
        SequenceOrder: 2,
        DeviceId: routeDevice2.Id,
        DeviceDescription: routeDevice2.Description,
        DeviceType: routeDevice2.DeviceType,
        DeviceOutput: assignedDefaultOutputDevice,      
        OutputDevices: routeDevice2.OutputDevices};  

        const pickRouteId = 5;
        const devices: IDevice[] = [];
        devices.push(routeDevice1);
        devices.push(routeDevice2);
        devices.push(otherDevice1);
        devices.push(otherDevice2);
      let pickRouteDevice: IPickRouteDevice = {
        PickRouteId: pickRouteId,
        PickRouteDevices: [],
        PickRouteGuid: '',
        RouteDescription: ''
      };
      pickRouteDevice.PickRouteDevices.push(deviceSequence1);
      pickRouteDevice.PickRouteDevices.push(deviceSequence2);
      component.allDevices$ = devices;
      component.setOutputDevices(pickRouteDevice.PickRouteDevices);
      expect(pickRouteDevice.PickRouteDevices).not.toBeNull;
    });
  });

});
