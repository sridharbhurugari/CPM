import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { GridModule } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { VerificationService } from '../../api-core/services/verification.service';
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
import { VerificationDestinationQueueComponent } from '../verification-destination-queue/verification-destination-queue.component';

import { VerificationDestinationPageComponent } from './verification-destination-page.component';

describe('VerificationDestinationPageComponent', () => {
  let component: VerificationDestinationPageComponent;
  let fixture: ComponentFixture<VerificationDestinationPageComponent>;
  let translateService: Partial<TranslateService>;
  let verificationService: Partial<VerificationService>;
  let barcodeScannedInputSubject: Subject<IBarcodeData> = new Subject<IBarcodeData>();

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of(translateService)),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  verificationService = {
    getVerificationDestinations: () => of(),
    getVerificationDashboardData: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDestinationPageComponent, VerificationDestinationQueueComponent, VerificationDashboardComponent,
      MockCpGeneralHeaderComponent, MockColHeaderSortable, MockAppHeaderContainer, MockTranslatePipe, MockSearchBox,
      MockSearchPipe, MockCpGeneralHeaderComponent, MockCpDataLabelComponent, MockCpDataCardComponent],
      imports: [GridModule],
      providers: [
        { provide: TranslateService, useValue: translateService },
        { provide: VerificationService, useValue: verificationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDestinationPageComponent);
    component = fixture.componentInstance;
    component.barcodeScannedEventSubject = barcodeScannedInputSubject;
    component.navigationParameters = {} as IVerificationNavigationParameters;
    component.savedPageConfiguration =  {} as IVerificationPageConfiguration;
    spyOn(component.pageNavigationEvent, 'emit');
    spyOn(component.nonXr2PickingBarcodeScanUnexpected, 'emit');
    spyOn(component.pageConfigurationUpdateEvent, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    component.navigationParameters = {} as IVerificationNavigationParameters;
    expect(component).toBeTruthy();
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
      expect(component.nonXr2PickingBarcodeScanUnexpected.emit).toHaveBeenCalledTimes(0);
      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(1);
      expect(component.pageConfigurationUpdateEvent.emit).toHaveBeenCalledTimes(1);
    });

    it('should handle non XR2 Picking Barcode Scan', () => {
      var barcodeData = {BarCodeFormat: 'UP', BarCodeScanned: '123456789012', IsXr2PickingBarcode: false} as IBarcodeData;
      barcodeScannedInputSubject.next(barcodeData);
      expect(component.nonXr2PickingBarcodeScanUnexpected.emit).toHaveBeenCalledTimes(1);
      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(0);
      expect(component.pageConfigurationUpdateEvent.emit).toHaveBeenCalledTimes(0);
    });
  })
});
