import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIconModule } from '@omnicell/webcorecomponents';
import { CpIconButtonComponent } from './cp-icon-button.component';

describe('CpIconButtonComponent', () => {
  let component: CpIconButtonComponent;
  let fixture: ComponentFixture<CpIconButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CpIconButtonComponent],
      imports: [SvgIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
