import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2VerificationDetailsPageComponent } from './xr2-verification-details-page.component';

describe('Xr2VerificationDetailsPageComponent', () => {
  let component: Xr2VerificationDetailsPageComponent;
  let fixture: ComponentFixture<Xr2VerificationDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2VerificationDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2VerificationDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
