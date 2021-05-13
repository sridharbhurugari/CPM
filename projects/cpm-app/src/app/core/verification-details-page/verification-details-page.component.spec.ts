import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ButtonActionModule, GridModule, PopupWindowService, SvgIconModule } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';
import { LogService } from '../../api-core/services/log-service';
import { VerificationService } from '../../api-core/services/verification.service';
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataCardComponent } from '../../shared/testing/mock-cp-data-card.spec';
import { MockCpGeneralHeaderComponent } from '../../shared/testing/mock-cp-general-header.spec';
import { MockValidationIconComponent } from '../../shared/testing/mock-validation-icon.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { VerificationDashboardComponent } from '../verification-dashboard/verification-dashboard.component';
import { VerificationDetailsCardComponent } from '../verification-details-card/verification-details-card.component';

import { VerificationDetailsPageComponent } from './verification-details-page.component';
import { ToastService } from '@omnicell/webcorecomponents';
import { IVerificationDestinationDetailViewData } from '../../api-core/data-contracts/i-verification-destination-detail-view-data';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IVerificationDestinationViewData } from '../../api-core/data-contracts/i-verification-destination-view-data';
import { IVerificationDashboardData } from '../../api-core/data-contracts/i-verification-dashboard-data';
import { IPickPriority } from '../../api-core/data-contracts/i-pick-priority';
import { VerifiableItem } from '../../shared/model/verifiable-item';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';

