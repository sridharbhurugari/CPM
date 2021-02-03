import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { SvgIconModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { VerificationDestinationDetail } from '../../shared/model/verification-destination-detail';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockValidationIconComponent } from '../../shared/testing/mock-validation-icon.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ToastService } from '@omnicell/webcorecomponents';

import { VerificationDetailsCardComponent } from './verification-details-card.component';

describe('VerificationDetailsCardComponent', () => {
  let component: VerificationDetailsCardComponent;
  let fixture: ComponentFixture<VerificationDetailsCardComponent>;
  let translateService: Partial<TranslateService>;
  let toastService: Partial<ToastService>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDetailsCardComponent, 
         MockColHeaderSortable, MockTranslatePipe,  MockCpClickableIconComponent, MockValidationIconComponent ],
      imports: [SvgIconModule],
      providers: [
        { provide: TranslateService, useValue: translateService},
        { provide: ToastService, useValue: toastService },
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
      mockdetail.FillDate = "1/1/21 13:00"

      expect(component.getOrderDate(mockdetail)).toBe('1/1/2021, 1:00:00 PM')
    });

    it('should set selected upon item click', () => {
      const mockdetail = new VerificationDestinationDetail(null);
      mockdetail.OrderId = "1"
      component.medicationClicked(mockdetail);
      expect(component.selectedVerificationDestinationDetail.OrderId).toBe("1");
    });
  
    it('should call toastService.info', () => {
      const mockdetail = new VerificationDestinationDetail(null);
      mockdetail.Exception = true;
      component.Alert();
      expect(toastService.info).toHaveBeenCalled();
    });
  });
});
