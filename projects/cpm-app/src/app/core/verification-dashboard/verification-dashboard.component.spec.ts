import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDashboardComponent } from './verification-dashboard.component';

describe('VerificationDashboardComponent', () => {
  let component: VerificationDashboardComponent;
  let fixture: ComponentFixture<VerificationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
