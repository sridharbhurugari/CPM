import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DeviceLocationAccessResult } from '../enums/device-location-access-result';
import { IDeviceLocationAccessComponentData } from '../model/i-device-location-access-component-data';

@Component({
  selector: 'app-device-location-access',
  template: '',
})
export class MockDeviceLocationAccessComponent {
  @Input()
  disabled: boolean;

  @Input()
  deviceLocationAccessData: IDeviceLocationAccessComponentData;

  @Output()
  isAccessBusy: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  isLeaseBusy: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  accessResult: EventEmitter<DeviceLocationAccessResult> = new EventEmitter();
}