import { parseTemplate } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeScanService } from 'oal-core';
import { of, Subject } from 'rxjs';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';

import { VerificationBasePageComponent } from './verification-base-page.component';

describe('VerificationPageComponent', () => {
  let component: VerificationBasePageComponent;
  let fixture: ComponentFixture<VerificationBasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationBasePageComponent ],
      providers: [
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() }},
        { provide: BarcodeScanService, useValue: { BarcodeScannedSubject: new Subject() }},
        { provide: BarcodeDataService, useValue: { getData: {} }},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationBasePageComponent);
    component = fixture.componentInstance;
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
  });
});
