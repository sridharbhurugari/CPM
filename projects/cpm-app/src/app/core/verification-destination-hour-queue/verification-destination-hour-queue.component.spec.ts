import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridModule } from '@omnicell/webcorecomponents';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDestinationHourQueueComponent, MockColHeaderSortable,
        MockAppHeaderContainer, MockTranslatePipe, MockSearchPipe, MockCpDataLabelComponent],
      imports: [GridModule]
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
});
