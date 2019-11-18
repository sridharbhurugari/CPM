import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityCodeRouteAssignmentsPageComponent } from './priority-code-route-assignments-page.component';
import { PriorityCodeRouteAssignmentsComponent } from '../priority-code-route-assignments/priority-code-route-assignments.component';
import { PriorityCodeRouteAssignmentsService } from '../../api-core/services/priority-code-route-assignments.service';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { IPriorityCodeRouteAssignment } from '../../api-core/data-contracts/i-pickroute';

@Component({
  selector: 'app-priority-code-route-assignments',
  template: ''
})

class MockPriorityCodeRouteAssignmentsComponent{
  @Input()priorityCodeRouteAssignments: IPriorityCodeRouteAssignment[];
}

describe('PriorityCodeRouteAssignmentsPageComponent', () => {
  let component: PriorityCodeRouteAssignmentsPageComponent;
  let fixture: ComponentFixture<PriorityCodeRouteAssignmentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityCodeRouteAssignmentsPageComponent, MockPriorityCodeRouteAssignmentsComponent ],
      providers: [
        { provide: PriorityCodeRouteAssignmentsService, useValue: { get: () => of([]) } }
      ]
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
