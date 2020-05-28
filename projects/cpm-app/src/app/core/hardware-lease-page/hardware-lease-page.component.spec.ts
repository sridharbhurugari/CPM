import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareLeasePageComponent } from './hardware-lease-page.component';
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { of, Subscription, Observable } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PopupDialogService, FooterModule, LayoutModule, GridModule, ButtonActionModule  } from '@omnicell/webcorecomponents';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LeaseVerificationResult } from '../../api-core/data-contracts/lease-verification-result';
import { DeviceConfigurationList } from '../model/device-configuration-list';
import { nameof } from '../../shared/functions/nameof';
import { SharedModule } from '../../shared/shared.module';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ActivatedRoute, Router, Params, NavigationExtras, RouterModule } from '@angular/router';
import { HardwareLeaseEventConnectionService } from '../../xr2/services/hardware-lease-event-connection.service';
import { SubjectSubscriber, Subject } from 'rxjs/internal/Subject';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { IDeviceConfiguration } from '../../api-core/data-contracts/i-device-configuration';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';
import { DeviceOperationResult } from '../../api-core/data-contracts/device-operation-result';
import { DeviceOperationOutcome } from '../../api-core/data-contracts/device-operation-outcome';
import { EventConnectionService } from '../../shared/services/event-connection.service';

describe('HardwareLeasePageComponent', () => {
  let component: HardwareLeasePageComponent;
  let fixture: ComponentFixture<HardwareLeasePageComponent>;
  let hardwareLeaseService: Partial<HardwareLeaseService>;
  let hardwareLeaseEventConnectionService: Partial<HardwareLeaseEventConnectionService>;
  let systemConfigurationService: Partial<SystemConfigurationService>;
  let popupDialogService: Partial<PopupDialogService>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let eventConnectionService: Partial<EventConnectionService>;

  const leaseVerificationResult: LeaseVerificationResult = 1;
  const deviceConfiguration: IDeviceConfiguration = {
      DefaultOwner: 'WRKS1',
      DeviceId: 1,
      Active: true,
      DefaultOwnerShortname: 'WRKS1',
      DeviceDescription: 'Device1',
      DeviceType: '',
      IsValid: true,
      Json: '',
      LeaseRequired: true,
      Model: '',
      Order: 1,
      PrinterName: '' };

  let configurationValue: IConfigurationValue = { Value: '15', Category: '', SubCategory: '' };

  const devicePropertyName = nameof<DeviceConfigurationList>('DeviceDescription');
  const deviceOwnerPropertyName = nameof<DeviceConfigurationList>('DefaultOwnerShortname');
  const displayDeviceConfigurationList: DeviceConfigurationList[] = [];
  let deviceOperationResult: DeviceOperationResult = { OutcomeText: '', Outcome: 5, IsSuccessful: false };
  let router: Partial<Router>;

  beforeEach(async(() => {
    popupDialogService = { showOnce: jasmine.createSpy('showOnce') };
    hardwareLeaseService = { HasDeviceLease: () => of(leaseVerificationResult),
      getDeviceConfiguration: () => of(deviceConfiguration),
      RequestDeviceLease: () => of(deviceOperationResult)  };
    hardwareLeaseEventConnectionService = {
      hardwareLeaseDeniedSubject: new Subject(),
      hardwareLeaseGrantedSubject: new Subject() };
    systemConfigurationService = { GetConfigurationValues: () => of(configurationValue) };
    wpfActionControllerService = {ExecuteBackAction: jasmine.createSpy('ExecuteBackAction')};
    router = {navigate: jasmine.createSpy('navigate') };

    eventConnectionService = {
      receivedSubject: new Subject()
    };

    TestBed.configureTestingModule({
      declarations: [ HardwareLeasePageComponent, MockTranslatePipe ],
      providers: [
        { provide: HardwareLeaseService, useValue: hardwareLeaseService },
        { provide: WpfActionControllerService, useValue: wpfActionControllerService },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: Router, useValue: router },
        { provide: HardwareLeaseEventConnectionService, useValue: hardwareLeaseEventConnectionService },
        { provide: SystemConfigurationService, useValue: systemConfigurationService },
        { provide: EventConnectionService, useValue: eventConnectionService}
      ],
      imports: [
        SharedModule, FooterModule, LayoutModule, ButtonActionModule, GridModule, RouterModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareLeasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have lease timeout of 17 seconds', () => {
    expect(component.hwTimeout).toEqual(17000);
  });

  it('should have 1 device in grid', () => {
    expect(component.displayDeviceConfigurationList.length).toEqual(1);
  });

  describe('navigateBack', () => {
    it('makes expected calls', () => {
      component.navigateBack();
      expect(wpfActionControllerService.ExecuteBackAction).toHaveBeenCalled();
    });
  });

  describe('Request Device Lease', () => {
    it('Fails and Displays failure Dialog', () => {
      deviceOperationResult = { OutcomeText: '', Outcome: 5, IsSuccessful: false };
      component.requestAccessClick();
      expect(popupDialogService.showOnce).toHaveBeenCalled();
    });

    it('Succeeds and Continues On', () => {
      component.deviceId = 1;
      component.routeToPath = 'guidedinvmgmt/cyclecount';
      deviceOperationResult = { OutcomeText: '',
        Outcome: DeviceOperationOutcome.DeviceOperationOutcome_DeviceLeaseNotRequired,
        IsSuccessful: true };
      component.requestAccessClick();
      expect(router.navigate).toHaveBeenCalledTimes(1);
    });

    it('Timeout Is setup when waiting for a lease.', () => {
      deviceOperationResult = { OutcomeText: '',
        Outcome: DeviceOperationOutcome.DeviceOperationOutcome_Successful,
        IsSuccessful: true };
      const spy = spyOn(component, 'SetupRequestDeviceLeaseTimeout');
      component.requestAccessClick();
      expect(spy).toHaveBeenCalled();
    });
  });
});
