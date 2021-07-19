import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2InvoicesQueueComponent } from './xr2-invoices-queue.component';

describe('Xr2InvoicesQueueComponent', () => {
  let component: Xr2InvoicesQueueComponent;
  let fixture: ComponentFixture<Xr2InvoicesQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2InvoicesQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2InvoicesQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
