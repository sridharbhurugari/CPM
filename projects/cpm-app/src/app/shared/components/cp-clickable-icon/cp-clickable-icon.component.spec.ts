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

  it('should emit click event when enabled', () => {
    expect(component).toBeTruthy();
    const spyEmit = spyOn(component.clickEvent, 'emit');
    component.disabled = false;
    component.onClick();
    expect(spyEmit).toHaveBeenCalled();
  });

  it('should not emit click event when disabled', () => {
    expect(component).toBeTruthy();
    const spyEmit = spyOn(component.clickEvent, 'emit');
    component.disabled = true;
    component.onClick();
    expect(spyEmit).toHaveBeenCalledTimes(0);
  });
});
