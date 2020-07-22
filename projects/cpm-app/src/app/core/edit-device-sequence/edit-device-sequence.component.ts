import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGridSelectionChanged } from '../../shared/events/i-grid-selection-changed';
import { IGridOrderChanged } from '../../shared/events/i-grid-order-changed';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { CheckboxValues } from '../../shared/constants/checkbox-values';

@Component({
  selector: 'app-edit-device-sequence',
  templateUrl: './edit-device-sequence.component.html',
  styleUrls: ['./edit-device-sequence.component.scss']
})
export class EditDeviceSequenceComponent implements OnInit {
  @Output()
  deviceSequenceChanged: EventEmitter<IDeviceSequenceOrder[]> = new EventEmitter();

  @Input()
  enabledDevices: IDeviceSequenceOrder[];

  @Input()
  disabledDevices: IDeviceSequenceOrder[];

  @Input()
  disabled: boolean;

  checkboxToggleAll: string = CheckboxValues.ToggleAll;

  constructor() { }

  ngOnInit() {
  }

  onSelectionChanged(gridSelectionChanged: IGridSelectionChanged<IDeviceSequenceOrder>){
    this.enabledDevices = gridSelectionChanged.selectedValues;
    this.disabledDevices = gridSelectionChanged.unselectedValues;

    this.deviceSequenceChanged.emit(this.enabledDevices);
  }

  onOrderChanged(gridOrderChanged: IGridOrderChanged<IDeviceSequenceOrder>){
    this.enabledDevices = gridOrderChanged.orderedValues;

    this.deviceSequenceChanged.emit(this.enabledDevices);
  }
}
