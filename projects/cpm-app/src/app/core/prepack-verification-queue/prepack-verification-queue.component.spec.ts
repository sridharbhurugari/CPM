import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepackVerificationQueueComponent } from './prepack-verification-queue.component';

describe('PrepackVerificationQueueComponent', () => {
  let component: PrepackVerificationQueueComponent;
  let fixture: ComponentFixture<PrepackVerificationQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepackVerificationQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepackVerificationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
