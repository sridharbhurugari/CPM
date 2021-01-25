import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDetailsCardComponent } from './verification-details-card.component';

describe('VerificationDetailsCardComponent', () => {
  let component: VerificationDetailsCardComponent;
  let fixture: ComponentFixture<VerificationDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
