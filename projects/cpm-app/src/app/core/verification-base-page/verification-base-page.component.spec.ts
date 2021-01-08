import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationBasePageComponent } from './verification-base-page.component';

describe('VerificationPageComponent', () => {
  let component: VerificationBasePageComponent;
  let fixture: ComponentFixture<VerificationBasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationBasePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
