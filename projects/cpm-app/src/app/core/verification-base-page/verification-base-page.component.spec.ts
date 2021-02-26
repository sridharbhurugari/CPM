import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogService } from '@omnicell/webcorecomponents';
import { BarcodeScanService } from 'oal-core';
import { of, Subject } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';
import { VerificationService } from '../../api-core/services/verification.service';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { WindowService } from '../../shared/services/window-service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { PopupDialogServiceStub } from '../../shared/testing/popup-dialog-service-stub';

import { VerificationBasePageComponent } from './verification-base-page.component';

describe('VerificationBasePageComponent', () => {
  let component: VerificationBasePageComponent;
  let fixture: ComponentFixture<VerificationBasePageComponent>;
  let systemConfigurationService: Partial<SystemConfigurationService>;
  let mockPopupDialogService: PopupDialogService;
  let barcodeScanService: Partial<BarcodeScanService>;
  let barcodeDataService: Partial<BarcodeDataService>;
  let configurationValue: IConfigurationValue = { Value: '15', Category: '', SubCategory: '' };
  let barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: '12345|67', IsXr2PickingBarcode: true} as IBarcodeData;
  let verificationService: Partial<VerificationService>;

  barcodeScanService = {
    reset: jasmine.createSpy('reset'),
    BarcodeScannedSubject: new Subject(),
  };

  barcodeDataService ={
    getData: () => of (barcodeData)
  }

  beforeEach(async(() => {
    systemConfigurationService = { GetConfigurationValues: () => of(configurationValue) };
    verificationService = {
      getVerificationRejectReasons: () => of([]),
    };


    TestBed.configureTestingModule({
      declarations: [ VerificationBasePageComponent ],
      providers: [
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() }},
        { provide: BarcodeScanService, useValue: { BarcodeScannedSubject: new Subject() }},
        { provide: BarcodeDataService, useValue: barcodeDataService},
        { provide: SystemConfigurationService, useValue: systemConfigurationService },
        { provide: BarcodeScanService, useValue: barcodeScanService },
        { provide: PopupDialogService, useClass: PopupDialogServiceStub },
        {
          provide: TranslateService,
          useValue: { get: (x: string) => of(`{x}_TRANSLATED`) },
        },
        { provide: VerificationService, useValue: verificationService },
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() } },
        { provide: WindowService, useValue: { getHash: () => '' } },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationBasePageComponent);
    mockPopupDialogService = TestBed.get(PopupDialogService);
    component = fixture.componentInstance;
    spyOn(mockPopupDialogService, "showOnce").and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize route to order page', () => {
    component.initializeNavigationParameters();
    expect(component.navigationParameters.Route).toBe(VerificationRouting.OrderPage)
  });

  describe('Eventing', () => {
    it('should set navigation parameters on navigation event', () => {
      const params = {} as IVerificationNavigationParameters;
      params.Route = VerificationRouting.DetailsPage;

      component.onPageNavigationEvent(params);

      expect(component.navigationParameters).toBe(params);
    });

    it('should set page configuration on page configuration event', () => {
      const configuration = {} as IVerificationPageConfiguration;
      configuration.colHeaderSortOrder = {
        ColumnPropertyName: 'column',
        SortDirection: 'asc'
      }
      configuration.searchTextFilterOrder = 'filter';

      component.onPageConfigurationUpdateEvent(configuration);

      expect(component.savedPageConfiguration).toBe(configuration);
    });

    it('should fire barcode scanned event when barcode is scanned', () => {
      spyOn(component.barcodeScannedSubject, 'next');
      barcodeScanService.BarcodeScannedSubject.next('12345|67');
      expect(component.barcodeScannedSubject.next).toHaveBeenCalledWith(barcodeData);
    });

    it('should show unexpected scan dialog when event received', () => {
      component.onNonXr2PickingBarcodeScanUnexpected();
      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
    });

    it('should show unexpected scan dialog on item or label scan', () => {
      component.onVerificationDetailBarcodeScanUnexpected();
      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
    });
  });
});
