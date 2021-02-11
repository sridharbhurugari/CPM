import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { GridModule, SvgIconModule } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { IVerificationDestinationDetail } from '../../api-core/data-contracts/i-verification-destination-detail';
import { VerificationService } from '../../api-core/services/verification.service';
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

describe('VerificationDetailsPageComponent', () => {
  let component: VerificationDetailsPageComponent;
  let fixture: ComponentFixture<VerificationDetailsPageComponent>;
  let translateService: Partial<TranslateService>;
  let verificationService: Partial<VerificationService>;
  let verificationDestinationDetails : IVerificationDestinationDetail[];
  let verificationDestinationDetailsViewData : IVerificationDestinationDetailViewData;
  let toastService: Partial<ToastService>;
  let barcodeScannedInputSubject: Subject<IBarcodeData> = new Subject<IBarcodeData>();

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of(translateService)),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  let errorSpy = jasmine.createSpy('error');
  let warningSpy = jasmine.createSpy('warning');
  let infoSpy = jasmine.createSpy('info');
  toastService = {
    error: errorSpy,
    warning: warningSpy,
    info: infoSpy,
  };

  verificationDestinationDetailsViewData = {
    DetailItems: [],
    PriorityDescription: 'priority-description',
    DeviceDescription: 'device-description',
    FillDate: new Date(),
    OrderId: 'orderId'
  } as IVerificationDestinationDetailViewData;

  verificationService = {
    getVerificationDestinations: () => of(),
    getVerificationDashboardData: () => of(),
    getVerificationDestinationDetails: () => of(verificationDestinationDetailsViewData)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [VerificationDetailsPageComponent, VerificationDashboardComponent, VerificationDetailsCardComponent,
        MockCpGeneralHeaderComponent, MockAppHeaderContainer, MockCpDataCardComponent,
        MockColHeaderSortable, MockTranslatePipe, MockSearchBox,
            MockSearchPipe, MockCpClickableIconComponent, MockValidationIconComponent ],
      imports: [GridModule, SvgIconModule],
      providers: [
        {provide: TranslateService, useValue: translateService },
        { provide: VerificationService, useValue: verificationService },
        { provide: ToastService, useValue: toastService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let a: IVerificationDestinationDetail;
    const mockItem = new VerificationDestinationDetail(a);
    verificationDestinationDetails = [];
    verificationDestinationDetails.push(mockItem);
    verificationDestinationDetailsViewData.DetailItems = verificationDestinationDetails;

    fixture = TestBed.createComponent(VerificationDetailsPageComponent);
    component = fixture.componentInstance;
    component.barcodeScannedEventSubject = barcodeScannedInputSubject;

    component.navigationParameters = {
      DeviceId: 1,
      OrderId: 'orderId',
      DestinationId: 'destinaitonId',
      Route: VerificationRouting.DetailsPage
    } as IVerificationNavigationParameters;

    spyOn(component.pageNavigationEvent, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Eventing', () => {
    it('should navigate page on back event', () => {
      component.onBackEvent();
      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(1);
    })

    it('should navigate page on grid click event', () => {
      component.onBackEvent();
      expect(component.pageNavigationEvent.emit).toHaveBeenCalledTimes(1);
    });
  })
});
