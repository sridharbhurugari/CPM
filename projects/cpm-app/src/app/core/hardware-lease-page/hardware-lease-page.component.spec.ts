import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareLeasePageComponent } from './hardware-lease-page.component';
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { of } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PopupDialogService } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { LeaseVerificationResult } from '../../api-core/data-contracts/lease-verification-result';
import { DeviceConfigurationList } from '../model/device-configuration-list';
import { nameof } from '../../shared/functions/nameof';

describe('HardwareLeasePageComponent', () => {
  let component: HardwareLeasePageComponent;
  let fixture: ComponentFixture<HardwareLeasePageComponent>;
  let hardwareLeaseService: Partial<HardwareLeaseService>;
  const leaseVerificationResult: LeaseVerificationResult = 1;
  let popupDialogService: Partial<PopupDialogService>;

  const devicePropertyName = nameof<DeviceConfigurationList>('DeviceDescription');
  const deviceOwnerPropertyName = nameof<DeviceConfigurationList>('DefaultOwnerShortname');
  const columnPropertyName = '';

  const displayDeviceConfigurationList: DeviceConfigurationList[] = [];

  beforeEach(async(() => {
    popupDialogService = { showOnce: jasmine.createSpy('showOnce') };
    hardwareLeaseService = { HasDeviceLease: () => of(leaseVerificationResult) };

    TestBed.configureTestingModule({
      declarations: [ HardwareLeasePageComponent ],
      providers: [
        {provide: HardwareLeaseService, useValue: hardwareLeaseService},
        { provide: WpfActionControllerService, useValue: { } },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: TranslateService, useValue: { get: () => of('') }},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareLeasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
