import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistsPageComponent } from './underfilled-picklists-page.component';

describe('UnderfilledPicklistsPageComponent', () => {
  let component: UnderfilledPicklistsPageComponent;
  let fixture: ComponentFixture<UnderfilledPicklistsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderfilledPicklistsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderfilledPicklistsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
