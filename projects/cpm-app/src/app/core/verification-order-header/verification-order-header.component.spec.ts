import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationOrderHeaderComponent } from './verification-order-header.component';

describe('VerificationOrderHeaderComponent', () => {
  let component: VerificationOrderHeaderComponent;
  let fixture: ComponentFixture<VerificationOrderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationOrderHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOrderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
