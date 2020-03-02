import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProgressbarModule, LayoutModule, ProgressAnimationModule, ProgressbarService } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { LocalStorageService } from './shared/services/local-storage.service';
import { WindowService } from './shared/services/window-service';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
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
        { provide: TranslateService, useValue: { setDefaultLang: () => {} } },
        { provide: ProgressbarService, useValue: { progressSubject: of([1, 2]) } },
        { provide: WindowService, useValue: { } },
        { provide: LocalStorageService, useValue: { } },
        { provide: 'env', useValue: { } },
        { provide: 'configEndpointKey', useValue: { } },
        { provide: HttpClient, useValue: { } },
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
