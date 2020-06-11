import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetailsCardComponent } from './dashboard-details-card.component';

describe('DashboardDetailsCardComponent', () => {
  let component: DashboardDetailsCardComponent;
  let fixture: ComponentFixture<DashboardDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
