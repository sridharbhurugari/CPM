import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2GroupingQueueComponent } from './xr2-grouping-queue.component';

describe('Xr2GroupingQueueComponent', () => {
  let component: Xr2GroupingQueueComponent;
  let fixture: ComponentFixture<Xr2GroupingQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2GroupingQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2GroupingQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
