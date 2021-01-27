import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { SvgIconModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockValidationIconComponent } from '../../shared/testing/mock-validation-icon.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { VerificationDetailsCardComponent } from './verification-details-card.component';

describe('VerificationDetailsCardComponent', () => {
  let component: VerificationDetailsCardComponent;
  let fixture: ComponentFixture<VerificationDetailsCardComponent>;
  let translateService: Partial<TranslateService>;

  translateService = {
    get: jasmine.createSpy('get').and.returnValue(of(translateService)),
    getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDetailsCardComponent, 
         MockColHeaderSortable, MockTranslatePipe,  MockCpClickableIconComponent, MockValidationIconComponent ],
      imports: [SvgIconModule],
      providers: [
        { provide: TranslateService, useValue: translateService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
