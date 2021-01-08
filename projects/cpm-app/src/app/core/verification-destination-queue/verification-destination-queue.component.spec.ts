import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDestinationQueueComponent } from './verification-destination-queue.component';

describe('VerificationPatientQueueComponent', () => {
  let component: VerificationDestinationQueueComponent;
  let fixture: ComponentFixture<VerificationDestinationQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDestinationQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDestinationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
