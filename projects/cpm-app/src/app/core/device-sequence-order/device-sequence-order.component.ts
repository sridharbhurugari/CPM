import { Component, OnInit, Input } from '@angular/core';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';

@Component({
  selector: 'app-device-sequence-order',
  templateUrl: './device-sequence-order.component.html',
  styleUrls: ['./device-sequence-order.component.scss']
})
export class DeviceSequenceOrderComponent implements OnInit {

  @Input()
   Devices: IDeviceSequenceOrder[];
  constructor() { }
  ngOnInit() {
  }

}
