import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { PopupWindowService, SvgIconModule } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { VerificationStatusTypes } from '../../shared/constants/verification-status-types';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockValidationIconComponent } from '../../shared/testing/mock-validation-icon.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ToastService } from '@omnicell/webcorecomponents';

import { VerificationDetailsCardComponent } from './verification-details-card.component';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';

describe('VerificationDetailsCardComponent', () => {
  let component: VerificationDetailsCardComponent;
  let fixture: ComponentFixture<VerificationDetailsCardComponent>;

  let translateService: Partial<TranslateService>;
  let popupWindowService: Partial<PopupWindowService>;
  let toastService: Partial<ToastService>;
  let barcodeScannedInputSubject: Subject<IBarcodeData>;

  popupWindowService = { show: jasmine.createSpy('show').and.returnValue(true) };

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of('')),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  toastService = {
    error: jasmine.createSpy('error'),
    warning: jasmine.createSpy('warning'),
    info: jasmine.createSpy('info'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDetailsCardComponent,
         MockColHeaderSortable, MockTranslatePipe,  MockCpClickableIconComponent, MockValidationIconComponent ],
      imports: [SvgIconModule],
      providers: [
        { provide: TranslateService, useValue: translateService},
        { provide: PopupWindowService, useValue: popupWindowService },
        { provide: ToastService, useValue: toastService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDetailsCardComponent);
    component = fixture.componentInstance;
    barcodeScannedInputSubject = new Subject<IBarcodeData>();
    component.barcodeScannedEventSubject = barcodeScannedInputSubject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set group data/titles on item list set', () => {
    const newItem = new VerificationDestinationDetail(null);
    newItem.DestinationType = 'type';
    newItem.DestinationLine1 = 'DL0';
    newItem.DestinationLine2 = 'DL1'
    const newList = [
      Object.assign({}, newItem)
    ];

    component.verificationDestinationDetails = newList;

    expect(component.destinationType).toBe(newItem.DestinationType);
    expect(component.destinationLine1).toBe(newItem.DestinationLine1);
    expect(component.destinationLine2).toBe(newItem.DestinationLine2);
  });

  describe('Sorting', () => {
    it('should set sort order on column selected event', () => {
      const mockSortEvent = {} as IColHeaderSortChanged;
      const expectedSortOrder = SortDirection.ascending;
      const expectedColumnName = 'column';
      mockSortEvent.SortDirection = expectedSortOrder;
      mockSortEvent.ColumnPropertyName = expectedColumnName;

      component.columnSelected(mockSortEvent);

      expect(component.currentSortPropertyName).toBe(expectedColumnName);
      expect(component.columnSortDirection).toBe(expectedSortOrder);
    });
  });


  describe('Formatting', () => {
    it('should get formated datetime', () => {
      const mockdetail = new VerificationDestinationDetail(null);
      const expectedDate = new Date(1, 1, 1, 1, 1, 1, 1);

      mockdetail.FillDate = expectedDate;

      expect(component.getOrderDate(mockdetail)).toBe(expectedDate.toLocaleString('en-US'));
    });
  });

  describe('Button Clicks', () => {
    it('should send event with verified item on appove click', () => {
      const verificationItem = new VerificationDestinationDetail(null);
      const saveSpy =  spyOn(component.saveVerificationEvent, 'emit');

      component.onApproveClick(verificationItem);

      expect(verificationItem.VerifiedStatus).toBe(VerificationStatusTypes.Verified);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    it('should set selected upon item click', () => {
      const mockdetail = new VerificationDestinationDetail(null);
      mockdetail.OrderId = "1"
      component.medicationClicked(mockdetail);
      expect(component.selectedVerificationDestinationDetail.OrderId).toBe("1");
    });

    it('should display toast on required icon click', () => {
      component.onRequiredIconClick();

      expect(toastService.error).toHaveBeenCalledTimes(1);
    });
  })
});
