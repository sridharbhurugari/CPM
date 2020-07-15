import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficLightsComponent } from './traffic-lights.component';

describe('TrafficLightsComponent', () => {
  let component: TrafficLightsComponent;
  let fixture: ComponentFixture<TrafficLightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficLightsComponent ]
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

  // it('should set red light color on red input', () => {
  //   component.color = 'red';
  //   component.ngOnChanges();
  //   expect(component.isRed).toBeTruthy();
  //   expect(component.isYellow).toBeFalsy();
  //   expect(component.isGreen).toBeFalsy();
  // });

  // it('should set green light color on green input', () => {
  //   component.color = 'green';
  //   component.ngOnChanges();
  //   expect(component.isRed).toBeFalsy();
  //   expect(component.isYellow).toBeFalsy();
  //   expect(component.isGreen).toBeTruthy();
  // });

  // it('should set yellow light color on yellow input', () => {
  //   component.color = 'yellow';
  //   component.ngOnChanges();
  //   expect(component.isRed).toBeFalsy();
  //   expect(component.isYellow).toBeTruthy();
  //   expect(component.isGreen).toBeFalsy();
  // });

});
