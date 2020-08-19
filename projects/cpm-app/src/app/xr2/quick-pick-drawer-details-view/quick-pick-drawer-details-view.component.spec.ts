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
import { CpColorService } from '../../shared/services/cp-color.service';
import { Guid } from 'guid-typescript';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';


describe('QuickPickDrawerDetailsViewComponent', () => {
  let component: QuickPickDrawerDetailsViewComponent;
  let fixture: ComponentFixture<QuickPickDrawerDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPickDrawerDetailsViewComponent, TrafficLightsComponent, QuickPickBoxItemsView, MockTranslatePipe, MockCpClickableIconComponent ],
      imports: [ButtonActionModule, ],
      providers: [
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: CpColorService, useValue: { pickTextColorBasedOnBackgroundColor: () => of() } },
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
    const detailedDrawerData4 = new QuickPickDrawerData(null);
    detailedDrawerData3.ErrorInfo = new QuickPickErrorInformation(null);

    detailedDrawerData4.Status = 1;
    detailedDrawerData1.Status = 2;
    detailedDrawerData2.Status = 3;
    detailedDrawerData3.Status = 4;

    expect(component).toBeTruthy();
    expect(component.getTrafficLightProperties(detailedDrawerData1).color).toEqual('yellow');
    expect(component.getTrafficLightProperties(detailedDrawerData2).color).toEqual('green');
    expect(component.getTrafficLightProperties(detailedDrawerData3).color).toEqual('red');
    expect(component.getTrafficLightProperties(detailedDrawerData4).color).toEqual('gray');
  });

  it('should react properly to button actions', () => {
    const detailedDrawerData1 = new QuickPickDrawerData(null);
    detailedDrawerData1.RobotDispenseBoxId = Guid.create();
    component.detailedDrawerData = detailedDrawerData1;
    const printEventSpy = spyOn(component.printQuickPickDrawerLabel, 'emit').and.callThrough();
    const rerouteEventSpy = spyOn(component.rerouteQuickPickDrawer, 'emit').and.callThrough();
    const backEventSpy = spyOn(component.closeQuickPickDetailsCard, 'emit').and.callThrough();
    const unlockEventSpy = spyOn(component.unlockUnknownQuickPickDrawer, 'emit').and.callThrough();

    component.onPrintClick();
    expect(printEventSpy).toHaveBeenCalledTimes(1);

    component.onRerouteClick();
    expect(rerouteEventSpy).toHaveBeenCalledTimes(1);
    expect(rerouteEventSpy).toHaveBeenCalledWith(detailedDrawerData1.RobotDispenseBoxId);

    component.onBackClick();
    expect(backEventSpy).toHaveBeenCalledTimes(1);

    component.onUnlockUnknownClick();
    expect(unlockEventSpy).toHaveBeenCalledTimes(1);
  });
});
