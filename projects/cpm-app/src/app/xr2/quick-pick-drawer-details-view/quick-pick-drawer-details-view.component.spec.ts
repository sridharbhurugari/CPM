import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonActionModule, ComponentTypes } from '@omnicell/webcorecomponents';
import { TrafficLightsComponent } from './../traffic-lights/traffic-lights.component';
import { QuickPickBoxItemsView} from './../quick-pick-box-items-view/quick-pick-box-items-view.component';

import { QuickPickDrawerData } from './../model/quick-pick-drawer-data';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { QuickPickDrawerDetailsViewComponent } from './quick-pick-drawer-details-view.component';
import { QuickPickErrorInformation } from '../model/quick-pick-error-information';

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
    component.detailedDrawerData = new QuickPickDrawerData(null);
    component.detailedDrawerData.MedsWithCounts = [];
    component.detailedDrawerData.ErrorInfo = new QuickPickErrorInformation(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
