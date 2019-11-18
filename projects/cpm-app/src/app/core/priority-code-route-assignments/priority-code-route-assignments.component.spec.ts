import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridModule, SearchModule, InputsModule, SearchBoxComponent } from '@omnicell/webcorecomponents';
import { PriorityCodeRouteAssignmentsComponent } from './priority-code-route-assignments.component';

import { Component, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';

describe('PriorityCodeRouteAssignmentsComponent', () => {
  let component: PriorityCodeRouteAssignmentsComponent;
  let fixture: ComponentFixture<PriorityCodeRouteAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityCodeRouteAssignmentsComponent, MockTranslatePipe, MockSearchPipe ],
      imports: [
        GridModule,
      ]
    })
    .overrideComponent(SearchBoxComponent,
    {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityCodeRouteAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
