import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2QueueDetailsPageComponent } from './xr2-queue-details-page.component';

describe('Xr2QueueDetailsPageComponent', () => {
  let component: Xr2QueueDetailsPageComponent;
  let fixture: ComponentFixture<Xr2QueueDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2QueueDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
