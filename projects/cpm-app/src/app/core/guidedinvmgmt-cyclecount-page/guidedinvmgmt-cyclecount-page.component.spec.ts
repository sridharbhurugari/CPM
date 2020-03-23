import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidedInvMgmtCycleCountPageComponent } from './guidedinvmgmt-cyclecount-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { InputsModule, LayoutModule, DatepickerModule, FooterModule, ButtonActionModule} from '@omnicell/webcorecomponents';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { GuidedCycleCountService } from '../../api-core/services/guided-cycle-count-service';

describe('GuidedInvMgmtCycleCountPageComponent', () => {
  let component: GuidedInvMgmtCycleCountPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtCycleCountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidedInvMgmtCycleCountPageComponent, MockTranslatePipe ],
      imports: [SharedModule, LayoutModule, DatepickerModule, FooterModule, ButtonActionModule, InputsModule ],
      providers: [
        { provide: WpfActionControllerService, useValue: { } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: GuidedCycleCountService, useValue: { get: () => of([]) } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidedInvMgmtCycleCountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
