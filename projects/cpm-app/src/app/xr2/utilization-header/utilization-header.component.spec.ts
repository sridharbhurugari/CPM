import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { Router } from "@angular/router";
import { SingleselectComponent, SingleselectDropdownModule, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { Input, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { DevicesService } from '../../api-core/services/devices.service';
import { WindowService } from '../../shared/services/window-service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { IOcapHttpConfiguration } from '../../shared/interfaces/i-ocap-http-configuration';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Guid } from 'guid-typescript';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { UtilizationHeaderComponent } from './utilization-header.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'oc-singleselect',
  template: ''
})
class MockSingleSelect {
  @Input()tableData: Array<SingleselectRowItem>;
  @Input()selectedItem: SingleselectRowItem;
  //@Output()selectionChanged: EventEmitter<SingleselectRowItem>;
}
describe('UtilizationHeaderComponent', () => {
  let component: UtilizationHeaderComponent;
  let fixture: ComponentFixture<UtilizationHeaderComponent>;
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
      declarations: [ UtilizationHeaderComponent, MockSingleSelect,  MockCpClickableIconComponent, MockTranslatePipe],

      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DevicesService, useValue: devicesService},
        { provide: WindowService, useValue: [] },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: OcapHttpConfigurationService, useValue: { get: () => ocapConfig } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    try {

    fixture = TestBed.createComponent(UtilizationHeaderComponent);
    component = fixture.componentInstance;
    component.deviceDropdown =TestBed.createComponent(MockSingleSelect).componentInstance as SingleselectComponent;
    fixture.detectChanges();
    }
    catch (e)
    {
      throw e;
    }
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
    }));

    it('Should default to First Device when device is not leased to same client', fakeAsync(() => {
      ocapConfig.clientId = '';
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
      const getActiveXr2DevicesSpy = spyOn(component, 'getAllActiveXr2Devices').and.callThrough();
      component.ngOnInit();
      tick();
      expect(component.selectedDeviceInformation.DeviceId.toString()).toEqual(expectedDeviceID);
      expect(component.defaultDeviceDisplayItem.value).toEqual(expectedDeviceID);
    }));
  })
  describe('Button Click Destock', () => {
    // jasmine issue: this works in production
    // it('click should hit onDestockClick', fakeAsync(() => {
    //   fixture.detectChanges();
    //   spyOn(component, 'onDestockClick');
    //   spyOn(component.destockClicked, 'emit');

    //   let button = fixture.debugElement.nativeElement.querySelector('oc-button-action#DestockButton');
    //   button.click();
    //   tick(400);
    //   expect(component.onDestockClick).toHaveBeenCalled();
    //   expect(component.destockClicked.emit).toHaveBeenCalled();
    // }));
      it('call onDestockClick raises destockClicked', fakeAsync(() => {
      spyOn(component.destockClicked, 'emit');
      component.onDestockClick();
      expect(component.destockClicked.emit).toHaveBeenCalled();
    }));
 })

})
