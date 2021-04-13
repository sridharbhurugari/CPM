import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ButtonToggleModule, GridModule } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { LogService } from '../../api-core/services/log-service';
import { VerificationService } from '../../api-core/services/verification.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { VerificationOrderItem } from '../../shared/model/verification-order-item';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { VerificationOrderHeaderComponent } from '../verification-order-header/verification-order-header.component';
import { VerificationOrderQueueComponent } from '../verification-order-queue/verification-order-queue.component';
import { MockButtonToggle } from '../testing/mock-button-toggle-box.spec';

import { VerificationOrderPageComponent } from './verification-order-page.component';
import { map } from 'rxjs/operators';

describe('VerificationOrderPageComponent', () => {
  let component: VerificationOrderPageComponent;
  let fixture: ComponentFixture<VerificationOrderPageComponent>;
  let translateService: Partial<TranslateService>;
  let verificationService: Partial<VerificationService>;
  let barcodeScannedInputSubject: Subject<IBarcodeData> = new Subject<IBarcodeData>();
  let logService: Partial<LogService>;

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of(translateService)),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  verificationService = {
    getVerificationOrders: () => of([]),
  };

  logService = {
    logMessageAsync: jasmine.createSpy('logMessageAsync')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationOrderPageComponent, VerificationOrderHeaderComponent,
        VerificationOrderQueueComponent, MockColHeaderSortable, MockAppHeaderContainer,
        MockSearchBox, MockSearchPipe, MockTranslatePipe, MockCpDataLabelComponent, MockCpClickableIconComponent, MockButtonToggle],
      imports: [GridModule],
      providers: [
        { provide: HttpClient, useValue: { get: () => {}} },
        { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
        { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
        { provide: TranslateService, useValue: translateService },
        { provide: VerificationService, useValue: verificationService },
        { provide: LogService, useValue: logService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOrderPageComponent);
    component = fixture.componentInstance;
    component.barcodeScannedEventSubject = barcodeScannedInputSubject;
    fixture.detectChanges();
    spyOn(component.pageNavigationEvent, 'emit');
    spyOn(component.displayWarningDialogEvent, 'emit');
    spyOn(component.pageConfigurationUpdateEvent, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Eventing', () => {
    it('should navigate page on grid click event', () => {
      const mockItem = new VerificationOrderItem(null);

      component.onGridRowClickEvent(mockItem);
      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(1);
    });

    it('should set search text on search filter event', () => {
      const event = 'filter';
      component.onSearchTextFilterEvent(event);

      expect(component.searchTextFilter).toBe(event);
    });

    it('should set required verification on toggle button event', () => {
      const event = true;
      component.setIsRequiredVerification(event);

      expect(component.requiredOrders).toBe(event);
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

    it('should handle non XR2 Picking Barcode Scan', () => {
      var barcodeData = {BarCodeFormat: 'UP', BarCodeScanned: '123456789012', IsXr2PickingBarcode: false} as IBarcodeData;
      barcodeScannedInputSubject.next(barcodeData);
      expect(component.displayWarningDialogEvent.emit).toHaveBeenCalledTimes(1);
      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(0);
      expect(component.pageConfigurationUpdateEvent.emit).toHaveBeenCalledTimes(0);
    });
  });

  describe('Required/All loading', () => {
    it('should load required items on required toggle', () => {
      const item1 = new VerificationOrderItem(null);
      const item2 = new VerificationOrderItem(null);
      const item3 = new VerificationOrderItem(null);
      const item4 = new VerificationOrderItem(null);
      const item5 = new VerificationOrderItem(null);

      // Should not show - complete
      item1.RequiredVerificationPercentage = 90;
      item1.CompleteVerificationPercentage = 100;

      // Should show - exception
      item2.HasExceptions = true;
      item2.RequiredVerificationPercentage = 90;
      item2.CompleteVerificationPercentage = 100;

      // Should not show - complete, no exceptions or output device
      item3.HasExceptions = false;
      item3.HasOutputDeviceVerification = false;
      item3.RequiredVerificationPercentage = 90;
      item3.CompleteVerificationPercentage = 100;

      // Should show - not complete
      item4.RequiredVerificationPercentage = 90;
      item4.CompleteVerificationPercentage = 50;

      // Should show - output device
      item5.RequiredVerificationPercentage = 90;
      item5.CompleteVerificationPercentage = 100;
      item5.HasOutputDeviceVerification = true;

      component.allVerificationOrderItems = of([item1, item2, item3, item4, item5]);

      component.setIsRequiredVerification(true);

      component.allVerificationOrderItems.pipe(map((array) => {
        expect(array).toBe([item2, item4, item5]);
      }));
    });

    fit('should load all items on all toggle', () => {
      const item1 = new VerificationOrderItem(null);
      const item2 = new VerificationOrderItem(null);
      const item3 = new VerificationOrderItem(null);
      const item4 = new VerificationOrderItem(null);
      const item5 = new VerificationOrderItem(null);

      item1.RequiredVerificationPercentage = 90;
      item1.CompleteVerificationPercentage = 100;

      item2.HasExceptions = true;
      item2.RequiredVerificationPercentage = 90;
      item2.CompleteVerificationPercentage = 100;

      item3.HasExceptions = false;
      item3.HasOutputDeviceVerification = false;
      item3.RequiredVerificationPercentage = 90;
      item3.CompleteVerificationPercentage = 100;

      item4.RequiredVerificationPercentage = 90;
      item4.CompleteVerificationPercentage = 50;

      item5.RequiredVerificationPercentage = 90;
      item5.CompleteVerificationPercentage = 100;
      item5.HasOutputDeviceVerification = true;

      component.allVerificationOrderItems = of([item1, item2, item3, item4, item5]);

      component.setIsRequiredVerification(false);

      component.allVerificationOrderItems.pipe(map((array) => {
        expect(array).toBe([item1, item2, item3, item4, item5]);
      }));
    });
  });
});
