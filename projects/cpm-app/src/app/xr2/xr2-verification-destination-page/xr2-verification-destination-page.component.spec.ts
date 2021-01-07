import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2VerificationDestinationPageComponent } from './xr2-verification-destination-page.component';

describe('Xr2VerificationPatientPageComponent', () => {
  let component: Xr2VerificationDestinationPageComponent;
  let fixture: ComponentFixture<Xr2VerificationDestinationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2VerificationDestinationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2VerificationDestinationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
