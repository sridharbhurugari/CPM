import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonActionModule, ComponentTypes } from '@omnicell/webcorecomponents';
import { TrafficLightsComponent } from './../traffic-lights/traffic-lights.component';
import { QuickPickBoxItemsView} from './../quick-pick-box-items-view/quick-pick-box-items-view.component';

import { QuickPickDrawer } from '../model/quick-pick-drawer';
import { QuickPickDispenseBox } from '../model/quick-pick-dispense-box';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { QuickPickDrawerDetailsViewComponent } from './quick-pick-drawer-details-view.component';

describe('QuickPickDrawerDetailsViewComponent', () => {
  let component: QuickPickDrawerDetailsViewComponent;
  let fixture: ComponentFixture<QuickPickDrawerDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickDrawerDetailsViewComponent, TrafficLightsComponent, QuickPickBoxItemsView, MockTranslatePipe],
      imports: [ButtonActionModule]
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
