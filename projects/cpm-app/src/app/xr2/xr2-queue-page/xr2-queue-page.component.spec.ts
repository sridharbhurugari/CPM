import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';

import { Xr2QueuePageComponent } from './xr2-queue-page.component';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';


describe('Xr2QueuePageComponent', () => {
  let component: Xr2QueuePageComponent;
  let fixture: ComponentFixture<Xr2QueuePageComponent>;
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
      declarations: [ Xr2QueuePageComponent],
      imports: [],
      providers: [
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() } },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueuePageComponent);
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

  it('should set xr2QueueNavigationParameters on details page continue', () => {
    component.xr2QueueNavigationParameters = xr2QueueNavigationParameters;
    component.onDetailsPageContinueNavigation(xr2QueueNavigationParameters);

    expect(component.xr2QueueNavigationParameters).not.toBeNull();
  });

  it('should set saved configuration on new saved coonfiguration event', () => {
    component.xr2QueueNavigationParameters = xr2QueueNavigationParameters;
    component.savedPageConfiguration = {
      selectedDevice: null,
      searchTextFilter: 'old',
      colHeaderSort: null
    }
    const newSavedConfiguration: IXr2QueuePageConfiguration = {
      selectedDevice: null,
      searchTextFilter: 'new',
      colHeaderSort: null
    }

    component.onXr2PageConfigurationUpdateEvent(newSavedConfiguration);

    expect(component.savedPageConfiguration).toEqual(newSavedConfiguration)
  });
});

