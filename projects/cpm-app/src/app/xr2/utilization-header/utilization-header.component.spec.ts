import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
  SingleselectComponent,
  SingleselectRowItem,
} from "@omnicell/webcorecomponents";
import { Input, Component } from "@angular/core";
import { of } from "rxjs";
import { MockTranslatePipe } from "../../core/testing/mock-translate-pipe.spec";
import { DevicesService } from "../../api-core/services/devices.service";
import { WindowService } from "../../shared/services/window-service";
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import { Guid } from "guid-typescript";
import { MockCpClickableIconComponent } from "../../shared/testing/mock-cp-clickable-icon.spec";
import { UtilizationHeaderComponent } from "./utilization-header.component";
import { TranslateService } from "@ngx-translate/core";
import { WorkstationTrackerService } from "../../api-core/services/workstation-tracker.service";
import { IWorkstationNameData } from "../../api-core/data-contracts/i-workstation-name-data";
@Component({
  selector: "oc-singleselect",
  template: "",
})
class MockSingleSelect {
  @Input() tableData: Array<SingleselectRowItem>;
  @Input() selectedItem: SingleselectRowItem;
}
describe("UtilizationHeaderComponent", () => {
  let component: UtilizationHeaderComponent;
  let fixture: ComponentFixture<UtilizationHeaderComponent>;
  let selectableDeviceInfoList: SelectableDeviceInfo[];
  let selectedDeviceInformation: SelectableDeviceInfo;
  let devicesService: Partial<DevicesService>;
  let workstation: IWorkstationNameData = {
    WorkstationShortName: "WK1",
    WorkstationFriendlyName: "",
  };
  const selectableDeviceInfo1 = new SelectableDeviceInfo(null);
  const selectableDeviceInfo2 = new SelectableDeviceInfo(null);

  selectableDeviceInfo1.DeviceId = 1;
  selectableDeviceInfo1.DefaultOwnerName = "WK1";
  selectableDeviceInfo1.Description = "DeviceXr21";
  selectableDeviceInfo1.CurrentLeaseHolder = Guid.create();

  selectableDeviceInfo2.DeviceId = 2;
  selectableDeviceInfo2.DefaultOwnerName = "WK1";
  selectableDeviceInfo2.Description = "DeviceXr22";
  selectableDeviceInfo2.CurrentLeaseHolder = Guid.create();

  selectableDeviceInfoList = [selectableDeviceInfo1, selectableDeviceInfo2];

  selectedDeviceInformation = new SelectableDeviceInfo(null);
  selectedDeviceInformation.DeviceId = 1;

  devicesService = {
    getAllXr2Devices: () => of(selectableDeviceInfoList),
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UtilizationHeaderComponent,
        MockSingleSelect,
        MockCpClickableIconComponent,
        MockTranslatePipe,
      ],

      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DevicesService, useValue: devicesService },
        { provide: WindowService, useValue: [] },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        {
          provide: WorkstationTrackerService,
          useValue: { GetWorkstationName: () => of(workstation) },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationHeaderComponent);
    component = fixture.componentInstance;
    component.deviceDropdown = TestBed.createComponent(MockSingleSelect)
      .componentInstance as SingleselectComponent;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Device Default Selection", () => {
    it("Two Assigned Workstations will default to the first one", fakeAsync(() => {
      selectableDeviceInfo1.DefaultOwnerName = "WK1";
      workstation = {
        WorkstationShortName: "WK1",
        WorkstationFriendlyName: "",
      };
      selectableDeviceInfoList = [selectableDeviceInfo1, selectableDeviceInfo2];
      const expectedDeviceID = "1";
      component.selectedDeviceInformation = selectedDeviceInformation;
      const getActiveXr2DevicesSpy = spyOn(
        component,
        "getAllActiveXr2Devices"
      ).and.callThrough();
      component.ngOnInit();
      tick();
      expect(getActiveXr2DevicesSpy).toHaveBeenCalledTimes(1);
      expect(component.selectedDeviceInformation.DeviceId.toString()).toEqual(
        expectedDeviceID
      );
      expect(component.defaultDeviceDisplayItem.value).toEqual(
        expectedDeviceID
      );
    }));

    it("One Assigned Device will default", fakeAsync(() => {
      selectableDeviceInfo1.DefaultOwnerName = "WK2";
      workstation = {
        WorkstationShortName: "WK1",
        WorkstationFriendlyName: "",
      };
      selectableDeviceInfoList = [selectableDeviceInfo1, selectableDeviceInfo2];
      const expectedDeviceID = "2";
      component.selectedDeviceInformation = selectedDeviceInformation;
      const getActiveXr2DevicesSpy = spyOn(
        component,
        "getAllActiveXr2Devices"
      ).and.callThrough();
      component.ngOnInit();
      tick();
      expect(component.selectedDeviceInformation.DeviceId.toString()).toEqual(
        expectedDeviceID
      );
      expect(component.defaultDeviceDisplayItem.value).toEqual(
        expectedDeviceID
      );
      expect(component.isDeviceSelected()).toBeTruthy();
    }));

    it("No assigned XR2s will not default when multiple XR2s exist", fakeAsync(() => {
      selectableDeviceInfo1.DefaultOwnerName = "WK1";
      workstation = {
        WorkstationShortName: "WK2",
        WorkstationFriendlyName: "",
      };
      selectableDeviceInfoList = [selectableDeviceInfo1, selectableDeviceInfo2];

      const expectedDeviceID = "0";
      component.selectedDeviceInformation = selectedDeviceInformation;
      const getActiveXr2DevicesSpy = spyOn(
        component,
        "getAllActiveXr2Devices"
      ).and.callThrough();
      component.ngOnInit();
      tick();
      expect(getActiveXr2DevicesSpy).toHaveBeenCalledTimes(1);
      expect(component.selectedDeviceInformation.DeviceId.toString()).toEqual(
        expectedDeviceID
      );
      expect(component.defaultDeviceDisplayItem).toBeUndefined();
      expect(component.isDeviceSelected()).toBeFalsy();
    }));

    it("No assigned XR2s WILL default when only one XR2 exists", fakeAsync(() => {
      selectableDeviceInfo1.DefaultOwnerName = "WK1";
      workstation = {
        WorkstationShortName: "WK2",
        WorkstationFriendlyName: "",
      };
      selectableDeviceInfoList = [selectableDeviceInfo1];

      const expectedDeviceID = "1";
      component.selectedDeviceInformation = selectedDeviceInformation;
      const getActiveXr2DevicesSpy = spyOn(
        component,
        "getAllActiveXr2Devices"
      ).and.callThrough();
      component.ngOnInit();
      tick();
      expect(getActiveXr2DevicesSpy).toHaveBeenCalledTimes(1);
      expect(component.selectedDeviceInformation.DeviceId.toString()).toEqual(
        expectedDeviceID
      );
      expect(component.defaultDeviceDisplayItem.value).toEqual(
        expectedDeviceID
      );
      expect(component.isDeviceSelected()).toBeTruthy();
    }));
  });
  describe("Button Click Destock", () => {
    it("call onDestockClick raises destockClicked", fakeAsync(() => {
      spyOn(component.destockClicked, "emit");
      component.onDestockClick();
      expect(component.destockClicked.emit).toHaveBeenCalled();
    }));
  });
});
