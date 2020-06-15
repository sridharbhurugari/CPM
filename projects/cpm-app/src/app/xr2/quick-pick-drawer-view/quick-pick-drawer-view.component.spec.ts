import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPickDrawerViewComponent } from './quick-pick-drawer-view.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { ButtonActionModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { CoreModule } from '../../core/core.module';
import { QuickPickDrawerDetailsViewComponent } from '../quick-pick-drawer-details-view/quick-pick-drawer-details-view.component';

describe('QuickPickDrawerViewComponent', () => {
  let component: QuickPickDrawerViewComponent;
  let fixture: ComponentFixture<QuickPickDrawerViewComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ QuickPickDrawerViewComponent, QuickPickDrawerDetailsViewComponent, DashboardCardComponent, MockTranslatePipe,
        MockSearchPipe, MockAppHeaderContainer ],
      imports: [ButtonActionModule, FooterModule, LayoutModule, CoreModule ],
    }).overrideComponent(DashboardCardComponent, {
      set: {
        template: ''
      }
    })
    .overrideComponent(QuickPickDrawerDetailsViewComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPickDrawerViewComponent);
    component = fixture.componentInstance;
    component._quickpickDrawers = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
