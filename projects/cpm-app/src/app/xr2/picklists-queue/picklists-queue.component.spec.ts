import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistsQueueComponent } from './picklists-queue.component';
import { GridModule, ButtonActionModule,  SingleselectDropdownModule, SingleselectRowItem, PopupWindowModule, PopupDialogService,
  PopupDialogModule,
  FooterModule,
  LayoutModule} from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { Subject, Observable, of, throwError } from 'rxjs';
import { Input, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from 'selenium-webdriver/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { IPicklistQueueItemNonstandardJson } from '../../api-xr2/events/i-picklist-queue-item-nonstandard-json';
import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { Guid } from 'guid-typescript';
import { IXr2OrderGroupKey } from '../../api-xr2/events/i-xr2-order-group-key';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('PicklistsQueueComponent', () => {
  let component: PicklistsQueueComponent;
  let fixture: ComponentFixture<PicklistsQueueComponent>;
  let picklistsQueueEventConnectionService: Partial<PicklistsQueueEventConnectionService>;
  let picklistsQueueService: Partial<PicklistsQueueService>;
  let translateService: Partial<TranslateService>;
  let popupDialogService: Partial<PopupDialogService>;
  const event: IColHeaderSortChanged = {ColumnPropertyName: 'Destination', SortDirection: 'asc'};

  beforeEach(async(() => {
    picklistsQueueEventConnectionService = {
      addOrUpdatePicklistQueueItemSubject: new Subject(),
      removePicklistQueueItemSubject: new Subject()
    };
    picklistsQueueService = {
      skip: jasmine.createSpy('skip').and.returnValue(of(PicklistsQueueService)),
      sendToRobot: jasmine.createSpy('sendToRobot').and.returnValue(of(PicklistsQueueService)),
      printLabels: jasmine.createSpy('printLabels').and.returnValue(of(PicklistsQueueService))
    };
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService))
    };
    popupDialogService = {
      showOnce: jasmine.createSpy('showOnce')
    };

    TestBed.configureTestingModule({
      declarations: [ PicklistsQueueComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox,
        MockColHeaderSortable, MockAppHeaderContainer ],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule ],
      providers: [
        { provide: WpfActionControllerService, useValue: jasmine.createSpyObj('WpfActionControllerService', ['ExecuteContinueAction']) },
        { provide: TranslateService, useValue: translateService },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: HttpClient, useValue: { get: () => {}} },
        { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
        { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: ActivatedRoute, useValue: { actr: () => { }} },
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
        { provide: PicklistsQueueService, useValue: picklistsQueueService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject, 'subscribe').and.callThrough();
    spyOn(picklistsQueueEventConnectionService.removePicklistQueueItemSubject, 'subscribe').and.callThrough();
    fixture = TestBed.createComponent(PicklistsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('reroute', () => {
    it('should call picklistsQueueService.reroute', () => {
      const picklistQueueItem = new PicklistQueueItem(null);
      component.skip(picklistQueueItem);
      expect(picklistsQueueService.skip).toHaveBeenCalled();
      });
    });

  describe('Connect to Events', () => {
    it('Connects to events on creation', () => {
      expect(component).toBeTruthy();
      expect(picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject.subscribe).toHaveBeenCalled();
      expect(picklistsQueueEventConnectionService.removePicklistQueueItemSubject.subscribe).toHaveBeenCalled();
    });
  });

  describe('Output Device Selection', () => {
    it('should return null given no devices', () => {

      const picklistQueueItem = new PicklistQueueItem(null);
      picklistQueueItem.Status = 2;
      picklistQueueItem.OutputDeviceId = '2104';
      picklistQueueItem.AvailableOutputDeviceList = [];

      expect(component.getSelectedOutputDeviceRow(picklistQueueItem)).toBeNull();
    });

    it('should return active selection device row on status 1', () => {
      let translatedLabel = '';
      translateService.get('QUICKPICK').subscribe((res: string) => {
        translatedLabel = res;
      });
      const device: OutputDevice = {
        DeviceId: '2102',
        Label: translatedLabel,
        IsActive: true
      };
      const expectedRow = new SingleselectRowItem(translatedLabel, '2102');
      const picklistQueueItem = new PicklistQueueItem(null);
      picklistQueueItem.Status = 1;
      picklistQueueItem.OutputDeviceId = '2102';
      picklistQueueItem.AvailableOutputDeviceList = [device];

      expect(component.getSelectedOutputDeviceRow(picklistQueueItem).text).toEqual(expectedRow.text);
      expect(component.getSelectedOutputDeviceRow(picklistQueueItem).value).toEqual(expectedRow.value);
    });

    it('should return chosen selection device row on other status', () => {
      let translatedLabel = '';
      translateService.get('QUICKPICK').subscribe((res: string) => {
        translatedLabel = res;
      });
      const device: OutputDevice = {
        DeviceId: '2102',
        Label: translatedLabel,
        IsActive: false
      };
      const expectedRow = new SingleselectRowItem(translatedLabel, '2102');
      const picklistQueueItem = new PicklistQueueItem(null);
      picklistQueueItem.Status = 2;
      picklistQueueItem.OutputDeviceId = '2102';
      picklistQueueItem.AvailableOutputDeviceList = [device];

      expect(component.getSelectedOutputDeviceRow(picklistQueueItem).text).toEqual(expectedRow.text);
      expect(component.getSelectedOutputDeviceRow(picklistQueueItem).value).toEqual(expectedRow.value);
    });

    it('should return output device display list ', () => {
      let translatedLabel = '';
      translateService.get('QUICKPICK').subscribe((res: string) => {
        translatedLabel = res;
      });
      const device: OutputDevice = {
        DeviceId: '2102',
        Label: translatedLabel,
        IsActive: true
      };

      const expectedRow = new SingleselectRowItem(translatedLabel, '2102');
      const picklistQueueItem = new PicklistQueueItem(null);
      picklistQueueItem.Status = 2;
      picklistQueueItem.OutputDeviceId = '2102';
      picklistQueueItem.AvailableOutputDeviceList = [device];

      expect(component.getActiveOutputDeviceList(picklistQueueItem)).toEqual([expectedRow]);
    });
  });

  describe('Button State Diplay Texts', () => {
    it('should display release button on new status', () => {
      const item = new PicklistQueueItem(null);
      item.OutputDeviceId = '1';
      item.IsPrintable = true;
      item.Status = 1;

      const outputDevice = new OutputDevice();
      outputDevice.DeviceId = '1';

      item.AvailableOutputDeviceList = [
        outputDevice
      ];
      component.picklistQueueItems = [
        item
      ];

      let validText = '';
      translateService.get('RELEASE').subscribe((res: string) => {
        validText = res;
      });

      expect(component.getReleaseButtonProperties(component.picklistQueueItems[0]).text).toEqual(validText);
    });
    it('should display print button on sent status', () => {
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
      ];
      component.picklistQueueItems[0].IsPrintable = true;
      component.picklistQueueItems[0].Status = 2;

      let validText = '';
      translateService.get('PRINT').subscribe((res: string) => {
        validText = res;
      });

      expect(component.getPrintButtonProperties(component.picklistQueueItems[0]).text).toEqual(validText);
    });
    it('it should display print button on boxsplitreceived status', () => {
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
      ];
      component.picklistQueueItems[0].IsPrintable = true;
      component.picklistQueueItems[0].Status = 2;

      let validText = '';
      translateService.get('PRINT').subscribe((res: string) => {
        validText = res;
      });

      expect(component.getPrintButtonProperties(component.picklistQueueItems[0]).text).toEqual(validText);
    });
    it('should display reprint button on printed status', () => {
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
      ];
      component.picklistQueueItems[0].IsPrintable = true;
      component.picklistQueueItems[0].Status = 4;

      let validText = '';
      translateService.get('REPRINT').subscribe((res: string) => {
        validText = res;
      });

      expect(component.getPrintButtonProperties(component.picklistQueueItems[0]).text).toEqual(validText);
    });
  });

  describe('Action Button Disable States', () => {
    it('should set release to enabled on new status', () => {
      const item = new PicklistQueueItem(null);
      item.OutputDeviceId = '1';
      item.IsPrintable = false;
      item.Status = 1;
      item.Saving = false;

      const outputDevice = new OutputDevice();
      outputDevice.DeviceId = '1';
      outputDevice.IsActive = true;

      item.AvailableOutputDeviceList = [
        outputDevice
      ];
      component.picklistQueueItems = [
        item
      ];

      expect(component.getReleaseButtonProperties(component.picklistQueueItems[0]).disabled).toBeFalsy();
    });
    it('should set print to disabled on non-printable devices', () => {
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
      ];
      component.picklistQueueItems[0].IsPrintable = false;
      component.picklistQueueItems[0].Status = 3;


      expect(component.getPrintButtonProperties(component.picklistQueueItems[0]).disabled).toBeTruthy();
    });
    it('should set print to enabled on printable devices with valid state', () => {
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
        new PicklistQueueItem(null)
      ];
      component.picklistQueueItems[0].IsPrintable = true;
      component.picklistQueueItems[0].Saving = false;
      component.picklistQueueItems[0].Status = 3;

      component.picklistQueueItems[1].IsPrintable = true;
      component.picklistQueueItems[1].Saving = false;
      component.picklistQueueItems[1].Status = 4;

      expect(component.getPrintButtonProperties(component.picklistQueueItems[0]).disabled).toBeFalsy();
      expect(component.getPrintButtonProperties(component.picklistQueueItems[1]).disabled).toBeFalsy();
    });
  });

  describe('Action Sort by Column', () => {
    it('column selected ', () => {
      component.sort(component.picklistQueueItems, 'desc');
      expect(component.columnSelected(event));
    });
  });

  describe('Queue Eventing', () => {
    it('should add picklist queue item on add or update event', () => {
      const fakeRobotGroupId = Guid.create();
      const pickListItemUpdate = new PicklistQueueItem(null);
      const itemPicklistLines: NonstandardJsonArray<IItemPicklistLine> = {$values: []};
      const availableOutputDeviceList: NonstandardJsonArray<OutputDevice> = {$values: []};
      component.picklistQueueItems = [];

      const picklistItemAdd = {} as IPicklistQueueItemNonstandardJson;
      picklistItemAdd.RobotPickGroupId = fakeRobotGroupId;
      picklistItemAdd.ItemPicklistLines = itemPicklistLines;
      picklistItemAdd.AvailableOutputDeviceList = availableOutputDeviceList;
      const fakeAddEvent = {PicklistQueueItem: picklistItemAdd};

      picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject.next(fakeAddEvent);

      expect(component.picklistQueueItems.length).toBe(1);
    });
    it('should update picklist queue item on add or update event by robot group ID', () => {
      const fakeRobotGroupId = Guid.create();
      const existingQueueItem = new PicklistQueueItem(null);
      const itemPicklistLines: NonstandardJsonArray<IItemPicklistLine> = {$values: []};
      const availableOutputDeviceList: NonstandardJsonArray<OutputDevice> = {$values: []};

      existingQueueItem.Status = 1;
      existingQueueItem.RobotPickGroupId = fakeRobotGroupId;
      component.picklistQueueItems = [
        existingQueueItem
      ]

      const pickListItemUpdate = {} as IPicklistQueueItemNonstandardJson;
      pickListItemUpdate.Status = 2;
      pickListItemUpdate.ItemPicklistLines = itemPicklistLines;
      pickListItemUpdate.AvailableOutputDeviceList = availableOutputDeviceList;
      pickListItemUpdate.RobotPickGroupId = fakeRobotGroupId;
      const fakeUpdateEvent = {PicklistQueueItem: pickListItemUpdate};

      picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject.next(fakeUpdateEvent);

      expect(existingQueueItem.Status).toBe(pickListItemUpdate.Status);
    });
    it('should update picklist queue item on add or update event by order and order destination IDs', () => {
      const existingQueueItem = new PicklistQueueItem(null);
      const itemPicklistLines: NonstandardJsonArray<IItemPicklistLine> = {$values: []};
      const availableOutputDeviceList: NonstandardJsonArray<OutputDevice> = {$values: []};

      existingQueueItem.Status = 1;
      existingQueueItem.OrderId = 'orderId';
      existingQueueItem.DeviceLocationId = 1;
      existingQueueItem.OrderGroupDestinationId = '1';
      existingQueueItem.RobotPickGroupId = null;
      component.picklistQueueItems = [
        existingQueueItem
      ];

      const pickListItemUpdate = {} as IPicklistQueueItemNonstandardJson;
      pickListItemUpdate.Status = 2;
      pickListItemUpdate.OrderId = 'orderId';
      pickListItemUpdate.DeviceLocationId = 1;
      pickListItemUpdate.OrderGroupDestinationId = '1';
      pickListItemUpdate.ItemPicklistLines = itemPicklistLines;
      pickListItemUpdate.AvailableOutputDeviceList = availableOutputDeviceList;

      const fakeUpdateEvent = {PicklistQueueItem: pickListItemUpdate};

      picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject.next(fakeUpdateEvent);

      expect(existingQueueItem.Status).toBe(pickListItemUpdate.Status);
    });
    it('should remove picklist queue item on remove event', () => {
      const fakeRobotGroupId = Guid.create();
      const existingQueueItem = new PicklistQueueItem(null);

      existingQueueItem.OrderId = 'orderId';
      existingQueueItem.OrderGroupDestinationId = 'destinationId';
      existingQueueItem.DeviceLocationId = 1;
      existingQueueItem.RobotPickGroupId = fakeRobotGroupId;
      component.picklistQueueItems = [
        existingQueueItem
      ]

      const xr2OrderGroupKey: IXr2OrderGroupKey = {
        OrderId: 'orderId',
        OrderGroupDestinationId: 'destinationId',
        DeviceLocationId: 1,
        RobotPickGroupId: fakeRobotGroupId
      };
      const fakeEvent = {Xr2OrderGroupKey: xr2OrderGroupKey};

      picklistsQueueEventConnectionService.removePicklistQueueItemSubject.next(fakeEvent);

      expect(component.picklistQueueItems.length).toBe(0);
    });
  });
  describe('Queue API Actions', () => {
    it('should call PicklistQueue service to send to robot on release click', () => {
      const fakePicklistItem = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      fakePicklistItem.ItemPicklistLines = [itemPicklistLine];

      component.sendToRobot(fakePicklistItem);

      expect(picklistsQueueService.sendToRobot).toHaveBeenCalledTimes(1);
      expect(fakePicklistItem.Saving).toBeFalsy();
    });
    it('should call PicklistQueue service to reroute on reroute click', () => {
      const fakePicklistItem = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      fakePicklistItem.ItemPicklistLines = [itemPicklistLine];

      component.skip(fakePicklistItem);

      expect(picklistsQueueService.skip).toHaveBeenCalledTimes(1);
      expect(fakePicklistItem.Saving).toBeFalsy();
    });
    it('should call PicklistQueue service to print label on print click', () => {
      const fakePicklistItem = new PicklistQueueItem(null);
      const itemPicklistLine = {} as IItemPicklistLine;
      fakePicklistItem.ItemPicklistLines = [itemPicklistLine];

      component.printLabels(fakePicklistItem);

      expect(picklistsQueueService.printLabels).toHaveBeenCalledTimes(1);
    });
  });
});
