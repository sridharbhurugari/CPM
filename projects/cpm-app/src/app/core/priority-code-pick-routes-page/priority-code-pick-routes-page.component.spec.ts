import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityCodePickRoutesPageComponent } from './priority-code-pick-routes-page.component';
import { PriorityCodePickRoutesComponent } from '../priority-code-pick-routes/priority-code-pick-routes.component';

describe('PriorityCodePickRoutesPageComponent', () => {
  let component: PriorityCodePickRoutesPageComponent;
  let fixture: ComponentFixture<PriorityCodePickRoutesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityCodePickRoutesPageComponent, PriorityCodePickRoutesComponent ]
    })
    .overrideComponent(PriorityCodePickRoutesComponent, {
      set: {
        template: ''
      }
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
