import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { QuickPickDrawerViewComponent } from './quick-pick-drawer-view.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { ButtonActionModule, FooterModule, LayoutModule, PopupDialogService } from '@omnicell/webcorecomponents';
import { CoreModule } from '../../core/core.module';
import { Subject, Observable, of, throwError } from 'rxjs';
import { QuickPickDrawerDetailsViewComponent } from '../quick-pick-drawer-details-view/quick-pick-drawer-details-view.component';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { TranslateService } from '@ngx-translate/core';
import { QuickPickPrintRequest } from '../model/quick-pick-print-request';

describe('QuickPickDrawerViewComponent', () => {
  let component: QuickPickDrawerViewComponent;
  let fixture: ComponentFixture<QuickPickDrawerViewComponent>;
  let qpDrawers: QuickPickDrawerData[];
  let quickPickEventConnectionService: Partial<QuickPickEventConnectionService>;
  let quickPickDrawerService: Partial<Xr2QuickPickDrawerService>;
  let popupDialogService: Partial<PopupDialogService>;

  beforeEach(async(() => {
    quickPickEventConnectionService = {
      QuickPickDrawerUpdateSubject: new Subject(),
      QuickPickReloadDrawersSubject: new Subject()
    };

    quickPickDrawerService = {
      printLabel: jasmine.createSpy('printLabel').and.returnValues(of(true), throwError({ status: 404 }))
    };

    popupDialogService = {
      showOnce: jasmine.createSpy('showOnce')
    };

    TestBed.configureTestingModule({
      declarations: [QuickPickDrawerViewComponent, QuickPickDrawerDetailsViewComponent, DashboardCardComponent
        , MockTranslatePipe, MockSearchPipe, MockAppHeaderContainer],
      imports: [ButtonActionModule, FooterModule, LayoutModule, CoreModule],
      providers: [
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: Xr2QuickPickDrawerService, useValue: quickPickDrawerService },
        { provide: QuickPickEventConnectionService, useValue: quickPickEventConnectionService },
        { provide: Location, useValue: { go: () => { } } },
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
    spyOn(quickPickEventConnectionService.QuickPickDrawerUpdateSubject, 'subscribe');
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

  describe('QuickPick Printing', () => {
    it('should call QuickPickDrawerService on print', () => {
      expect(component).toBeTruthy();
      component.detailedDrawer = new QuickPickDrawerData(null);
      component.printDrawerLabel();
      expect(quickPickDrawerService.printLabel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Connect to Events', () => {
    it('Connects to events on creation', () => {
      expect(component).toBeTruthy();
      component.ngOnInit();
      expect(quickPickEventConnectionService.QuickPickDrawerUpdateSubject.subscribe).toHaveBeenCalled();
    });
  });
});
