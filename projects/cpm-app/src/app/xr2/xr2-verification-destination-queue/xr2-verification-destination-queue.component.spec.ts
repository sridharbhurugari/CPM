import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2VerificationDestinationQueueComponent } from './xr2-verification-destination-queue.component';

describe('Xr2VerificationPatientQueueComponent', () => {
  let component: Xr2VerificationDestinationQueueComponent;
  let fixture: ComponentFixture<Xr2VerificationDestinationQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2VerificationDestinationQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2VerificationDestinationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
