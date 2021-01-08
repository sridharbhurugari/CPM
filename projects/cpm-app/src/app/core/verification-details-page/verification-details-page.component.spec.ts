import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDetailsPageComponent } from './verification-details-page.component';

describe('VerificationDetailsPageComponent', () => {
  let component: VerificationDetailsPageComponent;
  let fixture: ComponentFixture<VerificationDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
