import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickDrawerDetailsViewComponent } from './quick-pick-drawer-details-view.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { ButtonActionModule, FooterModule, LayoutModule, ComponentTypes } from '@omnicell/webcorecomponents';
import { CoreModule } from '../../core/core.module';
import { DashboardDetailsCardComponent } from '../dashboard-details-card/dashboard-details-card.component';
import { TrafficLightsComponent } from './../traffic-lights/traffic-lights.component';
import { QuickPickScrollViewComponent } from './../quick-pick-scroll-view/quick-pick-scroll-view.component';
import { QuickPickDrawer } from '../model/quick-pick-drawer';
import { QuickPickDispenseBox } from '../model/quick-pick-dispense-box';

describe('QuickPickDrawerDetailsViewComponent', () => {
  let component: QuickPickDrawerDetailsViewComponent;
  let fixture: ComponentFixture<QuickPickDrawerDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:
      [ QuickPickDrawerDetailsViewComponent,
        DashboardDetailsCardComponent,
        QuickPickScrollViewComponent,
        TrafficLightsComponent,
        MockTranslatePipe,
        MockSearchPipe,
        MockAppHeaderContainer ],
      imports: [ButtonActionModule, FooterModule, LayoutModule, CoreModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickDrawerDetailsViewComponent);
    component = fixture.componentInstance;
    component.detailedDrawer = new QuickPickDrawer(null);
    component.detailedDrawer.QuickPickDispenseBox = new QuickPickDispenseBox(null);
    component.detailedDrawer.QuickPickDispenseBox.PicklistItems = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
