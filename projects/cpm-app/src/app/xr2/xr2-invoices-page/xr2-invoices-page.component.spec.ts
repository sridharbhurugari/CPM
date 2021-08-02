import { HttpClientModule } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ButtonActionModule, FooterModule, GridModule, PopupDialogComponent, PopupDialogModule, PopupDialogService, SingleselectDropdownModule, SvgIconModule } from '@omnicell/webcorecomponents';
import { of, Subject } from 'rxjs';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';
import { LogService } from '../../api-core/services/log-service';
import { InvoicesService } from '../../api-xr2/services/invoices.service';
import { Xr2RestockTrayService } from '../../api-xr2/services/xr2-restock-tray.service';
import { MockSearchBox } from '../../core/testing/mock-search-box.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { Xr2Stocklist } from '../../shared/model/xr2-stocklist';
import { CpBarcodeScanService } from '../../shared/services/cp-barcode-scan.service';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { WindowService } from '../../shared/services/window-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockXr2DeviceSelectionHeaderComponent } from '../../shared/testing/mock-xr2-device-selection-header-component.spec';
import { Xr2InvoicesQueueComponent } from '../xr2-invoices-queue/xr2-invoices-queue.component';
import { Xr2InvoicesPageComponent } from './xr2-invoices-page.component';

describe('Xr2InvoicesPageComponent', () => {
  let component: Xr2InvoicesPageComponent;
  let fixture: ComponentFixture<Xr2InvoicesPageComponent>
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let invoicesService: Partial<InvoicesService>;
  let logService: Partial<LogService>;
  let dialogService: Partial<PopupDialogService>;
  let translateService: Partial<TranslateService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let barcodeScanService: Partial<CpBarcodeScanService>;
  let barcodeDataService: Partial<BarcodeDataService>;
  let xr2RestockTrayService: Partial<Xr2RestockTrayService>;
  let popupDialogComponent: Partial<PopupDialogComponent>;
  
  beforeEach(async(() => {
    wpfActionControllerService = { ExecuteBackAction: jasmine.createSpy('ExecuteBackAction') };

    invoicesService = {
      getInvoiceItems: jasmine.createSpy('getInvoiceItems').and.returnValue(of([])),
      deleteInvoice: jasmine.createSpy('deleteInvoice').and.returnValue(of(true)),
    };

    logService = { logMessageAsync: jasmine.createSpy('logMessageAsync') };

    // dialogService = { showOnce: jasmine.createSpy('showOnce') };

    popupDialogComponent = { 
      didClickCloseButton: new EventEmitter(), 
      didClickPrimaryButton: new EventEmitter(),
      onCloseClicked: jasmine.createSpy('onCloseClicked'),
    };
    dialogService = { showOnce: jasmine.createSpy('showOnce').and.returnValue(popupDialogComponent) };

    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService)),
      getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US')),
    };

    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
    };

    TestBed.configureTestingModule({
      declarations: [ Xr2InvoicesPageComponent, Xr2InvoicesQueueComponent,  MockCpClickableIconComponent, MockSearchBox,
        MockTranslatePipe, MockColHeaderSortable, MockSearchPipe, MockCpDataLabelComponent, MockXr2DeviceSelectionHeaderComponent],
      imports: [GridModule, ButtonActionModule, PopupDialogModule, HttpClientModule, FooterModule, SingleselectDropdownModule, SvgIconModule],
      providers: [
        { provide: WpfActionControllerService, useValue: wpfActionControllerService },
        { provide: InvoicesService, useValue: invoicesService },
        { provide: LogService, useValue: logService },
        { provide: PopupDialogService, useValue: dialogService },
        { provide: TranslateService, useValue: translateService },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: CpBarcodeScanService, useValue: barcodeScanService },
        { provide: BarcodeDataService, useValue: barcodeDataService },
        { provide: Xr2RestockTrayService, useValue: xr2RestockTrayService },
        { provide: WindowService, useValue: { getHash: () => '' }},
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2InvoicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Events', () => {
    it('should call wpf controller on back click event', () => {
      component.onBackEvent();

      expect(wpfActionControllerService.ExecuteBackAction).toHaveBeenCalledTimes(1);
    });

    it('should set search text filter on search filter event', () => {
      const mockFilter = "filter";

      component.onSearchTextFilterEvent(mockFilter);

      expect(component.searchTextFilter).toBe(mockFilter);
    });

    it('should set selected device info on selection change event', () => {
      const mockDeviceInfo = { DeviceId: 1 } as SelectableDeviceInfo;

      component.onDeviceSelectionChanged(mockDeviceInfo);

      expect(component.selectedDeviceInformation).toEqual(mockDeviceInfo);
    });

    it('should not call invoice service delete on failed yes/no dialog event', () => {
      const mockInvoiceItem = new Xr2Stocklist(null);

      component.onDisplayYesNoDialogEvent(mockInvoiceItem);

      expect(invoicesService.deleteInvoice).toHaveBeenCalledTimes(0);
    });
  });
});
