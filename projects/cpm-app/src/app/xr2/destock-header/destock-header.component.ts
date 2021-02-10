import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DevicesService } from "../../api-core/services/devices.service";
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import { OcapHttpConfigurationService } from "../../shared/services/ocap-http-configuration.service";
import { WindowService } from "../../shared/services/window-service";
import { Xr2QueueGroupingHeaderComponent } from "../xr2-queue-grouping-header/xr2-queue-grouping-header.component";

@Component({
  selector: 'app-destock-header',
  templateUrl: './destock-header.component.html',
  styleUrls: ['./destock-header.component.scss']
})
export class DestockHeaderComponent extends Xr2QueueGroupingHeaderComponent implements OnInit {
  constructor(private windowServicex: WindowService,
              private ocapHttpConfigurationServicex: OcapHttpConfigurationService,
              private devicesServicex: DevicesService,
              private translateServicex: TranslateService) {
    super(windowServicex, ocapHttpConfigurationServicex, devicesServicex, translateServicex);
  }

  ngOnInit() {
    super.ngOnInit();
   }
   getAllDevicesInfo() {
    let translatedLabel = '---';
    this.translateServicex.get('DEVICE_SELECTION_TEXT').subscribe((res: string) => {
    translatedLabel = res;
    });
     let allDevicesInfo: SelectableDeviceInfo;
    allDevicesInfo = {
      DeviceId: 0,
      Description: translatedLabel,
      DefaultOwnerName: '',
      DeviceTypeId: '',
      CurrentLeaseHolder: undefined,
      IsActive: true
    };
    // this.deviceInformationList.push(allDevicesInfo);
  }
}