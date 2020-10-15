import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SearchBoxComponent, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WindowService } from '../../shared/services/window-service';
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import { OcapHttpConfigurationService } from "../../shared/services/ocap-http-configuration.service";
import { Xr2QuickPickQueueDeviceService } from "../../api-xr2/services/xr2-quick-pick-queue-device.service";

@Component({
  selector: 'app-xr2-queue-grouping-header',
  templateUrl: './xr2-queue-grouping-header.component.html',
  styleUrls: ['./xr2-queue-grouping-header.component.scss']
})

export class Xr2QueueGroupingHeaderComponent implements OnInit, AfterViewInit {

  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();

  selectedDeviceInformation: SelectableDeviceInfo;
  deviceInformationList: SelectableDeviceInfo[];
  outputDeviceDisplayList: SingleselectRowItem[] = [];
  defaultDeviceDisplyItem: SingleselectRowItem;

  @ViewChild('searchBox', {
    static: true
  })

  searchElement: SearchBoxComponent;

  constructor(private windowService: WindowService,
              private ocapHttpConfigurationService: OcapHttpConfigurationService,
              private quickPickDeviceService: Xr2QuickPickQueueDeviceService) { }

  ngOnInit() {
    this.getXr2Devices();
  }

  async getXr2Devices() {
    this.deviceInformationList = await this.quickPickDeviceService.get().toPromise();
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
      const selectAll = new SingleselectRowItem("All", "All", true);
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
      this.defaultDeviceDisplyItem = this.outputDeviceDisplayList.find(
        (x) => x.value === defaultFound.value
      );
      this.loadSelectedDeviceInformation(defaultFound.value);
    } else {
      this.defaultDeviceDisplyItem = this.outputDeviceDisplayList.find(
        (x) => x.value === "All"
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
