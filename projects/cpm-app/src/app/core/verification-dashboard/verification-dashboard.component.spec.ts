import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockCpDataCardComponent } from '../../shared/testing/mock-cp-data-card.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { VerificationDashboardComponent } from './verification-dashboard.component';

describe('VerificationDashboardComponent', () => {
  let component: VerificationDashboardComponent;
  let fixture: ComponentFixture<VerificationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDashboardComponent, MockCpDataCardComponent, MockTranslatePipe ]
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
