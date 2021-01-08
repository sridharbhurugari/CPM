import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationOrderQueueComponent } from './verification-order-queue.component';

describe('VerificationOrderQueueComponent', () => {
  let component: VerificationOrderQueueComponent;
  let fixture: ComponentFixture<VerificationOrderQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationOrderQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOrderQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
