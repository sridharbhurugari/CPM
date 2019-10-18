import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistLinesPageComponent } from './underfilled-picklist-lines-page.component';
import { UnderfilledPicklistLinesComponent } from '../underfilled-picklist-lines/underfilled-picklist-lines.component';
import { of } from 'rxjs';
import { UnderfilledPicklistLinesService } from '../../api-core/services/underfilled-picklist-lines.service';
import { ActivatedRoute } from '@angular/router';

describe('UnderfilledPicklistLinesPageComponent', () => {
  let component: UnderfilledPicklistLinesPageComponent;
  let fixture: ComponentFixture<UnderfilledPicklistLinesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderfilledPicklistLinesPageComponent, UnderfilledPicklistLinesComponent ],
      providers: [
        { provide: UnderfilledPicklistLinesService, useValue: { get: () => of([]) } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap : { get: () => '' } } } }
      ]
    })
    .overrideComponent(UnderfilledPicklistLinesComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderfilledPicklistLinesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
