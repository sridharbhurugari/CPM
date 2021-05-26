import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SingleselectDropdownModule } from '@omnicell/webcorecomponents';
import { Xr2QueueGroupingHeaderComponent } from './xr2-queue-grouping-header.component';
import { Input, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { DevicesService } from '../../api-core/services/devices.service';
import { TranslateService } from '@ngx-translate/core';
import { WindowService } from '../../shared/services/window-service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { IOcapHttpConfiguration } from '../../shared/interfaces/i-ocap-http-configuration';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;

  clearSearch() {};
  sendSearchData(data: string) { return of() }
}

describe('Xr2QueueGroupingHeaderComponent', () => {
  let component: Xr2QueueGroupingHeaderComponent;
  let fixture: ComponentFixture<Xr2QueueGroupingHeaderComponent>;
  let ocapConfig: IOcapHttpConfiguration;
  let selectableDeviceInfoList: SelectableDeviceInfo[];
  let selectedDeviceInformation: SelectableDeviceInfo;
  let devicesService: Partial<DevicesService>;

  beforeEach(async(() => {
    const selectableDeviceInfo1 = new SelectableDeviceInfo(null);
    const selectableDeviceInfo2 = new SelectableDeviceInfo(null);

    selectableDeviceInfo1.DeviceId = 1;
    selectableDeviceInfo1.Description = 'DeviceXr21';
    selectableDeviceInfo1.CurrentLeaseHolder = Guid.create();

    selectableDeviceInfo2.DeviceId = 2;
    selectableDeviceInfo2.Description = 'DeviceXr22';
    selectableDeviceInfo2.CurrentLeaseHolder = Guid.create();

    selectableDeviceInfoList = [selectableDeviceInfo1, selectableDeviceInfo2];

    // Set OCAP config
    ocapConfig = {
      clientId: selectableDeviceInfo1.CurrentLeaseHolder.toString(),
      apiKey: '39252',
      machineName: 'machine329',
      ocapServerIP: '127.0.0.1',
      port: '3928',
      useSecured: 'true',
      userLocale: 'en-US',
      clientName: 'client1'
    };

    selectedDeviceInformation = new SelectableDeviceInfo(null);
    selectedDeviceInformation.DeviceId = 1;

    devicesService = {
      getAllXr2Devices: () => of(selectableDeviceInfoList)
    };

    TestBed.configureTestingModule({
      declarations: [ Xr2QueueGroupingHeaderComponent, MockSearchBox, MockSearchPipe, MockTranslatePipe],
      imports: [ SingleselectDropdownModule],
      providers: [
        { provide: DevicesService, useValue: devicesService},
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: WindowService, useValue: [] },
        { provide: OcapHttpConfigurationService, useValue: { get: () => ocapConfig } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2QueueGroupingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Device selection', () => {
    it('Should select device selection to default work station', fakeAsync(() => {
      const expectedDeviceID = '1';
      component.selectedDeviceInformation = selectedDeviceInformation;
      const getActiveXr2DevicesSpy = spyOn(component, 'getAllActiveXr2Devices').and.callThrough();
      component.ngOnInit();
      tick();
      expect(getActiveXr2DevicesSpy).toHaveBeenCalledTimes(1);
      expect(component.selectedDeviceInformation.DeviceId.toString()).toEqual(expectedDeviceID);
      expect(component.defaultDeviceDisplayItem.value).toEqual(expectedDeviceID);
      expect(component.isDeviceSelected()).toBeTruthy();
    }));

    it('Should default device if there is only one device', fakeAsync(() => {
      const expectedDeviceID = '2';
      component.selectedDeviceInformation = selectedDeviceInformation;
      selectableDeviceInfoList.shift();
      expect(component.getAllActiveXr2Devices()).toBeTruthy();
      tick();
      expect(component.selectedDeviceInformation.DeviceId.toString()).toEqual(expectedDeviceID);
      expect(component.defaultDeviceDisplayItem.value).toEqual(expectedDeviceID);
    }));

    it('Should default to All Devices when device is not leased to same client', fakeAsync(() => {
      ocapConfig.clientId = '';
      const expectedDeviceID = '0';
      component.selectedDeviceInformation = selectedDeviceInformation;
      const getActiveXr2DevicesSpy = spyOn(component, 'getAllActiveXr2Devices').and.callThrough();
      component.ngOnInit();
      tick();
      expect(getActiveXr2DevicesSpy).toHaveBeenCalledTimes(1);
      expect(component.selectedDeviceInformation.DeviceId.toString()).toEqual(expectedDeviceID);
      expect(component.defaultDeviceDisplayItem.value).toEqual(expectedDeviceID);
      expect(component.isDeviceSelected()).toBeFalsy();
    }));

    it('Should clear search on device change and load new device', () => {
      const searchClearMock = spyOn(component.searchElement, 'clearSearch');
      const mockEvent = {value: '1'};
      const selectedDevice = {
        DeviceId: 1,
        Description: null,
        DefaultOwnerName: null,
        DeviceTypeId: null,
        CurrentLeaseHolder: null,
        IsActive: true
      }
      component.savedPageConfiguration = {
        selectedDevice,
        colHeaderSort: null,
        searchTextFilter: 'text'
      }
      component.deviceInformationList = [
        selectedDevice
      ];

      component.onDeviceSelectionChanged(mockEvent);
      expect(searchClearMock).toHaveBeenCalledTimes(1);
      expect(component.selectedDeviceInformation.DeviceId).toBe(1);
    });
  });

  })

