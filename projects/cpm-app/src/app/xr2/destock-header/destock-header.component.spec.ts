import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { DestockPageComponent } from './destock-page.component';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';


describe('Xr2QueuePageComponent', () => {
  let component: DestockPageComponent ;
  let fixture: ComponentFixture<DestockPageComponent>;
  let translateService: Partial<TranslateService>;
  let xr2QueueNavigationParameters: IXr2QueueNavigationParameters;

  beforeEach(async(() => {
    xr2QueueNavigationParameters = {
      priorityCodeDescription: 'code',
      pickPriorityIdentity: '1',
      deviceId: '1',
    };

    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService))
    };

    TestBed.configureTestingModule({
      declarations: [ DestockPageComponent],
      imports: [],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set xr2QueueNavigationParameters to null on details page back navigation', () => {
      component.xr2QueueNavigationParameters = xr2QueueNavigationParameters;
      component.onDetailsPageBackNavigation();

      expect(component.xr2QueueNavigationParameters).toBe(null);
  });

});

