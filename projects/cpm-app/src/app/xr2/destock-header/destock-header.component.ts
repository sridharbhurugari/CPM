import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DevicesService } from "../../api-core/services/devices.service";
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import { OcapHttpConfigurationService } from "../../shared/services/ocap-http-configuration.service";
import { Xr2DeviceSelectionHeaderComponent } from "../xr2-device-selection-header/xr2-device-selection-header.component";

@Component({
  selector: 'app-destock-header',
  templateUrl: './destock-header.component.html',
  styleUrls: ['./destock-header.component.scss']
})
export class DestockHeaderComponent extends Xr2DeviceSelectionHeaderComponent implements OnInit {
  constructor(private ocapHttpConfigurationServicex: OcapHttpConfigurationService,
              private devicesServicex: DevicesService,
              private router: Router,
              private translateServicex: TranslateService) {
    super(ocapHttpConfigurationServicex, devicesServicex, translateServicex);
  }
  @Output() backEvent: EventEmitter<void> = new EventEmitter<void>();

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
  onNavigateBack(): void  {
    this.router.navigate(['xr2/utilization']);
  }
}
