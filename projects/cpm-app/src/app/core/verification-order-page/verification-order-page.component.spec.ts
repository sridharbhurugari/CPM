import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ButtonToggleModule, GridModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
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

import { VerificationOrderPageComponent } from './verification-order-page.component';

describe('VerificationOrderPageComponent', () => {
  let component: VerificationOrderPageComponent;
  let fixture: ComponentFixture<VerificationOrderPageComponent>;
  let translateService: Partial<TranslateService>;
  let verificationService: Partial<VerificationService>;

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of(translateService)),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  verificationService = {
    getVerificationOrders: () => of([]),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationOrderPageComponent, VerificationOrderHeaderComponent,
        VerificationOrderQueueComponent, MockColHeaderSortable, MockAppHeaderContainer,
        MockSearchBox, MockSearchPipe, MockTranslatePipe, MockCpDataLabelComponent, MockCpClickableIconComponent],
      imports: [GridModule, ButtonToggleModule],
      providers: [
        { provide: HttpClient, useValue: { get: () => {}} },
        { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
        { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
        { provide: TranslateService, useValue: translateService },
        { provide: VerificationService, useValue: verificationService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Eventing', () => {
    it('should navigate page on grid click event', () => {
      const navigateEventSpy = spyOn(component.pageNavigationEvent, 'emit');
      const mockItem = new VerificationOrderItem(null);

      component.onGridRowClickEvent(mockItem);

      expect(navigateEventSpy).toHaveBeenCalledTimes(1);
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
  });
});
