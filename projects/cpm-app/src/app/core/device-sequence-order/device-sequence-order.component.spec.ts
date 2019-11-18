import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSequenceOrderComponent } from './device-sequence-order.component';

describe('DeviceSequenceOrderComponent', () => {
  let component: DeviceSequenceOrderComponent;
  let fixture: ComponentFixture<DeviceSequenceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSequenceOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSequenceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
