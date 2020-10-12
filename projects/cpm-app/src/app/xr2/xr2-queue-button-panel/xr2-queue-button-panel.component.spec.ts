import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Xr2QueueButtonPanelComponent } from './xr2-queue-button-panel.component';

describe('Xr2QueueButtonPanelComponent', () => {
  let component: Xr2QueueButtonPanelComponent;
  let fixture: ComponentFixture<Xr2QueueButtonPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2QueueButtonPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueButtonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
