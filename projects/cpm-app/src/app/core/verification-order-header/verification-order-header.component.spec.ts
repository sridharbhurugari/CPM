import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonToggleModule } from '@omnicell/webcorecomponents';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { MockCpGeneralHeaderComponent } from '../../shared/testing/mock-cp-general-header.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { VerificationOrderHeaderComponent } from './verification-order-header.component';

describe('VerificationOrderHeaderComponent', () => {
  let component: VerificationOrderHeaderComponent;
  let fixture: ComponentFixture<VerificationOrderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationOrderHeaderComponent, MockCpGeneralHeaderComponent,
        MockAppHeaderContainer, MockTranslatePipe, MockSearchBox],
      imports: [ButtonToggleModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOrderHeaderComponent);
    component = fixture.componentInstance;
    component.savedPageConfiguration = {} as IVerificationPageConfiguration;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
