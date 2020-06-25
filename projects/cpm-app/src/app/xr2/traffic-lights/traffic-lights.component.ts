import { Component, OnInit, Input } from '@angular/core';
import { Lights } from './models/lights';
@Component({
  selector: 'app-traffic-lights',
  templateUrl: './traffic-lights.component.html',
  styleUrls: ['./traffic-lights.component.scss']
})
export class TrafficLightsComponent implements OnInit {

  private _color: string;
  @Input()
  set color(value: string) {
    this._color = value;
  }
  get color(): string {
    return this._color;
  }

  public lights: Lights = {
    isRed: false,
    isYellow: false,
    isGreen: false
  };
  constructor() {
  }

  ngOnInit() {
    if (this.color === 'red') {
      this.lights.isRed = true;
    } else if (this.color === 'yellow') {
      this.lights.isYellow = true;
    } else if (this.color === 'green') {
      this.lights.isGreen = true;
    }
  }

}
