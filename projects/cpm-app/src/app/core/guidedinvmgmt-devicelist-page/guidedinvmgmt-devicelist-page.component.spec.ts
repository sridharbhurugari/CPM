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
});
