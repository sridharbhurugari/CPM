import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepackVerificationBasePageComponent } from './prepack-verification-base-page.component';

describe('PrepackVerificationBasePageComponent', () => {
  let component: PrepackVerificationBasePageComponent;
  let fixture: ComponentFixture<PrepackVerificationBasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepackVerificationBasePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepackVerificationBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
