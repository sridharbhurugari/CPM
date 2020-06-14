import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonActionModule, ComponentTypes } from '@omnicell/webcorecomponents';
import { DashboardDetailsCardComponent } from './dashboard-details-card.component';
import { TrafficLightsComponent } from './../traffic-lights/traffic-lights.component';
import { QuickPickScrollViewComponent} from './../quick-pick-scroll-view/quick-pick-scroll-view.component';

import { QuickPickDrawer } from '../model/quick-pick-drawer';
import { QuickPickDispenseBox } from '../model/quick-pick-dispense-box';

describe('DashboardDetailsCardComponent', () => {
  let component: DashboardDetailsCardComponent;
  let fixture: ComponentFixture<DashboardDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDetailsCardComponent, TrafficLightsComponent, QuickPickScrollViewComponent],
      imports: [ButtonActionModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDetailsCardComponent);
    component = fixture.componentInstance;
    component.detailedDrawer = new QuickPickDrawer(null);
    component.detailedDrawer.QuickPickDispenseBox = new QuickPickDispenseBox(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
