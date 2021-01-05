import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2VerificationPatientPageComponent } from './xr2-verification-patient-page.component';

describe('Xr2VerificationPatientPageComponent', () => {
  let component: Xr2VerificationPatientPageComponent;
  let fixture: ComponentFixture<Xr2VerificationPatientPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2VerificationPatientPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2VerificationPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
