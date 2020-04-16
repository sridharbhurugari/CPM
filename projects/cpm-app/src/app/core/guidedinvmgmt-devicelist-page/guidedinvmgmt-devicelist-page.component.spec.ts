import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidedInvMgmtDevicelistPageComponent } from './guidedinvmgmt-devicelist-page.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { GridModule, FooterModule, LayoutModule, SvgIconModule, SearchModule, ButtonActionModule, PopupDialogProperties, PopupDialogType, PopupDialogService } from '@omnicell/webcorecomponents';
import { SharedModule } from '../../shared/shared.module';
import { GuidedDeviceListService } from '../../api-core/services/guided-device-list-service';
import { of } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { TranslateService } from '@ngx-translate/core';
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { LeaseVerificationResult } from '../../api-core/data-contracts/lease-verification-result';

describe('GuidedinvmgmtDevicelistPageComponent', () => {
  let component: GuidedInvMgmtDevicelistPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtDevicelistPageComponent>;
  let popupDialogService: Partial<PopupDialogService>;
  let hardwareLeaseService: Partial<HardwareLeaseService>;
  let leaseVerificationResult: LeaseVerificationResult = 1;
  
  beforeEach(async(() => {
    popupDialogService = { showOnce: jasmine.createSpy('showOnce') };
    hardwareLeaseService = { HasDeviceLease: () => of(leaseVerificationResult) };

    TestBed.configureTestingModule({
      declarations: [ GuidedInvMgmtDevicelistPageComponent, MockTranslatePipe, MockColHeaderSortable, MockAppHeaderContainer, MockSearchPipe ],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule, SvgIconModule, ButtonActionModule],
      providers: [
        { provide: GuidedDeviceListService, useValue: { get: () => of([]) } },
        { provide: WpfActionControllerService, useValue: { } },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: TranslateService, useValue: { get: () => of('') }},
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
