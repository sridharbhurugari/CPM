import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistLinesPageComponent } from './underfilled-picklist-lines-page.component';

describe('UnderfilledPicklistLinesPageComponent', () => {
  let component: UnderfilledPicklistLinesPageComponent;
  let fixture: ComponentFixture<UnderfilledPicklistLinesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderfilledPicklistLinesPageComponent ]
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
