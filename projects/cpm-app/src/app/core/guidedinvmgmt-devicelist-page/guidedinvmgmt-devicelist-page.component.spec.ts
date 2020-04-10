import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GuidedInvMgmtDevicelistPageComponent } from './guidedinvmgmt-devicelist-page.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { GridModule, FooterModule, LayoutModule, SvgIconModule, SearchModule, ButtonActionModule, PopupDialogService } from '@omnicell/webcorecomponents';
import { SharedModule } from '../../shared/shared.module';
import { GuidedDeviceListService } from '../../api-core/services/guided-device-list-service';
import { of, Observable } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { TranslateService } from '@ngx-translate/core';
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { LeaseVerificationResult } from '../../api-core/data-contracts/lease-verification-result';
import { GuidedDeviceList } from '../model/guided-device-list';
import { IGuidedDeviceList } from '../../api-core/data-contracts/i-guided-device-list';

describe('GuidedinvmgmtDevicelistPageComponent', () => {
  let component: GuidedInvMgmtDevicelistPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtDevicelistPageComponent>;
  let popupDialogService: Partial<PopupDialogService>;
  let hardwareLeaseService: Partial<HardwareLeaseService>;
  let guidedDeviceListserice: Partial<GuidedDeviceListService>;

  let leaseVerificationResult: LeaseVerificationResult = 1;
  let translateService: Partial<TranslateService>;
  let devices: IGuidedDeviceList[] = [];

  beforeEach(async(() => {
    popupDialogService = { showOnce: jasmine.createSpy('showOnce') };
    hardwareLeaseService = { HasDeviceLease: () => of(leaseVerificationResult) };
    translateService = { get: () => of('dummyText') };
    guidedDeviceListserice = {get: () => of(devices) };

    TestBed.configureTestingModule({
      declarations: [ GuidedInvMgmtDevicelistPageComponent, MockTranslatePipe ],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule, SvgIconModule, SharedModule, ButtonActionModule],
      providers: [
        { provide: GuidedDeviceListService, useValue: guidedDeviceListserice },
        { provide: WpfActionControllerService, useValue: { } },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: TranslateService, useValue: translateService },
        { provide: HardwareLeaseService, useValue: hardwareLeaseService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidedInvMgmtDevicelistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigate', () => {
    beforeEach(() => {
      component.navigate(1);
    });

    it('should show popup for failure', () => {
      expect(popupDialogService.showOnce).toHaveBeenCalled();
    });
  });

  describe('sortColumns', () => {

    const date = new Date();
    const device1: IGuidedDeviceList = {
      DeviceId: 1,
      DeviceDescription: 'ADevice1',
      NumberOfLocationsExpiringSoon: 1,
      NumberOfLocationsWithOutdatedCycleCount: 1,
      EarliestExpirationDateInDevice: new Date(date.getDate() - 1),
      DeviceDefaultOwner: ''};

    const device2: IGuidedDeviceList = {
      DeviceId: 2,
      DeviceDescription: 'BDevice2',
      NumberOfLocationsExpiringSoon: 2,
      NumberOfLocationsWithOutdatedCycleCount: 5,
      EarliestExpirationDateInDevice:  new Date(date.getDate() - 2),
      DeviceDefaultOwner: ''};

    const device3: IGuidedDeviceList = {
      DeviceId: 3,
      DeviceDescription: 'CDevice3',
      NumberOfLocationsExpiringSoon: 5,
      NumberOfLocationsWithOutdatedCycleCount: 1,
      EarliestExpirationDateInDevice:  new Date(date.getDate() - 3),
      DeviceDefaultOwner: ''};

    devices.push(device1);
    devices.push(device2);
    devices.push(device3);

    const deviceColumn = 'DeviceDescription';
    const cycleCountColumn = 'NumberOfLocationsWithOutdatedCycleCount';
    const expiringSoonColumn = 'NumberOfLocationsExpiringSoon';


    it('should be sorted by device description', () => {
      component.sort(deviceColumn);
      const first = component.displayGuidedDeviceList.subscribe(result => {
        expect(result[0].DeviceDescription).toEqual('CDevice3');
      });
    });

    it('should be sorted by number of location by outdated cycle count', () => {
      component.sort(cycleCountColumn);
      const first = component.displayGuidedDeviceList.subscribe(result => {
        expect(result[0].DeviceDescription).toEqual('BDevice2');
      });
    });

    it('should be sorted by expiring soon', () => {
      component.sort(expiringSoonColumn);
      const first = component.displayGuidedDeviceList.subscribe(result => {
        expect(result[0].DeviceDescription).toEqual('CDevice3');
      });
    });
  });
});
