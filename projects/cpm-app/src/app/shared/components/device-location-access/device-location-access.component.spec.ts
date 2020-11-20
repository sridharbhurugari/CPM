import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLocationAccessComponent } from './device-location-access.component';
import { ButtonActionModule, PopupDialogService, SvgIconModule } from '@omnicell/webcorecomponents';
import { DeviceLocationAccessService } from '../../services/devices/device-location-access.service';
import { TranslateService } from '@ngx-translate/core';
import { DeviceLeaseService } from '../../services/devices/device-lease.service';
import { of } from 'rxjs';
import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';
import { EventEmitter } from '@angular/core';
import { CarouselLocationAccessService } from '../../services/devices/carousel-location-access.service';
import { DeviceLocationTypeId } from '../../constants/device-location-type-id';

describe('DeviceLocationAccessComponent', () => {
  let component: DeviceLocationAccessComponent;
  let fixture: ComponentFixture<DeviceLocationAccessComponent>;
  let deviceLocationAccessService: DeviceLocationAccessService;
  let dialogService: PopupDialogService;
  let deviceLeaseService: DeviceLeaseService;
  let primaryButtonEventEmitter: EventEmitter<string>;
  let secondaryButtonEventEmitter: EventEmitter<string>;

  beforeEach(async(() => {
    primaryButtonEventEmitter = new EventEmitter<string>();
    secondaryButtonEventEmitter = new EventEmitter<string>();
    let carouselServiceMock: Partial<CarouselLocationAccessService> = {
      deviceLocationTypeId: DeviceLocationTypeId.Carousel,
      accessLocation: () => { return of(DeviceLocationAccessResult.Succeeded); },
    };
    TestBed.configureTestingModule({
      declarations: [ DeviceLocationAccessComponent ],
      imports: [
        ButtonActionModule, SvgIconModule
      ],
      providers: [
        { provide: DeviceLocationAccessService, useValue: { } },
        { provide: DeviceLeaseService, useValue: { } },
        { provide: PopupDialogService, useValue: { } },
        { provide: TranslateService, useValue: { get: (x: string) => of(`${x}_translated`) } },
        { provide: CarouselLocationAccessService, useValue: carouselServiceMock },
      ],
    })
    .compileComponents();
    deviceLocationAccessService = TestBed.get(DeviceLocationAccessService);
    dialogService = TestBed.get(PopupDialogService);
    dialogService.showOnce = jasmine.createSpy('showOnce').and.returnValue({
      didClickPrimaryButton: primaryButtonEventEmitter,
      didClickSecondaryButton: secondaryButtonEventEmitter,
    });
    deviceLeaseService = TestBed.get(DeviceLeaseService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceLocationAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('set deviceLocationAccessData', () => {
    describe('given device access succeeded', () => {
      beforeEach(() => {
        deviceLocationAccessService.accessLocation = jasmine.createSpy('accessLocation').and.returnValue(of(DeviceLocationAccessResult.Succeeded));
      });

      it('should call deviceLocationAccessService.accessLocation', () => {
        var data: any = {};
        component.deviceLocationAccessData = data;
        expect(deviceLocationAccessService.accessLocation).toHaveBeenCalled();
      });
    });

    describe('given device access returns device offline', () => {
      beforeEach(() => {
        deviceLocationAccessService.accessLocation = jasmine.createSpy('accessLocation').and.returnValue(of(DeviceLocationAccessResult.DeviceNotOnline));
      });

      it('should display error', () => {
        var data: any = {};
        component.deviceLocationAccessData = data;
        expect(dialogService.showOnce).toHaveBeenCalledWith(jasmine.objectContaining({ uniqueId: 'Device-Offline' }));
      });
    });

    describe('given device access returns lease not available', () => {
      beforeEach(() => {
        deviceLocationAccessService.accessLocation = jasmine.createSpy('accessLocation').and.returnValue(of(DeviceLocationAccessResult.LeaseNotAvailable));
      });

      it('should call display request lease prompt', () => {
        var data: any = {};
        component.deviceLocationAccessData = data;
        expect(dialogService.showOnce).toHaveBeenCalledWith(jasmine.objectContaining({ uniqueId: 'Request-Lease' }));
      });

      describe('and user requests lease', () => {
        beforeEach(() => {
          deviceLeaseService.requestLease = jasmine.createSpy('requestLease').and.returnValue(of(true));
          var data: any = {};
          component.deviceLocationAccessData = data;
          primaryButtonEventEmitter.emit('');
        });

        it('should call deviceLeaseService.requestLease', () => {
          expect(deviceLeaseService.requestLease).toHaveBeenCalled();
        });
      });

      describe('and user does not request lease', () => {
        beforeEach(() => {
          deviceLeaseService.requestLease = jasmine.createSpy('requestLease').and.returnValue(of(true));
          var data: any = {};
          component.deviceLocationAccessData = data;
          secondaryButtonEventEmitter.emit('');
        });

        it('should not call deviceLeaseService.requestLease', () => {
          expect(deviceLeaseService.requestLease).not.toHaveBeenCalled();
        });
      });
    });
  });

});