describe('VerificationDetailsPageComponent', () => {
  let component: VerificationDetailsPageComponent;
  let fixture: ComponentFixture<VerificationDetailsPageComponent>;
  const popupDismissedSubject = new Subject<boolean>();
  const popupResult: Partial<DropdownPopupComponent> = { dismiss: popupDismissedSubject };

  let translateService: Partial<TranslateService>;
  let verificationService: Partial<VerificationService>;
  let verificationDestinationDetails : IVerificationDestinationDetail[];
  let verificationDestinationDetailsViewData : IVerificationDestinationDetailViewData;
  let toastService: Partial<ToastService>;
  let barcodeScannedInputSubject: Subject<IBarcodeData>;
  let dashboardUpdateSubject: Subject<IVerificationDashboardData>;
  let approveAllClickSubject: Subject<void>;
  let popupWindowService: Partial<PopupWindowService>;
  let logService: Partial<LogService>;
  let deviceId: number = 1;
  let pickingBarcodeScanned = {BarCodeFormat: 'XP', BarCodeScanned: '12345|67', IsXr2PickingBarcode: true, OrderId: 'Order1', DestinationId: 'Dest1', DeviceId: 1} as IBarcodeData;
  let differentDestPickingBarcodeScanned = {BarCodeFormat: 'XP', BarCodeScanned: '12345|67', IsXr2PickingBarcode: true, OrderId: 'Order1', DestinationId: 'Dest2', DeviceId: 1} as IBarcodeData;
  let differentDevicePickingBarcodeScanned = {BarCodeFormat: 'XP', BarCodeScanned: '12345|67', IsXr2PickingBarcode: true, OrderId: 'Order1', DestinationId: 'Dest2', DeviceId: 2} as IBarcodeData;
  let differentOrderPickingBarcodeScanned = {BarCodeFormat: 'XP', BarCodeScanned: '12345|67', IsXr2PickingBarcode: true, OrderId: 'Order2', DestinationId: 'Dest2', DeviceId: 1} as IBarcodeData;
  let itemBarcodeScanned = {BarCodeFormat: 'UP', BarCodeScanned: '312345678909', IsXr2PickingBarcode: false, ItemId: "Item1"} as IBarcodeData;
  let nonItemBarcodeScanned = {BarCodeFormat: 'UN', BarCodeScanned: '12345|67', IsXr2PickingBarcode: false} as IBarcodeData;
  let mockVerificationService: VerificationService;

  popupWindowService = { show: jasmine.createSpy('show').and.returnValue(popupResult) };

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of(translateService)),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  toastService = {
    error: jasmine.createSpy('error'),
    warning: jasmine.createSpy('warning'),
    info: jasmine.createSpy('info'),
  };

  verificationDestinationDetailsViewData = {
    DetailItems: [],
    PriorityDescription: 'priority-description',
    DeviceDescription: 'device-description',
    FillDate: new Date(),
    OrderId: 'orderId'
  } as IVerificationDestinationDetailViewData;

  verificationService = {
    getVerificationDestinations: () => of({} as IVerificationDestinationViewData),
    getVerificationDashboardData: () => of({} as IVerificationDashboardData),
    getVerificationDestinationDetails: () => of(verificationDestinationDetailsViewData),
    getPickPriority: () => of({} as IPickPriority),
    saveVerification: jasmine.createSpy('saveVerification').and.returnValue(of(true)),
  };

  logService = {
    logMessageAsync: jasmine.createSpy('logMessageAsync')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [VerificationDetailsPageComponent, VerificationDashboardComponent, VerificationDetailsCardComponent,
        MockCpGeneralHeaderComponent, MockAppHeaderContainer, MockCpDataCardComponent,
        MockColHeaderSortable, MockTranslatePipe, MockSearchBox,
            MockSearchPipe, MockCpClickableIconComponent, MockValidationIconComponent ],
      imports: [GridModule, SvgIconModule, ButtonActionModule],
      providers: [
        { provide: TranslateService, useValue: translateService },
        { provide: VerificationService, useValue: verificationService },
        { provide: LogService, useValue: logService },
        { provide: PopupWindowService, useValue: popupWindowService},
        { provide: ToastService, useValue: toastService },
        { provide: HttpClient, useValue: { get: () => {}} },
        { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
        { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDetailsPageComponent);
    mockVerificationService = TestBed.get(VerificationService);
    component = fixture.componentInstance;
    barcodeScannedInputSubject = new Subject<IBarcodeData>();
    approveAllClickSubject = new Subject<void>();
    dashboardUpdateSubject = new Subject<IVerificationDashboardData>();
    component.barcodeScannedEventSubject = barcodeScannedInputSubject;
    component.approveAllClickSubject = approveAllClickSubject;
    component.dashboardUpdateSubject = dashboardUpdateSubject;

    let a: IVerificationDestinationDetail;
    const mockItem = new VerificationDestinationDetail(a);
    verificationDestinationDetails = [];
    verificationDestinationDetails.push(mockItem);
    verificationDestinationDetailsViewData.DetailItems = verificationDestinationDetails;

    component.navigationParameters = {
      DeviceId: pickingBarcodeScanned.DeviceId,
      OrderId: pickingBarcodeScanned.OrderId,
      DestinationId: pickingBarcodeScanned.DestinationId,
      Route: VerificationRouting.DetailsPage
    } as IVerificationNavigationParameters;

    spyOn(component.pageNavigationEvent, 'emit');
    spyOn(component.itemBarcodeScannedSubject, 'next');

    spyOn(mockVerificationService, 'getVerificationDestinationDetails').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Button Clicks', () => {
    it('should navigate page on back event', () => {
      component.onBackEvent();
      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(1);
    });

    it('should navigate back to order page on invalid xr2 order', () => {
      const expectedParams = {
        PriorityCode: null,
        OrderId: null,
        DeviceId: null,
        DestinationId: null,
        Route: VerificationRouting.OrderPage,
        PriorityVerificationGrouping: null
      } as IVerificationNavigationParameters;
      component.validDestinationDetails = false;

      component.onBackEvent();

      expect(component.pageNavigationEvent.emit).toHaveBeenCalledWith(expectedParams);
    });

    it('should navigate page on grid click event', () => {
      component.onBackEvent();
      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Scanning', () => {
    it('should send Item Barcodes Event when Barcode that is not a PickingBarcode is scanned', () => {
      barcodeScannedInputSubject.next(itemBarcodeScanned);
      expect(component.itemBarcodeScannedSubject.next).toHaveBeenCalledWith(itemBarcodeScanned);
    });

    it('should not send Item Barcodes Event when Picking Barcode Scanned', () => {
      barcodeScannedInputSubject.next(pickingBarcodeScanned);
      expect(component.itemBarcodeScannedSubject.next).not.toHaveBeenCalled();
    });

    it('should not reload data when picking barcode for the same details is scanned', () => {
      expect(mockVerificationService.getVerificationDestinationDetails).toHaveBeenCalledTimes(1);
      barcodeScannedInputSubject.next(pickingBarcodeScanned);
      expect(mockVerificationService.getVerificationDestinationDetails).toHaveBeenCalledTimes(1);
    });

    it('should reload data when picking barcode for different details is scanned', () => {
      expect(mockVerificationService.getVerificationDestinationDetails).toHaveBeenCalledTimes(1);
      barcodeScannedInputSubject.next(pickingBarcodeScanned);
      expect(mockVerificationService.getVerificationDestinationDetails).toHaveBeenCalledTimes(1);

      barcodeScannedInputSubject.next(differentDestPickingBarcodeScanned);
      expect(mockVerificationService.getVerificationDestinationDetails).toHaveBeenCalledTimes(2);

      barcodeScannedInputSubject.next(differentOrderPickingBarcodeScanned);
      expect(mockVerificationService.getVerificationDestinationDetails).toHaveBeenCalledTimes(3);

      barcodeScannedInputSubject.next(differentDevicePickingBarcodeScanned);
      expect(mockVerificationService.getVerificationDestinationDetails).toHaveBeenCalledTimes(4);
    });

    it('should approve safety stock item on valid box barcode scan with valid cached item and on selected detail item', () => {
      const saveSpy = spyOn(component.childVerificationDetailsCardComponent.saveVerificationEvent, 'emit');
      const item = new VerificationDestinationDetail(null);
      const barcode = {IsXr2PickingBarcode: true} as IBarcodeData;
      component.childVerificationDetailsCardComponent.scanToAdvanceVerificationDestinationDetail = item;
      component.childVerificationDetailsCardComponent.selectedVerificationDestinationDetail = item;

      component.onBarcodeScannedEvent(barcode);

      expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    it('should not approve item if no cached item on box barcode scan', () => {
      const saveSpy = spyOn(component.childVerificationDetailsCardComponent.saveVerificationEvent, 'emit');
      component.childVerificationDetailsCardComponent.scanToAdvanceVerificationDestinationDetail = null;
      component.childVerificationDetailsCardComponent.selectedVerificationDestinationDetail = null;
      const barcode = {IsXr2PickingBarcode: true} as IBarcodeData;

      component.onBarcodeScannedEvent(barcode);

      expect(saveSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('API Calls', () => {
    it('should save verification on save verification event', () => {
      const mockItems = [new VerificationDestinationDetail(null)];
      const expectedItem = mockItems.map((detail) => {
        return VerifiableItem.fromVerificationDestinationDetail(detail);
      });

      component.onSaveVerificationEvent(mockItems);
      expect(verificationService.saveVerification).toHaveBeenCalledWith(expectedItem);
    });
  });

  describe('Dashboard event updates', () => {
    it('should send dashboard update event after save', () => {
      const dashboardUpdate = spyOn(component.dashboardUpdateSubject, 'next');
      const expectedDashboardUpdate = {
        CompleteStatuses: 4,
        CompleteExceptions: 2,
        CompleteOutputDevices: 2
      } as IVerificationDashboardData;
      const item1 = new VerificationDestinationDetail(null);
      const item2 = new VerificationDestinationDetail(null);
      const item3 = new VerificationDestinationDetail(null);
      const item4 = new VerificationDestinationDetail(null);
      item1.Exception = true;
      item2.HasOutputDeviceVerification = true;
      item3.Exception = true;
      item3.HasOutputDeviceVerification = true;
      const itemsToVerify = [item1, item2, item3, item4];

      component.onSaveVerificationEvent(itemsToVerify);

      expect(dashboardUpdate).toHaveBeenCalledWith(expectedDashboardUpdate);
    });
  });

  describe('Creating header strings', () => {
    it('should show header on order load', () => {
      component.navigationParameters = {
        PriorityCode: 'code',
        OrderId: 'order',
        DeviceId: 1,
        RoutedByScan: false,
        PriorityVerificationGrouping: false
      } as IVerificationNavigationParameters;
      const expectedDate = verificationDestinationDetailsViewData.FillDate.toLocaleString('en-us');

      component.ngOnInit();

      component.headerTitle.subscribe((string) => {
        expect(string).toBe(verificationDestinationDetailsViewData.PriorityDescription);
      });

      component.headerSubTitle.subscribe((string) => {
        expect(string).toBe(`${verificationDestinationDetailsViewData.DeviceDescription} - ${verificationDestinationDetailsViewData.OrderId} - ${expectedDate}`);
      });
    });
  });
});
