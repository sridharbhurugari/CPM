import { Component, OnInit } from '@angular/core';
import { Lights } from './models/lights';
@Component({
  selector: 'app-traffic-lights',
  templateUrl: './traffic-lights.component.html',
  styleUrls: ['./traffic-lights.component.scss']
})
export class TrafficLightsComponent implements OnInit {
  public lights: Lights = {
    isRed: true,
    isYellow: false,
    isGreen: false
  };
  constructor() { }

  ngOnInit() {
  }

}
