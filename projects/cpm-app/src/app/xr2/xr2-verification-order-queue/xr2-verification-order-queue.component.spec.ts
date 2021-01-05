import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2VerificationOrderQueueComponent } from './xr2-verification-order-queue.component';

describe('Xr2VerificationOrderQueueComponent', () => {
  let component: Xr2VerificationOrderQueueComponent;
  let fixture: ComponentFixture<Xr2VerificationOrderQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2VerificationOrderQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2VerificationOrderQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
