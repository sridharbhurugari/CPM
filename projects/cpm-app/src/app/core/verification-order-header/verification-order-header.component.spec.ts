import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonToggleModule } from '@omnicell/webcorecomponents';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { MockCpGeneralHeaderComponent } from '../../shared/testing/mock-cp-general-header.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockButtonToggle } from '../testing/mock-button-toggle-box.spec';

import { VerificationOrderHeaderComponent } from './verification-order-header.component';

describe('VerificationOrderHeaderComponent', () => {
  let component: VerificationOrderHeaderComponent;
  let fixture: ComponentFixture<VerificationOrderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationOrderHeaderComponent, MockCpGeneralHeaderComponent,
        MockAppHeaderContainer, MockTranslatePipe, MockSearchBox,  MockButtonToggle],
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

  it('should emit a text filter if loaded in saved configuration', () => {
    const searchTextFilterEventSpy = spyOn(component.searchTextFilterEvent, 'emit')
    component.savedPageConfiguration = {} as IVerificationPageConfiguration;
    component.savedPageConfiguration.searchTextFilterOrder = "filter";
    component.savedPageConfiguration.requiredOrders = true;

    component.ngAfterViewInit();

    expect(searchTextFilterEventSpy).toHaveBeenCalledTimes(1);
  })
});
