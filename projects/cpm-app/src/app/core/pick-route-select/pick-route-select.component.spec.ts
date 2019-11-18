import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickRouteSelectComponent } from './pick-route-select.component';

describe('PickRouteSelectComponent', () => {
  let component: PickRouteSelectComponent;
  let fixture: ComponentFixture<PickRouteSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickRouteSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickRouteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
