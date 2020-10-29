import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SelectableDeviceInfo } from '../model/selectable-device-info';

@Component({
  selector: 'app-xr2-queue-grouping-header',
  template: ''
})


export class MockXr2QueueGroupingHeaderComponent {
  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectionChangedEvent: EventEmitter<SelectableDeviceInfo> = new EventEmitter<SelectableDeviceInfo>();
}