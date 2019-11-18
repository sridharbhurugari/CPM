import { Component, OnInit, Input } from '@angular/core';
import { PickRouteDevices } from '../model/pickroute-devices';

@Component({
  selector: 'app-pick-route-select',
  templateUrl: './pick-route-select.component.html',
  styleUrls: ['./pick-route-select.component.scss']
})
export class PickRouteSelectComponent implements OnInit {

  constructor() { }
  @Input()
  pickrouteDevices: PickRouteDevices[];
  ngOnInit() {
  }

}
