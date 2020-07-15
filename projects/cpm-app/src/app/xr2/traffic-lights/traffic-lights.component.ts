import { Component, OnInit, Input } from '@angular/core';
import { Lights } from './models/lights';
@Component({
  selector: 'app-traffic-lights',
  templateUrl: './traffic-lights.component.html',
  styleUrls: ['./traffic-lights.component.scss']
})
export class TrafficLightsComponent implements OnInit {

  @Input() lightColor: string;
  @Input() isBlinking: boolean;

  constructor() {
  }

  ngOnInit() {

  }

  getLightClasses() {
    const stoplightClass = 'stoplight';
    const lightColorClass = this.lightColor;
    const blinkClass = this.isBlinking ? 'blink' : '';

    return [stoplightClass, lightColorClass, blinkClass];
  }
}
