import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location, CommonModule } from '@angular/common';
import { PriorityCodeRouteAssignmentsPageComponent } from './priority-code-route-assignments-page.component';
import { PriorityCodeRouteAssignmentsService } from '../../api-core/services/priority-code-route-assignments.service';
import { of, Subject } from 'rxjs';
import { Component, Input } from '@angular/core';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { HeaderContainerComponent } from '../../shared/components/header-container/header-container.component';
import { PickRouteSelectComponent } from '../pick-route-select/pick-route-select.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule, FooterModule, LayoutModule, ButtonActionModule,
   PopupWindowService, PopupDialogService } from '@omnicell/webcorecomponents';
import { DeviceSequenceOrderComponent } from '../device-sequence-order/device-sequence-order.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { IPickRouteDevice } from '../../api-core/data-contracts/i-pickroute-device';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';

@Component({
  selector: 'app-priority-code-route-assignments',
  template: ''
})

class MockPriorityCodeRouteAssignmentsComponent {
}

describe('PriorityCodeRouteAssignmentsPageComponent', () => {
  let component: PriorityCodeRouteAssignmentsPageComponent;
  let fixture: ComponentFixture<PriorityCodeRouteAssignmentsPageComponent>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let popupDialogService: Partial<PopupDialogService>;
  let priorityCodeRouteAssignmentsService: Partial<PriorityCodeRouteAssignmentsService>;
  let popupWindowService: any;
  const popupDismissedSubject = new Subject<boolean>();

  let mockPickRouteDevices: IDeviceSequenceOrder[];
  const defaultItem: IPickRouteDevice = {
    PickRouteId: 1,
    RouteDescription: 'Default',
    PickRouteGuid: '11111-11-1111-1111',
    PickRouteDevices: mockPickRouteDevices,
  };

  beforeEach(async(() => {
    wpfActionControllerService = { ExecuteBackAction: () => { } };
    spyOn(wpfActionControllerService, 'ExecuteBackAction');

    const saveSpy = jasmine.createSpy('save').and.returnValue(of({}));
    priorityCodeRouteAssignmentsService = { getRoutes: () => of(), save: saveSpy };

    const popupResult: Partial<ConfirmPopupComponent> = { dismiss: popupDismissedSubject };
    const showSpy = jasmine.createSpy('show').and.returnValue(popupResult);
    popupWindowService = { show: showSpy };

    popupDialogService = { showOnce: jasmine.createSpy('showOnce') };

    TestBed.configureTestingModule({
      declarations: [ PriorityCodeRouteAssignmentsPageComponent, MockPriorityCodeRouteAssignmentsComponent,
         MockTranslatePipe, PickRouteSelectComponent, DeviceSequenceOrderComponent ],
      providers: [
        { provide: PriorityCodeRouteAssignmentsService, useValue: priorityCodeRouteAssignmentsService },
        { provide: PriorityCodePickRoutesService, useValue: { getPriority: () => of() } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: wpfActionControllerService },
        { provide: PopupWindowService, useValue: popupWindowService },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: TranslateService, useValue: { get: () => of('') } },
      ],
      imports: [
        GridModule,
        SharedModule,
        ButtonActionModule,
        LayoutModule,
        FooterModule,
        FormsModule,
      ]
    })
    .overrideComponent(PriorityCodeRouteAssignmentsPageComponent, {
      set: {
        template: ''
      }
    })
    .overrideComponent(DeviceSequenceOrderComponent, {
      set: {
        template: ''
      }
    })
    .overrideComponent(PickRouteSelectComponent , {
      set: {
        template: ''
      }
    })
    .overrideComponent(HeaderContainerComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityCodeRouteAssignmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigateBack', () => {
    it('should call wpfActionControllerService.back', () => {
      component.navigateBack();
      expect(wpfActionControllerService.ExecuteBackAction).toHaveBeenCalled();
    });
  });

  describe('save', () => {
    beforeEach(() => {
      component.pickRoute = defaultItem;
      component.priorityCode = 'STAT';
      component.save();
    });

    it('should show popup for confirm save', () => {
      expect(popupWindowService.show).toHaveBeenCalled();
    });

    describe('given confirm save popup dismissed with confirm', () => {
      it('should call priorityCodeRouteAssignmentsService.save', () => {
        popupDismissedSubject.next(true);
        expect(priorityCodeRouteAssignmentsService.save).toHaveBeenCalled();
      });
    });

    describe('given confirm save popup dismissed with cancel', () => {
      it('should not call priorityCodeRouteAssignmentsService.save', () => {
        popupDismissedSubject.next(false);
        expect(priorityCodeRouteAssignmentsService.save).not.toHaveBeenCalled();
      });
    });
  });
});
