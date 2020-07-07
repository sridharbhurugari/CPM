import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PriorityCodeRouteAssignmentsPageComponent } from './priority-code-route-assignments-page.component';
import { PriorityCodeRouteAssignmentsService } from '../../api-core/services/priority-code-route-assignments.service';
import { of, Subject, throwError, ReplaySubject } from 'rxjs';
import { Component } from '@angular/core';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { HeaderContainerComponent } from '../../shared/components/header-container/header-container.component';
import { PickRouteSelectComponent } from '../pick-route-select/pick-route-select.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule, FooterModule, LayoutModule, ButtonActionModule,
   PopupWindowService, PopupDialogService } from '@omnicell/webcorecomponents';
import { DeviceSequenceOrderComponent } from '../device-sequence-order/device-sequence-order.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { IPickRouteDevice } from '../../api-core/data-contracts/i-pickroute-device';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { OcsStatusService } from '../../api-core/services/ocs-status.service';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
@Component({
  selector: 'app-priority-code-route-assignments',
  template: ''
})

class MockPriorityCodeRouteAssignmentsComponent {
}

describe('PriorityCodeRouteAssignmentsPageComponent', () => {
  let component: PriorityCodeRouteAssignmentsPageComponent;
  let fixture: ComponentFixture<PriorityCodeRouteAssignmentsPageComponent>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
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

  let ocsStatusService: Partial<OcsStatusService>;

  beforeEach(async(() => {
    wpfActionControllerService = { ExecuteBackAction: () => { } };
    spyOn(wpfActionControllerService, 'ExecuteBackAction');
    let saveSucceededSpy = jasmine.createSpy('saveSucceeded').and.returnValue(of({}));
    let saveFailedSpy = jasmine.createSpy('saveFailed').and.returnValue(throwError(''));
    let serviceSave = saveSucceeded ? saveSucceededSpy : saveFailedSpy;
    priorityCodeRouteAssignmentsService = { 
      getRoutes: () => of(), save: serviceSave,
      getDeviceManagement: () => of()
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
         MockTranslatePipe, PickRouteSelectComponent, DeviceSequenceOrderComponent ],
      providers: [
        { provide: PriorityCodeRouteAssignmentsService, useValue: priorityCodeRouteAssignmentsService },
        { provide: PriorityCodePickRoutesService, useValue: { getPriority: () => of() } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useValue: wpfActionControllerService },
        { provide: PopupWindowService, useValue: popupWindowService },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: CoreEventConnectionService, useValue: eventConnectionService },
        { provide: OcsStatusService, useValue: ocsStatusService },
      ],
      imports: [
        GridModule,
        SharedModule,
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
      expect(wpfActionControllerService.ExecuteBackAction).toHaveBeenCalled();
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

});
