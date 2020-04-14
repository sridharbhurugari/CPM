import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareLeasePageComponent } from './hardware-lease-page.component';

describe('HardwareLeasePageComponent', () => {
  let component: HardwareLeasePageComponent;
  let fixture: ComponentFixture<HardwareLeasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareLeasePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareLeasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
