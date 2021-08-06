import { HttpClientModule } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { GridModule, ButtonActionModule, PopupDialogModule, SvgIconModule } from '@omnicell/webcorecomponents';
import { forEach } from 'lodash';
import { of } from 'rxjs';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { MockSearchBox } from '../../core/testing/mock-search-box.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { SortDirection } from '../../shared/constants/sort-direction';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Xr2Stocklist } from '../../shared/model/xr2-stocklist';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';

import { Xr2InvoicesQueueComponent } from './xr2-invoices-queue.component';

describe('Xr2InvoicesQueueComponent', () => {
  let component: Xr2InvoicesQueueComponent;
  let fixture: ComponentFixture<Xr2InvoicesQueueComponent>;
  let translateService: Partial<TranslateService>;

  beforeEach(async(() => {
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService)),
      getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
    };

    TestBed.configureTestingModule({
      declarations: [ Xr2InvoicesQueueComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox,
        MockColHeaderSortable, MockAppHeaderContainer, MockCpClickableIconComponent, MockCpDataLabelComponent ],
      imports: [GridModule, ButtonActionModule, PopupDialogModule, HttpClientModule, SvgIconModule],
      providers: [
        { provide: TranslateService, useValue: translateService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2InvoicesQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Button Click Actions', () => {
    it('should send details event on details click', () => {
      const detailsSpy = spyOn(component.detailsClickEvent, 'emit');

      component.onDetailsClick(new Xr2Stocklist(null));

      expect(detailsSpy).toHaveBeenCalledTimes(1);
    });

    it('should send dialog event on delete click', () => {
      const deleteSpy = spyOn(component.displayYesNoDialogEvent, 'emit');

      component.onDeleteClick(new Xr2Stocklist(null));

      expect(deleteSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Device Selection', () => {
    it('should filter on new device selection', () => {
      const mockDeviceInfo0 = { DeviceId: 0} as SelectableDeviceInfo;
      const mockDeviceInfo1 = { DeviceId: 1} as SelectableDeviceInfo;
      const mockDeviceInfo2 = { DeviceId: 2} as SelectableDeviceInfo;

      component.unfilteredInvoiceItems = [
        { DeviceId: 1 } as Xr2Stocklist,
        { DeviceId: 1 } as Xr2Stocklist,
        { DeviceId: 2 } as Xr2Stocklist,
      ]

      component.changeDeviceSelection(mockDeviceInfo1);
      const filteredItems1 = [...component.filteredInvoiceItems]
      component.changeDeviceSelection(mockDeviceInfo2);
      const filteredItems2 = [...component.filteredInvoiceItems]
      component.changeDeviceSelection(mockDeviceInfo0);
      const allDevicesItems = [...component.filteredInvoiceItems]

      expect(allDevicesItems.length).toBe(component.unfilteredInvoiceItems.length)

      forEach(filteredItems1, (item) => {
        expect(item.DeviceId).toBe(mockDeviceInfo1.DeviceId)
      });

      forEach(filteredItems2, (item) => {
        expect(item.DeviceId).toBe(mockDeviceInfo2.DeviceId)
      });
    });
  });

  describe('Queue Filters', () => {
    it('should filter the queue by device and search text', () => {
      const mockDeviceInfo = { DeviceId: 1} as SelectableDeviceInfo;

      component.unfilteredInvoiceItems = [
        { DeviceId: 1, ItemFormattedGenericName: "a"  } as Xr2Stocklist,
        { DeviceId: 1, ItemFormattedGenericName: "b" } as Xr2Stocklist,
        { DeviceId: 2, ItemFormattedGenericName: "c" } as Xr2Stocklist,
      ]
      component.selectedDeviceInformation = mockDeviceInfo;

      // Queue filters on seach text filter setter
      component.searchTextFilter = "a";
      const filteredItems1 = [...component.filteredInvoiceItems];
      component.searchTextFilter = "";
      const filteredItems2 = [...component.filteredInvoiceItems];
      component.searchTextFilter = "c";
      const filteredItems3 = [...component.filteredInvoiceItems];

      forEach(filteredItems1, (item) => {
        expect(item.DeviceId).toBe(mockDeviceInfo.DeviceId)
        expect(item.ItemFormattedGenericName).toBe('a')
      });

      forEach(filteredItems2, (item) => {
        expect(item.DeviceId).toBe(mockDeviceInfo.DeviceId)
      });

      expect(filteredItems1.length).toBe(1)
      expect(filteredItems2.length).toBe(2);
      expect(filteredItems3.length).toBe(0);
    });
  });

  describe('Queue Actions', () => {
    it('should delete an invoice', () => {
      const mockInvoiceItem = { DeviceId: 1, ItemId: '1' } as Xr2Stocklist;
      component.unfilteredInvoiceItems = [
        { DeviceId: 1, ItemId: '1' } as Xr2Stocklist,
        { DeviceId: 2, ItemId: '2' } as Xr2Stocklist,
        { DeviceId: 3, ItemId: '3' } as Xr2Stocklist,
      ];

      component.deleteInvoice(mockInvoiceItem);

      component.unfilteredInvoiceItems.forEach((item) => {
        expect(item.ItemId).not.toEqual(mockInvoiceItem.ItemId);
        expect(item.DeviceId).not.toEqual(mockInvoiceItem.DeviceId);
      })
    });
  });

  describe('Sorting', () => {
    it('should set sort order on column selected event', () => {
      const mockSortEvent = {} as IColHeaderSortChanged;
      const expectedSortOrder = SortDirection.ascending;
      const expectedColumnName = 'column';
      mockSortEvent.SortDirection = expectedSortOrder;
      mockSortEvent.ColumnPropertyName = expectedColumnName;

      component.columnSelected(mockSortEvent);

      expect(component.currentSortPropertyName).toBe(expectedColumnName);
      expect(component.columnSortDirection).toBe(expectedSortOrder);
    });
  });
});
