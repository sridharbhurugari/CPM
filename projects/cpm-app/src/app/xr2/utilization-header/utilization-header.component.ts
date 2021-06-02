import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SingleselectRowItem } from "@omnicell/webcorecomponents";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { DevicesService } from "../../api-core/services/devices.service";
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import { OcapHttpConfigurationService } from "../../shared/services/ocap-http-configuration.service";
import { WindowService } from "../../shared/services/window-service";
@Component({
  selector: 'app-utilization-header',
  templateUrl: './utilization-header.component.html',
  styleUrls: ['./utilization-header.component.scss']
})

export class UtilizationHeaderComponent  implements OnInit {
  constructor(private windowService: WindowService,
              private ocapHttpConfigurationService: OcapHttpConfigurationService,
              private devicesService: DevicesService,
              private router: Router,
              private translateService: TranslateService,
private changeDetectionRef: ChangeDetectorRef              ) {
    ;
  }
  @Output() destockClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectionChangedEvent: EventEmitter<SelectableDeviceInfo> = new EventEmitter<SelectableDeviceInfo>();

  private _selectedDeviceInformation: SelectableDeviceInfo;

  deviceInformationList$: Observable<SelectableDeviceInfo[]>;
  deviceInformationList: SelectableDeviceInfo[];
  outputDeviceDisplayList: SingleselectRowItem[] = [];
  defaultDeviceDisplayItem: SingleselectRowItem;

  set selectedDeviceInformation(value: SelectableDeviceInfo) {
    this._selectedDeviceInformation = value;
    this.selectionChangedEvent.emit(value);
  }

  get selectedDeviceInformation(): SelectableDeviceInfo {
    return this._selectedDeviceInformation;
  }

  ngOnInit() {
    this.deviceInformationList$ = this.devicesService.getAllXr2Devices().pipe(shareReplay(0));
    this.deviceInformationList$.subscribe(
      (data) => {console.log('subscribe tableBody complete', data);
      this.deviceInformationList = data;
      this.getAllActiveXr2Devices();
    });

  }

   resetToDefault(): void
   {
    this.onDeviceSelectionChanged(this.defaultDeviceDisplayItem);
    this.changeDetectionRef.markForCheck();
this.changeDetectionRef.detectChanges();
   }

   getAllActiveXr2Devices() {
    //this.deviceInformationList = await this.devicesService.getAllXr2Devices().toPromise();
    console.log('subscribe tableBody complete', this.deviceInformationList);
    const newList: SingleselectRowItem[] = [];

    const currentClientId = this.ocapHttpConfigurationService.get().clientId;
    let defaultFound: SingleselectRowItem;

    if (this.deviceInformationList.length === 1) {
      defaultFound = new SingleselectRowItem(
        this.deviceInformationList[0].Description,
        this.deviceInformationList[0].DeviceId.toString()
      );
      newList.push(defaultFound);
    } else {
      // this.getAllDevicesInfo();
      this.deviceInformationList.forEach((selectableDeviceInfo) => {
        const selectRow = new SingleselectRowItem(
          selectableDeviceInfo.Description,
          selectableDeviceInfo.DeviceId.toString(),
          selectableDeviceInfo.IsActive
        );

        newList.push(selectRow);

        if (!defaultFound && selectableDeviceInfo.CurrentLeaseHolder !== undefined &&
          selectableDeviceInfo.CurrentLeaseHolder.toString() === currentClientId
        ) {
          defaultFound = selectRow;
        }
      });
    }

    this.outputDeviceDisplayList = newList;

    if (defaultFound) {
      this.defaultDeviceDisplayItem = this.getSingleSelectRowItem(defaultFound.value);
      this.loadSelectedDeviceInformation(defaultFound.value);
    } else {
      this.defaultDeviceDisplayItem = this.getSingleSelectRowItem('0');
      this.loadSelectedDeviceInformation('0');
    }
  }

  private loadSelectedDeviceInformation(deviceId: string) {

    const indexToLoad = this.deviceInformationList.findIndex(
      (deviceInformation) => {
        return deviceInformation.DeviceId.toString() === deviceId;
      }
    );

    if (indexToLoad !== -1) {
      this.selectedDeviceInformation = this.deviceInformationList[indexToLoad];
    }
  }

  isDeviceSelected(): boolean {
    let ret: boolean = this.selectedDeviceInformation && this.selectedDeviceInformation.DeviceId > 0;
    return ret;
    }

    onDeviceSelectionChanged($event) {
      this.loadSelectedDeviceInformation($event.value);
    }

    private getSingleSelectRowItem(deviceId: string) {
      return this.outputDeviceDisplayList.find(
        (x) => x.value === deviceId
      );
    }

   getAllDevicesInfo() {
    let translatedLabel = '---';
    this.translateService.get('DEVICE_SELECTION_TEXT').subscribe((res: string) => {
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
    this.deviceInformationList.push(allDevicesInfo);
  }

  onDestockClick(): void  {
    this.destockClicked.emit();
  }

}



