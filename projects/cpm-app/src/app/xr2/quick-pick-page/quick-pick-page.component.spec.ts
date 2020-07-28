import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { GridModule, ButtonActionModule, SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, FooterModule, LayoutModule, PopupDialogService, SearchBoxComponent, SharedModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { QuickPickPageComponent } from './quick-pick-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, Subject, throwError } from 'rxjs';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { Xr2QuickPickQueueDeviceService } from '../../api-xr2/services/xr2-quick-pick-queue-device.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { TranslateService } from '@ngx-translate/core';
import { WindowService } from '../../shared/services/window-service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { BarcodeScanService } from 'oal-core';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';
import { QuickPickQueueViewComponent } from '../quick-pick-queue-view/quick-pick-queue-view.component';
import { QuickPickDrawerViewComponent } from '../quick-pick-drawer-view/quick-pick-drawer-view.component';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Guid } from 'guid-typescript';
import { IOcapHttpConfiguration } from '../../shared/interfaces/i-ocap-http-configuration';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { BarcodeScanMessage } from '../model/barcode-scan-message';

@Component({
  selector: 'oc-search-box',
  template: ''
})
class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input() placeHolderText: string;
}

describe('QuickPickPageComponent', () => {
  let component: QuickPickPageComponent;
  let fixture: ComponentFixture<QuickPickPageComponent>;

  let selectableDeviceInfoList: SelectableDeviceInfo[];
  let ocapConfig: IOcapHttpConfiguration;

  let quickPickEventConnectionService: Partial<QuickPickEventConnectionService>;
  let quickPickDrawerService: Partial<Xr2QuickPickDrawerService>;
  let quickPickQueueService: Partial<Xr2QuickPickQueueService>;
  let popupDialogService: Partial<PopupDialogService>;
  let barcodeScanService: Partial<BarcodeScanService>;
  let systemConfigurationService: Partial<SystemConfigurationService>;
  let configurationValue: IConfigurationValue;

  beforeEach(async(() => {
    // Create mock device list
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


    quickPickEventConnectionService = {
      QuickPickDrawerUpdateSubject: new Subject(),
      QuickPickReloadDrawersSubject: new Subject(),
      QuickPickQueueUpdateSubject: new Subject(),
      QuickPickErrorUpdateSubject: new Subject()
    };

    quickPickDrawerService = {
      getAllDrawers: jasmine.createSpy('getAllDrawer').and.returnValue(of([])),
      printLabel: jasmine.createSpy('printLabel').and.returnValue(of())
    };

    quickPickQueueService = {
      get: jasmine.createSpy('get').and.returnValue(of([])),
      reroute: jasmine.createSpy('reroute').and.returnValues(throwError({ status: 404 }), of(true))
    };

    popupDialogService = {
      showOnce: jasmine.createSpy('showOnce')
    };

    barcodeScanService = {
      reset: jasmine.createSpy('reset'),
      BarcodeScannedSubject: new Subject(),
    };

    systemConfigurationService = { GetConfigurationValues: () => of(configurationValue) };

    quickPickEventConnectionService = {
      QuickPickDrawerUpdateSubject: new Subject(),
      QuickPickReloadDrawersSubject: new Subject(),
      QuickPickQueueUpdateSubject: new Subject(),
      QuickPickErrorUpdateSubject: new Subject()
    };

    quickPickDrawerService = {
      getAllDrawers: jasmine.createSpy('getAllDrawer').and.returnValue(of([])),
      printLabel: jasmine.createSpy('printLabel').and.returnValue(of())
    };

    quickPickQueueService = {
      get: jasmine.createSpy('get').and.returnValue(of([])),
      reroute: jasmine.createSpy('reroute').and.returnValues(throwError({ status: 404 }), of(true))
    };

    popupDialogService = {
      showOnce: jasmine.createSpy('showOnce')
    };

    barcodeScanService = {
      reset: jasmine.createSpy('reset'),
      BarcodeScannedSubject: new Subject(),
    };

    configurationValue = { Value: '15', Category: '', SubCategory: '' };

    TestBed.configureTestingModule({
      declarations: [QuickPickPageComponent, QuickPickQueueViewComponent, QuickPickDrawerViewComponent, MockTranslatePipe,
        MockSearchPipe, MockSearchBox, MockAppHeaderContainer],
      imports: [GridModule, ButtonActionModule, SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CoreModule, SharedModule],
      providers: [
        { provide: Xr2QuickPickQueueService, useValue: quickPickQueueService },
        { provide: Xr2QuickPickQueueDeviceService, useValue: { get: () => of(selectableDeviceInfoList) } },
        { provide: Xr2QuickPickDrawerService, useValue: quickPickDrawerService },
        { provide: QuickPickEventConnectionService, useValue: quickPickEventConnectionService },
        { provide: BarcodeScanService, useValue: barcodeScanService },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: WindowService, useValue: [] },
        { provide: OcapHttpConfigurationService, useValue: { get: () => ocapConfig } },
        { provide: Location, useValue: { go: () => { } } },
        { provide: Router, useValue: { data: () => { } } },
        { provide: SystemConfigurationService, useValue: systemConfigurationService },
      ]
    }).overrideComponent(QuickPickQueueViewComponent, {
      set: {
        template: ''
      }
    }).overrideComponent(QuickPickDrawerViewComponent, {
      set: {
        template: ''
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(quickPickEventConnectionService.QuickPickReloadDrawersSubject, 'subscribe');
    fixture = TestBed.createComponent(QuickPickPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call quickPickDrawerService', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    tick();
    expect(quickPickDrawerService.getAllDrawers).toHaveBeenCalled();
  }));

  describe('Device Selection', () => {
    it('Should default to device selection', fakeAsync(() => {
      const expectedDeviceID = '1';
      const getActiveXr2DevicesSpy = spyOn(component, 'getActiveXr2Devices').and.callThrough();
      component.ngOnInit();
      tick();
      expect(getActiveXr2DevicesSpy).toHaveBeenCalledTimes(1);
      expect(quickPickQueueService.get).toHaveBeenCalledTimes(1);
      expect(component.selectedDeviceId).toEqual(expectedDeviceID);
      expect(component.defaultDeviceDisplyItem.value).toEqual(expectedDeviceID);
    }));

    it('Should not default to device selection when device is not leased to same client', fakeAsync(() => {
      ocapConfig.clientId = '';
      const getActiveXr2DevicesSpy = spyOn(component, 'getActiveXr2Devices').and.callThrough();
      const loadPicklistsQueueItemsSpy = spyOn<any>(component, 'loadPicklistsQueueItems').and.callThrough();
      const loadDrawersDataSpy = spyOn<any>(component, 'loadDrawersData').and.callThrough();

      component.ngOnInit();
      tick();
      expect(loadPicklistsQueueItemsSpy).toHaveBeenCalledTimes(0);
      expect(loadDrawersDataSpy).toHaveBeenCalledTimes(0);
      expect(quickPickQueueService.get).toHaveBeenCalledTimes(0);
      expect(getActiveXr2DevicesSpy).toHaveBeenCalledTimes(1);
      expect(component.selectedDeviceId).toBeUndefined();
      expect(component.defaultDeviceDisplyItem).toBeUndefined();
    }));

    it('Should default device if there is only one device', fakeAsync(() => {
      const expectedDeviceID = '2';
      selectableDeviceInfoList.shift();
      expect(component.getActiveXr2Devices()).toBeTruthy();
      tick();
      expect(component.selectedDeviceId).toEqual(expectedDeviceID);
      expect(component.defaultDeviceDisplyItem.value).toEqual(expectedDeviceID);
    }));

    it('should set robotSelectionDisabled properly', () => {
      expect(component).toBeTruthy();
      component.onQuickPickActive(true);
      expect(component.robotSelectionDisabled).toBeTruthy();

      component.onQuickPickActive(false);
      expect(component.robotSelectionDisabled).toBeFalsy();
    });
  });

  describe('Rerouting', () => {
    it('should call reroute and refresh if dialog result true', () => {
      expect(component).toBeTruthy();
      const rerouteSpy = spyOn<any>(component, 'displayRerouteDialog').and.returnValue(of(true));
      component.selectedDeviceId = '1';
      component.onRerouteQuickPick(new QuickPickQueueItem(null));
      expect(quickPickQueueService.reroute).toHaveBeenCalledTimes(1);
      expect(quickPickQueueService.get).toHaveBeenCalledTimes(1);
      expect(rerouteSpy).toHaveBeenCalled();
    });

    it('should call reroute and not reroute if dialog result false', () => {
      expect(component).toBeTruthy();
      const rerouteSpy = spyOn<any>(component, 'displayRerouteDialog').and.returnValue(of(false));
      component.selectedDeviceId = '1';
      component.onRerouteQuickPick(new QuickPickQueueItem(null));
      expect(quickPickQueueService.reroute).toHaveBeenCalledTimes(0);
      expect(quickPickQueueService.get).toHaveBeenCalledTimes(0);
      expect(rerouteSpy).toHaveBeenCalledTimes(1);
    });

    it('should call reroute on event and show dialog if the reroute fails', () => {
      expect(component).toBeTruthy();
      component.selectedDeviceId = '1';
      const rerouteSpy = spyOn<any>(component, 'displayRerouteDialog').and.returnValue(of(true));
      component.onRerouteQuickPick(new QuickPickQueueItem(null));
      expect(quickPickQueueService.reroute).toHaveBeenCalledTimes(1);
      expect(quickPickQueueService.get).toHaveBeenCalledTimes(1);
      expect(rerouteSpy).toHaveBeenCalledTimes(1);
      expect(popupDialogService.showOnce).toHaveBeenCalledTimes(1);
    });
  });

  describe('Quick Pick Queue', () => {
    it('should load queue items on new update message', () => {
      expect(component).toBeTruthy();
      component.selectedDeviceId = '1';
      const event = { DeviceId: 1 };

      quickPickEventConnectionService.QuickPickQueueUpdateSubject.next(event);

      expect(quickPickQueueService.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('Quick Pick Scanning', () => {
    it('should set scan input message when scan event is received', () => {
      expect(component).toBeTruthy();
      component.selectedDeviceId = '1';
      const scan = 'scan';
      const scanMessage = new BarcodeScanMessage(scan);

      barcodeScanService.BarcodeScannedSubject.next(scan);

      expect(component.scanInput).toEqual(scanMessage);
    });
  });

  describe('Error Notifications', () => {
    it('should display a popupwindow with the error message', () => {
      expect(component).toBeTruthy();
      component.selectedDeviceId = '1';
      const FakeEvent = { DeviceId: 1, ErrorMessage: 'Error Message' };
      quickPickEventConnectionService.QuickPickErrorUpdateSubject.next(FakeEvent);
      expect(popupDialogService.showOnce).toHaveBeenCalledTimes(1);
    });
  });
});
