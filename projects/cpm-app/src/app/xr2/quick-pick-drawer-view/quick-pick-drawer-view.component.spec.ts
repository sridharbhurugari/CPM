import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { QuickPickDrawerViewComponent } from './quick-pick-drawer-view.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { ButtonActionModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { CoreModule } from '../../core/core.module';
import { QuickPickDrawerDetailsViewComponent } from '../quick-pick-drawer-details-view/quick-pick-drawer-details-view.component';
import { QuickPickDrawer } from '../model/quick-pick-drawer';
import { QuickPickDispenseBox } from '../model/quick-pick-dispense-box';

describe('QuickPickDrawerViewComponent', () => {
  let component: QuickPickDrawerViewComponent;
  let fixture: ComponentFixture<QuickPickDrawerViewComponent>;
  let qpDrawers: QuickPickDrawer[];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ QuickPickDrawerViewComponent, QuickPickDrawerDetailsViewComponent, DashboardCardComponent
        , MockTranslatePipe, MockSearchPipe, MockAppHeaderContainer ],
      imports: [ButtonActionModule, FooterModule, LayoutModule, CoreModule ],
    }).overrideComponent(DashboardCardComponent, {
      set: {
        template: ''
      }
    })
    .overrideComponent(QuickPickDrawerDetailsViewComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickDrawerViewComponent);
    component = fixture.componentInstance;
    const qpDrawer1: QuickPickDrawer = {Id: '1', Status: '',
    QuickPickDispenseBox: new QuickPickDispenseBox(null),
    DetailedView: false, BoxNumber: 1, BoxCount: 1, State: 1, StateText: '', StateColor: ''};
    qpDrawers = [qpDrawer1];
    component.quickpickDrawers = qpDrawers;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set details view and fire event when detail view opened', () => {
    expect(component).toBeTruthy();
    const quickPickActiveSpy = spyOn(component.quickPickActive, 'emit').and.callThrough();

    component.onShowQuickPickDrawerDetails(0);
    expect(component.detailedDrawer).toEqual(qpDrawers[0]);
    expect(quickPickActiveSpy).toHaveBeenCalledWith(true);
  });

  it('should set details view and fire event when detail view closed', () => {
    expect(component).toBeTruthy();
    const quickPickActiveSpy = spyOn(component.quickPickActive, 'emit').and.callThrough();

    component.onShowQuickPickDrawerDetails(0);
    expect(component.detailedDrawer).toEqual(qpDrawers[0]);
    expect(quickPickActiveSpy).toHaveBeenCalledWith(true);

    component.onCloseQuickPickDrawerDetails();

    expect(component.detailedDrawer).toBeUndefined();
    expect(quickPickActiveSpy).toHaveBeenCalledWith(false);

  });
});
