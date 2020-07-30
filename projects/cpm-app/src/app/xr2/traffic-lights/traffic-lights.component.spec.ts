import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficLightsComponent } from './traffic-lights.component';

describe('TrafficLightsComponent', () => {
  let component: TrafficLightsComponent;
  let fixture: ComponentFixture<TrafficLightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrafficLightsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficLightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should set blinking class on blinking input', () => {
    component.lightColor = 'red';
    component.isBlinking = true;
    const expectedClasses = ['stoplight', 'red', 'blink'];

    expect(component.getLightClasses()).toEqual(expectedClasses);
  });


  it('should should not set blinking class on non-blinking input', () => {
    component.lightColor = 'yellow';
    component.isBlinking = false;
    const expectedClasses = ['stoplight', 'yellow', ''];

    expect(component.getLightClasses()).toEqual(expectedClasses);
  });
});
