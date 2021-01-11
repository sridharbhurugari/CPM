import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridModule } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpGeneralHeaderComponent } from '../../shared/testing/mock-cp-general-header.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { VerificationDestinationQueueComponent } from '../verification-destination-queue/verification-destination-queue.component';

import { VerificationDestinationPageComponent } from './verification-destination-page.component';

describe('VerificationDestinationPageComponent', () => {
  let component: VerificationDestinationPageComponent;
  let fixture: ComponentFixture<VerificationDestinationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDestinationPageComponent, VerificationDestinationQueueComponent,
      MockCpGeneralHeaderComponent, MockColHeaderSortable, MockAppHeaderContainer, MockTranslatePipe, MockSearchBox,
      MockSearchPipe],
      imports: [GridModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDestinationPageComponent);
    component = fixture.componentInstance;
    component.navigationParameters = {
      OrderId: Guid.create(),
      DestinationId: Guid.create(),
      PriorityCodeDescription: 'description',
      Date: 'date',
      Route: VerificationRouting.DestinationPage
    } as IVerificationNavigationParameters;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.navigationParameters = {} as IVerificationNavigationParameters;
    expect(component).toBeTruthy();
  });

  describe('Eventing', () => {
    it('should navigate page on back event', () => {
      const navigateEventSpy = spyOn(component.pageNavigationEvent, 'emit');
      component.onBackEvent();

      expect(navigateEventSpy).toHaveBeenCalledTimes(1);
    })

    it('should navigate page on grid click event', () => {
      const navigateEventSpy = spyOn(component.pageNavigationEvent, 'emit');
      const mockItem = new VerificationDestinationItem(null);

      component.onGridRowClickEvent(mockItem);

      expect(navigateEventSpy).toHaveBeenCalledTimes(1);
    });
  })
});
