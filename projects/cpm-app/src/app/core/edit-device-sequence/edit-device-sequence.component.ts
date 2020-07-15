import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGridSelectionChanged } from '../../shared/events/i-grid-selection-changed';
import { IGridOrderChanged } from '../../shared/events/i-grid-order-changed';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { CheckboxValues } from '../../shared/constants/checkbox-values';
import { PopupDialogService, PopupDialogProperties, PopupWindowService,
  PopupWindowProperties, PopupDialogType, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { IDropdownPopupData } from '../../shared/model/i-dropdown-popup-data';
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';

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

  constructor(private popupWindowService: PopupWindowService) { }

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

  onOutputDeviceEditClick(){
    const properties = new PopupWindowProperties();

    const outputDeviceDisplayList = [];
    
    outputDeviceDisplayList.push(new SingleselectRowItem('Cart Module', '2104'));  
    outputDeviceDisplayList.push(new SingleselectRowItem('Quick Pick', '2102'));
    outputDeviceDisplayList.push(new SingleselectRowItem('Auto Packager', '2103'));
  
    const data: IDropdownPopupData = {
      popuptitle: 'Route Device Configuration',
      dropdowntitle: 'XR2 Output Device',
      dropdownrows: outputDeviceDisplayList
    };

    properties.data = data;

    let component = this.popupWindowService.show(DropdownPopupComponent, properties) as unknown as DropdownPopupComponent;    
  }  
}
