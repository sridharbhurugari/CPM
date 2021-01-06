import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2VerificationPatientQueueComponent } from './xr2-verification-patient-queue.component';

describe('Xr2VerificationPatientQueueComponent', () => {
  let component: Xr2VerificationPatientQueueComponent;
  let fixture: ComponentFixture<Xr2VerificationPatientQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2VerificationPatientQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2VerificationPatientQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
