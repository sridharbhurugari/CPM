import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitResizeComponent } from './split-resize.component';

describe('SplitResizeComponent', () => {
  let component: SplitResizeComponent;
  let fixture: ComponentFixture<SplitResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
