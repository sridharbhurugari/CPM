import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location, CommonModule } from '@angular/common';
import { PriorityCodeRouteAssignmentsPageComponent } from './priority-code-route-assignments-page.component';
import { PriorityCodeRouteAssignmentsService } from '../../api-core/services/priority-code-route-assignments.service';
import { of, fromEventPattern } from 'rxjs';
import { Component, Input } from '@angular/core';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { HeaderContainerComponent } from '../../shared/components/header-container/header-container.component';
import { PickRouteSelectComponent } from '../pick-route-select/pick-route-select.component';
import { SharedModule } from '../../shared/shared.module';
import { FooterModule, LayoutModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { DeviceSequenceOrderComponent } from '../device-sequence-order/device-sequence-order.component';
import { FormsModule } from '@angular/forms';
import { FormStatusImageModule } from '@omnicell/webcorecomponents/esm5/lib/form-status-image/form-status-image.module';
import { GridModule } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-priority-code-route-assignments',
  template: ''
})

class MockPriorityCodeRouteAssignmentsComponent {
}

describe('PriorityCodeRouteAssignmentsPageComponent', () => {
  let component: PriorityCodeRouteAssignmentsPageComponent;
  let fixture: ComponentFixture<PriorityCodeRouteAssignmentsPageComponent>;
  var router, location

  beforeEach(async(() => {
    router = { navigate: () => { } };
    spyOn(router, 'navigate');
    location = { back: () => { } };
    spyOn(location, 'back');
    TestBed.configureTestingModule({
      declarations: [ PriorityCodeRouteAssignmentsPageComponent, MockPriorityCodeRouteAssignmentsComponent,
         MockTranslatePipe, PickRouteSelectComponent, DeviceSequenceOrderComponent ],
      providers: [
        { provide: PriorityCodeRouteAssignmentsService, useValue: { get: () => of([]) } },
        { provide: PriorityCodeRouteAssignmentsService, useValue: { getRoutes: () => of() } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: WpfActionControllerService, useVaule: { } },
        { provide: Location, useValue: location },
        { provide: Router, useValue: router }
      ],
      imports: [
        SharedModule, FooterModule, LayoutModule, ButtonActionModule,
        FormStatusImageModule, FormsModule, GridModule, CommonModule
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
