import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPopupComponent } from './grid-popup.component';

describe('GridPopupComponent', () => {
  let component: GridPopupComponent<any>;
  let fixture: ComponentFixture<GridPopupComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
