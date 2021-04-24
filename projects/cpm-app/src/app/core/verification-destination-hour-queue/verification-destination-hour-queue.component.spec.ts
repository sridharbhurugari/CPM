import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { GridModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { VerificationDestinationHourQueueComponent } from './verification-destination-hour-queue.component';

describe('VerificationDestinationHourQueueComponent', () => {
  let component: VerificationDestinationHourQueueComponent;
  let fixture: ComponentFixture<VerificationDestinationHourQueueComponent>;
  let translateService: Partial<TranslateService>;

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of(translateService)),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDestinationHourQueueComponent, MockColHeaderSortable,
        MockAppHeaderContainer, MockTranslatePipe, MockSearchPipe, MockCpDataLabelComponent],
      imports: [GridModule],
      providers: [
        { provide: TranslateService, useValue: translateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDestinationHourQueueComponent);
    component = fixture.componentInstance;
    component.savedPageConfiguration = {} as IVerificationPageConfiguration;
    component.savedPageConfiguration.colHeaderSortDestination = {} as IColHeaderSortChanged;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set filters on item list setter if saved configuration exists', () => {
    component.savedPageConfiguration = {} as IVerificationPageConfiguration;
    const expectedSearchTextFilter = "filter";
    const expectedSort =  {
      ColumnPropertyName: 'name',
      SortDirection: 'asc'
    } as IColHeaderSortChanged;

    component.savedPageConfiguration.colHeaderSortDestination = expectedSort;
    component.savedPageConfiguration.searchTextFilterDestination = "filter";

    component.unfilteredVerificationDestinationItems = [];

    expect(component.searchTextFilter).toBe(expectedSearchTextFilter);
    expect(component.columnSortDirection).toBe(expectedSort.SortDirection);
  })

  describe('Eventing', () => {
    it('should emit click event on grid row click', () => {
      const gridClickEventSpy = spyOn(component.gridRowClickEvent, 'emit');
      const mockItem = new VerificationDestinationItem(null);

      component.onGridRowClick(mockItem);

      expect(gridClickEventSpy).toHaveBeenCalledTimes(1);
    })
  })

  describe('Queue filtering/sorting', () => {
    it('should sort on order ID', () => {
      const item1 = new VerificationDestinationItem(null);
      const item2 = new VerificationDestinationItem(null);
      const item3 = new VerificationDestinationItem(null);
      item1.OrderId = '1';
      item2.OrderId = '2';
      item3.OrderId = '3';

      component.filteredVerificationDestinationItems = [item1, item2, item3 ];
      const mockSortEvent = {} as IColHeaderSortChanged;
      const expectedSortOrder = SortDirection.descending;
      const expectedColumnName = 'OrderId';

      mockSortEvent.SortDirection = expectedSortOrder;
      mockSortEvent.ColumnPropertyName = expectedColumnName;

      component.columnSelected(mockSortEvent);

      expect(component.currentSortPropertyName).toBe(expectedColumnName);
      expect(component.columnSortDirection).toBe(expectedSortOrder);
      expect(component.filteredVerificationDestinationItems[0].OrderId).toBe('3');
      expect(component.filteredVerificationDestinationItems[1].OrderId).toBe('2');
      expect(component.filteredVerificationDestinationItems[2].OrderId).toBe('1');
    });

    it('should sort on destination ID', () => {
      const item1 = new VerificationDestinationItem(null);
      const item2 = new VerificationDestinationItem(null);
      const item3 = new VerificationDestinationItem(null);
      item1.DestinationId = '1';
      item2.DestinationId = '2';
      item3.DestinationId = '3';

      component.filteredVerificationDestinationItems = [item1, item2, item3 ];
      const mockSortEvent = {} as IColHeaderSortChanged;
      const expectedSortOrder = SortDirection.ascending;
      const expectedColumnName = 'DestinationId';

      mockSortEvent.SortDirection = expectedSortOrder;
      mockSortEvent.ColumnPropertyName = expectedColumnName;

      component.columnSelected(mockSortEvent);

      expect(component.currentSortPropertyName).toBe(expectedColumnName);
      expect(component.columnSortDirection).toBe(expectedSortOrder);
      expect(component.filteredVerificationDestinationItems[0].DestinationId).toBe('1');
      expect(component.filteredVerificationDestinationItems[1].DestinationId).toBe('2');
      expect(component.filteredVerificationDestinationItems[2].DestinationId).toBe('3');
    });

    it('should sort on completed output devices', () => {
      const item1 = new VerificationDestinationItem(null);
      const item2 = new VerificationDestinationItem(null);
      const item3 = new VerificationDestinationItem(null);
      item1.CompleteOutputDevice = 1;
      item2.CompleteOutputDevice = 2;
      item3.CompleteOutputDevice = 3;

      component.filteredVerificationDestinationItems = [item1, item2, item3 ];
      const mockSortEvent = {} as IColHeaderSortChanged;
      const expectedSortOrder = SortDirection.descending;
      const expectedColumnName = 'CompleteOutputDevice';

      mockSortEvent.SortDirection = expectedSortOrder;
      mockSortEvent.ColumnPropertyName = expectedColumnName;

      component.columnSelected(mockSortEvent);

      expect(component.currentSortPropertyName).toBe(expectedColumnName);
      expect(component.columnSortDirection).toBe(expectedSortOrder);
      expect(component.filteredVerificationDestinationItems[0].CompleteOutputDevice).toBe(3);
      expect(component.filteredVerificationDestinationItems[1].CompleteOutputDevice).toBe(2);
      expect(component.filteredVerificationDestinationItems[2].CompleteOutputDevice).toBe(1);
    });

    it('should sort on date time', () => {
      const item1 = new VerificationDestinationItem(null);
      const item2 = new VerificationDestinationItem(null);
      const item3 = new VerificationDestinationItem(null);
      item1.FillDateTime = new Date(1);
      item2.FillDateTime = new Date(2);
      item3.FillDateTime = new Date(3);

      component.filteredVerificationDestinationItems = [item1, item2, item3 ];
      const mockSortEvent = {} as IColHeaderSortChanged;
      const expectedSortOrder = SortDirection.descending;
      const expectedColumnName = 'FillDateTime';

      mockSortEvent.SortDirection = expectedSortOrder;
      mockSortEvent.ColumnPropertyName = expectedColumnName;

      component.columnSelected(mockSortEvent);

      expect(component.currentSortPropertyName).toBe(expectedColumnName);
      expect(component.columnSortDirection).toBe(expectedSortOrder);
      expect(component.filteredVerificationDestinationItems[0].FillDateTime.toString()).toBe(new Date(3).toString());
      expect(component.filteredVerificationDestinationItems[1].FillDateTime.toString()).toBe(new Date(2).toString());
      expect(component.filteredVerificationDestinationItems[2].FillDateTime.toString()).toBe(new Date(1).toString());
    });

    it('should filter queue by search text on order ID', () => {
      const item1 = new VerificationDestinationItem(null);
      const item2 = new VerificationDestinationItem(null);
      const item3 = new VerificationDestinationItem(null);
      item1.OrderId = '1';
      item2.OrderId = '2';
      item3.OrderId = '3';
      component.unfilteredVerificationDestinationItems = [item1, item2, item3];

      component.searchTextFilter = '1';

      expect(component.filteredVerificationDestinationItems.length).toBe(1);
      expect(component.filteredVerificationDestinationItems[0].OrderId).toBe('1');
    })

    it('should filter queue by search text on Destination ID', () => {
      const item1 = new VerificationDestinationItem(null);
      const item2 = new VerificationDestinationItem(null);
      const item3 = new VerificationDestinationItem(null);
      item1.DestinationStringValue = '1';
      item2.DestinationStringValue = '2'
      item3.DestinationStringValue = '3';

      component.unfilteredVerificationDestinationItems = [item1, item2, item3];

      component.searchTextFilter = '1'

      expect(component.filteredVerificationDestinationItems.length).toBe(1);
      expect(component.filteredVerificationDestinationItems[0].DestinationStringValue).toBe('1');
    })
  });
});
