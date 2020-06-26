import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { QuickPickDrawerViewComponent } from './quick-pick-drawer-view.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { ButtonActionModule, FooterModule, LayoutModule, PopupDialogService } from '@omnicell/webcorecomponents';
import { CoreModule } from '../../core/core.module';
import { Subject, Observable, of } from 'rxjs';
import { QuickPickDrawerDetailsViewComponent } from '../quick-pick-drawer-details-view/quick-pick-drawer-details-view.component';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { TranslateService } from '@ngx-translate/core';

describe('QuickPickDrawerViewComponent', () => {
  let component: QuickPickDrawerViewComponent;
  let fixture: ComponentFixture<QuickPickDrawerViewComponent>;
  let qpDrawers: QuickPickDrawerData[];
  let quickPickEventConnectionService: Partial<QuickPickEventConnectionService>;

  beforeEach(async(() => {
    quickPickEventConnectionService = {
      QuickPickDrawerUpdateSubject: new Subject(),
      QuickPickReloadDrawersSubject: new Subject()
    };

    TestBed.configureTestingModule({
      declarations: [ QuickPickDrawerViewComponent, QuickPickDrawerDetailsViewComponent, DashboardCardComponent
        , MockTranslatePipe, MockSearchPipe, MockAppHeaderContainer ],
      imports: [ButtonActionModule, FooterModule, LayoutModule, CoreModule ],
      providers: [
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: Xr2QuickPickDrawerService, useValue: { getDrawers: () => of([]), printLabel: () => of([])} },
        { provide: QuickPickEventConnectionService, useValue: quickPickEventConnectionService},
        { provide: Location, useValue: { go: () => {}} },
      ]
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
    const qpDrawer1: QuickPickDrawerData = new QuickPickDrawerData(null);
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
