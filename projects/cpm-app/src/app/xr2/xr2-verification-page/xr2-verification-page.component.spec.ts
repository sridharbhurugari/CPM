import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2VerificationPageComponent } from './xr2-verification-page.component';

describe('Xr2VerificationPageComponent', () => {
  let component: Xr2VerificationPageComponent;
  let fixture: ComponentFixture<Xr2VerificationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2VerificationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2VerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
