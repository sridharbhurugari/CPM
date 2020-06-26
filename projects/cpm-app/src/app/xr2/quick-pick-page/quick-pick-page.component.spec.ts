import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { GridModule, ButtonActionModule, SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, FooterModule, LayoutModule, PersistService, NavComponent, SharedModule, PopupDialogService } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { QuickPickPageComponent } from './quick-pick-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../../core/core.module';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { Xr2QuickPickQueueDeviceService } from '../../api-xr2/services/xr2-quick-pick-queue-device.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { QuickPickEventConnectionService } from '../services/quick-pick-event-connection.service';
import { WindowService } from '../../shared/services/window-service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { QuickPickQueueViewComponent } from '../quick-pick-queue-view/quick-pick-queue-view.component';
import { QuickPickDrawerViewComponent } from '../quick-pick-drawer-view/quick-pick-drawer-view.component';
import { TranslateService } from '@ngx-translate/core';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Guid } from 'guid-typescript';
import { IOcapHttpConfiguration } from '../../shared/interfaces/i-ocap-http-configuration';

@Component({
  selector: 'oc-search-box',
  template: ''
})
class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('QuickPickPageComponent', () => {
  let component: QuickPickPageComponent;
  let fixture: ComponentFixture<QuickPickPageComponent>;
  let quickPickEventConnectionService: Partial<QuickPickEventConnectionService>;
  let eventConnectionService: Partial<EventConnectionService>;
  let quickPickService: Partial<Xr2QuickPickQueueService>;

  beforeEach(async(() => {
    quickPickEventConnectionService = {
      QuickPickDrawerUpdateSubject: new Subject(),
      QuickPickReloadDrawersSubject: new Subject()
    };

    TestBed.configureTestingModule({
      declarations: [ QuickPickPageComponent, QuickPickQueueViewComponent, QuickPickDrawerViewComponent, MockTranslatePipe,
        MockSearchPipe, MockSearchBox, MockAppHeaderContainer ],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CoreModule, SharedModule],
      providers: [
        { provide: Xr2QuickPickQueueService, useValue: { get: () => of([]) }},
        { provide: Xr2QuickPickQueueDeviceService, useValue: { get: () => of([]) }},
        { provide: Xr2QuickPickDrawerService, useValue: { get: () => of([])} },
        { provide: QuickPickEventConnectionService, useValue: quickPickEventConnectionService},
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
        { provide: WindowService, useValue: []},
        { provide: OcapHttpConfigurationService, useValue: { get: () => of([]) }},
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
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
    spyOn(quickPickEventConnectionService.QuickPickDrawerUpdateSubject, 'subscribe');
    spyOn(quickPickEventConnectionService.QuickPickReloadDrawersSubject, 'subscribe');
    fixture = TestBed.createComponent(QuickPickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

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

  beforeEach(async(() => {
    quickPickEventConnectionService = {
      QuickPickDrawerUpdateSubject: new Subject(),
      QuickPickReloadDrawersSubject: new Subject()
    };
    TestBed.configureTestingModule({
      declarations: [ QuickPickPageComponent, QuickPickQueueViewComponent, QuickPickDrawerViewComponent, MockTranslatePipe,
        MockSearchPipe, MockSearchBox, MockAppHeaderContainer ],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CoreModule],
      providers: [
        { provide: Xr2QuickPickQueueService, useValue: { get: () => of([[]]) }},
        { provide: Xr2QuickPickQueueDeviceService, useValue: { get: () => of(selectableDeviceInfoList) }},
        { provide: Xr2QuickPickDrawerService, useValue: { get: () => of([])} },
        { provide: QuickPickEventConnectionService, useValue: quickPickEventConnectionService },
        { provide: WindowService, useValue: []},
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: OcapHttpConfigurationService, useValue: { get: () => ocapConfig }},
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
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

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(QuickPickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('Should default to device selection', () => {
  //   expect(component.getActiveXr2Devices).toBeTruthy();

  //   fakeAsync((component) => {
  //     const getActiveXr2DevicesSpy = spyOn(component, 'getActiveXr2Devices').and.callThrough();
  //     const quickPickQueueServiceSpy = spyOn(component, 'quickPickQueueService').and.callThrough();
  //     const quickPickDrawerServiceSpy = spyOn(component, 'quickPickDrawerService').and.callThrough();
  //     component.ngOnInit();
  //     tick();
  //     expect(getActiveXr2DevicesSpy).toHaveBeenCalled();
  //     expect(quickPickQueueServiceSpy).toHaveBeenCalledTimes(1);
  //     expect(quickPickDrawerServiceSpy).toHaveBeenCalledTimes(1);
  //     expect(component.selectedDeviceId).toEqual(selectableDeviceInfo1.DeviceId.toString());
  //     expect(component.defaultDeviceDisplyItem.value).toEqual(selectableDeviceInfo1.DeviceId.toString());
  //   });
  // });
});

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
    clientId: Guid.create().toString(),
    apiKey: '39252',
    machineName: 'machine329',
    ocapServerIP: '127.0.0.1',
    port: '3928',
    useSecured: 'true',
    userLocale: 'en-US',
    clientName: 'client1'
  };

  let quickPickEventConnectionService: Partial<QuickPickEventConnectionService>;

  beforeEach(async(() => {
    quickPickEventConnectionService = {
      QuickPickDrawerUpdateSubject: new Subject(),
      QuickPickReloadDrawersSubject: new Subject()
    };
    TestBed.configureTestingModule({
      declarations: [ QuickPickPageComponent, QuickPickQueueViewComponent, QuickPickDrawerViewComponent, MockTranslatePipe,
        MockSearchPipe, MockSearchBox, MockAppHeaderContainer ],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CoreModule],
      providers: [
        { provide: Xr2QuickPickQueueService, useValue: { get: () => of([[]]) }},
        { provide: Xr2QuickPickQueueDeviceService, useValue: { get: () => of(selectableDeviceInfoList) }},
        { provide: Xr2QuickPickDrawerService, useValue: { get: () => of([])} },
        { provide: QuickPickEventConnectionService, useValue: quickPickEventConnectionService },
        { provide: WindowService, useValue: []},
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: OcapHttpConfigurationService, useValue: { get: () => ocapConfig }},
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
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
    fixture = TestBed.createComponent(QuickPickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('Should not default to device selection when device is not leased to same client', () => {
  //   expect(component.getActiveXr2Devices).toBeTruthy();

  //   fakeAsync((component) => {
  //     const getActiveXr2DevicesSpy = spyOn(component, 'getActiveXr2Devices').and.callThrough();
  //     const loadPicklistsQueueItemsSpy = spyOn(component, 'loadPicklistsQueueItems').and.callThrough();
  //     const loadDrawersDataSpy = spyOn(component, 'loadDrawersData').and.callThrough();
  //     const quickPickQueueServiceSpy = spyOn(component, 'quickPickQueueService').and.callThrough();
  //     const quickPickDrawerServiceSpy = spyOn(component, 'quickPickDrawerService').and.callThrough();
  //     component.ngOnInit();
  //     tick();
  //     expect(loadPicklistsQueueItemsSpy).toHaveBeenCalled();
  //     expect(loadDrawersDataSpy).toHaveBeenCalled();
  //     expect(quickPickQueueServiceSpy).toHaveBeenCalledTimes(0);
  //     expect(getActiveXr2DevicesSpy).toHaveBeenCalled();
  //     expect(quickPickDrawerServiceSpy).toHaveBeenCalledTimes(1);
  //     expect(component.selectedDeviceId).toBeUndefined();
  //     expect(component.defaultDeviceDisplyItem).toBeUndefined();
  //   });
  // });
});
