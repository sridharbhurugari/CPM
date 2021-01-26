import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { GridModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpDataCardComponent } from '../../shared/testing/mock-cp-data-card.spec';
import { MockCpGeneralHeaderComponent } from '../../shared/testing/mock-cp-general-header.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { VerificationDashboardComponent } from '../verification-dashboard/verification-dashboard.component';

import { VerificationDetailsPageComponent } from './verification-details-page.component';

describe('VerificationDetailsPageComponent', () => {
  let component: VerificationDetailsPageComponent;
  let fixture: ComponentFixture<VerificationDetailsPageComponent>;
  let translateService: Partial<TranslateService>;

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of(translateService)),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDetailsPageComponent, VerificationDashboardComponent,
        MockCpGeneralHeaderComponent, MockAppHeaderContainer, MockCpDataCardComponent,
        MockColHeaderSortable, MockAppHeaderContainer, MockTranslatePipe, MockSearchBox,
        MockSearchPipe, ],
      imports: [GridModule],
      providers: [
        {provide: TranslateService, useValue: translateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDetailsPageComponent);
    component = fixture.componentInstance;
    component.navigationParameters = {
      DeviceId: 1,
      OrderId: 'orderId',
      DeviceDescription: 'device-description',
      DestinationId: 'destinaitonId',
      PriorityCodeDescription: 'priority-description',
      Date: null,
      Route: VerificationRouting.DetailsPage
    } as IVerificationNavigationParameters;
    fixture.detectChanges();

    component.navigationParameters = {} as IVerificationNavigationParameters;
  });

  it('should create', () => {
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

      component.onBackEvent();

      expect(navigateEventSpy).toHaveBeenCalledTimes(1);
    });
  })
});
