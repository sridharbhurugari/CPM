import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistLinesComponent } from './underfilled-picklist-lines.component';

describe('UnderfilledPicklistLinesComponent', () => {
  let component: UnderfilledPicklistLinesComponent;
  let fixture: ComponentFixture<UnderfilledPicklistLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderfilledPicklistLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderfilledPicklistLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
