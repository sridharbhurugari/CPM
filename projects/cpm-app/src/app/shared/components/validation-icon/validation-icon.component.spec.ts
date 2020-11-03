import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { SvgIconModule, ToastService } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';

import { ValidationIconComponent } from './validation-icon.component';

describe('ValidationIconComponent', () => {
  let component: ValidationIconComponent;
  let fixture: ComponentFixture<ValidationIconComponent>;
  let toastService: Partial<ToastService>;

  beforeEach(async(() => {
    let errorSpy = jasmine.createSpy('error');
    let warningSpy = jasmine.createSpy('warning');
    let infoSpy = jasmine.createSpy('info');
    toastService = {
      error: errorSpy,
      warning: warningSpy,
      info: infoSpy,
    };
    let translateService = {
      get: (x: string[]) => {
        let result = { };
        for(let index in x){
          result[x[index]] = `${x[index]}_TRANSLATED`;
        }

        return of(result);
      }
    };
    TestBed.configureTestingModule({
      declarations: [ ValidationIconComponent ],
      imports: [
        SvgIconModule,
      ],
      providers: [
        { provide: TranslateService, useValue: translateService },
        { provide: ToastService, useValue: toastService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with resource keys set', () => {
    beforeEach(() => {
      component.toastTileResourceKey = 'titleKey';
      component.toastMsgResourceKey = 'msgKey';
    });
    describe('toastType of info', () => {
      it('should call toastService.info', () => {
        component.toastType = 'info';
        component.iconClicked();
        expect(toastService.info).toHaveBeenCalled();
      });
    });

    describe('toastType of error', () => {
      it('should call toastService.info', () => {
        component.toastType = 'error';
        component.iconClicked();
        expect(toastService.error).toHaveBeenCalled();
      });
    });

    describe('toastType of warn', () => {
      it('should call toastService.info', () => {
        component.toastType = 'warn';
        component.iconClicked();
        expect(toastService.warning).toHaveBeenCalled();
      });
    });
  });
});
