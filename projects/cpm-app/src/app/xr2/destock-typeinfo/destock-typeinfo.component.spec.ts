import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { DestockTypeInfoComponent } from './destock-typeinfo.component';

describe('Xr2QueuePageComponent', () => {
  let component: DestockTypeInfoComponent ;
  let fixture: ComponentFixture<DestockTypeInfoComponent>;
  let translateService: Partial<TranslateService>;
  let xr2QueueNavigationParameters: IXr2QueueNavigationParameters;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestockTypeInfoComponent, MockTranslatePipe ],
      // providers: [
      //   { provide: WindowService, useValue: []},
      //   { provide: PersistService, useValue: []},
      // ]
    })
    .compileComponents();
  }));


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
      declarations: [ DestockTypeInfoComponent],
      imports: [],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestockTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

