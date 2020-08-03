import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DashboardCardComponent } from './dashboard-card.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { ButtonActionModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { CoreModule } from '../../core/core.module';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { CpColorService } from '../../shared/services/cp-color.service';
import { SharedModule } from '../../shared/shared.module';

describe('DashboardCardComponent', () => {
  let component: DashboardCardComponent;
  let fixture: ComponentFixture<DashboardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCardComponent, MockTranslatePipe,
        MockSearchPipe, MockAppHeaderContainer],
      imports: [ButtonActionModule, FooterModule, LayoutModule, CoreModule, SharedModule],
      providers: [ { provide: CpColorService, useValue: { pickTextColorBasedOnBackgroundColor: () => of() } }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardComponent);
    component = fixture.componentInstance;
    component.drawerData = new QuickPickDrawerData(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
