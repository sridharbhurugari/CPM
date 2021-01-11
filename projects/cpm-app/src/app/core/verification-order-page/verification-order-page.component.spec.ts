import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonToggleModule, GridModule } from '@omnicell/webcorecomponents';
import { VerificationOrderItem } from '../../shared/model/verification-order-item';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationOrderPageComponent, VerificationOrderHeaderComponent,
        VerificationOrderQueueComponent, MockColHeaderSortable, MockAppHeaderContainer,
        MockSearchBox, MockSearchPipe, MockTranslatePipe, MockCpDataLabelComponent ],
      imports: [GridModule, ButtonToggleModule]
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
  });
});
