import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { PopupWindowService, SvgIconModule } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';
import { SortDirection } from '../../shared/constants/sort-direction';
import { VerificationStatusTypes } from '../../shared/constants/verification-status-types';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockValidationIconComponent } from '../../shared/testing/mock-validation-icon.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { VerificationDetailsCardComponent } from './verification-details-card.component';

describe('VerificationDetailsCardComponent', () => {
  let component: VerificationDetailsCardComponent;
  let fixture: ComponentFixture<VerificationDetailsCardComponent>;
  let translateService: Partial<TranslateService>;
  let popupWindowService: Partial<PopupWindowService>;

  const popupDismissedSubject = new Subject<boolean>();
  const popupResult: Partial<DropdownPopupComponent> = { dismiss: popupDismissedSubject };
  const showSpy = jasmine.createSpy('show').and.returnValue(popupResult);
  popupWindowService = { show: showSpy };

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of(translateService)),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDetailsCardComponent,
         MockColHeaderSortable, MockTranslatePipe,  MockCpClickableIconComponent, MockValidationIconComponent ],
      imports: [SvgIconModule],
      providers: [
        { provide: TranslateService, useValue: translateService},
        { provide: PopupWindowService, useValue: popupWindowService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Verification Card', () => {
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

    it('should get formated datetime', () => {
      const mockdetail = new VerificationDestinationDetail(null);
      const expectedDate = new Date(1, 1, 1, 1, 1, 1, 1);

      mockdetail.FillDate = expectedDate;

      expect(component.getOrderDate(mockdetail)).toBe(expectedDate.toLocaleString('en-US'));
    });

    it('should set selected upon item click', () => {
      const mockdetail = new VerificationDestinationDetail(null);
      mockdetail.OrderId = "1"
      component.medicationClicked(mockdetail);
      expect(component.selectedVerificationDestinationDetail.OrderId).toBe("1");
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
  })
});
