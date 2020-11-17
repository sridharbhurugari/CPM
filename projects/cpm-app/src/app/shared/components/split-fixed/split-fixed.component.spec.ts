import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitFixedComponent } from './split-fixed.component';

describe('SplitFixedComponent', () => {
  let component: SplitFixedComponent;
  let fixture: ComponentFixture<SplitFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
