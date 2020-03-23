import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidedInvMgmtCycleCountPageComponent } from './guidedinvmgmt-cyclecount-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DatepickerComponent } from '@omnicell/webcorecomponents';

describe('GuidedInvMgmtCycleCountPageComponent', () => {
  let component: GuidedInvMgmtCycleCountPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtCycleCountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidedInvMgmtCycleCountPageComponent, MockTranslatePipe, DatepickerComponent ],
      imports: [],
      providers: [
        { provide: WpfActionControllerService, useValue: { } }
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
