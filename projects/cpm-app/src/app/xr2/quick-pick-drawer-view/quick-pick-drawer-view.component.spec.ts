import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { QuickPickDrawerViewComponent } from './quick-pick-drawer-view.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { ButtonActionModule, FooterModule, LayoutModule, PopupDialogService, ComponentTypes } from '@omnicell/webcorecomponents';
import { CoreModule } from '../../core/core.module';
import { Subject, Observable, of, throwError } from 'rxjs';
import { QuickPickDrawerDetailsViewComponent } from '../quick-pick-drawer-details-view/quick-pick-drawer-details-view.component';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { TranslateService } from '@ngx-translate/core';
import { BarcodeScanMessage } from '../model/barcode-scan-message';

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
      printLabel: jasmine.createSpy('printLabel').and.returnValues(throwError({ status: 404 }), of(true)),
      unlockDrawer: jasmine.createSpy('unlockDrawer').and.returnValues(throwError({ status: 404 }), of(true))
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

  it('should set details view and fire event when detail view opened using view', () => {
    expect(component).toBeTruthy();
    const quickPickActiveSpy = spyOn(component.quickPickActive, 'emit').and.callThrough();

    component.onShowQuickPickDrawerDetails(0);
    expect(component.detailedDrawer).toEqual(qpDrawers[0]);
    expect(quickPickActiveSpy).toHaveBeenCalledTimes(0);
  });

  it('should set details view and fire event when detail view opened with print', () => {
    expect(component).toBeTruthy();
    const quickPickActiveSpy = spyOn(component.quickPickActive, 'emit').and.callThrough();

    component.onPrintQuickPickDrawer(0);
    expect(component.detailedDrawer).toEqual(qpDrawers[0]);
    expect(quickPickActiveSpy).toHaveBeenCalledWith(true);
  });

  it('should set details view and fire event when detail view closed from view only', () => {
    expect(component).toBeTruthy();
    const quickPickActiveSpy = spyOn(component.quickPickActive, 'emit').and.callThrough();

    component.onShowQuickPickDrawerDetails(0);
    expect(component.detailedDrawer).toEqual(qpDrawers[0]);
    expect(quickPickActiveSpy).toHaveBeenCalledTimes(0);

    component.onCloseQuickPickDrawerDetails();

    expect(component.detailedDrawer).toBeUndefined();
    expect(quickPickActiveSpy).toHaveBeenCalledTimes(1);
    expect(quickPickActiveSpy).toHaveBeenCalledWith(false);
  });

  it('should set details view and fire event when detail view closed from active state', () => {
    expect(component).toBeTruthy();
    const quickPickActiveSpy = spyOn(component.quickPickActive, 'emit').and.callThrough();

    component.onPrintQuickPickDrawer(0);
    expect(component.detailedDrawer).toEqual(qpDrawers[0]);
    expect(quickPickActiveSpy).toHaveBeenCalledWith(true);

    component.onCloseQuickPickDrawerDetails();

    expect(component.detailedDrawer).toBeUndefined();
    expect(quickPickActiveSpy).toHaveBeenCalledWith(false);

  });

  it('Should load detailed view on load if available', () => {
    expect(component).toBeTruthy();
    const drawer = new QuickPickDrawerData(null);
    drawer.Status = 2;
    component.quickpickDrawers = [drawer];

    expect(component.detailedDrawer).toBe(drawer);
  });

  it('Should not load detailed view on load if all statuses are ready', () => {
    expect(component).toBeTruthy();

    for (let i = 0; i < 6; i++) {
      const drawer = new QuickPickDrawerData(null);
      drawer.Status = 1;
      component.quickpickDrawers.push(drawer);
    }

    expect(component.detailedDrawer).toBeUndefined();
  });

  describe('QuickPick Printing', () => {
    it('should call QuickPickDrawerService on print', () => {
      expect(component).toBeTruthy();
      component.detailedDrawer = new QuickPickDrawerData(null);

      component.printDrawerLabel();

      expect(quickPickDrawerService.printLabel).toHaveBeenCalledTimes(1);
    });

    it('should emit failed save dialog on failed print', () => {
      expect(component).toBeTruthy();
      const failedSaveSpy = spyOn(component.failedEvent, 'emit').and.callThrough();
      component.detailedDrawer = new QuickPickDrawerData(null);

      component.printDrawerLabel();

      expect(quickPickDrawerService.printLabel).toHaveBeenCalledTimes(1);
      expect(failedSaveSpy).toHaveBeenCalled();
    });
  });

  describe('Quick Pick Drawer Unlocking', () => {
    it('Should call QuickPickDrawerService on unlock', () => {
      expect(component).toBeTruthy();
      component.detailedDrawer = new QuickPickDrawerData(null);

      component.unlockDrawer();

      expect(quickPickDrawerService.unlockDrawer).toHaveBeenCalledTimes(1);
    });

    it('Should emit failed save dialog on failed unlock', () => {
      expect(component).toBeTruthy();
      const failedSaveSpy = spyOn(component.failedEvent, 'emit').and.callThrough();
      component.detailedDrawer = new QuickPickDrawerData(null);

      component.unlockDrawer();

      expect(quickPickDrawerService.unlockDrawer).toHaveBeenCalledTimes(1);
      expect(failedSaveSpy).toHaveBeenCalled();
    });
  });

  describe('Quick Pick Drawer Scanning', () => {
    it('Should not call service if scan not available', () => {
      expect(component).toBeTruthy();
      component.scanMessage = null;

      component.scanDrawerLabel();

      expect(quickPickDrawerService.unlockDrawer).toHaveBeenCalledTimes(0);
    });

    it('Should not load detailed view if quick pick is in progress', () => {
      expect(component).toBeTruthy();
      const drawer = new QuickPickDrawerData(null);
      drawer.Status = 2;
      const scan = new BarcodeScanMessage('barcode');

      component.detailedDrawer = drawer;
      component.scanMessage = scan;

      expect(quickPickDrawerService.unlockDrawer).toHaveBeenCalledTimes(0);
    });

    it('Should scan label on new scan input if loaded detailed view successfully', () => {
      expect(component).toBeTruthy();
      const drawer = new QuickPickDrawerData(null);
      const scan = new BarcodeScanMessage('barcode');
      drawer.Xr2ServiceBarcode = 'barcode';
      component.quickpickDrawers = [drawer];
      component.scanMessage = scan;

      expect(quickPickDrawerService.unlockDrawer).toHaveBeenCalledTimes(1);
    });

    it('Should call QuickPickDrawerService and unlockDrawer on successful scan', () => {
      expect(component).toBeTruthy();
      component.detailedDrawer = new QuickPickDrawerData(null);
      component.scanMessage = new BarcodeScanMessage('barcode');

      component.scanDrawerLabel();

      expect(quickPickDrawerService.unlockDrawer).toHaveBeenCalledTimes(1);
    });

    it('Should emit failed scan dialog on failed scan', () => {
      expect(component).toBeTruthy();
      const failedScanSpy = spyOn(component.failedEvent, 'emit').and.callThrough();
      component.detailedDrawer = new QuickPickDrawerData(null);
      component.scanMessage = new BarcodeScanMessage('barcode');

      component.scanDrawerLabel();

      expect(quickPickDrawerService.unlockDrawer).toHaveBeenCalledTimes(1);
      expect(failedScanSpy).toHaveBeenCalled();
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
