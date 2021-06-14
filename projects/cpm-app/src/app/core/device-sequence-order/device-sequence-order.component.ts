import { Component, OnInit, Input } from '@angular/core';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-device-sequence-order',
  templateUrl: './device-sequence-order.component.html',
  styleUrls: ['./device-sequence-order.component.scss']
})
export class DeviceSequenceOrderComponent implements OnInit {
  @Input()
   colHeader: string;
  @Input()
   Devices: IDeviceSequenceOrder[];
   
  cartModuleId: string = '2104';
  constructor(private translateService: TranslateService) { }
  
  ngOnInit() {
  }

  getCurrentOutputDeviceDescription(device: IDeviceSequenceOrder){
    const outputDevices = device.OutputDevices;
    const outputDeviceId = device.DeviceOutput.DeviceOutputType;
    const autofill = device.DeviceOutput.IsAutoFill;

    const odDesc = outputDevices && outputDevices.find(x => x.DeviceId === String(outputDeviceId));

    const currentODSetting: string[] = [];

    currentODSetting.push("DEFAULT");
    currentODSetting.push(odDesc && odDesc.Label);
    currentODSetting.push("AUTOFILL");
    currentODSetting.push("ON");
    currentODSetting.push("OFF");

    let translatedLabel = '';
        this.translateService.get(currentODSetting).subscribe((res: string) => {
          translatedLabel = res;});

    let returnLabel = translatedLabel["DEFAULT"] + ": " + translatedLabel[odDesc && odDesc.Label];

    if (String(outputDeviceId) !== this.cartModuleId) {
      returnLabel = returnLabel + " (" + translatedLabel["AUTOFILL"] + " ";
      if (autofill) { return returnLabel + translatedLabel["ON"] + ")" };
      return returnLabel + translatedLabel["OFF"] + ")"
    }

    return returnLabel;
  }

}
