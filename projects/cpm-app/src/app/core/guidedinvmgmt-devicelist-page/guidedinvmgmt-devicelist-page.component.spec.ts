import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GuidedInvMgmtDevicelistPageComponent } from './guidedinvmgmt-devicelist-page.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { GridModule, FooterModule, LayoutModule, SvgIconModule, SearchModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { SharedModule } from '../../shared/shared.module';
import { GuidedDeviceListService } from '../../api-core/services/guided-device-list-service';
import { of } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { LeaseVerificationResult } from '../../api-core/data-contracts/lease-verification-result';
import { NavigationEnd } from '@angular/router';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { map } from 'rxjs/operators';
describe('GuidedinvmgmtDevicelistPageComponent', () => {
  let component: GuidedInvMgmtDevicelistPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtDevicelistPageComponent>;
  let hardwareLeaseService: Partial<HardwareLeaseService>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let event: IColHeaderSortChanged = {ColumnPropertyName:"DeviceDescription",SortDirection:"asc"};
  let leaseVerificationResult: LeaseVerificationResult;

  beforeEach(async(() => {
    hardwareLeaseService = { HasDeviceLease: () => of(leaseVerificationResult) };
    wpfActionControllerService = { ExecuteWpfContinueNavigationAction: jasmine.createSpy('ExecuteWpfContinueNavigationAction'),
      ExecuteContinueNavigationAction: jasmine.createSpy('ExecuteContinueNavigationAction')};

    TestBed.configureTestingModule({
      declarations: [ GuidedInvMgmtDevicelistPageComponent, MockTranslatePipe,
        MockColHeaderSortable, MockAppHeaderContainer, MockSearchPipe ],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule, SvgIconModule, ButtonActionModule],
      providers: [
        { provide: GuidedDeviceListService, useValue: { get: () => of([]) } },
        { provide: WpfActionControllerService, useValue: wpfActionControllerService },
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

  describe('navigation on page', () => {
    it('navigates to manual cycle count page', () => {
       component.navigateManualCycleCount();
       expect(wpfActionControllerService.ExecuteWpfContinueNavigationAction).toHaveBeenCalled();
    });
    it('navigates if it has device lease', () => {
      leaseVerificationResult = 0;
      component.navigate(1);
      expect(wpfActionControllerService.ExecuteContinueNavigationAction).toHaveBeenCalled();
    });
    it('navigates to hardware lease page without lease', () => {
      leaseVerificationResult = 1;
      component.navigate(1);
      expect(wpfActionControllerService.ExecuteContinueNavigationAction).toHaveBeenCalled();
    });
  });
  it('column selected ', () => {
    expect(component.columnSelected(event));
    component.displayGuidedDeviceList$.source;
    component.displayGuidedDeviceList$ = component.displayGuidedDeviceList$.pipe(map(exceptions => {
      return this.sort(exceptions, "ASC");
    }));
  });
});
