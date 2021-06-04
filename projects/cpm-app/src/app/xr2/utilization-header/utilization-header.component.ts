import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  SingleselectComponent,
  SingleselectRowItem,
} from "@omnicell/webcorecomponents";
import { forkJoin, Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { DevicesService } from "../../api-core/services/devices.service";
import { WorkstationTrackerService } from "../../api-core/services/workstation-tracker.service";
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import { WindowService } from "../../shared/services/window-service";
@Component({
  selector: "app-utilization-header",
  templateUrl: "./utilization-header.component.html",
  styleUrls: ["./utilization-header.component.scss"],
})
export class UtilizationHeaderComponent implements OnInit {
  constructor(
    private windowService: WindowService,
    private devicesService: DevicesService,
    private workstationTrackerService: WorkstationTrackerService
  ) {}

  @Output() destockClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectionChangedEvent: EventEmitter<SelectableDeviceInfo> =
    new EventEmitter<SelectableDeviceInfo>();

  // Device details
  deviceInformationList$: Observable<SelectableDeviceInfo[]>;
  deviceInformationList: SelectableDeviceInfo[];
  private _selectedDeviceInformation: SelectableDeviceInfo;
  // Dropdown list
  outputDeviceDisplayList: SingleselectRowItem[] = [];
  defaultDeviceDisplayItem: SingleselectRowItem;
  selectedDropdownItem: SingleselectRowItem;
  workstationName: string;

  set selectedDeviceInformation(value: SelectableDeviceInfo) {
    this._selectedDeviceInformation = value;
    this.deviceDropdown.selectedItem = this.selectedDropdownItem;
    this.selectionChangedEvent.emit(value);
  }

  get selectedDeviceInformation(): SelectableDeviceInfo {
    return this._selectedDeviceInformation;
  }
  @ViewChild("deviceDropdown", { static: false })
  deviceDropdown: SingleselectComponent;
  ngOnInit() {
    const di$ = this.devicesService.getAllXr2Devices().pipe(
      map((data) => (this.deviceInformationList = data)),
      shareReplay(0)
    );
    const ws$ = this.workstationTrackerService.GetWorkstationName().pipe(
      map((s) => {
        this.workstationName = s.WorkstationShortName;
      })
    );
    forkJoin(di$, ws$).subscribe((r) => {
      this.getAllActiveXr2Devices();
    });
  }

  setToDefault(): void {
    this.selectedDropdownItem = this.defaultDeviceDisplayItem;
    this.loadSelectedDeviceInformation();
  }

  // Build the list of dropdown rows (outputDeviceDisplayList), Identify the default (defaultDeviceDisplayItem),
  //  and set the selected item (selectedDropdownItem + SelectedDeviceInformation)
  getAllActiveXr2Devices() {
    console.log("subscribe tableBody complete", this.deviceInformationList);
    const newList: SingleselectRowItem[] = [];
    let defaultFound: SingleselectRowItem;

    if (this.deviceInformationList.length === 1) {
      defaultFound = new SingleselectRowItem(
        this.deviceInformationList[0].Description,
        this.deviceInformationList[0].DeviceId.toString()
      );
      newList.push(defaultFound);
    } else {
      this.deviceInformationList.forEach((selectableDeviceInfo) => {
        const selectRow = new SingleselectRowItem(
          selectableDeviceInfo.Description,
          selectableDeviceInfo.DeviceId.toString(),
          selectableDeviceInfo.IsActive
        );

        newList.push(selectRow);

        if (
          !defaultFound &&
          this.workstationName &&
          selectableDeviceInfo.DefaultOwnerName &&
          this.workstationName === selectableDeviceInfo.DefaultOwnerName
        ) {
          defaultFound = selectRow;
        }
      });
    }

    this.outputDeviceDisplayList = newList;
    if (defaultFound) {
      this.defaultDeviceDisplayItem = this.getSingleSelectRowItem(
        defaultFound.value
      );
    } else {
      this.defaultDeviceDisplayItem = this.getSingleSelectRowItem("0");
    }
    // set the dropdown to the default:
    this.setToDefault();
  }

  private loadSelectedDeviceInformation() {
    let deviceId: string = "0";
    if (this.selectedDropdownItem) {
      deviceId = this.selectedDropdownItem.value;
    }

    const indexToLoad = this.deviceInformationList.findIndex(
      (deviceInformation) => {
        return deviceInformation.DeviceId.toString() === deviceId;
      }
    );

    if (indexToLoad !== -1) {
      this.selectedDeviceInformation = this.deviceInformationList[indexToLoad];
    } else {
      this.selectedDeviceInformation = new SelectableDeviceInfo({
        DeviceId: 0,
      });
    }
  }

  isDeviceSelected(): boolean {
    let ret: boolean =
      this.selectedDeviceInformation &&
      this.selectedDeviceInformation.DeviceId > 0;
    return ret;
  }

  onDeviceSelectionChanged($event) {
    this.selectedDropdownItem = $event;
    this.loadSelectedDeviceInformation();
  }

  private getSingleSelectRowItem(deviceId: string) {
    return this.outputDeviceDisplayList.find((x) => x.value === deviceId);
  }

  onDestockClick(): void {
    this.destockClicked.emit();
  }
}
