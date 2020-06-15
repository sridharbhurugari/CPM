import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonActionModule, ComponentTypes } from '@omnicell/webcorecomponents';
import { DashboardDetailsCardComponent } from './dashboard-details-card.component';
import { TrafficLightsComponent } from './../traffic-lights/traffic-lights.component';
import { QuickPickBoxItemsView} from './../quick-pick-box-items-view/quick-pick-box-items-view.component';

import { QuickPickDrawer } from '../model/quick-pick-drawer';
import { QuickPickDispenseBox } from '../model/quick-pick-dispense-box';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';

describe('DashboardDetailsCardComponent', () => {
  let component: DashboardDetailsCardComponent;
  let fixture: ComponentFixture<DashboardDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDetailsCardComponent, TrafficLightsComponent, QuickPickBoxItemsView, MockTranslatePipe],
      imports: [ButtonActionModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDetailsCardComponent);
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
