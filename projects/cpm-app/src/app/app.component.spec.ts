import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProgressbarModule, LayoutModule, ProgressAnimationModule, ProgressbarService } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { LocalStorageService } from './shared/services/local-storage.service';
import { WindowService } from './shared/services/window-service';
import { EventConnectionService } from './shared/services/event-connection.service';
import { ConfigurationService, OcapHttpClientService } from 'oal-core';

describe('AppComponent', () => {
  let eventConnectionService: Partial<EventConnectionService>;
  let translateService: Partial<TranslateService>;
  let configurationService: Partial<ConfigurationService>;
  let localStorageService: Partial<LocalStorageService>;

  eventConnectionService = {
    startUp: jasmine.createSpy('startup')
  };

  translateService = { setDefaultLang: jasmine.createSpy('setDefaultLang') };
  configurationService = { init: jasmine.createSpy('init') };
  localStorageService = { setItemObject: jasmine.createSpy('setItemObject') };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ProgressbarModule,
        LayoutModule,
        ProgressAnimationModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: TranslateService, useValue: translateService },
        { provide: WindowService, useValue: { } },
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: ProgressbarService, useValue: { progressSubject: of([1, 2]) } },
        { provide: 'env', useValue: { } },
        { provide: 'configEndpointKey', useValue: { } },
        { provide: OcapHttpClientService, useValue: { } },
        { provide: EventConnectionService, useValue: eventConnectionService },
        { provide: ConfigurationService, useValue: configurationService },
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cpm-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('cpm-app');
  });

  it(`should execute configuration and start events`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(eventConnectionService.startUp).toHaveBeenCalled();
    expect(translateService.setDefaultLang).toHaveBeenCalled();
    expect(configurationService.init).toHaveBeenCalled();
    expect(localStorageService.setItemObject).toHaveBeenCalled();
  });

});
