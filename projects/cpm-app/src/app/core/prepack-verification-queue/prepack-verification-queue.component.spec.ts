import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { of, Subject } from "rxjs";
import { MockTranslatePipe } from "../testing/mock-translate-pipe.spec";
import { MockSearchBox } from "../testing/mock-search-box.spec";
import { MockSearchPipe } from "../testing/mock-search-pipe.spec";
import { MockAppHeaderContainer } from "../testing/mock-app-header.spec";
import { TranslateService } from "@ngx-translate/core";
import { PrepackVerificationService } from "../../api-core/services/prepack-verification.service";
import { MockCpClickableIconComponent } from "../../shared/testing/mock-cp-clickable-icon.spec";
import { GridModule } from "@omnicell/webcorecomponents";
import { Router } from "@angular/router";
import { WpfInteropService } from "../../shared/services/wpf-interop.service";
import { WindowService } from "../../shared/services/window-service";
import { IColHeaderSortChanged } from "../../shared/events/i-col-header-sort-changed";

import { PrepackVerificationQueueComponent } from "./prepack-verification-queue.component";
import { IPrepackVerificationQueueItem } from "../../api-core/data-contracts/i-prepack-verification-queue-item";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PrepackVerificationQueueItem } from "../model/prepack-verification-queue-item";
import { BarcodeDataService } from "../../api-core/services/barcode-data.service";
import { BarcodeScanService } from "oal-core";
import { SimpleDialogService } from "../../shared/services/dialogs/simple-dialog.service";
import { PrepackVerificationSelectionCacheService } from "../utilities/prepack-verification-selection-cache.service";
import { IBarcodeData } from "../../api-core/data-contracts/i-barcode-data";

