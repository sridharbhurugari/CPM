import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2QueueDetailsHeaderComponent } from './xr2-queue-details-header.component';

describe('Xr2QueueDetailsHeaderComponent', () => {
  let component: Xr2QueueDetailsHeaderComponent;
  let fixture: ComponentFixture<Xr2QueueDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2QueueDetailsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
