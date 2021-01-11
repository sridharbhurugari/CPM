import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridModule } from '@omnicell/webcorecomponents';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { VerificationOrderItem } from '../../shared/model/verification-order-item';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { VerificationOrderQueueComponent } from './verification-order-queue.component';

describe('VerificationOrderQueueComponent', () => {
  let component: VerificationOrderQueueComponent;
  let fixture: ComponentFixture<VerificationOrderQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationOrderQueueComponent, MockCpDataLabelComponent, MockColHeaderSortable,
        MockAppHeaderContainer, MockTranslatePipe, MockSearchPipe],
        imports: [GridModule]
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
      expect(component.sortOrder).toBe(expectedSortOrder);
    });
  });
});
