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

describe('GuidedinvmgmtDevicelistPageComponent', () => {
  let component: GuidedInvMgmtDevicelistPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtDevicelistPageComponent>;
  let hardwareLeaseService: Partial<HardwareLeaseService>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ GuidedInvMgmtDevicelistPageComponent, MockTranslatePipe,
        MockColHeaderSortable, MockAppHeaderContainer, MockSearchPipe ],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule, SvgIconModule, ButtonActionModule],
      providers: [
        { provide: GuidedDeviceListService, useValue: { get: () => of([]) } },
        { provide: WpfActionControllerService, useValue: { } },
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
});
