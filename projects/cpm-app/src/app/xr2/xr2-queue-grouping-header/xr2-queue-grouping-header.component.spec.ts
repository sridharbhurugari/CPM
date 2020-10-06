import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2QueueGroupingHeaderComponent } from './xr2-queue-grouping-header.component';

describe('Xr2QueueGroupingHeaderComponent', () => {
  let component: Xr2QueueGroupingHeaderComponent;
  let fixture: ComponentFixture<Xr2QueueGroupingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2QueueGroupingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueGroupingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
