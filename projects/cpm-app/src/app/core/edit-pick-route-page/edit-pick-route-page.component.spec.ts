import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Location } from '@angular/common';
import { EditPickRoutePageComponent } from './edit-pick-route-page.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { SharedModule } from '../../shared/shared.module';
import { GridModule, ButtonActionModule, FooterModule, LayoutModule, PopupWindowService, PopupDialogService } from '@omnicell/webcorecomponents';
import { EditDeviceSequenceComponent } from '../edit-device-sequence/edit-device-sequence.component';
import { ActivatedRoute } from '@angular/router';
import { PickRoutesService } from '../../api-core/services/pick-routes.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { of, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { IPickRouteDetail } from '../../api-core/data-contracts/i-pickroute-detail';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { TextResultPopupComponent } from '../../shared/components/text-result-popup/text-result-popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('EditPickRoutePageComponent', () => {
  let component: EditPickRoutePageComponent;
  let fixture: ComponentFixture<EditPickRoutePageComponent>;
  let pickRoute: IPickRouteDetail = {
    AssignedPriorities: [],
    Description: 'Express Fill',
    PickRouteGuid: 'B29D8EC2-5D73-EA11-B8BB-005056893399',
    DeviceSequence: [],
    Id: 12
  };
  let devices: IDevice[] = [ ];
  let location: Partial<Location>;
  let popupWindowService: any;
  let popupDismissedSubject = new Subject<boolean>();
  let pickRoutesService: Partial<PickRoutesService>;
  let popupDialogService: Partial<PopupDialogService>;

  beforeEach(async(() => {
    location = { back: () => { } };
    spyOn(location, 'back');
    var popupResult: Partial<TextResultPopupComponent> = { dismiss: popupDismissedSubject };
    var showSpy = jasmine.createSpy('show').and.returnValue(popupResult);
    popupWindowService = { show: showSpy };

    var saveAsSpy = jasmine.createSpy('saveAs').and.returnValue(of({}));
    var saveSpy = jasmine.createSpy('save').and.returnValue(of({}));
    pickRoutesService = { get: () => of(pickRoute), saveAs: saveAsSpy, save: saveSpy };
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
    let routeDevice1: IDevice = {Id: 5, Description: 'routeDevice1'};
    let routeDevice2: IDevice = {Id: 8, Description: 'routeDevice2'};
    let otherDevice1: IDevice = {Id: 11, Description: 'otherDevice1'};
    let otherDevice2: IDevice = {Id: 14, Description: 'otherDevice2'};
    let deviceSequence1:IDeviceSequenceOrder = {SequenceOrder: 1, DeviceId: routeDevice1.Id, DeviceDescription: routeDevice1.Description};
    let deviceSequence2:IDeviceSequenceOrder = {SequenceOrder: 2, DeviceId: routeDevice2.Id, DeviceDescription: routeDevice2.Description};
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

  describe('onDeviceSequenceChanged', () => {
    it('should set newDevcieSequence', () => {
      var firstDevice: IDeviceSequenceOrder = { DeviceDescription: 'firstDevice', SequenceOrder: 999, DeviceId: 5};
      var secondDevice: IDeviceSequenceOrder = { DeviceDescription: 'secondDevice', SequenceOrder: 999, DeviceId: 6};
      var changedDeviceSequence: IDeviceSequenceOrder[] = [ firstDevice, secondDevice ];
      component.onDeviceSequenceChanged(changedDeviceSequence);
      expect(component.newDeviceSequence).toContain(jasmine.objectContaining({ SequenceOrder: 1, DeviceId: firstDevice.DeviceId, DeviceDescription: firstDevice.DeviceDescription }));
      expect(component.newDeviceSequence).toContain(jasmine.objectContaining({ SequenceOrder: 2, DeviceId: secondDevice.DeviceId, DeviceDescription: secondDevice.DeviceDescription }));
    });
  });

  describe('onSaveAsFailed', () => {
    it('should display error for duplicate name', () => {
      var error = new HttpErrorResponse({status: 500});
      component.onSaveAsFailed(error);
      expect(popupDialogService.showOnce).toHaveBeenCalled();
    });
  });
});
