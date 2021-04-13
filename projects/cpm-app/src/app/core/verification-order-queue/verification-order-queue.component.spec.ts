import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { GridModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { VerificationOrderItem } from '../../shared/model/verification-order-item';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { VerificationOrderQueueComponent } from './verification-order-queue.component';

describe('VerificationOrderQueueComponent', () => {
  let component: VerificationOrderQueueComponent;
  let fixture: ComponentFixture<VerificationOrderQueueComponent>;
  let translateService: Partial<TranslateService>;

  beforeEach(async(() => {

    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService)),
      getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
    };

    TestBed.configureTestingModule({
      declarations: [ VerificationOrderQueueComponent, MockCpDataLabelComponent, MockColHeaderSortable,
        MockAppHeaderContainer, MockTranslatePipe, MockSearchPipe, MockCpClickableIconComponent],
      imports: [GridModule],
      providers: [
        { provide: TranslateService, useValue: translateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOrderQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Eventing', () => {
    it('should emit click event on grid row click', () => {
      const gridClickEventSpy = spyOn(component.gridRowClickEvent, 'emit');
      const mockItem = new VerificationOrderItem(null);

      component.onGridRowClick(mockItem);

      expect(gridClickEventSpy).toHaveBeenCalledTimes(1);
    })
  });

  describe('Queue filtering/sorting', () => {
    it('should set sort order on column selected event', () => {
      const mockSortEvent = {} as IColHeaderSortChanged;
      const expectedSortDirection = SortDirection.ascending;
      const expectedColumnName = 'column';
      mockSortEvent.SortDirection = expectedSortDirection;
      mockSortEvent.ColumnPropertyName = expectedColumnName;

      component.columnSelected(mockSortEvent);

      expect(component.currentSortPropertyName).toBe(expectedColumnName);
      expect(component.columnSortDirection).toBe(expectedSortDirection);
    });

    it('should filter items based on order ID', () => {
      const item1 = new VerificationOrderItem(null);
      const item2 = new VerificationOrderItem(null);
      const item3 = new VerificationOrderItem(null);
      item1.OrderId = "1";
      item2.OrderId = "2";
      item3.OrderId = "24HR";
      component.unfilteredVerificationOrderItems = [
        item1,
        item2,
        item3
      ];

      component.searchTextFilter = "1";
      const searchResults1 = component.filteredVerificationOrderItems.slice();
      component.searchTextFilter = "2";
      const searchResults2 = component.filteredVerificationOrderItems.slice();
      component.searchTextFilter = "24HR";
      const searchResults3 = component.filteredVerificationOrderItems.slice();
      component.searchTextFilter = "";
      const searchResults4 = component.filteredVerificationOrderItems.slice();

      expect(searchResults1[0]).toBe(item1);
      expect(searchResults2[0]).toBe(item2);
      expect(searchResults3[0]).toBe(item3);
      expect(searchResults4.length).toBe(component.unfilteredVerificationOrderItems.length);
    });
  });

  describe('Configurations', () => {
    it('should sort on items load with saved configuration', () => {
      const savedConfiguration = {
        searchTextFilterOrder: 'filter',
        colHeaderSortOrder: {
          ColumnPropertyName: 'column',
          SortDirection: 'asc'
        }
      } as IVerificationPageConfiguration
      component.savedPageConfiguration = savedConfiguration;
      const columSelectedSpy = spyOn(component, 'columnSelected');

      component.unfilteredVerificationOrderItems = []

      expect(columSelectedSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('String Transformations', () => {
    it('should transform date into displayable date string', () => {
      const verificationOrderItem = new VerificationOrderItem(null);
      const expectedDate = new Date();
      const expectedDateString = expectedDate.toLocaleString('en-US');
      verificationOrderItem.FillDate = expectedDate;

      const displayedDateString = component.getOrderDate(verificationOrderItem);

      expect(displayedDateString).toBe(expectedDateString);
    })
  });
});
