import { AnimationDriver } from '@angular/animations/browser';
import { HttpClientModule } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ButtonActionModule, FooterModule, GridModule, PopupDialogComponent, PopupDialogModule, PopupDialogService, PopupWindowService, SingleselectDropdownModule, SvgIconModule } from '@omnicell/webcorecomponents';
import { Guid } from 'guid-typescript';
import { LogVerbosity } from 'oal-core';
import { of, Subject } from 'rxjs';
import { IBarcodeData } from '../../api-core/data-contracts/i-barcode-data';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
import { BarcodeDataService } from '../../api-core/services/barcode-data.service';
import { LogService } from '../../api-core/services/log-service';
import { IRestockTray } from '../../api-xr2/data-contracts/i-restock-tray';
import { ITrayType } from '../../api-xr2/data-contracts/i-tray-type';
import { InvoicesService } from '../../api-xr2/services/invoices.service';
import { Xr2RestockTrayService } from '../../api-xr2/services/xr2-restock-tray.service';
import { WpfActionPaths } from '../../core/constants/wpf-action-paths';
import { MockSearchBox } from '../../core/testing/mock-search-box.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { GridPopupComponent } from '../../shared/components/grid-popup/grid-popup.component';
import { TrayTypes } from '../../shared/constants/tray-types';
import { NonstandardJsonArray } from '../../shared/events/i-nonstandard-json-array';
import { LoggerConfiguration } from '../../shared/model/logger-configuration';
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
import { MockXr2InvoicesQueueComponent } from '../../shared/testing/mock-xr2-invoice-queue.spec';
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
  let popupWindowService: Partial<PopupWindowService>;
  let barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: 'C00001', IsTrayBarcode: true} as IBarcodeData;
  let restockTray = null;

  let newRestockTray = {
    RestockTrayId: 1,
    DeviceId: 1,
    DeviceDescription: '',
    TrayId: 'C00001',
    TrayTypeId: 0,
    IsReturn: false,
    TrayExpDate: new Date(),
    TrayDescription: '',
    RestockTrayStatus: 0,
    CreatedDateTime: new Date(),
    LastUpdatedDateTime: new Date(),
    CompletedDateTime: new Date(),
    CorrelationId: Guid.createEmpty(),
    MultiDoseEnabled: false,
    UserId: '10',
    IsStockInternal: false,
    IsInvoiceTray: false,
    InvoiceOriginScreen: false,
  } as IRestockTray;

  let trayTypeDevice1 = {TrayPrefix: 'C0', DeviceId: 1} as ITrayType
  let trayTypeDevice2 = {TrayPrefix: 'C0', DeviceId: 2} as ITrayType
  let trayTypesArray : ITrayType[] = [trayTypeDevice1, trayTypeDevice2];
  let trayTypes = { $values: trayTypesArray} as NonstandardJsonArray<ITrayType>;

  beforeEach(async(() => {

    barcodeScanService = {
      reset: jasmine.createSpy('reset'),
      BarcodeScannedSubject: new Subject(),
    };

    barcodeDataService ={
      getData: jasmine.createSpy('getData').and.returnValue(of(barcodeData))
    }

    wpfActionControllerService = {
      ExecuteBackAction: jasmine.createSpy('ExecuteBackAction'),
      ExecuteActionNameWithData: jasmine.createSpy('ExecuteActionNameWithData')
    };

    invoicesService = {
      getInvoiceItems: jasmine.createSpy('getInvoiceItems').and.returnValue(of([])),
      deleteInvoice: jasmine.createSpy('deleteInvoice').and.returnValue(of(true)),
    };

    popupDialogComponent = {
      didClickCloseButton: new EventEmitter(),
      didClickPrimaryButton: new EventEmitter(),
      didClickSecondaryButton: new EventEmitter(),
      onCloseClicked: jasmine.createSpy('onCloseClicked'),
    };

    logService = {
      logMessageAsync: jasmine.createSpy('logMessageAsync'),
      getConfiguration: jasmine.createSpy('getConfiguration').and.returnValue(of({} as LoggerConfiguration))
    };

    dialogService = { showOnce: jasmine.createSpy('showOnce').and.returnValue(popupDialogComponent) };

    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of([])),
      getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US')),
    };

    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      getWarningOkPopup: jasmine.createSpy('getWarningOkPopup').and.returnValue(of(popupDialogComponent))
    };

    popupWindowService = {
      show: jasmine.createSpy('show').
      and.returnValue({ dismiss: new Subject<boolean>() } as GridPopupComponent<any>)
    };

    TestBed.configureTestingModule({
      declarations: [ Xr2InvoicesPageComponent, MockXr2InvoicesQueueComponent,  MockCpClickableIconComponent, MockSearchBox,
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
        { provide: Xr2RestockTrayService, useValue: {} },
        { provide: WindowService, useValue: { getHash: () => '' }},
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() }},
        { provide: PopupWindowService, useValue: popupWindowService }
      ]
    })
    .compileComponents();
    xr2RestockTrayService = TestBed.get(Xr2RestockTrayService);
    xr2RestockTrayService.getTrayTypes = jasmine.createSpy('getTrayTypes').and.returnValue(of(trayTypes));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2InvoicesPageComponent);
    component = fixture.componentInstance;
    component.selectedDeviceInformation =  new SelectableDeviceInfo({DeviceId: 1, Description: '',
    DefaultOwnerName: '', DeviceTypeId: '', CurrentLeaseHolder:  Guid.create(), IsActive: true});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Events', () => {
    beforeEach(() => {
      xr2RestockTrayService.getRestockTrayById = jasmine.createSpy('getRestockTrayById').and.returnValue(of(null));
    });

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

    it('should call to get barcode data when barcode is scanned', () => {
      let barcode = 'C00001';
      barcodeScanService.BarcodeScannedSubject.next(barcode);
      expect(barcodeDataService.getData).toHaveBeenCalledWith(barcode);
    });

  });

  describe('Button Actions', () => {
    it('should show pop up on details click', () => {
      component.onDetailsClickEvent({} as IXr2Stocklist);

      expect(popupWindowService.show).toHaveBeenCalledTimes(1);
    });
  });

  describe('Scanning has no return data', () => {
    beforeEach(() => {
      xr2RestockTrayService.getRestockTrayById = jasmine.createSpy('getRestockTrayById').and.returnValue(of(null));
    });

    it('should display dialog when selected device information is not set', () => {
      const mockDeviceInfo = { DeviceId: 1 } as SelectableDeviceInfo;
      component.onDeviceSelectionChanged(null);

      let barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: 'C00001', IsTrayBarcode: true} as IBarcodeData;
      component.processScannedBarcodeData(barcodeData);

      expect(barcodeScanService.reset).toHaveBeenCalled();
      expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalledWith('DEVICE_SELECTION_TEXT', 'DEVICE_SELECTION_SCANNING_MESSAGE');
    });

    it('should display dialog when scanning a non Tray barcode', () => {
      const mockDeviceInfo = { DeviceId: 1 } as SelectableDeviceInfo;
      component.onDeviceSelectionChanged(mockDeviceInfo);

      let barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: 'asdfasdf', IsTrayBarcode: false} as IBarcodeData;
      component.processScannedBarcodeData(barcodeData);

      expect(barcodeScanService.reset).toHaveBeenCalled();
      expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalledWith('BARCODESCAN_DIALOGWARNING_TITLE', 'BARCODESCAN_DIALOGWARNING_MESSAGE');
    });

    it('should navigate to restock tray add screen upon processing barcode', () => {
      let barcodeScanned = 'C00001'

      const mockDeviceInfo = { DeviceId: 1 } as SelectableDeviceInfo;
      component.onDeviceSelectionChanged(mockDeviceInfo);

      let mockRestockTray = {DeviceId: mockDeviceInfo.DeviceId, IsReturn: false, RestockTrayStatus: 0, TrayId: barcodeScanned, IsInvoiceTray: true, InvoiceOriginScreen: true } as IRestockTray;

      let barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: barcodeScanned, IsTrayBarcode: true} as IBarcodeData;
      component.processScannedBarcodeData(barcodeData);

      expect(xr2RestockTrayService.getRestockTrayById).toHaveBeenCalledTimes(1);
      expect(wpfActionControllerService.ExecuteActionNameWithData).toHaveBeenCalledWith(WpfActionPaths.XR2AddTrayPath, mockRestockTray);
    });
  });

  describe('Scanning with Return Tray Data', () => {
    beforeEach(() => {
      const rt = { TrayId: 'C00001', IsReturn: true} as IRestockTray;
      xr2RestockTrayService.getRestockTrayById = jasmine.createSpy('getRestockTrayById').and.returnValue(of(rt));
    });

    it('should fail if returned tray data is a return tray', () => {

      let barcodeScanned = 'C00001'

      const mockDeviceInfo = { DeviceId: 1 } as SelectableDeviceInfo;
      component.onDeviceSelectionChanged(mockDeviceInfo);

      let barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: barcodeScanned, IsTrayBarcode: true} as IBarcodeData;
      component.processScannedBarcodeData(barcodeData);

      expect(xr2RestockTrayService.getRestockTrayById).toHaveBeenCalledTimes(1);
      expect(wpfActionControllerService.ExecuteActionNameWithData).toHaveBeenCalledTimes(0);
    });
  });

  describe('Scanning with Normal Restock Tray Data', () => {
    beforeEach(() => {
      xr2RestockTrayService.getRestockTrayById = jasmine.createSpy('getRestockTrayById').and.returnValue(of(newRestockTray));
    });

    it('should navigate to Edit Tray Screen when barcode is processed', () => {

      let barcodeScanned = 'C00001'

      const mockDeviceInfo = { DeviceId: 1 } as SelectableDeviceInfo;
      component.onDeviceSelectionChanged(mockDeviceInfo);

      let mockRestockTray = newRestockTray;
      mockRestockTray.IsInvoiceTray = true;
      mockRestockTray.InvoiceOriginScreen = true;

      let barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: barcodeScanned, IsTrayBarcode: true} as IBarcodeData;
      component.processScannedBarcodeData(barcodeData);

      expect(xr2RestockTrayService.getRestockTrayById).toHaveBeenCalledTimes(1);
      expect(wpfActionControllerService.ExecuteActionNameWithData).toHaveBeenCalledWith(WpfActionPaths.XR2EditTrayPath, newRestockTray);
    });

    it('should not navigate if selected device does not match', () => {

      let barcodeScanned = 'C00001'

      const mockDeviceInfo = { DeviceId: 2 } as SelectableDeviceInfo;
      component.onDeviceSelectionChanged(mockDeviceInfo);

      let barcodeData = {BarCodeFormat: 'XP', BarCodeScanned: barcodeScanned, IsTrayBarcode: true} as IBarcodeData;
      component.processScannedBarcodeData(barcodeData);

      expect(xr2RestockTrayService.getRestockTrayById).toHaveBeenCalledTimes(1);
      expect(wpfActionControllerService.ExecuteActionNameWithData).toHaveBeenCalledTimes(0);
    });
  });
});
