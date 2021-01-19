import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityCodePickRoutesPageComponent } from './priority-code-pick-routes-page.component';
import { PriorityCodePickRoutesService } from '../../api-core/services/priority-code-pick-routes.service';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { IPriorityCodePickRoute } from '../../api-core/data-contracts/i-priority-code-pick-route';
import { Router } from '@angular/router';

@Component({
  selector: 'app-priority-code-pick-routes',
  template: ''
})
class MockPriorityCodePickRoutesComponent {
  @Input()priorityCodePickRoutes: IPriorityCodePickRoute[];
}

describe('PriorityCodePickRoutesPageComponent', () => {
  let component: PriorityCodePickRoutesPageComponent;
  let fixture: ComponentFixture<PriorityCodePickRoutesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityCodePickRoutesPageComponent, MockPriorityCodePickRoutesComponent ],
      providers: [
        { provide: PriorityCodePickRoutesService, useValue: { get: () => of([]) } },
        { provide: Router, useValue: { } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityCodePickRoutesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
