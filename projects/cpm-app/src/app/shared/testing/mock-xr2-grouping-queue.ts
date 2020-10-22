import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PicklistQueueGrouped } from '../../xr2/model/picklist-queue-grouped';
import { SelectableDeviceInfo } from '../model/selectable-device-info';

@Component({
  selector: 'app-xr2-grouping-queue',
  template: ''
})


export class MockXr2GroupingQueueComponent {
  @Input() loadedPicklistQueueGrouped: PicklistQueueGrouped[];
  @Input() picklistQueueGrouped: PicklistQueueGrouped[];
  @Input() searchTextFilter: string;
  @Input() selectedDeviceInformation: SelectableDeviceInfo;

  @Output() failedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() releaseEvent: EventEmitter<PicklistQueueGrouped> = new EventEmitter<PicklistQueueGrouped>();
}
