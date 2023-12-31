import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGridSelectionChanged } from '../../shared/events/i-grid-selection-changed';
import { IGridOrderChanged } from '../../shared/events/i-grid-order-changed';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { CheckboxValues } from '../../shared/constants/checkbox-values';
import { PopupDialogService, PopupDialogProperties, PopupWindowService,
  PopupWindowProperties, PopupDialogType, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { IDropdownPopupData } from '../../shared/model/i-dropdown-popup-data';
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';
import { TranslateService } from '@ngx-translate/core';
import { map, shareReplay, take } from 'rxjs/operators';

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

  outputDeviceDisplayList: SingleselectRowItem[] = [];
  defaultDisplayItem: SingleselectRowItem;

  rowItemsToHideCheckbox: SingleselectRowItem[] = [];

  cartModuleId: string = '2104';

  popupTitle: string;
  dropdowntitle: string;
  checkboxLabel: string;

  constructor(private popupWindowService: PopupWindowService,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.translateService.get('ROUTE_POPUP_TITLE').subscribe((res: string) => {
      this.popupTitle = res;});
    this.translateService.get('ROUTE_DROPDOWN_TITLE').subscribe((res: string) => {
      this.dropdowntitle = res;});
    this.translateService.get('ROUTE_CHECKBOX_LABEL').subscribe((res: string) => {
      this.checkboxLabel = res;});
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

  getCurrentOutputDeviceDescription(device: IDeviceSequenceOrder){
    const outputDevices = device.OutputDevices;
    const outputDeviceId = device.DeviceOutput.DeviceOutputType;
    const autofill = device.DeviceOutput.IsAutoFill;

    const odDesc = outputDevices.find(x => x.DeviceId === String(outputDeviceId));

    const currentODSetting: string[] = [];

    currentODSetting.push("DEFAULT");
    currentODSetting.push(odDesc.Label);
    currentODSetting.push("AUTOFILL");
    currentODSetting.push("ON");
    currentODSetting.push("OFF");

    let translatedLabel = '';
        this.translateService.get(currentODSetting).subscribe((res: string) => {
          translatedLabel = res;});

    let returnLabel = translatedLabel["DEFAULT"] + ": " + translatedLabel[odDesc.Label];

    if (String(outputDeviceId) !== this.cartModuleId) {
      returnLabel = returnLabel + " (" + translatedLabel["AUTOFILL"] + " ";
      if (autofill) { return returnLabel + translatedLabel["ON"] + ")" };
      return returnLabel + translatedLabel["OFF"] + ")"
    }

    return returnLabel;
  }

  onOutputDeviceEditClick(device: IDeviceSequenceOrder){
    const properties = new PopupWindowProperties();
    this.outputDeviceDisplayList = [];
    this.rowItemsToHideCheckbox = [];

    device.OutputDevices.forEach(x => {
      if (x.IsActive) {
        let translatedLabel = '';
        this.translateService.get(x.Label).subscribe((res: string) => {
          translatedLabel = res;});

        const outputDeviceRow = new SingleselectRowItem(translatedLabel, x.DeviceId);
        this.outputDeviceDisplayList.push(outputDeviceRow);
      }
    })

    this.defaultDisplayItem = this.outputDeviceDisplayList.find(x => x.value === String(device.DeviceOutput.DeviceOutputType));

    this.outputDeviceDisplayList.forEach(x => {
      if (x.value === this.cartModuleId){
        this.rowItemsToHideCheckbox.push(x);
      }
    })

    const data: IDropdownPopupData = {
      popuptitle: this.popupTitle,
      dropdowntitle: this.dropdowntitle,
      dropdownrows: this.outputDeviceDisplayList,
      defaultrow: this.defaultDisplayItem,
      showCheckbox: true,
      checkboxLabel: this.checkboxLabel,
      checkboxSelected: device.DeviceOutput.IsAutoFill,
      checkboxHideSelection: this.rowItemsToHideCheckbox,
      selectedrow: this.defaultDisplayItem,
      selectedcheckbox: false,
      selectText: '',
      autoSort: true
    };

    properties.data = data;

    let component = this.popupWindowService.show(DropdownPopupComponent, properties) as unknown as DropdownPopupComponent;
    component.dismiss.pipe(take(1)).subscribe(selectedOk => {
      if (selectedOk) {
        device.DeviceOutput.DeviceOutputType = data.selectedrow.value;
        device.DeviceOutput.IsAutoFill = data.selectedcheckbox;

        this.deviceSequenceChanged.emit(this.enabledDevices);
      }
    });
  }
}
