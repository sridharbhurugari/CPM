import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SearchBoxComponent, SingleselectRowItem, SingleselectComponent } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WindowService } from '../../shared/services/window-service';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-xr2-queue-grouping-header',
  templateUrl: './xr2-queue-grouping-header.component.html',
  styleUrls: ['./xr2-queue-grouping-header.component.scss']
})

export class Xr2QueueGroupingHeaderComponent implements OnInit, AfterViewInit {

  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectionChangedEvent: EventEmitter<SelectableDeviceInfo> = new EventEmitter<SelectableDeviceInfo>();

  selectedDeviceInformation: SelectableDeviceInfo;
  deviceInformationList: SelectableDeviceInfo[];
  outputDeviceDisplayList: SingleselectRowItem[] = [];
  defaultDeviceDisplayItem: SingleselectRowItem;

  @ViewChild('searchBox', {
     static: true
   }) searchElement: SearchBoxComponent;

  @ViewChild('outputDevicesList', null) outputDevicesList: SingleselectComponent;


  constructor(private windowService: WindowService,
              private ocapHttpConfigurationService: OcapHttpConfigurationService,
              private devicesService: DevicesService,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.getAllActiveXr2Devices();
  }

  async getAllActiveXr2Devices() {
    this.deviceInformationList = await this.devicesService.getallxr2devices().toPromise();
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
      let translatedLabel = '';
      this.translateService.get("XR2_ALL_DEVICES").subscribe((res: string) => {
      translatedLabel = res;
      });
      const selectAll = new SingleselectRowItem(translatedLabel, '0', true);
      newList.push(selectAll);
      this.deviceInformationList.forEach((selectableDeviceInfo) => {
        const selectRow = new SingleselectRowItem(
          selectableDeviceInfo.Description,
          selectableDeviceInfo.DeviceId.toString(),
          selectableDeviceInfo.IsActive
        );

        newList.push(selectRow);

        if (
          !defaultFound &&
          selectableDeviceInfo.CurrentLeaseHolder.toString() === currentClientId
        ) {
          defaultFound = selectRow;
        }
      });
    }

    this.outputDeviceDisplayList = newList;

    if (defaultFound) {
      this.defaultDeviceDisplayItem = this.outputDeviceDisplayList.find(
        (x) => x.value === defaultFound.value
      );
      this.loadSelectedDeviceInformation(defaultFound.value);
    } else {
      this.defaultDeviceDisplayItem = this.outputDeviceDisplayList.find(
        (x) => x.value === '0'
       );
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

  onDeviceSelectionChanged($event) {
    this.searchElement.clearSearch(null);
    this.loadSelectedDeviceInformation($event.value);
    this.selectionChangedEvent.emit($event);
  }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilterEvent.emit(data);
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }
}
