import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SelectableDeviceInfo } from '../model/selectable-device-info';
import { IXr2QueuePageConfiguration } from '../interfaces/i-xr2-queue-page-configuration';

@Component({
  selector: 'app-xr2-device-selection-header',
  template: ''
})


export class MockXr2DeviceSelectionHeaderComponent {
  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectionChangedEvent: EventEmitter<SelectableDeviceInfo> = new EventEmitter<SelectableDeviceInfo>();
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;
  @Input() hintText: string;
  @Input() showAllDevicesDropdownItem: boolean = true;
}
