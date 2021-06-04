import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SearchBoxComponent, SingleselectRowItem, SingleselectComponent } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WindowService } from '../../shared/services/window-service';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { TranslateService } from '@ngx-translate/core';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';

@Component({
  selector: 'app-xr2-queue-grouping-header',
  templateUrl: './xr2-queue-grouping-header.component.html',
  styleUrls: ['./xr2-queue-grouping-header.component.scss']
})

export class Xr2QueueGroupingHeaderComponent implements OnInit, AfterViewInit {

  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectionChangedEvent: EventEmitter<SelectableDeviceInfo> = new EventEmitter<SelectableDeviceInfo>();

  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;

  private _selectedDeviceInformation: SelectableDeviceInfo;

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


  @ViewChild('searchBox', {
     static: true
   }) searchElement: SearchBoxComponent;


  constructor(private windowService: WindowService,
              private ocapHttpConfigurationService: OcapHttpConfigurationService,
              private devicesService: DevicesService,
              private translateService: TranslateService) { }

  ngOnInit() {
      this.getAllActiveXr2Devices();
  }

  async getAllActiveXr2Devices() {
    this.deviceInformationList = await this.devicesService.getAllXr2Devices().toPromise();
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
      this.getAllDevicesInfo();
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
    this.loadSavedPageConfigurations();

    if (this.savedPageConfiguration) {
      defaultFound = this.getSingleSelectRowItem(this.savedPageConfiguration.selectedDevice.DeviceId.toString());
    }

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

  onDeviceSelectionChanged($event) {
    this.searchElement.clearSearch(null);
    this.loadSelectedDeviceInformation($event.value);
  }

  ngAfterViewInit() {
    this.configureSearchHandler();
  }

  private configureSearchHandler() {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilterEvent.emit(data);
      });
  }

  private loadSavedPageConfigurations() {
    if (!this.savedPageConfiguration) {
      return;
    }

    const savedSearchFilter = this.savedPageConfiguration.searchTextFilter;

    if (savedSearchFilter) {
      this.searchElement.sendSearchData(savedSearchFilter);
      this.searchTextFilterEvent.emit(savedSearchFilter);
    }
  }

  private getSingleSelectRowItem(deviceId: string) {
    return this.outputDeviceDisplayList.find(
      (x) => x.value === deviceId
    );
  }

 getAllDevicesInfo() {
    let translatedLabel = '';
    this.translateService.get('XR2_ALL_DEVICES').subscribe((res: string) => {
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
}
