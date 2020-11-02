import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2QueuePageComponent } from './xr2-queue-page.component';

describe('Xr2QueuePageComponent', () => {
  let component: Xr2QueuePageComponent;
  let fixture: ComponentFixture<Xr2QueuePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2QueuePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
