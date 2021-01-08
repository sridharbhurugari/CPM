import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationOrderPageComponent } from './verification-order-page.component';

describe('VerificationOrderPageComponent', () => {
  let component: VerificationOrderPageComponent;
  let fixture: ComponentFixture<VerificationOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
