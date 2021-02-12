import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IVerificationDashboardData } from '../../api-core/data-contracts/i-verification-dashboard-data';
import { VerificationDashboardData } from '../../shared/model/verification-dashboard-data';
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
    component.verificationDashboardData = new VerificationDashboardData(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show icon if required is greater than completed', () => {
    const required = 3;
    const completed = 1;
    const iconString = 'icon';

    const newIconString = component.showIcon(iconString, completed, required);

    expect(newIconString).toBe(iconString);
  });

  it('should not show icon if required is less or equal to completed', () => {
    const required = 2;
    const completed = 2;
    const iconString = 'icon';

    const newIconString = component.showIcon(iconString, completed, required);

    expect(newIconString).toBe('');
  });
});
