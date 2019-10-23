import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProgressbarModule, LayoutModule, ProgressAnimationModule, ProgressbarService } from '@omnicell/webcorecomponents';
import { TranslateModule, TranslateService, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { ConfigurationService, OalCoreModule, HttpClientService } from 'oal-core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ProgressbarModule,
        LayoutModule,
        ProgressAnimationModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: TranslateService, useValue: { setDefaultLang: () => {} } },
        { provide: 'env', useValue: { interopType: 'console'} },
        { provide: ConfigurationService, useValue: { init: () => {} }},
        { provide: ProgressbarService, useValue: { progressSubject: of([1, 2]) } }
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
});
