import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2VerificationOrderPageComponent } from './xr2-verification-order-page.component';

describe('Xr2VerificationOrderPageComponent', () => {
  let component: Xr2VerificationOrderPageComponent;
  let fixture: ComponentFixture<Xr2VerificationOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2VerificationOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2VerificationOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
