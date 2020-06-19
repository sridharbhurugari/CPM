import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgIconModule } from '@omnicell/webcorecomponents';
import { CPClickableIconComponent } from './cp-clickable-icon.component';

describe('CPClickableIconComponent', () => {
  let component: CPClickableIconComponent;
  let fixture: ComponentFixture<CPClickableIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CPClickableIconComponent],
      imports: [SvgIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CPClickableIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
