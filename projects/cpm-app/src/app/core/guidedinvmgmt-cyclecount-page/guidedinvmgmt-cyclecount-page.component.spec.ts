import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ActivatedRoute } from '@angular/router';
import { GuidedCycleCountService } from '../../api-core/services/guided-cycle-count-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { FormsModule } from '@angular/forms';
import { GuidedInvMgmtCycleCountPageComponent } from './guidedinvmgmt-cyclecount-page.component';
describe('GuidedInvMgmtCycleCountPageComponent', () => {
  let component: GuidedInvMgmtCycleCountPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtCycleCountPageComponent>;
  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { queryParamMap: { get: () => ({}) } }
    });
    const guidedCycleCountServiceStub = () => ({
      get: deviceID => ({ pipe: () => ({}) }),
      post: (deviceId, update) => ({ subscribe: f => f({}) })
    });
    const wpfActionControllerServiceStub = () => ({
      ExecuteBackAction: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [GuidedInvMgmtCycleCountPageComponent,MockTranslatePipe],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        {
          provide: GuidedCycleCountService,
          useFactory: guidedCycleCountServiceStub
        },
        {
          provide: WpfActionControllerService,
          useFactory: wpfActionControllerServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(GuidedInvMgmtCycleCountPageComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it("titleHeader defaults to: 'GUIDED_CYCLE_COUNT' | MockTranslatePipe", () => {
    expect(component.titleHeader).toEqual("'GUIDED_CYCLE_COUNT' | MockTranslatePipe");
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getCycleCountData').and.callThrough();
      component.ngOnInit();
      expect(component.getCycleCountData).toHaveBeenCalled();
    });
  });
  describe('navigateBack', () => {
    it('makes expected calls', () => {
      const wpfActionControllerServiceStub: WpfActionControllerService = fixture.debugElement.injector.get(
        WpfActionControllerService
      );
      spyOn(
        wpfActionControllerServiceStub,
        'ExecuteBackAction'
      ).and.callThrough();
      component.navigateBack();
      expect(
        wpfActionControllerServiceStub.ExecuteBackAction
      ).toHaveBeenCalled();
    });
  });
  describe('navigateContinue', () => {
    it('makes expected calls', () => {
      const guidedCycleCountServiceStub: GuidedCycleCountService = fixture.debugElement.injector.get(
        GuidedCycleCountService
      );
      const wpfActionControllerServiceStub: WpfActionControllerService = fixture.debugElement.injector.get(
        WpfActionControllerService
      );
      spyOn(component, 'nextRecord').and.callThrough();
      spyOn(guidedCycleCountServiceStub, 'post').and.callThrough();
      spyOn(
        wpfActionControllerServiceStub,
        'ExecuteBackAction'
      ).and.callThrough();
      component.navigateContinue();
      expect(component.nextRecord).toHaveBeenCalled();
      expect(guidedCycleCountServiceStub.post).toHaveBeenCalled();
      expect(
        wpfActionControllerServiceStub.ExecuteBackAction
      ).toHaveBeenCalled();
    });
  });
});
