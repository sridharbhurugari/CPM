import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistsQueueComponent } from './picklists-queue.component';
import { GridModule, ButtonActionModule,  SingleselectDropdownModule, SingleselectRowItem, PopupWindowModule, PopupDialogService,
  PopupDialogModule,
  FooterModule,
  LayoutModule} from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { Subject, Observable, of } from 'rxjs';
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
import { CoreModule } from '../../core/core.module';
import { PicklistQueueItem } from '../model/picklist-queue-item';
import { WindowService } from '../../shared/services/window-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { EventConnectionService } from '../../shared/services/event-connection.service';
import { PicklistsQueueService } from '../../api-xr2/services/picklists-queue.service';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';

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
  let eventConnectionService: Partial<EventConnectionService>;
  let picklistsQueueService: Partial<PicklistsQueueService>;
  let translateService: Partial<TranslateService>;
  const event: IColHeaderSortChanged = {ColumnPropertyName: 'Destination', SortDirection: 'asc'};

  beforeEach(async(() => {
    picklistsQueueEventConnectionService = {
      addOrUpdatePicklistQueueItemSubject: new Subject(),
      removePicklistQueueItemSubject: new Subject()
    };
    picklistsQueueService = {
      skip: jasmine.createSpy('skip').and.returnValue(of(picklistsQueueService))
    };
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService))
    };

    TestBed.configureTestingModule({
      declarations: [ PicklistsQueueComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox,
        MockColHeaderSortable, MockAppHeaderContainer ],
      imports: [GridModule, ButtonActionModule,  SingleselectDropdownModule, PopupWindowModule, PopupDialogModule, HttpClientModule,
        FooterModule, LayoutModule, CoreModule],
      providers: [
        { provide: WpfActionControllerService, useValue: jasmine.createSpyObj('WpfActionControllerService', ['ExecuteContinueAction']) },
        { provide: TranslateService, useValue: translateService },
        { provide: PopupDialogService, useValue: { showOnce: () => of([]) } },
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
    spyOn(picklistsQueueEventConnectionService.addOrUpdatePicklistQueueItemSubject, 'subscribe');
    spyOn(picklistsQueueEventConnectionService.removePicklistQueueItemSubject, 'subscribe');
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
      })
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
      picklistQueueItem.OutputDeviceId = '1';
      picklistQueueItem.AvailableOutputDeviceList = [];

      expect(component.getSelectedOutputDeviceRow(picklistQueueItem)).toBeNull();
    });

    it('should return active selection device row on status 1', () => {
      let translatedLabel = '';
      translateService.get('QUICKPICK').subscribe((res: string) => {
        translatedLabel = res;
      });
      const device: OutputDevice = {
        DeviceId: '1',
        Label: translatedLabel,
        IsActive: true,
        OCTokenValue: '2104'
      };
      const expectedRow = new SingleselectRowItem(translatedLabel, '1');
      const picklistQueueItem = new PicklistQueueItem(null);
      picklistQueueItem.Status = 1;
      picklistQueueItem.OutputDeviceId = '1';
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
        DeviceId: '100',
        Label: translatedLabel,
        IsActive: false,
        OCTokenValue: '2104'
      };
      const expectedRow = new SingleselectRowItem(translatedLabel, '100');
      const picklistQueueItem = new PicklistQueueItem(null);
      picklistQueueItem.Status = 2;
      picklistQueueItem.OutputDeviceId = '100';
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
        DeviceId: '100',
        Label: translatedLabel,
        IsActive: true,
        OCTokenValue: '2104'
      };
      const expectedRow = new SingleselectRowItem(translatedLabel, '100');
      const picklistQueueItem = new PicklistQueueItem(null);
      picklistQueueItem.Status = 2;
      picklistQueueItem.OutputDeviceId = '1';
      picklistQueueItem.AvailableOutputDeviceList = [device];

      expect(component.getActiveOutputDeviceList(picklistQueueItem)).toEqual([expectedRow]);
    });
  });

  describe('Button State Diplay Texts', () => {
    it('Release button should display on new status', () => {
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
      ];
      component.picklistQueueItems[0].IsPrintable = true;
      component.picklistQueueItems[0].Status = 1;

      let validText = '';
      translateService.get('RELEASE').subscribe((res: string) => {
        validText = res;
      });

      expect(component.getReleaseButtonProperties(component.picklistQueueItems[0]).text).toEqual(validText);
    });
    it('Print button should display on sent status', () => {
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
    it('Print button should display on boxsplitreceived status', () => {
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
    it('Reprint button should display on printed status', () => {
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
    it('Release should be enabled on new status', () => {
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
      ];
      component.picklistQueueItems[0].IsPrintable = false;
      component.picklistQueueItems[0].Status = 1;

      expect(component.getReleaseButtonProperties(component.picklistQueueItems[0]).disabled).toBeFalsy();
    });
    it('Print should disable on non-printable devices', () => {
      component.picklistQueueItems = [
        new PicklistQueueItem(null),
      ];
      component.picklistQueueItems[0].IsPrintable = false;
      component.picklistQueueItems[0].Status = 3;


      expect(component.getPrintButtonProperties(component.picklistQueueItems[0]).disabled).toBeTruthy();
    });
    it('Print should enable on printable devices with valid state', () => {
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
});
