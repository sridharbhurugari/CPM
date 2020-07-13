import { Component, OnInit, Input } from '@angular/core';
import { Lights } from './models/lights';
@Component({
  selector: 'app-traffic-lights',
  templateUrl: './traffic-lights.component.html',
  styleUrls: ['./traffic-lights.component.scss']
})
export class TrafficLightsComponent implements OnInit {

  @Input() color: string;

  isRed: boolean;
  isYellow: boolean;
  isGreen: boolean;
  isGray: boolean;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.setLightColor();
  }

  private setLightColor() {
    if (this.color === 'red') {
      this.isRed = true;
      this.isYellow = false;
      this.isGreen = false;
      this.isGray = false;
    } else if (this.color === 'yellow') {
      this.isYellow = true;
      this.isGreen = false;
      this.isRed = false;
      this.isGray = false;
    } else if (this.color === 'green') {
      this.isGreen = true;
      this.isYellow = false;
      this.isRed = false;
      this.isGray = false;
    } else if (this.color === 'green') {
      this.isGreen = false;
      this.isYellow = false;
      this.isRed = false;
      this.isGray = true;
    }
  }
}
