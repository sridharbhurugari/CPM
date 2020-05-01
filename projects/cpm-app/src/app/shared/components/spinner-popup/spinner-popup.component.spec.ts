import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerPopupComponent } from './spinner-popup.component';
import { SvgIconModule, SvgiconComponent } from '@omnicell/webcorecomponents';

describe('SpinnerPopupComponent', () => {
  let component: SpinnerPopupComponent;
  let fixture: ComponentFixture<SpinnerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerPopupComponent ],
      imports: [ SvgIconModule ],
    })
    .overrideComponent(SvgiconComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
