import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { GridModule, ButtonActionModule, SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, FooterModule, LayoutModule, PopupDialogService, PersistService, NavComponent, SharedModule, ComponentTypes, PopupDialogProperties } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { QuickPickPageComponent } from './quick-pick-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { Component, Input, inject, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, Subject, throwError } from 'rxjs';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { Xr2QuickPickQueueDeviceService } from '../../api-xr2/services/xr2-quick-pick-queue-device.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { TranslateService } from '@ngx-translate/core';
import { WindowService } from '../../shared/services/window-service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { QuickPickQueueViewComponent } from '../quick-pick-queue-view/quick-pick-queue-view.component';
import { QuickPickDrawerViewComponent } from '../quick-pick-drawer-view/quick-pick-drawer-view.component';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Guid } from 'guid-typescript';
import { IOcapHttpConfiguration } from '../../shared/interfaces/i-ocap-http-configuration';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';

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

  let selectableDeviceInfoList: SelectableDeviceInfo[] = [];
  let selectableDeviceInfo1 = new SelectableDeviceInfo(null);
  selectableDeviceInfo1.DeviceId = 1;
  selectableDeviceInfo1.Description = 'DeviceXr21';
  selectableDeviceInfo1.CurrentLeaseHolder = Guid.create();
  selectableDeviceInfoList.push(selectableDeviceInfo1);

  let ocapConfig: IOcapHttpConfiguration;
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

  let quickPickEventConnectionService: Partial<QuickPickEventConnectionService>;
  let quickPickDrawerService: Partial<Xr2QuickPickDrawerService>;
  let quickPickQueueService: Partial<Xr2QuickPickQueueService>;
  let popupDialogService: Partial<PopupDialogService>;

  quickPickEventConnectionService = {
    QuickPickDrawerUpdateSubject: new Subject(),
    QuickPickReloadDrawersSubject: new Subject()
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

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [QuickPickPageComponent, QuickPickQueueViewComponent, QuickPickDrawerViewComponent, MockTranslatePipe,
        MockSearchPipe, MockSearchBox, MockAppHeaderContainer],
      imports: [GridModule, ButtonActionModule, SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CoreModule, SharedModule],
      providers: [
        { provide: Xr2QuickPickQueueService, useValue: quickPickQueueService },
        { provide: Xr2QuickPickQueueDeviceService, useValue: { get: () => of([]) } },
        { provide: Xr2QuickPickDrawerService, useValue: quickPickDrawerService },
        { provide: QuickPickEventConnectionService, useValue: quickPickEventConnectionService },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: WindowService, useValue: [] },
        { provide: OcapHttpConfigurationService, useValue: { get: () => of([]) } },
        { provide: Location, useValue: { go: () => { } } },
        { provide: Router, useValue: { data: () => { } } },
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

  it('should call quickPickDrawerService', () => {
    expect(component).toBeTruthy();
    fakeAsync((component) => {
      component.ngOnInit();
      tick();
      expect(quickPickDrawerService.getAllDrawers).toHaveBeenCalledTimes(1);
    });
  });

  describe('Device Selection', () => {
    it('Should default to device selection', () => {
      expect(component.getActiveXr2Devices).toBeTruthy();

      fakeAsync((component) => {
        const getActiveXr2DevicesSpy = spyOn(component, 'getActiveXr2Devices').and.callThrough();
        const quickPickQueueServiceSpy = spyOn(component, 'quickPickQueueService').and.callThrough();
        component.ngOnInit();
        tick();
        expect(getActiveXr2DevicesSpy).toHaveBeenCalled();
        expect(quickPickQueueServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.selectedDeviceId).toEqual(selectableDeviceInfo1.DeviceId.toString());
        expect(component.defaultDeviceDisplyItem.value).toEqual(selectableDeviceInfo1.DeviceId.toString());
      });
    });

    it('Should not default to device selection when device is not leased to same client', () => {
      expect(component.getActiveXr2Devices()).toBeTruthy();

      fakeAsync((component) => {
        const getActiveXr2DevicesSpy = spyOn(component, 'getActiveXr2Devices').and.callThrough();
        const loadPicklistsQueueItemsSpy = spyOn(component, 'loadPicklistsQueueItems').and.callThrough();
        const quickPickQueueServiceSpy = spyOn(component, 'quickPickQueueService').and.callThrough();
        component.ngOnInit();
        tick();
        expect(loadPicklistsQueueItemsSpy).toHaveBeenCalled();
        expect(quickPickQueueServiceSpy).toHaveBeenCalledTimes(0);
        expect(getActiveXr2DevicesSpy).toHaveBeenCalled();
        expect(component.selectedDeviceId).toBeUndefined();
        expect(component.defaultDeviceDisplyItem).toBeUndefined();
      });
    });

    it('should set robotSelectionDisabled properly', () => {
      expect(component).toBeTruthy();
      component.onQuickPickActive(true);
      expect(component.robotSelectionDisabled).toBeTruthy();

      component.onQuickPickActive(false);
      expect(component.robotSelectionDisabled).toBeFalsy();
    });
  });

  describe('Rerouting', () => {
    it('should call reroute and refresh when event received', () => {
      expect(component).toBeTruthy();
      component.selectedDeviceId = '1';
      component.onRerouteQuickPick(new QuickPickQueueItem(null));
      expect(quickPickQueueService.reroute).toHaveBeenCalled();
      expect(quickPickQueueService.get).toHaveBeenCalled();
    });

    it('should call reroute on event and show dialog if the reroute fails', () => {
      expect(component).toBeTruthy();
      component.selectedDeviceId = '1';
      component.onRerouteQuickPick(new QuickPickQueueItem(null));
      expect(quickPickQueueService.reroute).toHaveBeenCalled();
      expect(quickPickQueueService.get).toHaveBeenCalled();
      expect(popupDialogService.showOnce).toHaveBeenCalled();
    });
  });
});
