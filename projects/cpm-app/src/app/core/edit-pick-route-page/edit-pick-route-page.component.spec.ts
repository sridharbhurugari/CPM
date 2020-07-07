import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Location } from '@angular/common';
import { EditPickRoutePageComponent } from './edit-pick-route-page.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { SharedModule } from '../../shared/shared.module';
import { GridModule, ButtonActionModule, FooterModule, LayoutModule,
  PopupWindowService, PopupDialogService } from '@omnicell/webcorecomponents';
import { EditDeviceSequenceComponent } from '../edit-device-sequence/edit-device-sequence.component';
import { ActivatedRoute } from '@angular/router';
import { PickRoutesService } from '../../api-core/services/pick-routes.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { of, Subject, ReplaySubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { IPickRouteDetail } from '../../api-core/data-contracts/i-pickroute-detail';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { TextResultPopupComponent } from '../../shared/components/text-result-popup/text-result-popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OcsStatusService } from '../../api-core/services/ocs-status.service';
import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';

describe('EditPickRoutePageComponent', () => {
  let component: EditPickRoutePageComponent;
  let fixture: ComponentFixture<EditPickRoutePageComponent>;
  const pickRoute: IPickRouteDetail = {
    AssignedPriorities: [],
    Description: 'Express Fill',
    PickRouteGuid: 'B29D8EC2-5D73-EA11-B8BB-005056893399',
    DeviceSequence: [],
    Id: 12,
    IsDefault: false,
  };
  const devices: IDevice[] = [ ];
  let location: Partial<Location>;
  let popupWindowService: any;
  const popupDismissedSubject = new Subject<boolean>();
  let pickRoutesService: Partial<PickRoutesService>;
  let popupDialogService: Partial<PopupDialogService>;

  beforeEach(async(() => {
    location = { back: () => { } };
    spyOn(location, 'back');
    const popupResult: Partial<TextResultPopupComponent> = { dismiss: popupDismissedSubject };
    const showSpy = jasmine.createSpy('show').and.returnValue(popupResult);
    popupWindowService = { show: showSpy };

    const saveAsSpy = jasmine.createSpy('saveAs').and.returnValue(of({}));
    const saveSpy = jasmine.createSpy('save').and.returnValue(of({}));
    const deleteSpy = jasmine.createSpy('delete').and.returnValue(of({}));
    pickRoutesService = { get: () => of(pickRoute), saveAs: saveAsSpy, save: saveSpy, delete: deleteSpy };
    popupDialogService = { showOnce: jasmine.createSpy('showOnce') };
    TestBed.configureTestingModule({
      declarations: [ EditPickRoutePageComponent, MockTranslatePipe, EditDeviceSequenceComponent ],
      imports: [
        GridModule,
        SharedModule,
        ButtonActionModule,
        LayoutModule,
        FooterModule,
        FormsModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap : { get: () => '' } } } },
        { provide: PickRoutesService, useValue: pickRoutesService },
        { provide: DevicesService, useValue: { get: () => of(devices) } },
        { provide: Location, useValue: location },
        { provide: PopupWindowService, useValue: popupWindowService },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: CoreEventConnectionService, useValue:
          { 
            openEventConnection: () => {},
            ocsIsHealthySubject: new Subject(),
            startedSubject: new ReplaySubject(),
          }},
        { provide: OcsStatusService, useValue: { requestStatus: () => '' } },
      ],
    })
    .overrideComponent(EditDeviceSequenceComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPickRoutePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given some devices in route and some devices not in route', () => {
    const routeDevice1: IDevice = {Id: 5, Description: 'routeDevice1'};
    const routeDevice2: IDevice = {Id: 8, Description: 'routeDevice2'};
    const otherDevice1: IDevice = {Id: 11, Description: 'otherDevice1'};
    const otherDevice2: IDevice = {Id: 14, Description: 'otherDevice2'};
    const deviceSequence1: IDeviceSequenceOrder = {
      SequenceOrder: 1,
      DeviceId: routeDevice1.Id,
      DeviceDescription: routeDevice1.Description};
    const deviceSequence2: IDeviceSequenceOrder = {
      SequenceOrder: 2,
      DeviceId: routeDevice2.Id,
      DeviceDescription: routeDevice2.Description};
    beforeEach(() => {
      devices.push(routeDevice1);
      devices.push(routeDevice2);
      devices.push(otherDevice1);
      devices.push(otherDevice2);
      pickRoute.DeviceSequence.push(deviceSequence1);
      pickRoute.DeviceSequence.push(deviceSequence2);
    });

    it('should set enabled devices to devices in route', () => {
      component.enabledDevices$.subscribe(x => {
        expect(x).toContain(deviceSequence1);
      });
      component.enabledDevices$.subscribe(x => {
        expect(x).toContain(deviceSequence2);
      });
    });

    it('should set disabled devices to devices not in route', () => {
      component.disabledDevices$.subscribe(x => {
        expect(x).toContain(jasmine.objectContaining({ DeviceId: otherDevice1.Id, DeviceDescription: otherDevice1.Description }));
      });
      component.disabledDevices$.subscribe(x => {
        expect(x).toContain(jasmine.objectContaining({ DeviceId: otherDevice2.Id, DeviceDescription: otherDevice2.Description }));
      });
    });
  });

  describe('navigateBack', () => {
    it('should call location.back', () => {
      component.navigateBack();
      expect(location.back).toHaveBeenCalled();
    });
  });

  describe('saveAs', () => {
    beforeEach(() => {
      component.ocsIsHealthy = true;
      component.saveAs();
    });

    it('should show popup for new name entry', () => {
      expect(popupWindowService.show).toHaveBeenCalled();
    });

    describe('given new name entry popup dismissed with ok', () => {
      it('should call pickRoutesService.saveAs', () => {
        popupDismissedSubject.next(true);
        expect(pickRoutesService.saveAs).toHaveBeenCalled();
      });
    });

    describe('given new name entry popup dismissed with cancel', () => {
      it('should not call pickRoutesService.saveAs', () => {
        popupDismissedSubject.next(false);
        expect(pickRoutesService.saveAs).not.toHaveBeenCalled();
      });
    });
  });

  describe('save', () => {
    beforeEach(() => {
      component.save();
    });

    it('should show popup for confirm save', () => {
      expect(popupWindowService.show).toHaveBeenCalled();
    });

    describe('given confirm save popup dismissed with ok', () => {
      it('should call pickRoutesService.save', () => {
        popupDismissedSubject.next(true);
        expect(pickRoutesService.save).toHaveBeenCalled();
      });
    });

    describe('given confirm save popup dismissed with cancel', () => {
      it('should not call pickRoutesService.save', () => {
        popupDismissedSubject.next(false);
        expect(pickRoutesService.save).not.toHaveBeenCalled();
      });
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      component.delete();
    });

    it('should show popul for confirm delete', () => {
      expect(popupWindowService.show).toHaveBeenCalled();
    });

    describe('given confirm delete popup dismissed with ok', () => {
      it('should call pickRoutesService.delete', () => {
        popupDismissedSubject.next(true);
        expect(pickRoutesService.delete).toHaveBeenCalled();
      });
    });

    describe('given confirm delete popup dismissed with cancel', () => {
      it('should not call pickRoutesService.delete', () => {
        popupDismissedSubject.next(false);
        expect(pickRoutesService.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe('onDeviceSequenceChanged', () => {
    it('should set newDevcieSequence', () => {
      const firstDevice: IDeviceSequenceOrder = { DeviceDescription: 'firstDevice', SequenceOrder: 999, DeviceId: 5};
      const secondDevice: IDeviceSequenceOrder = { DeviceDescription: 'secondDevice', SequenceOrder: 999, DeviceId: 6};
      const changedDeviceSequence: IDeviceSequenceOrder[] = [ firstDevice, secondDevice ];
      component.onDeviceSequenceChanged(changedDeviceSequence);
      expect(component.newDeviceSequence).toContain(jasmine.objectContaining({
         SequenceOrder: 1,
         DeviceId: firstDevice.DeviceId,
         DeviceDescription: firstDevice.DeviceDescription }));
      expect(component.newDeviceSequence).toContain(jasmine.objectContaining({
        SequenceOrder: 2,
        DeviceId: secondDevice.DeviceId,
        DeviceDescription: secondDevice.DeviceDescription }));
    });
  });

  describe('onSaveAsFailed', () => {
    it('should display error for duplicate name', () => {
      const error = new HttpErrorResponse({status: 500});
      component.onSaveAsFailed(error);
      expect(popupDialogService.showOnce).toHaveBeenCalled();
    });
  });
});
