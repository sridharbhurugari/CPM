import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { GridModule } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IPickPriority } from '../../api-core/data-contracts/i-pick-priority';
import { IVerificationDestinationItem } from '../../api-core/data-contracts/i-verification-destination-item';
import { IVerificationDestinationViewData } from '../../api-core/data-contracts/i-verification-destination-view-data';
import { LogService } from '../../api-core/services/log-service';
import { VerificationService } from '../../api-core/services/verification.service';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpDataCardComponent } from '../../shared/testing/mock-cp-data-card.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockCpGeneralHeaderComponent } from '../../shared/testing/mock-cp-general-header.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { VerificationDashboardComponent } from '../verification-dashboard/verification-dashboard.component';
import { VerificationDestinationHourQueueComponent } from '../verification-destination-hour-queue/verification-destination-hour-queue.component';
import { VerificationDestinationQueueComponent } from '../verification-destination-queue/verification-destination-queue.component';

import { VerificationDestinationPageComponent } from './verification-destination-page.component';

describe('VerificationDestinationPageComponent', () => {
  let component: VerificationDestinationPageComponent;
  let fixture: ComponentFixture<VerificationDestinationPageComponent>;
  let translateService: Partial<TranslateService>;
  let verificationService: Partial<VerificationService>;
  let barcodeScannedInputSubject: Subject<IBarcodeData> = new Subject<IBarcodeData>();
  let logService: Partial<LogService>;
  const detailItem = {} as IVerificationDestinationItem;

  let detailItems = [ Object.assign({}, detailItem)];
  let mockDate =  new Date();

  const verificationDestinationViewData = {
    PriorityDescription: 'PriorDesc1',
    DeviceDescription: 'DevDesc1',
    OrderId: 'OrderId1',
    FillDate: mockDate,
    DetailItems: detailItems,
  } as IVerificationDestinationViewData;

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of()),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  verificationService = {
    getVerificationDestinations: jasmine.createSpy('getVerificationDestinations').and.returnValue(of(verificationDestinationViewData)),
    getVerificationDashboardData: jasmine.createSpy('getVerificationDashboardData').and.returnValue(of()),
    getPickPriority: jasmine.createSpy('getVerificationDashboardData').and.returnValue(of({} as IPickPriority))
  };

  logService = {
    logMessageAsync: jasmine.createSpy('logMessageAsync')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDestinationPageComponent, VerificationDestinationQueueComponent, VerificationDestinationHourQueueComponent,
         VerificationDashboardComponent, MockCpGeneralHeaderComponent, MockColHeaderSortable, MockAppHeaderContainer,
         MockTranslatePipe, MockSearchBox, MockSearchPipe, MockCpGeneralHeaderComponent, MockCpDataLabelComponent, MockCpDataCardComponent],
      imports: [GridModule],
      providers: [
        { provide: TranslateService, useValue: translateService },
        { provide: VerificationService, useValue: verificationService },
        { provide: LogService, useValue: logService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDestinationPageComponent);
    component = fixture.componentInstance;
    component.barcodeScannedEventSubject = barcodeScannedInputSubject;
    component.savedPageConfiguration =  {} as IVerificationPageConfiguration;
    spyOn(component.pageNavigationEvent, 'emit');
    spyOn(component.displayWarningDialogEvent, 'emit');
    spyOn(component.pageConfigurationUpdateEvent, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering hour or destination queue', () => {
    it('should render destination queue on non grouping order', () => {
      component.navigationParameters = {
        PriorityVerificationGrouping: false
      } as IVerificationNavigationParameters

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.directive(VerificationDestinationHourQueueComponent))).toBeFalsy();
      expect(fixture.debugElement.query(By.directive(VerificationDestinationQueueComponent))).toBeTruthy();
    });

    it('should render hour queue on grouping order', () => {
      component.navigationParameters = {
        PriorityVerificationGrouping: true
      } as IVerificationNavigationParameters

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.directive(VerificationDestinationHourQueueComponent))).toBeTruthy();
      expect(fixture.debugElement.query(By.directive(VerificationDestinationQueueComponent))).toBeFalsy();
    });
  });

  describe('Creating header strings', () => {
    it('should show order header on order load', () => {
      component.navigationParameters = {
        PriorityCode: 'code',
        OrderId: 'order',
        DeviceId: 1,
        RoutedByScan: false,
        PriorityVerificationGrouping: false
      } as IVerificationNavigationParameters;
      const expectedDate = verificationDestinationViewData.FillDate.toLocaleString('en-us');

      component.ngOnInit();

      component.headerTitle.subscribe((string) => {
        expect(string).toBe(verificationDestinationViewData.PriorityDescription);
      });

      component.headerSubTitle.subscribe((string) => {
        expect(string).toBe(`${verificationDestinationViewData.DeviceDescription} - ${verificationDestinationViewData.OrderId} - ${expectedDate}`);
      });
    });

    it('should show priority header on priority load', () => {
      component.navigationParameters = {
        PriorityCode: 'code',
        OrderId: 'order',
        DeviceId: 1,
        RoutedByScan: false,
        PriorityVerificationGrouping: true
      } as IVerificationNavigationParameters;
      const expectedDate = verificationDestinationViewData.FillDate.toLocaleString('en-us');

      component.ngOnInit();

      component.headerTitle.subscribe((string) => {
        expect(string).toBe(verificationDestinationViewData.PriorityDescription);
      });

      component.headerSubTitle.subscribe((string) => {
        expect(string).toBe(`${verificationDestinationViewData.DeviceDescription} - 24HR - ${expectedDate}`);
      });
    });
  });

  describe('Eventing', () => {
    it('should navigate page on back event', () => {
      component.onBackEvent();

      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(1);
    })

    it('should navigate page on grid click event', () => {
      const mockItem = new VerificationDestinationItem(null);

      component.onGridRowClickEvent(mockItem);

      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(1);
    });

    it('should set search text on search filter event', () => {
      const event = 'filter';
      component.onSearchTextFilterEvent(event);

      expect(component.searchTextFilter).toBe(event);
    });

    it('should set sort on sort event', () => {
      const event = {} as IColHeaderSortChanged;
      event.SortDirection = 'asc';
      event.ColumnPropertyName = 'name';
      component.onSortEvent(event);

      expect(component.colHeaderSort).toBe(event);
    });

    it('should handle XR2 Picking Barcode Scan', () => {
      var barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: '12345|67', IsXr2PickingBarcode: true} as IBarcodeData;
      barcodeScannedInputSubject.next(barcodeData);
      expect(component.displayWarningDialogEvent.emit).toHaveBeenCalledTimes(0);
      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(1);
      expect(component.pageConfigurationUpdateEvent.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Scanning', () => {
    it('should handle non XR2 Picking Barcode Scan', () => {
      var barcodeData = {BarCodeFormat: 'UP', BarCodeScanned: '123456789012', IsXr2PickingBarcode: false} as IBarcodeData;
      barcodeScannedInputSubject.next(barcodeData);
      expect(component.displayWarningDialogEvent.emit).toHaveBeenCalledTimes(1);
      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(0);
      expect(component.pageConfigurationUpdateEvent.emit).toHaveBeenCalledTimes(0);
    });
  });
});
