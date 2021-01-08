import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDestinationPageComponent } from './verification-destination-page.component';

describe('VerificationPatientPageComponent', () => {
  let component: VerificationDestinationPageComponent;
  let fixture: ComponentFixture<VerificationDestinationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDestinationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDestinationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
