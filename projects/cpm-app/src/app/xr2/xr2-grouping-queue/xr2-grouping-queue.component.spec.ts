import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogService,
  PopupDialogModule,
  FooterModule,
  LayoutModule, CheckboxModule, SingleselectRowItem} from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { Observable, of} from 'rxjs';
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
import { Xr2GroupingQueueComponent } from './xr2-grouping-queue.component';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { PicklistQueueGrouped } from '../model/picklist-queue-grouped';
import { DestinationTypes } from '../../shared/constants/destination-types';
import { IPicklistQueueGrouped } from '../../api-xr2/data-contracts/i-picklist-queue-grouped';

@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;
}

describe('Xr2GroupingQueueComponent', () => {
  let component: Xr2GroupingQueueComponent;
  let fixture: ComponentFixture<Xr2GroupingQueueComponent>;
  let translateService: Partial<TranslateService>;
  let popupDialogService: Partial<PopupDialogService>;
  let router: Partial<Router>;
  const event: IColHeaderSortChanged = {ColumnPropertyName: 'Destination', SortDirection: 'asc'};

  beforeEach(async(() => {
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService))
    };

    popupDialogService = {
      showOnce: jasmine.createSpy('showOnce')
    };

    router = {
      navigate: jasmine.createSpy('navigate')
    };


    TestBed.configureTestingModule({
      declarations: [ Xr2GroupingQueueComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox,
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
        { provide: Location, useValue: { go: () => {}} },
        { provide: Router, useValue: router },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2GroupingQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Action Sort by Column', () => {
    it('column selected ', () => {
      component.sort(component.picklistQueueGrouped, 'desc');

      expect(component.columnSelected(event));
    });
  });

  describe('Button Click Actions', () => {

    it('should send release event on release click', () => {
      const releaseSpy = spyOn(component.releaseEvent, 'emit');

      component.onReleaseClick(new PicklistQueueGrouped(null));

      expect(releaseSpy).toHaveBeenCalledTimes(1);
    });

    it('should navigate to details page on details click', () => {
      const picklistQueueGrouped = new PicklistQueueGrouped(null);
      picklistQueueGrouped.OutputDeviceId = '2104';
      picklistQueueGrouped.PickPriorityIdentity = 1;
      picklistQueueGrouped.AvailableOutputDeviceList = [];

      component.onDetailsClick(picklistQueueGrouped);

      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Output Device Selection', () => {
    it('should return null given no devices', () => {

      const picklistQueueGrouped = new PicklistQueueGrouped(null);
      picklistQueueGrouped.OutputDeviceId = '2104';
      picklistQueueGrouped.AvailableOutputDeviceList = [];

      expect(component.getSelectedOutputDeviceRow(picklistQueueGrouped)).toBeNull();
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
      const picklistQueueGrouped = new PicklistQueueGrouped(null);
      picklistQueueGrouped.OutputDeviceId = '2102';
      picklistQueueGrouped.AvailableOutputDeviceList = [device];

      expect(component.getSelectedOutputDeviceRow(picklistQueueGrouped).text).toEqual(expectedRow.text);
      expect(component.getSelectedOutputDeviceRow(picklistQueueGrouped).value).toEqual(expectedRow.value);
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
      const picklistQueueGrouped = new PicklistQueueGrouped(null);
      picklistQueueGrouped.OutputDeviceId = '2102';
      picklistQueueGrouped.AvailableOutputDeviceList = [device];

      expect(component.getActiveOutputDeviceList(picklistQueueGrouped)).toEqual([expectedRow]);
    });
  });

  describe('Display Text Labels', () => {
    it('should display release button on new status', () => {
      const expectedText = 'RELEASE';
      const grouping = new PicklistQueueGrouped(null);
      grouping.OutputDeviceId = '1';
      grouping.NewCount = 1;

      const outputDevice = new OutputDevice();
      outputDevice.DeviceId = '1';

      grouping.AvailableOutputDeviceList = [
        outputDevice
      ];
      component.picklistQueueGrouped = [
        grouping
      ];
      expect(component.getReleaseButtonProperties(component.picklistQueueGrouped[0]).text).toEqual(expectedText);
    });

    it('should display patient/patients priority labels on patient destination type', () => {
      const expectedLabel1 = 'PATIENT';
      const expectedLabel2 = 'PATIENTS';
      const patientItem1 = new PicklistQueueGrouped(null);
      const patientItem2 = new PicklistQueueGrouped(null);
      patientItem1.NewCount = 1;
      patientItem2.NewCount = 2;
      patientItem1.DestinationType = DestinationTypes.Patient;
      patientItem2.DestinationType = DestinationTypes.Patient;


      const label1 = component.getCountLabel(patientItem1.NewCount, patientItem1.DestinationType);
      const label2 = component.getCountLabel(patientItem2.NewCount, patientItem2.DestinationType);

      expect(label1).toBe(expectedLabel1);
      expect(label2).toBe(expectedLabel2);
    });

    it('should display cabinet/cabinetss priority labels on patient destination type', () => {
      const expectedLabel1 = 'CABINET';
      const expectedLabel2 = 'CABINETS';
      const patientItem1 = new PicklistQueueGrouped(null);
      const patientItem2 = new PicklistQueueGrouped(null);
      patientItem1.NewCount = 1;
      patientItem2.NewCount = 2;
      patientItem1.DestinationType = DestinationTypes.Omni;
      patientItem2.DestinationType = DestinationTypes.Omni;


      const label1 = component.getCountLabel(patientItem1.NewCount, patientItem1.DestinationType);
      const label2 = component.getCountLabel(patientItem2.NewCount, patientItem2.DestinationType);

      expect(label1).toBe(expectedLabel1);
      expect(label2).toBe(expectedLabel2);
    });

    it('should display Area/Areass priority labels on patient destination type', () => {
      const expectedLabel1 = 'AREA';
      const expectedLabel2 = 'AREAS';
      const patientItem1 = new PicklistQueueGrouped(null);
      const patientItem2 = new PicklistQueueGrouped(null);
      patientItem1.NewCount = 1;
      patientItem2.NewCount = 2;
      patientItem1.DestinationType = DestinationTypes.Area;
      patientItem2.DestinationType = DestinationTypes.Area;


      const label1 = component.getCountLabel(patientItem1.NewCount, patientItem1.DestinationType);
      const label2 = component.getCountLabel(patientItem2.NewCount, patientItem2.DestinationType);

      expect(label1).toBe(expectedLabel1);
      expect(label2).toBe(expectedLabel2);
    });

    it('should display Area/Areass for area count label', () => {
      const expectedLabel1 = 'AREA';
      const expectedLabel2 = 'AREAS';
      const label1 = component.getAreaCountLabel(1);
      const label2 = component.getAreaCountLabel(2);

      expect(label1).toBe(expectedLabel1);
      expect(label2).toBe(expectedLabel2);
    });
  });

  describe('Action Button Disable States', () => {
    it('should set release to enabled on new status', () => {
      const grouping = new PicklistQueueGrouped(null);
      grouping.OutputDeviceId = '1';
      grouping.NewCount = 1;
      grouping.Saving = false;

      const outputDevice = new OutputDevice();
      outputDevice.DeviceId = '1';
      outputDevice.IsActive = true;

      grouping.AvailableOutputDeviceList = [
        outputDevice
      ];
      component.picklistQueueGrouped = [
        grouping
      ];

      expect(component.getReleaseButtonProperties(component.picklistQueueGrouped[0]).disabled).toBeFalsy();
    });
  });

  describe('Queue Data Updates', () => {
    it('should update if existss in picklistqueuegropued', () => {

      let outputDevice: OutputDevice = {DeviceId: '1', IsActive: true, Label: 'XR2'};
      const availableOutputDeviceList = [ outputDevice ] as Array<OutputDevice>;
      const picklistQueueGrouped = new PicklistQueueGrouped(null);
      picklistQueueGrouped.PriorityCode = 'Patient';
      picklistQueueGrouped.DeviceId = 1;
      picklistQueueGrouped.NewCount = 0;
      picklistQueueGrouped.AvailableOutputDeviceList = availableOutputDeviceList;

      const pickListQueueGroupedList = [picklistQueueGrouped] as PicklistQueueGrouped[];
      component.picklistQueueGrouped = pickListQueueGroupedList;

      const picklistQueueGroupedUpdate = new PicklistQueueGrouped(null);
      picklistQueueGroupedUpdate.PriorityCode = 'Patient';
      picklistQueueGroupedUpdate.DeviceId = 1;
      picklistQueueGroupedUpdate.NewCount = 1;
      component.updatePickListQueueGroupedGrouping(picklistQueueGroupedUpdate);

      expect(component.picklistQueueGrouped[0].NewCount).toBe(1);

    });

    it('should add on update picklistqueuegropued', () => {
      const pickListQueueGroupedList = [] as PicklistQueueGrouped[];
      component.picklistQueueGrouped = pickListQueueGroupedList;

      const picklistQueueGroupedUpdate = new PicklistQueueGrouped(null);
      picklistQueueGroupedUpdate.PriorityCode = 'Patient';
      picklistQueueGroupedUpdate.DeviceId = 1;
      picklistQueueGroupedUpdate.NewCount = 1;
      component.updatePickListQueueGroupedGrouping(picklistQueueGroupedUpdate);

      expect(component.picklistQueueGrouped.length).toBe(1);
      expect(component.picklistQueueGrouped[0].NewCount).toBe(1);
    });

    it('should remove group from picklistqueuegropued', () => {
      let outputDevice: OutputDevice = {DeviceId: '1', IsActive: true, Label: 'XR2'};
      const availableOutputDeviceList = [ outputDevice ] as Array<OutputDevice>;
      const picklistQueueGrouped = new PicklistQueueGrouped(null);
      picklistQueueGrouped.PriorityCode = 'Patient';
      picklistQueueGrouped.DeviceId = 1;
      picklistQueueGrouped.NewCount = 0;
      picklistQueueGrouped.AvailableOutputDeviceList = availableOutputDeviceList;

      const pickListQueueGroupedList = [picklistQueueGrouped] as PicklistQueueGrouped[];
      component.picklistQueueGrouped = pickListQueueGroupedList;

      component.removePicklistQueueGroup('Patient', 1);

      expect(component.picklistQueueGrouped.length).toBe(0);

    });

    it('should add update and removed on refreshdataonscreen', () => {
      let outputDevice: OutputDevice = {DeviceId: '1', IsActive: true, Label: 'XR2'};
      const availableOutputDeviceList = [ outputDevice ] as Array<OutputDevice>;

      // Create items for existing list
      const picklistQueueGroupedToBeRemoved = new PicklistQueueGrouped(null);
      picklistQueueGroupedToBeRemoved.PriorityCode = 'Patient';
      picklistQueueGroupedToBeRemoved.DeviceId = 1;
      picklistQueueGroupedToBeRemoved.NewCount = 0;
      picklistQueueGroupedToBeRemoved.AvailableOutputDeviceList = availableOutputDeviceList;

      const picklistQueueGroupedToBeUpdated = new PicklistQueueGrouped(null);
      picklistQueueGroupedToBeUpdated.PriorityCode = 'Cabinet';
      picklistQueueGroupedToBeUpdated.DeviceId = 1;
      picklistQueueGroupedToBeUpdated.NewCount = 0;
      picklistQueueGroupedToBeUpdated.AvailableOutputDeviceList = availableOutputDeviceList;

      const pickListQueueGroupedList = [picklistQueueGroupedToBeRemoved, picklistQueueGroupedToBeUpdated] as PicklistQueueGrouped[];
      component.picklistQueueGrouped = pickListQueueGroupedList;

      // Create Refresh list wish will have an item to add and update.
      const picklistQueueGroupedToBeAdded = new PicklistQueueGrouped(null);
      picklistQueueGroupedToBeAdded.PriorityCode = 'Area';
      picklistQueueGroupedToBeAdded.DeviceId = 1;
      picklistQueueGroupedToBeAdded.NewCount = 0;
      picklistQueueGroupedToBeAdded.AvailableOutputDeviceList = availableOutputDeviceList;

      const picklistQueueGroupedUpdate = new PicklistQueueGrouped(null);
      picklistQueueGroupedUpdate.PriorityCode = 'Cabinet';
      picklistQueueGroupedUpdate.DeviceId = 1;
      picklistQueueGroupedUpdate.NewCount = 1;
      picklistQueueGroupedUpdate.AvailableOutputDeviceList = availableOutputDeviceList;
      const pickListQueueGroupedListUpdate = [picklistQueueGroupedToBeAdded, picklistQueueGroupedUpdate] as IPicklistQueueGrouped[];

      component.refreshDataOnScreen(pickListQueueGroupedListUpdate);

      expect(component.picklistQueueGrouped.length).toBe(2);
      expect(component.picklistQueueGrouped[0].PriorityCode).toBe('Cabinet');
      expect(component.picklistQueueGrouped[0].NewCount).toBe(1);
      expect(component.picklistQueueGrouped[1].PriorityCode).toBe('Area');

    });

    it('should clear grid on empty data for refreshdataonscreen', () => {
      let outputDevice: OutputDevice = {DeviceId: '1', IsActive: true, Label: 'XR2'};
      const availableOutputDeviceList = [ outputDevice ] as Array<OutputDevice>;
      const picklistQueueGroupedToBeRemoved = new PicklistQueueGrouped(null);
      picklistQueueGroupedToBeRemoved.PriorityCode = 'Patient';
      picklistQueueGroupedToBeRemoved.DeviceId = 1;
      picklistQueueGroupedToBeRemoved.NewCount = 0;
      picklistQueueGroupedToBeRemoved.AvailableOutputDeviceList = availableOutputDeviceList;

      const pickListQueueGroupedList = [picklistQueueGroupedToBeRemoved] as PicklistQueueGrouped[];
      component.picklistQueueGrouped = pickListQueueGroupedList;

      component.refreshDataOnScreen(null);

      expect(component.picklistQueueGrouped.length).toBe(0);

    });
  });
});
