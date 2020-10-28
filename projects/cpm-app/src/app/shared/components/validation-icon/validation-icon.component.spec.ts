import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { SvgIconModule, ToastService } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';

import { ValidationIconComponent } from './validation-icon.component';

describe('ValidationIconComponent', () => {
  let component: ValidationIconComponent;
  let fixture: ComponentFixture<ValidationIconComponent>;

  beforeEach(async(() => {
    let toastService: {
      error: () => { },
      warning: () => { },
      info: () => { },
    };
    TestBed.configureTestingModule({
      declarations: [ ValidationIconComponent ],
      imports: [
        SvgIconModule,
      ],
      providers: [
        { provide: TranslateService, useValue: { get: (x: string) => of(`{x}_TRANSLATED`) } },
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
});
