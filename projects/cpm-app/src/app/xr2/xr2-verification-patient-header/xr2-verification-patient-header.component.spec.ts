import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2VerificationPatientHeaderComponent } from './xr2-verification-patient-header.component';

describe('Xr2VerificationPatientHeaderComponent', () => {
  let component: Xr2VerificationPatientHeaderComponent;
  let fixture: ComponentFixture<Xr2VerificationPatientHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2VerificationPatientHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2VerificationPatientHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
