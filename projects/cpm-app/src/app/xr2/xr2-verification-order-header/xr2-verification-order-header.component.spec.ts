import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2VerificationOrderHeaderComponent } from './xr2-verification-order-header.component';

describe('Xr2VerificationOrderHeaderComponent', () => {
  let component: Xr2VerificationOrderHeaderComponent;
  let fixture: ComponentFixture<Xr2VerificationOrderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2VerificationOrderHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2VerificationOrderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
