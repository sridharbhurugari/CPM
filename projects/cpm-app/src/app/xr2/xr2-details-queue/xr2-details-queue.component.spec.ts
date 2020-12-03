import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridModule, ButtonActionModule,  SingleselectDropdownModule, SingleselectRowItem, PopupWindowModule, PopupDialogService,
  PopupDialogModule,FooterModule, LayoutModule, CheckboxModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { Subject, Observable, of } from 'rxjs';
import { Input, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from 'selenium-webdriver/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { Xr2DetailsQueueComponent } from './xr2-details-queue.component';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { PicklistsQueueEventConnectionService } from '../services/picklists-queue-event-connection.service';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { Guid } from 'guid-typescript';
import { IItemPicklistLine } from '../../api-xr2/data-contracts/i-item-picklist-line';
import { IPicklistQueueItemNonstandardJson } from '../../api-xr2/events/i-picklist-queue-item-nonstandard-json';
import { IXr2OrderGroupKey } from '../../api-xr2/events/i-xr2-order-group-key';
import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { OutputDeviceTypeId } from '../../shared/constants/output-device-type-id';
import { DestinationTypes } from '../../shared/constants/destination-types';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { update } from 'lodash';
import { last } from 'rxjs/operators';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('Xr2DetailsQueueComponent', () => {
  let component: Xr2DetailsQueueComponent;
  let fixture: ComponentFixture<Xr2DetailsQueueComponent>;
  let translateService: Partial<TranslateService>;
  let popupDialogService: Partial<PopupDialogService>;
  let picklistsQueueEventConnectionService: Partial<PicklistsQueueEventConnectionService>;
  let router: Partial<Router>;
  const event: IColHeaderSortChanged = {ColumnPropertyName: 'Destination', SortDirection: 'asc'};

  beforeEach(async(() => {
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService)),
      getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
    };

    popupDialogService = {
      showOnce: jasmine.createSpy('showOnce')
    };

    picklistsQueueEventConnectionService = {
      addOrUpdatePicklistQueueItemSubject: new Subject(),
      removePicklistQueueItemSubject: new Subject()
    };

    router = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [ Xr2DetailsQueueComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox,
        MockColHeaderSortable, MockAppHeaderContainer, MockCpClickableIconComponent, MockCpDataLabelComponent ],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CheckboxModule],
      providers: [
        { provide: WpfActionControllerService, useValue: jasmine.createSpyObj('WpfActionControllerService', ['ExecuteContinueAction']) },
        { provide: TranslateService, useValue: translateService },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: HttpClient, useValue: { get: () => {}} },
        { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
        { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
        { provide: ActivatedRoute, useValue: { actr: () => { }} },
        { provide: PicklistsQueueEventConnectionService, useValue: picklistsQueueEventConnectionService},
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: { data: () => {}} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2DetailsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject, 'subscribe').and.callThrough();
    spyOn(picklistsQueueEventConnectionService.removePicklistQueueItemSubject, 'subscribe').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Action Sort by Column', () => {
    it('column selected ', () => {
      component.sort(component.picklistQueueItems, 'desc');

      expect(component.columnSelected(event));
    });
  });

  describe('Button Click Actions', () => {

    it('should send release event on release click', () => {
      const releaseSpy = spyOn(component.releaseEvent, 'emit');

      component.onReleaseClick(new PicklistQueueItem(null));

      expect(releaseSpy).toHaveBeenCalledTimes(1);
    });

    it('should send reroute event on reroute click', () => {
      const rerouteSpy = spyOn(component.rerouteEvent, 'emit');

      component.onRerouteClick(new PicklistQueueItem(null));

      expect(rerouteSpy).toHaveBeenCalledTimes(1);
    });

    it('should send print event on print click', () => {
      const printSpy = spyOn(component.printEvent, 'emit');

      component.onPrintClick(new PicklistQueueItem(null));

      expect(printSpy).toHaveBeenCalledTimes(1);
    });

    it('should clear selected items and send selection changed event on select all - off', () => {
      const selectionChangedSpy = spyOn(component.selectionChangedEvent, 'emit');
      const boxState = {
        selectedState: false
      };
      const item1 = new PicklistQueueItem(null);
      const item2 = new PicklistQueueItem(null);
      component.picklistQueueItems = [
        item1,
        item2
      ];
      component.selectedItems = new Set([item1, item2]);

      component.onSelectAllCheckBox(boxState);

      expect(component.selectedItems.size).toBe(0);
      expect(selectionChangedSpy).toHaveBeenCalledTimes(1);
    });

    it('should select all items and send selection changed event on select all - on', () => {
      const selectionChangedSpy = spyOn(component.selectionChangedEvent, 'emit');
      const boxState = {
        selectedState: true
      };
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
        new PicklistQueueItem(null),
        new PicklistQueueItem(null)
      ];
      component.selectedItems = new Set();

      component.onSelectAllCheckBox(boxState);

      expect(component.selectedItems.size).toBe(component.picklistQueueItems.length);
      expect(selectionChangedSpy).toHaveBeenCalledTimes(1);
    });

    it('should clear selected item and send selection changed event on select - off', () => {
      const selectionChangedSpy = spyOn(component.selectionChangedEvent, 'emit');
      const unCheckedItem = new PicklistQueueItem(null);
      const boxState = {
        selectedState: false
      };
      const item1 = new PicklistQueueItem(null);
      const item2 = new PicklistQueueItem(null);
      component.picklistQueueItems = [
        item1,
        item2
      ];
      component.selectedItems = new Set([item1, item2]);

      component.onSelectItemCheckBox(boxState, unCheckedItem);

      expect(component.selectedItems.has(unCheckedItem)).toBeFalsy();
      expect(selectionChangedSpy).toHaveBeenCalledTimes(1);
    });

    it('should select item and send selection changed event on select - on', () => {
      const selectionChangedSpy = spyOn(component.selectionChangedEvent, 'emit');
      const checkedItem = new PicklistQueueItem(null);
      const boxState = {
        selectedState: true
      };
      const item = new PicklistQueueItem(null);
      component.picklistQueueItems = [item];
      component.selectedItems = new Set();

      component.onSelectItemCheckBox(boxState, checkedItem);

      expect(component.selectedItems.has(checkedItem)).toBeTruthy();
      expect(selectionChangedSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Selection', () => {
    it('should return false if there are no items', () => {
      component.selectedItems = new Set();
      component.picklistQueueItems = [];

      expect(component.isEveryItemSelected(component.picklistQueueItems)).toBeFalsy();
    });

    it('should return false if any item is not in selected', () => {
      const item1 = new PicklistQueueItem(null);
      const item2 = new PicklistQueueItem(null);
      component.picklistQueueItems = [item1, item2];
      component.selectedItems = new Set([item1]);

      expect(component.isEveryItemSelected(component.picklistQueueItems)).toBeFalsy();
    });

    it('should return true if every item is in selected', () => {
      const item1 = new PicklistQueueItem(null);
      const item2 = new PicklistQueueItem(null);
      component.picklistQueueItems = [item1, item2];
      component.selectedItems = new Set([item1, item2]);

      expect(component.isEveryItemSelected(component.picklistQueueItems)).toBeTruthy();
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

    it('should return active selection device rows', () => {

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
      const expectedText = 'RELEASE';
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
      expect(component.getReleaseButtonProperties(component.picklistQueueItems[0]).text).toEqual(expectedText);
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
  });

  describe('Display Text Labels', () => {
    it('should display release button on new status', () => {
      const expectedText = 'RELEASE';
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

      expect(component.getReleaseButtonProperties(component.picklistQueueItems[0]).text).toEqual(expectedText);
    });

    it('should display print button on sent status', () => {
      const expectedText = 'PRINT';
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
      ];
      component.picklistQueueItems[0].IsPrintable = true;
      component.picklistQueueItems[0].Status = 2;

      expect(component.getPrintButtonProperties(component.picklistQueueItems[0]).text).toEqual(expectedText);
    });

    it('it should display print button on boxsplitreceived status', () => {
      const expectedText = 'PRINT';
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
      ];
      component.picklistQueueItems[0].IsPrintable = true;
      component.picklistQueueItems[0].Status = 2;

      expect(component.getPrintButtonProperties(component.picklistQueueItems[0]).text).toEqual(expectedText);
    });

    it('should display reprint button on printed status', () => {
      const expectedText = 'REPRINT';
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
      ];
      component.picklistQueueItems[0].IsPrintable = true;
      component.picklistQueueItems[0].Status = 4;

      let validText = '';
      translateService.get('REPRINT').subscribe((res: string) => {
        validText = res;
      });

      expect(component.getPrintButtonProperties(component.picklistQueueItems[0]).text).toEqual(expectedText);
    });

    it('should display bag/bags data labels on autopackager output device', () => {
      const expectedLabel1 = 'BAG';
      const expectedLabel2 = 'BAGS';

      const autoPackagerItem1 = new PicklistQueueItem(null);
      const autoPackagerItem2 = new PicklistQueueItem(null);
      autoPackagerItem1.OutputDeviceId = OutputDeviceTypeId.AutoPackagerCPM;
      autoPackagerItem2.OutputDeviceId = OutputDeviceTypeId.AutoPackagerCPM;
      autoPackagerItem1.BoxCount = 1;
      autoPackagerItem2.BoxCount = 2;


      const label1 = component.getOrderSplitDataLabel(autoPackagerItem1);
      const label2 = component.getOrderSplitDataLabel(autoPackagerItem2);

      expect(label1).toBe(expectedLabel1);
      expect(label2).toBe(expectedLabel2);
    });

    it('should display bin/bins data labels on cart/quickpick output devices', () => {
      const expectedLabel1 = 'BIN';
      const expectedLabel2 = 'BINS';

      const cartItem = new PicklistQueueItem(null);
      const quickPickItem = new PicklistQueueItem(null);
      cartItem.OutputDeviceId = OutputDeviceTypeId.CartModuleCPM;
      quickPickItem.OutputDeviceId = OutputDeviceTypeId.QuickPickCPM;
      cartItem.BoxCount = 1;
      quickPickItem.BoxCount = 2;


      const label1 = component.getOrderSplitDataLabel(cartItem);
      const label2 = component.getOrderSplitDataLabel(quickPickItem);

      expect(label1).toBe(expectedLabel1);
      expect(label2).toBe(expectedLabel2);
    });

    it('should display patient/patients priority labels on patient destination type', () => {
      const expectedLabel1 = 'PATIENT';
      const expectedLabel2 = 'PATIENTS';
      const patientItem1 = new PicklistQueueItem(null);
      const patientItem2 = new PicklistQueueItem(null);
      patientItem1.PatientCount = 1;
      patientItem2.PatientCount = 2;
      patientItem1.DestinationType = DestinationTypes.Patient;
      patientItem2.DestinationType = DestinationTypes.Patient;


      const label1 = component.getItemPriorityLabel(patientItem1);
      const label2 = component.getItemPriorityLabel(patientItem2);

      expect(label1).toBe(expectedLabel1);
      expect(label2).toBe(expectedLabel2);
    });

    it('should display item/items priority labels on omni/area destination types', () => {
      const expectedLabel1 = 'ITEM';
      const expectedLabel2 = 'ITEMS';
      const omniItem = new PicklistQueueItem(null);
      const areaItem = new PicklistQueueItem(null);
      omniItem.ItemCount = 1;
      areaItem.ItemCount = 2;
      omniItem.DestinationType = DestinationTypes.Omni;
      areaItem.DestinationType = DestinationTypes.Area;


      const label1 = component.getItemPriorityLabel(omniItem);
      const label2 = component.getItemPriorityLabel(areaItem);

      expect(label1).toBe(expectedLabel1);
      expect(label2).toBe(expectedLabel2);
    });

    it('should display patient count for patient destination', () => {
      const item = new PicklistQueueItem(null);
      item.PatientCount = 1;
      item.ItemCount = 2;
      item.DestinationType = DestinationTypes.Patient;

      expect(component.getItemCountForDisplay(item)).toBe(1);
    });

    it('should display item count for item destination', () => {
      const item = new PicklistQueueItem(null);
      item.PatientCount = 1;
      item.ItemCount = 2;
      item.DestinationType = DestinationTypes.Omni;

      expect(component.getItemCountForDisplay(item)).toBe(2);
    });

    it('should display order split data', () => {
      const item = new PicklistQueueItem(null);
      item.FilledBoxCount = 1;
      item.BoxCount = 5;

      const label = component.getOrderSplitDataString(item);
      expect(label.length).toBeGreaterThan(0);
    });

    it('should display order date', () => {
      const orderDate = new Date();
      const item = new PicklistQueueItem(null);
      item.OrderDate = orderDate;

      expect(component.getOrderDate(item)).toBeDefined();
    });
  });

  describe('Queue data updates', () => {
    it('should remove picklist queue item by order key', () => {
      const mockGuid = Guid.create();
      const DeviceLocationId = 1;
      const OrderGroupDestinationId = '1';
      const OrderId = '1';
      const RobotPickGroupId = mockGuid;
      const xr2OrderGroupKey = {
        DeviceLocationId,
        OrderGroupDestinationId,
        OrderId,
        RobotPickGroupId,
      } as IXr2OrderGroupKey;
      const queueItem = new PicklistQueueItem(null);
      queueItem.DeviceLocationId = 1;
      queueItem.OrderGroupDestinationId = '1';
      queueItem.OrderId = '1';
      queueItem.RobotPickGroupId = mockGuid;

      component.picklistQueueItems = [queueItem];

      component.removePicklistQueueItemByOrderGroupKey(xr2OrderGroupKey);

      expect(component.picklistQueueItems.length).toBe(0);
    });
    it('should clear list on null input for refresh', () => {
      component.picklistQueueItems = [];
      for (let i = 0; i < 4; i++) {
        const mockGuid = Guid.create();
        const queueItem = new PicklistQueueItem(null);
        queueItem.DeviceLocationId = i;
        queueItem.OrderGroupDestinationId = i.toString();
        queueItem.OrderId = i.toString();
        queueItem.DeviceId = i;
        queueItem.PriorityCode = i.toString();
        queueItem.RobotPickGroupId = mockGuid;
        queueItem.Status = 1;
        component.picklistQueueItems.push(queueItem);
      }

      component.refreshDataOnScreen(null);

      expect(component.picklistQueueItems.length).toBe(0);
    });
    it('should refresh data on screen and remove/update items', () => {
      const updatedList: PicklistQueueItem[] = [];
      component.picklistQueueItems = [];
      for (let i = 0; i < 4; i++) {
        const mockGuid = Guid.create();
        const queueItem = new PicklistQueueItem(null);
        queueItem.DeviceLocationId = i;
        queueItem.OrderGroupDestinationId = i.toString();
        queueItem.OrderId = i.toString();
        queueItem.DeviceId = i;
        queueItem.PriorityCode = i.toString();
        queueItem.RobotPickGroupId = mockGuid;
        queueItem.Status = 1;
        component.picklistQueueItems.push(queueItem);
        updatedList.push(new PicklistQueueItem(queueItem));
      }

      updatedList.splice(0, 1);
      updatedList[0].Status = 2;
      updatedList[1].Status = 3;
      updatedList[2].Status = 4;

      component.refreshDataOnScreen(updatedList);

      expect(component.picklistQueueItems.length).toBe(updatedList.length);

      for (let i = 0; i < component.picklistQueueItems.length - 1; i++) {
        expect(component.picklistQueueItems[i].Status).toBe(updatedList[i].Status);
      }
    });
    it('should add picklist queue item to queue', () => {
      component.picklistQueueItems = [];
      for (let i = 0; i < 4; i++) {
        const mockGuid = Guid.create();
        const queueItem = new PicklistQueueItem(null);
        queueItem.DeviceLocationId = i;
        queueItem.OrderGroupDestinationId = i.toString();
        queueItem.OrderId = i.toString();
        queueItem.DeviceId = i;
        queueItem.PriorityCode = i.toString();
        queueItem.RobotPickGroupId = mockGuid;
        queueItem.Status = 1;
        component.picklistQueueItems.push(queueItem);
      }

      const previousLength = component.picklistQueueItems.length;

      const addedItem = new PicklistQueueItem(null);
      addedItem.DeviceLocationId = 4;
      addedItem.OrderGroupDestinationId = '4';
      addedItem.OrderId = '4';
      addedItem.DeviceId = 4;
      addedItem.PriorityCode = '4';
      addedItem.RobotPickGroupId = Guid.create();


      component.addOrUpdatePicklistQueueItem(addedItem);

      expect(component.picklistQueueItems.length).toBe(previousLength + 1);
    });
    it('should update picklist queue item', () => {
      component.picklistQueueItems = [];
      for (let i = 0; i < 4; i++) {
        const mockGuid = Guid.create();
        const queueItem = new PicklistQueueItem(null);
        queueItem.DeviceLocationId = i;
        queueItem.OrderGroupDestinationId = i.toString();
        queueItem.OrderId = i.toString();
        queueItem.DeviceId = i;
        queueItem.PriorityCode = i.toString();
        queueItem.RobotPickGroupId = mockGuid;
        queueItem.Status = 1;
        component.picklistQueueItems.push(queueItem);
      }

      const previousLength = component.picklistQueueItems.length;
      const lastIndex = component.picklistQueueItems.length - 1;
      const lastItem = component.picklistQueueItems[lastIndex];
      const updatedItem = new PicklistQueueItem(lastItem);
      updatedItem.Status = 4;


      component.addOrUpdatePicklistQueueItem(updatedItem);

      expect(component.picklistQueueItems.length).toBe(previousLength);
      expect(component.picklistQueueItems[lastIndex].Status).toBe(updatedItem.Status);
    });
  });
});
