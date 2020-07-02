import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ButtonActionModule, ComponentTypes } from '@omnicell/webcorecomponents';
import { TrafficLightsComponent } from './../traffic-lights/traffic-lights.component';
import { QuickPickBoxItemsView} from './../quick-pick-box-items-view/quick-pick-box-items-view.component';
import { QuickPickDrawerData } from './../model/quick-pick-drawer-data';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { QuickPickDrawerDetailsViewComponent } from './quick-pick-drawer-details-view.component';
import { QuickPickErrorInformation } from '../model/quick-pick-error-information';
import { TranslateService } from '@ngx-translate/core';


describe('QuickPickDrawerDetailsViewComponent', () => {
  let component: QuickPickDrawerDetailsViewComponent;
  let fixture: ComponentFixture<QuickPickDrawerDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickDrawerDetailsViewComponent, TrafficLightsComponent, QuickPickBoxItemsView, MockTranslatePipe],
      imports: [ButtonActionModule],
      providers: [
        { provide: TranslateService, useValue: { get: () => of([]) } },
      ]
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

  it('should return correct light color for given state', () => {
    const detailedDrawerData1 = new QuickPickDrawerData(null);
    const detailedDrawerData2 = new QuickPickDrawerData(null);
    const detailedDrawerData3 = new QuickPickDrawerData(null);
    detailedDrawerData3.ErrorInfo = new QuickPickErrorInformation(null);

    detailedDrawerData1.Status = 2;
    detailedDrawerData2.Status = 3;
    detailedDrawerData3.Status = 4;

    expect(component).toBeTruthy();
    expect(component.getTrafficLightProperties(detailedDrawerData1).color).toEqual('yellow');
    expect(component.getTrafficLightProperties(detailedDrawerData2).color).toEqual('green');
    expect(component.getTrafficLightProperties(detailedDrawerData3).color).toEqual('red');
  });
});
