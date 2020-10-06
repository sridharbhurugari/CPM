import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2DetailsQueueComponent } from './xr2-details-queue.component';

describe('Xr2DetailsQueueComponent', () => {
  let component: Xr2DetailsQueueComponent;
  let fixture: ComponentFixture<Xr2DetailsQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2DetailsQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2DetailsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