describe("PrepackVerificationQueueComponent", () => {

  let barcodeData: IBarcodeData;
  let router;
  let event: IColHeaderSortChanged = {
    ColumnPropertyName: "OrderId",
    SortDirection: "asc",
  };
  let component: PrepackVerificationQueueComponent;
  let fixture: ComponentFixture<PrepackVerificationQueueComponent>;
  let translateService: Partial<TranslateService>;
  let prepackVerificationService: Partial<PrepackVerificationService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let matchingDate = new Date();

  let barcodeScanService: Partial<BarcodeScanService>;

  barcodeScanService = {
    reset: jasmine.createSpy('reset').and.returnValue(of({})),
    handleKeyInput: jasmine.createSpy('handleKeyInput').and.returnValue(of({})),
    isScannerInput: jasmine.createSpy('isScannerInput').and.returnValue(of({})),
    BarcodeScannedSubject: new Subject<string>(),
  };

  const verificationQueueItem1: IPrepackVerificationQueueItem = {
    PrepackVerificationQueueId: 1,
    ItemId: "itemId",
    ItemDescription: "ItemDescription",
    DeviceId: 1,
    DeviceDescription: "deviceDescription",
    QuantityToPackage: 1,
    PackagedDate: new Date(),
  } as IPrepackVerificationQueueItem;

  beforeEach(async () => {
    router = { navigate: () => { } };
    spyOn(router, 'navigate');
    translateService = {
      get: jasmine.createSpy("get").and.returnValue(of(translateService)),
    };
    prepackVerificationService = {
      getPrepackQueueData: jasmine
        .createSpy("getPrepackQueueData")
        .and.returnValue(of([verificationQueueItem1])),
      deletePrepackQueueVerification: jasmine
        .createSpy("deletePrepackQueueVerification")
        .and.returnValue(of(1)),
    };

    simpleDialogService = {
      getWarningOkPopup: jasmine
      .createSpy("getWarningOkPopup")
      .and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      declarations: [
        PrepackVerificationQueueComponent,
        MockTranslatePipe,
        MockSearchBox,
        MockSearchPipe,
        MockCpClickableIconComponent,
        MockAppHeaderContainer,
        MockCpClickableIconComponent,
      ],
      imports: [GridModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PrepackVerificationService,
          useValue: prepackVerificationService,
        },
        { provide: Router, useValue: router },
        { provide: TranslateService, useValue: { get: () => of([]) } },
        {
          provide: WpfInteropService,
          useValue: { wpfViewModelActivated: new Subject() },
        },
        { provide: WindowService, useValue: { getHash: () => "" } },
        { provide: BarcodeDataService, useValue: { getData: () => of([]) } },
        { provide: BarcodeScanService, useValue: barcodeScanService },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: PrepackVerificationSelectionCacheService, useValue: { Clear: () => of([]), Set: () => {} } },

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepackVerificationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    barcodeData = {
      BarCodeScanned: "string",
      BarCodeFormat: "UC",
      ProductId: "string",
      Ndc: "ndc",
      ExpirationDate: new Date(),
      SerialNumber: "",
      LotNumber: "",
      Quantity: 1,
      ItemId: "ItemA",
      BinId: "",
      TransactionId: "",
      DispenseId: 1,
      OrderId: "",
      DestinationId: "",
      SourceOmniId: "",
      IsBarcodeOverride: false,
      IsDispenseBarcode: false,
      IsProductBarcode: false,
      IsBinBarcode: false,
      IsTrayBarcode: false,
      IsUnrecognizedBarcode: false,
      IsXr2PickingBarcode: false,
      DeviceId: 1,
    };
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("on Delete calls loadPrepackVerificationQueueItems", () => {
    const spy = spyOn<any>(component, "loadPrepackVerificationQueueItems");
    component.onDeleteClick(verificationQueueItem1);
    expect(component["loadPrepackVerificationQueueItems"]).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate', () => {
      const rowClicked: PrepackVerificationQueueItem = ( {PrepackVerificationQueueId: 1} as Partial<PrepackVerificationQueueItem>) as PrepackVerificationQueueItem ;
      component.NavigateToPrepackVerificationDetailsPage(rowClicked);
      expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.stringMatching('core/prepackVerificationDetail/')]));
  });

  it('processScannedBarcodeData() when barcode format is UN and ItemId is null displays unknown barcode dialog', () => {
    barcodeData.BarCodeFormat = "UN";
    barcodeData.ItemId = null;
    component.processScannedBarcodeData(barcodeData);
    expect(barcodeScanService.reset).toHaveBeenCalled();
    expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalledWith("BARCODESCAN_DIALOGWARNING_TITLE", "BARCODESCAN_DIALOGWARNING_MESSAGE");
  });

  it('processScannedBarcodeData() when 0 items match displays no verification required for item dialog', () => {
    component.processScannedBarcodeData(barcodeData);
    expect(barcodeScanService.reset).toHaveBeenCalled();
    expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalledWith("MANUAL_PREPACK_VERIFICATION_VERIFICATION_NOT_REQUIRED_TITLE", "MANUAL_PREPACK_VERIFICATION_VERIFICATION_NOT_REQUIRED_MESSAGE");
  });

  it('processScannedBarcodeData() when 1 item matches navigates to the details page', () => {
    let item = new PrepackVerificationQueueItem({
      PrepackVerificationQueueId: 1,
      ItemId: "ItemA",
      ItemDescription: "test",
      DeviceId: 1,
      DeviceDescription: "test",
      QuantityToPackage: 1,
      PackagedDate: new Date(),
      DrugIdentifier: "ndc",
      PrepackLotNumber: "test",
      PrepackExpirationDate: new Date()
    });
    component.unfilteredPrepackVerificationQueueItems.push(item);
    component.processScannedBarcodeData(barcodeData);
    expect(barcodeScanService.reset).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.stringMatching('core/prepackVerificationDetail/')]));
  });

  it('processScannedBarcodeData() when 2 items match navigates to the selection page', () => {
    let item = new PrepackVerificationQueueItem({
      PrepackVerificationQueueId: 1,
      ItemId: "ItemA",
      ItemDescription: "test",
      DeviceId: 1,
      DeviceDescription: "test",
      QuantityToPackage: 1,
      PackagedDate: new Date(),
      DrugIdentifier: "ndc",
      PrepackLotNumber: "test",
      PrepackExpirationDate: new Date()
    });
    let item2 = new PrepackVerificationQueueItem({
      PrepackVerificationQueueId: 2,
      ItemId: "ItemA",
      ItemDescription: "test",
      DeviceId: 1,
      DeviceDescription: "test",
      QuantityToPackage: 1,
      PackagedDate: new Date(),
      DrugIdentifier: "ndc",
      PrepackLotNumber: "test",
      PrepackExpirationDate: new Date()
    });
    component.unfilteredPrepackVerificationQueueItems.push(item);
    component.unfilteredPrepackVerificationQueueItems.push(item2);
    component.processScannedBarcodeData(barcodeData);
    expect(barcodeScanService.reset).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.stringMatching('core/prepackVerificationSelection')]));
  });

  it('processScannedBarcodeData() when 2 items but one matches lot and exp date navigates to the details page', () => {
    barcodeData.LotNumber = "matchinglot";
    barcodeData.ExpirationDate = matchingDate;
    let item = new PrepackVerificationQueueItem({
      PrepackVerificationQueueId: 1,
      ItemId: "ItemA",
      ItemDescription: "test",
      DeviceId: 1,
      DeviceDescription: "test",
      QuantityToPackage: 1,
      PackagedDate: new Date(),
      DrugIdentifier: "ndc",
      PrepackLotNumber: "matchinglot",
      PrepackExpirationDate: matchingDate
    });
    let item2 = new PrepackVerificationQueueItem({
      PrepackVerificationQueueId: 2,
      ItemId: "ItemA",
      ItemDescription: "test",
      DeviceId: 1,
      DeviceDescription: "test",
      QuantityToPackage: 1,
      PackagedDate: new Date(),
      DrugIdentifier: "ndc",
      PrepackLotNumber: "test",
      PrepackExpirationDate: new Date()
    });
    component.unfilteredPrepackVerificationQueueItems.push(item);
    component.unfilteredPrepackVerificationQueueItems.push(item2);
    component.processScannedBarcodeData(barcodeData);
    expect(barcodeScanService.reset).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.stringMatching('core/prepackVerificationDetail/')]));
  });

});


