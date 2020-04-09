import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location, CommonModule } from '@angular/common';
import { PriorityCodeRouteAssignmentsPageComponent } from './priority-code-route-assignments-page.component';
import { PriorityCodeRouteAssignmentsService } from '../../api-core/services/priority-code-route-assignments.service';
import { of, fromEventPattern, Subject } from 'rxjs';
import { Component, Input } from '@angular/core';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { HeaderContainerComponent } from '../../shared/components/header-container/header-container.component';
import { PickRouteSelectComponent } from '../pick-route-select/pick-route-select.component';
import { SharedModule } from '../../shared/shared.module';
import { FooterModule, LayoutModule, ButtonActionModule, PopupWindowService, PopupDialogService } from '@omnicell/webcorecomponents';
import { DeviceSequenceOrderComponent } from '../device-sequence-order/device-sequence-order.component';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-priority-code-route-assignments',
  template: ''
})

class MockPriorityCodeRouteAssignmentsComponent {
}

describe('PriorityCodeRouteAssignmentsPageComponent', () => {
  let component: PriorityCodeRouteAssignmentsPageComponent;
  let fixture: ComponentFixture<PriorityCodeRouteAssignmentsPageComponent>;

  beforeEach(async(() => {
    const saveSpy = jasmine.createSpy('save').and.returnValue(of({}));

    const popupDismissedSubject = new Subject<boolean>();
    const popupResult: Partial<ConfirmPopupComponent> = { dismiss: popupDismissedSubject };
    const showSpy = jasmine.createSpy('show').and.returnValue(popupResult);
    const popupWindowService = { show: showSpy };

    const popupDialogService = { showOnce: jasmine.createSpy('showOnce') };

    TestBed.configureTestingModule({
      declarations: [ PriorityCodeRouteAssignmentsPageComponent, MockPriorityCodeRouteAssignmentsComponent,
         MockTranslatePipe, PickRouteSelectComponent, DeviceSequenceOrderComponent ],
      providers: [
        { provide: PriorityCodeRouteAssignmentsService, useValue: { getRoutes: () => of(), save: saveSpy } },
        { provide: PriorityCodePickRoutesService, useValue: { getPriority: () => of() } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: { } },
        { provide: PopupWindowService, useValue: popupWindowService },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: TranslateService, useValue: { get: () => of('') } },
      ],
      imports: [
        SharedModule, FooterModule, LayoutModule, ButtonActionModule,
        FormsModule, GridModule, CommonModule
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
});
