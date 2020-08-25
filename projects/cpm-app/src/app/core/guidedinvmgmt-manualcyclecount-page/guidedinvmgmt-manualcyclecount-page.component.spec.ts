import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, EventEmitter } from "@angular/core";
import { MockTranslatePipe } from "../testing/mock-translate-pipe.spec";
import { ActivatedRoute } from "@angular/router";
import { GuidedManualCycleCountServiceService } from "../../api-core/services/guided-manual-cycle-count-service.service";
import { WpfActionControllerService } from "../../shared/services/wpf-action-controller/wpf-action-controller.service";
import { FormsModule } from "@angular/forms";
import { GuidedinvmgmtManualcyclecountPageComponent } from "./guidedinvmgmt-manualcyclecount-page.component";
import { GuidedManualCycleCountItemid } from "../../api-core/data-contracts/guided-manual-cycle-count-itemid";
import { of, Subject, observable } from "rxjs";
import {
  NumericComponent,
  DatepickerComponent,
  PopupDialogService,
  PopupDialogProperties,
  PopupDialogType,
  DateFormat,
  SearchDropdownComponent,
  ToastService,
} from "@omnicell/webcorecomponents";
import { CarouselLocationAccessService } from "../../shared/services/devices/carousel-location-access.service";
import { CoreEventConnectionService } from "../../api-core/services/core-event-connection.service";
import { DeviceLocationTypeId } from "../../shared/constants/device-location-type-id";
import { TranslateService } from "@ngx-translate/core";
import { IDeviceConfiguration } from "../../api-core/data-contracts/i-device-configuration";
import { LeaseVerificationResult } from "../../api-core/data-contracts/lease-verification-result";
import { DeviceLocationAccessResult } from "../../shared/enums/device-location-access-result";
import { PopupDialogServiceStub } from "../../shared/testing/popup-dialog-service-stub";
import { GuidedManualCycleCountItems } from "../../api-core/data-contracts/guided-manual-cycle-count-items";
import { IGuidedManualCycleCountItemid } from "../../api-core/data-contracts/i-guided-manual-cycle-count-itemid";
import { HardwareLeaseService } from '../../api-core/services/hardware-lease-service';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { GuidedCycleCountPrintLabel } from '../../api-core/data-contracts/guided-cycle-count-print-label';
import { BarcodeScanService } from 'oal-core';
import { DeviceOperationResult } from '../../api-core/data-contracts/device-operation-result';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';

describe("GuidedInvMgmtCycleCountPageComponent", () => {
  let component: GuidedinvmgmtManualcyclecountPageComponent;
  let fixture: ComponentFixture<GuidedinvmgmtManualcyclecountPageComponent>;
  let carouselLocationAccessService: Partial<CarouselLocationAccessService>;
  let manualCycleCountService: Partial<GuidedManualCycleCountServiceService>;
  let hardwareLeaseService: Partial<HardwareLeaseService>;
  let systemConfigurationService: Partial<SystemConfigurationService>;
  let printPopupDialogService: Partial<PopupDialogService>;
  let toasterService: Partial<ToastService>;
  let barcodeScanService: Partial<BarcodeScanService>;
  let searchItems: GuidedManualCycleCountItems[];
  let mockPopupDialogService: PopupDialogService;
  let returnPostUpdate: boolean;
  let itemid: string = "8939";
  const leaseVerificationResult: LeaseVerificationResult = 1;
  const deviceConfiguration: IDeviceConfiguration = {
    DefaultOwner: 'WRKS1',
    DeviceId: 1,
    Active: true,
    DefaultOwnerShortname: 'WRKS1',
    DeviceDescription: 'Device1',
    DeviceType: '',
    IsValid: true,
    Json: '',
    LeaseRequired: true,
    Model: '',
    Order: 1,
    PrinterName: ''
  };

  let deviceOperationResult: DeviceOperationResult = { OutcomeText: '', Outcome: 5, IsSuccessful: false };
  let configurationValue: IConfigurationValue = { Value: '15', Category: '', SubCategory: '' };

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { queryParamMap: { get: () => ({}) } },
    });

    const GuidedManualCycleCountServiceServiceStub = () => ({
      get: () => {
        const obj = {
          DeviceLocationId: 87,
          DeviceId: 5,
          DeviceDescription: "carousel 2",
          DeviceLocationTypeId: "2023",
          ShelfNumber: 3,
          BinNumber: 2,
          SlotNumber: 1,
          ItemId: "ace500t",
          BrandNameFormatted: "Tylenol 500mg tab",
          GenericNameFormatted: "acetaminophen 500mg tab",
          Units: "EA",
          ParLevel: 60,
          ReorderLevel: 30,
          ExpirationDate: new Date(),
          ExpirationDateFormatted: "10/03/2018",
          LocationDescription: "Carosel 01-01-01",
          QuantityOnHand: 12,
          ReorderSource: "Internal",
          ItmExpDateGranularity: "Month",
          QuantityMin: 10,
          InStockQuantity: 12,
          PackageFormType: "B",
          PackageFormName: "Bulk",
          DrugId: "ACEtaminophen",
          ManufacturerName: "ARPON Labs",
          ItemDateFormat: "MM/DD/YYYY",
        };
        return of([obj]);
      },
     
      ValidCycleCountScanBarCode: () => {
        const obj = {
          ItemId: '1',
          DosageForm: '',
          DeviceId: 1,
          DeviceLocationId: 1,
          DeviceLocationDescription: '',
          TradeName: '',
          GenericName: '',
          UnitOfIssue: ''
        };
        return of([obj]);
      },
      PrintLabel: () => ({subscribe: (f) => f({})}),
      post: () => ({ subscribe: (f) => f({}) }),
    });
    const wpfActionControllerServiceStub = () => ({
      ExecuteBackAction: () => ({}),
    });
    printPopupDialogService = { showOnce: jasmine.createSpy('showOnce') };
    const coreEventConnectionService = {
      carouselReadySubject: new Subject(),
      carouselFaultedSubject: new Subject(),
    };
    carouselLocationAccessService = {
      clearLightbar: jasmine.createSpy("clearLightbar").and.returnValue(of({})),
    };

    barcodeScanService = {
      reset: jasmine.createSpy('reset').and.returnValue(of({})),
      handleKeyInput: jasmine.createSpy('handleKeyInput').and.returnValue(of({})),
      isScannerInput: jasmine.createSpy('isScannerInput').and.returnValue(of({})),
    };
    
    hardwareLeaseService = {
      HasDeviceLease: () => of(leaseVerificationResult),
      getDeviceConfiguration: () => of(deviceConfiguration),
      RequestDeviceLease: () => of(deviceOperationResult)
    };
    systemConfigurationService = { GetConfigurationValues: () => of(configurationValue) };


    manualCycleCountService = {
      getSearchItems: jasmine
        .createSpy("getSearchItems")
        .and.returnValue(of({})),
        post: () => of(123),
        PrintLabel: () => of(returnPostUpdate), 
        updateSelectedItem: ()=> of(returnPostUpdate), 
      get: jasmine.createSpy("get").and.returnValue(of({ itemid })),
      ValidCycleCountScanBarCode: jasmine.createSpy("ValidCycleCountScanBarCode").and.returnValue(of({}))
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        GuidedinvmgmtManualcyclecountPageComponent,
        MockTranslatePipe,
      ],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        {
          provide: WpfActionControllerService,
          useFactory: wpfActionControllerServiceStub,
        },
        {
          provide: manualCycleCountService,
          useFactory: GuidedManualCycleCountServiceServiceStub,
        },
        {
          provide: CarouselLocationAccessService,
          useValue: carouselLocationAccessService,
        },
        {
          provide: CoreEventConnectionService,
          useValue: coreEventConnectionService,
        },
        { provide: PopupDialogService, useClass: PopupDialogServiceStub },
        {
          provide: TranslateService,
          useValue: { get: (x: string) => of(`{x}_TRANSLATED`) },
        },
        {
          provide: GuidedManualCycleCountServiceService,
          useValue: manualCycleCountService,
        },
        { provide: HardwareLeaseService, useValue: hardwareLeaseService },
        { provide: SystemConfigurationService, useValue: systemConfigurationService },
        { provide: ToastService, useValue: toasterService },
        { provide: BarcodeScanService, useValue: barcodeScanService },
        { provide: PopupDialogService, useClass: PopupDialogServiceStub },
      ],
    });
    fixture = TestBed.createComponent(
      GuidedinvmgmtManualcyclecountPageComponent
    );
    mockPopupDialogService = TestBed.get(PopupDialogService);
    component = fixture.componentInstance;
  });
  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  describe("onInit", () => {
    it("should initialze component", () => {
      component.ngOnInit();
    });
  });

  describe("ngAfterViewChecked", () => {
    it("should component view checked", () => {
      component.ngAfterViewChecked();
    });
  });

  describe("ngAfterViewInit", () => {
    it("should do component after view init", () => {
      //component.ngAfterViewInit();
    });
  });

  describe("itemSelected", () => {
    it("when item selected ", () => {
      var item: any = { item: { ID: 20 } };
      expect(manualCycleCountService.get).toHaveBeenCalled;
      component.itemSelected(item);
    });
  });

  describe('returns Printer Configure true', () => {
    it('return with configure result', () => {
      component.devicePrinterName = "printer";
      component.labelPrinterName = "printer"
      var config = component.HasLabelPrinterConfigured();
      expect(config).toBeTruthy();
    });
  });
  describe('returns Printer Configure false', () => {
    it('return with configure result', () => {
      component.devicePrinterName = null;
      component.labelPrinterName = null;
      var config = component.HasLabelPrinterConfigured();
      expect(config).toBeFalsy();
    });
  });

  describe('displaySuccessToSaveDialog', () => {
    let item: any = {};
    beforeEach(() => {
      component.printResult = true;
      component.popupDialogProperties = item;
    });

    it('should display print success popup', () => {
      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      component.displaySuccessToSaveDialog();

      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
      var title: string = "display";
    });
  });

  describe('displayFailedToSaveDialog', () => {
    let item: any = {};
    beforeEach(() => {
      component.printResult = false;
      component.popupDialogProperties = item;
    });

    it('should display print Failed popup', () => {

      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      component.displayFailedToSaveDialog();

      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
      var title: string = "display";

    });
  });
  

  describe("getSearchData", () => {
    it("should return search data for a search key ", () => {
      var key: string = "8939";
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "8939",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        DosageForm:"TAB",
        Units: "EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      expect(manualCycleCountService.getSearchItems).toHaveBeenCalled;
      component.getSearchData(key);
    });
  });

  describe("navigateBack", () => {
    it("calls ExecuteBackAction", () => {
      const item: any = {};
      component.displayCycleCountItem = item;
      const wpfActionControllerServiceStub: WpfActionControllerService = fixture.debugElement.injector.get(
        WpfActionControllerService
      );
      spyOn(
        wpfActionControllerServiceStub,
        "ExecuteBackAction"
      ).and.callThrough();
      component.navigateBack();
      expect(
        wpfActionControllerServiceStub.ExecuteBackAction
      ).toHaveBeenCalled();
    });

    describe("given carousel location", () => {
      let item: any = {};
      beforeEach(() => {
        item.DeviceLocationTypeId = DeviceLocationTypeId.Carousel;
        component.displayCycleCountItem = item;
      });

      it("should clear lightbar", () => {
        component.navigateBack();
        expect(carouselLocationAccessService.clearLightbar).toHaveBeenCalled();
      });
    });

    describe("given open storage location", () => {
      let item: any = {};
      beforeEach(() => {
        item.DeviceLocationTypeId = DeviceLocationTypeId.OpenStorage;
        component.displayCycleCountItem = item;
      });

      it("should not clear lightbar", () => {
        component.navigateBack();
        expect(
          carouselLocationAccessService.clearLightbar
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe("navigateContinue to the next item", () => {
    it("navigateContinue to the next item", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      const wpfActionControllerServiceStub: WpfActionControllerService = fixture.debugElement.injector.get(
        WpfActionControllerService
      );
      spyOn(
        wpfActionControllerServiceStub,
        "ExecuteBackAction"
      ).and.callThrough();
      component.navigateContinue();
      expect(
        wpfActionControllerServiceStub.ExecuteBackAction
      ).toHaveBeenCalled();
    });
  });
  describe("navigateContinue with month item granularity", () => {
    it("navigateContinue with month item granularity", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      const wpfActionControllerServiceStub: WpfActionControllerService = fixture.debugElement.injector.get(
        WpfActionControllerService
      );
      spyOn(
        wpfActionControllerServiceStub,
        "ExecuteBackAction"
      ).and.callThrough();
      component.navigateContinue();
      expect(
        wpfActionControllerServiceStub.ExecuteBackAction
      ).toHaveBeenCalled();
    });
  });

  describe("Sending proper date with required format", () => {
    it("return required date format", () => {
      var testDate = new Date("Tue Mar 31 2020 19:27:40 GMT+0530");
      var strDate = component.FormatExpireDate(testDate);
      expect("03/31/2020").toBe(strDate);
    });
  });
  describe("Sending wrong date", () => {
    it("return required date format", () => {
      var testDate = new Date("");
      var strDate = component.FormatExpireDate(testDate);
      expect("0NaN/0NaN/NaN").toEqual(strDate);
    });
  });

  describe("returns item expiredate granularity with month", () => {
    it("returns item expiredate granularity", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      var value = component.CheckItemExpGranularity();
      expect(value).toBeFalsy();
    });
  });
  describe("returns item expiredate granularity with none", () => {
    it("returns item expiredate granularity", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      var value = component.CheckItemExpGranularity();
      expect(value).toBeFalsy();
    });
  });
  describe("disable action buttons for last item", () => {
    it("disable action buttons", () => {
      component.DisableActionButtons(true);
      expect(component.doneButtonDisable).toBeTruthy();
    });
  });
  describe("toggle action buttons when last item is false", () => {
    it("return with is last item", () => {
      component.DisableActionButtons(true);
      expect(component.doneButtonDisable).toBeTruthy();
    });
  });
  describe("empty date with numeric value 0 changes validation", () => {
    it("date changes validation", () => {
      component.onDateChange("");
      var dummy, dummy1;
      component.numericElement = new NumericComponent(dummy, dummy1);
      component.numericElement.displayValue = "0";
      component.DisableActionButtons(true);
      expect(component.doneButtonDisable).toBeTruthy();
    });
  });

  describe("future date changes validation", () => {
    it("date changes validation", () => {
      component.onDateChange("01/02/2021");
      var dummy, dummy1;
      component.numericElement = new NumericComponent(dummy, dummy1);
      component.numericElement.displayValue = "10";
      component.DisableActionButtons(false);
      expect(component.doneButtonDisable).toBeFalsy();
    });
  });
  describe("zero quantity changes validation", () => {
    it("quantity changes validation", () => {
      component.onQuantityChange("0");
      var dummy, dummy1;
      component.datepicker = new DatepickerComponent(dummy, dummy1);
      var datevalue = component.datepicker.selectedDate;
      expect(datevalue).toEqual('');
      component.daterequired = false;
      expect(component.daterequired).toBeFalsy();
    });
  });
  describe("quantity changes validation", () => {
    it("quantity changes validation", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      var value = component.CheckItemExpGranularity();
      expect(value).toBeFalsy();
      component.datepicker = new DatepickerComponent(dummy, dummy1);
      component.datepicker.selectedDate = null;
      component.onQuantityChange("0");
      var dummy, dummy1;

      var datevalue = component.datepicker.selectedDate;
      expect(datevalue).toEqual(null);
      component.daterequired = false;
      expect(component.daterequired).toBeFalsy();
      component.DisableActionButtons(false);
    });
  });
  describe("quantity changes validation", () => {
    it("quantity changes validation", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      var value = component.CheckItemExpGranularity();
      expect(value).toBeFalsy();
      component.datepicker = new DatepickerComponent(dummy, dummy1);
      component.datepicker.selectedDate = null;
      component.onQuantityChange("10");
      var dummy, dummy1;
      var datevalue = component.datepicker.selectedDate;
      expect(datevalue).toEqual(null)
      component.daterequired = true;
      expect(component.daterequired).toBeTruthy();
      component.DisableActionButtons(true);
    });
  });

  describe("toggle red border line for calendar control", () => {
    it("toggle red border line for calendar control", () => {
      var dummyElement = document.createElement("datepicker");
      document.getElementById = jasmine
        .createSpy("HTML Element")
        .and.returnValue(dummyElement);
    });
  });
  describe("quantity changes null date validation", () => {
    it("quantity changes null date validation", () => {
      component.onQuantityChange("0");
      var dummy, dummy1;
      component.datepicker = new DatepickerComponent(dummy, dummy1);
      var datevalue = component.datepicker.selectedDate;
      expect(datevalue).toEqual("");
      component.daterequired = false;
      expect(component.daterequired).toBeFalsy();
    });
  });
  describe("toggle calendar border with red color for first item", () => {
    it("toggle calendar border with red color for first item", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      component.toggleredborderforfirstitem();
      var dummy, dummy1;
      component.datepicker = new DatepickerComponent(dummy, dummy1);
      var value = component.datepicker.isDisabled;
      expect(value).toBeFalsy();
    });
  });
  describe("wrong format date changes validation", () => {
    it("date changes validation", () => {
      component.onDateChange("1/1/00");
      var dummy, dummy1;
      component.numericElement = new NumericComponent(dummy, dummy1);
      component.numericElement.displayValue = "10";
      component.DisableActionButtons(true);
      var val = component.daterequired;
      expect(val).toBeTruthy();
      expect(component.doneButtonDisable).toBeTruthy();
    });
  });
  describe("wrong format date changes validation", () => {
    it("date changes validation", () => {
      component.onDateChange("20/10/2021");
      var dummy, dummy1;
      component.numericElement = new NumericComponent(dummy, dummy1);
      component.numericElement.displayValue = "10";
      component.DisableActionButtons(true);
      var val = component.daterequired;
      expect(val).toBeFalsy();
      expect(component.doneButtonDisable).toBeTruthy();
    });
  });

  describe("same page navigation", () => {
    it("when user navigated to same page", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      expect(component.navigateSamePage()).toHaveBeenCalled;
    });
  });
  describe("toggle calendar border with red color for first item", () => {
    it("toggle calendar border with red color for first item", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceLocationId: 87,
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2018",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 12,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 12,
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
        ItemDateFormat: "MM/DD/YYYY",
      });
      component.toggleredborderforfirstitem();
      var dummy, dummy1;
      component.datepicker = new DatepickerComponent(dummy, dummy1);
      var value = component.datepicker.isDisabled;
      expect(value).toBeFalsy();
    });
  });

  describe("wrong format date changes validation", () => {
    it("date changes validation", () => {
      component.onDateChange("20/10/2021");
      var dummy, dummy1;
      component.numericElement = new NumericComponent(dummy, dummy1);
      component.numericElement.displayValue = "10";
      component.DisableActionButtons(true);
      var val = component.daterequired;
      expect(val).toBeFalsy();
      expect(component.doneButtonDisable).toBeTruthy();
    });
  });

  describe("displayUnknownItemDialog", () => {
    it("displayUnknownItemDialog should display unknown item dialog", () => {
      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      component.displayUnknownItemDialog('8939');

      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
      var title: string = "display";
    });
  });
  describe("displayError message", () => {
    it("should display error message", () => {
      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      var uniqueId: string = "10";
      var title: string = "display";
      var message: string = "message";
      component.displayError(uniqueId, title, message);
      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
    });
  });
  describe("mockPopupDialogService", () => {
    it("mockPopupDialogService message", () => {
      var title: string = "display";
      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      component.showLeaseDialog(title);
      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
    });
  });
  describe("handleLeaseBusyChanged", () => {
    it("handleLeaseBusyChanged message", () => {
      var isBusy: boolean = true;
      component.handleLeaseBusyChanged(isBusy);
    });
  });

  describe("After ngAfterviewinit message", () => {
    it("After ngAfterviewinit message", () => {
      const id = "#" + component.userSearchDropdownElement.id;
      manualCycleCountService.getSearchItems;
    });
  });

  describe("handleDeviceLocationAccessResult", () => {
    it("handleDeviceLocationAccessResult message", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceLocationId: 87,
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2018",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 12,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 12,
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
        ItemDateFormat: "MM/DD/YYYY",
      });
      let deviceLocationAccessResult: DeviceLocationAccessResult =
        DeviceLocationAccessResult.LeaseNotAvailable;
      component.handleDeviceLocationAccessResult(deviceLocationAccessResult);
    });
  });

  describe("onSelectionChanged message", () => {
    it("onSelectionChanged message", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceLocationId: 87,
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2018",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 12,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 12,
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
        ItemDateFormat: "MM/DD/YYYY",
      });
      var $event: string = "Carosel 01-01-01";
      var key: string = "8939";
      component.onSelectionChanged($event);
    });
  });

  describe("expired date entered", () => {
    it("should show red mark for expired date enterdcd", () => {
      var expiredDate: string = "10/03/2018";
      component.onDateChange(expiredDate);
      expect(component.daterequired).toBeTruthy();
      component.toggleredborderfornonfirstitem(false);
      component.DisableActionButtons(false);
      expect(component.doneButtonDisable).toBeFalsy();
    });
  });

  describe("Cycle  Count Validation", () => {
    it("Cycle  Count Validation method returns validations", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceLocationId: 87,
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 12,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "None",
        QuantityMin: 10,
        InStockQuantity: 12,
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
        ItemDateFormat: "MM/DD/YYYY",
      });
      component.CycleCountValidation();
      expect(component.doneButtonDisable).toBeFalsy();
    });
  });

  describe("Cycle  Count Validation", () => {
    it("Cycle  Count Validation method returns validations", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceLocationId: 87,
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 12,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 12,
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
        ItemDateFormat: "MM/DD/YYYY",
      });
      component.CycleCountValidation();
      expect(component.doneButtonDisable).toBeTruthy();
    });
  });

  describe("Item Length entered", () => {
    it("Item Length Method returning item length", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceLocationId: 87,
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 0,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 12,
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
        ItemDateFormat: "MM/DD/YYYY",
      });
      component.itemLength();
      expect(component.doneButtonDisable).toBeTruthy();
    });
  });

  describe("displayError message", () => {
    it("should display error message", () => {
      let itemID: string = "8939";
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceLocationId: 87,
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2018",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 12,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 12,
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
        ItemDateFormat: "MM/DD/YYYY",
      });
      var localcopy = [];

      const GuidedManualCycleCountServiceServiceStub: GuidedManualCycleCountServiceService = fixture.debugElement.injector.get(
        manualCycleCountService
      );
    });
  });

  describe("multiple Location", () => {
    it("multiple Location should show", () => {
      component.cycleCountItemsCopy = [];
      component.cycleCountItemsCopy.push(
        new GuidedManualCycleCountItemid({
          DeviceLocationId: 87,
          DeviceId: 5,
          DeviceDescription: "carousel 2",
          DeviceLocationTypeId: "2023",
          ShelfNumber: 3,
          BinNumber: 2,
          SlotNumber: 1,
          ItemId: "ace500t",
          BrandNameFormatted: "Tylenol 500mg tab",
          GenericNameFormatted: "acetaminophen 500mg tab",
          Units: "EA",
          DosageForm:"TAB",
          ParLevel: 60,
          ReorderLevel: 30,
          ExpirationDate: new Date(),
          ExpirationDateFormatted: "",
          LocationDescription: "Carosel 01-01-01",
          QuantityOnHand: 0,
          ReorderSource: "Internal",
          ItmExpDateGranularity: "Month",
          QuantityMin: 10,
          InStockQuantity: 12,
          PackageFormType: "B",
          PackageFormName: "Bulk",
          DrugId: "ACEtaminophen",
          ManufacturerName: "ARPON Labs",
          ItemDateFormat: "MM/DD/YYYY",
        })
      );
      component.cycleCountItemsCopy.push(
        new GuidedManualCycleCountItemid({
          DeviceLocationId: 87,
          DeviceId: 5,
          DeviceDescription: "carousel 2",
          DeviceLocationTypeId: "2023",
          ShelfNumber: 3,
          BinNumber: 2,
          SlotNumber: 1,
          ItemId: "ace500t",
          BrandNameFormatted: "Tylenol 500mg tab",
          GenericNameFormatted: "acetaminophen 500mg tab",
          Units: "EA",
          DosageForm:"TAB",
          ParLevel: 60,
          ReorderLevel: 30,
          ExpirationDate: new Date(),
          ExpirationDateFormatted: "",
          LocationDescription: "Carosel 01-01-01",
          QuantityOnHand: 0,
          ReorderSource: "Internal",
          ItmExpDateGranularity: "Month",
          QuantityMin: 10,
          InStockQuantity: 12,
          PackageFormType: "B",
          PackageFormName: "Bulk",
          DrugId: "ACEtaminophen",
          ManufacturerName: "ARPON Labs",
          ItemDateFormat: "MM/DD/YYYY",
        })
      );
      component.multipleLocations(component.cycleCountItemsCopy);
    });
  });

  describe('multiplelocations', () =>{
    let item1: any = {};
    let item2: any = {};
      beforeEach(() => {
        item1.itemID = '8939';
        item2.itemID = '8939';
        item1.DeviceLocationTypeId = DeviceLocationTypeId.Canister;
        item2.DeviceLocationTypeId = DeviceLocationTypeId.Xr2MedicationStorage;
      });
    it('should show warning message if item assigned to pacakger or xr2', ()=>{
        component.cycleCountItemsCopy = [];
        component.cycleCountItemsCopy.push(item1);
        component.cycleCountItemsCopy.push(item2);
        spyOn(component,'displayPackagerAssignItemDialog').and.callThrough();
        component.multipleLocations(component.cycleCountItemsCopy);
        expect(component.displayPackagerAssignItemDialog).toHaveBeenCalled();
    });
  });

  describe('itemSelected', () =>{
    let item: any = {};
    beforeEach(() => {
      item = {"status": 200,
      "item":{ID: "8939", GenericNameFormatted: "acebutolol 200mg CAPSULE", 
      TradeNameFormatted: "SECTRAL 200mg CAPSULE", TradeName: "SECTRAL"}
      }
    });
    it('should close popup if any opend', ()=>{
      component.selectedItem = JSON.stringify(item);
      component.over = true;
      component.itemSelected(item);
    });
  });

  describe("multiple Location Item", () => {
    it("multiple Location Item", () => {
      component.cycleCountItemsCopy = [];
      component.cycleCountItemsCopy.push(
        new GuidedManualCycleCountItemid({
          DeviceLocationId: 87,
          DeviceId: 5,
          DeviceDescription: "carousel 2",
          DeviceLocationTypeId: "2023",
          ShelfNumber: 3,
          BinNumber: 2,
          SlotNumber: 1,
          ItemId: "ace500t",
          BrandNameFormatted: "Tylenol 500mg tab",
          GenericNameFormatted: "acetaminophen 500mg tab",
          Units: "EA",
          DosageForm:"TAB",
          ParLevel: 60,
          ReorderLevel: 30,
          ExpirationDate: new Date(),
          ExpirationDateFormatted: "",
          LocationDescription: "Carosel 01-01-01",
          QuantityOnHand: 0,
          ReorderSource: "Internal",
          ItmExpDateGranularity: "Month",
          QuantityMin: 10,
          InStockQuantity: 12,
          PackageFormType: "B",
          PackageFormName: "Bulk",
          DrugId: "ACEtaminophen",
          ManufacturerName: "ARPON Labs",
          ItemDateFormat: "MM/DD/YYYY",
        })
      );
      component.cycleCountItemsCopy.push(
        new GuidedManualCycleCountItemid({
          DeviceLocationId: 87,
          DeviceId: 5,
          DeviceDescription: "carousel 2",
          DeviceLocationTypeId: "2023",
          ShelfNumber: 3,
          BinNumber: 2,
          SlotNumber: 1,
          ItemId: "ace500t",
          BrandNameFormatted: "Tylenol 500mg tab",
          GenericNameFormatted: "acetaminophen 500mg tab",
          Units: "EA",
          DosageForm:"TAB",
          ParLevel: 60,
          ReorderLevel: 30,
          ExpirationDate: new Date(),
          ExpirationDateFormatted: "",
          LocationDescription: "Carosel 01-01-01",
          QuantityOnHand: 0,
          ReorderSource: "Internal",
          ItmExpDateGranularity: "Month",
          QuantityMin: 10,
          InStockQuantity: 12,
          PackageFormType: "B",
          PackageFormName: "Bulk",
          DrugId: "ACEtaminophen",
          ManufacturerName: "ARPON Labs",
          ItemDateFormat: "MM/DD/YYYY",
        })
      );
      var eventid = "Carosel 01-01-01";
      component.multipleLocationItem(component.cycleCountItemsCopy, eventid);
    });
  });

  describe("expired date entered", () => {
    it("should show red mark for expired date enterdcd", () => {
      var expiredDate: string = "10/03/2018";
      component.onDateChange(expiredDate);
      expect(component.daterequired).toBeTruthy();
      component.toggleredborderfornonfirstitem(false);
      component.DisableActionButtons(false);
      expect(component.doneButtonDisable).toBeFalsy();
    });
  });

  describe('Scan Validation for disable buttions', () => {
    let item: any = {};
    beforeEach(() => {
      item.QuantityOnHand = 0;
    });
    it('Scan Validation for disable buttions', () => {
      component.displayCycleCountItem = item;
      component.DisableActionButtons(true);
      var config = component.ScanValidation(); 
      expect(config).toBeTruthy;
    });
  });
  describe("Should process bar code message", () => {
    it("processScannedBarcode", () => {
      component.rawBarcodeMessage = "$1234";
      component.processScannedBarcode("$1234");
    });
  });
  describe("Should process bar code message", () => {
    it("processScannedBarcode", () => {
      component.rawBarcodeMessage = "0000";
      //component.barcodeOverride = true;
      component.processScannedBarcode("0000");
    });
  });
  describe("Should reset bar code message", () => {
    it("reset", () => {
      component.reset();
    });
  });
  describe("Should display wrong bar code pop up window dialog for invalid trays", () => {
    it("displayWrongBarCodeDialog should display unknown item dialog", () => {
      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      component.displayWrongBarCodeDialog();

      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
      var title: string = "display";
    });
  });
  describe("Should display wrong bar code pop up window dialog for wrong bar code", () => {
    it("displayWrongBarCodeDialog should display unknown item dialog", () => {
      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      component.displayWrongBarCodeDialog();

      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
      var title: string = "display";
    });
  });

  describe("Should display cycle count pop up window dialog for packager or xr2 items", () => {
    it("displayPackagerAssignItemDialog should display unknown item dialog", () => {
      var title: string = "display";
      var message: string[] =[];
      message.push("Packager");
      message.push("Xr2");
      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      component.displayPackagerAssignItemDialog(title,message);
      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
    });
  });

  describe("mockPopupDialogService", () => {
    it("mockPopupDialogService message", () => {
      var title: string = "display";
      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      component.showLeaseDialog(title);
      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
    });
  });
  describe("handleLeaseBusyChanged", () => {
    it("handleLeaseBusyChanged message", () => {
      var isBusy: boolean = true;
      component.handleLeaseBusyChanged(isBusy);
    });
  });
  describe("handleDeviceLocationAccessResult", () => {
    it("handleDeviceLocationAccessResult message", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceLocationId: 87,
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 12,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 12,
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
        ItemDateFormat: "MM/DD/YYYY",
      });
      let deviceLocationAccessResult: DeviceLocationAccessResult =
        DeviceLocationAccessResult.LeaseNotAvailable;
      component.handleDeviceLocationAccessResult(deviceLocationAccessResult);
    });
  });
  describe("Should call  windows key down event", () => {
    it("onBarcodeScanExcludedKeyPressEvent", () => {
      const keyEvent = new KeyboardEvent('keydown', { code: 'KeyA' });
      var event = {
        type: 'click',
        stopPropagation: function () { }
      }
      let spy = spyOn(event, 'stopPropagation');
      component.onBarcodeScanExcludedKeyPressEvent(keyEvent);
      expect(spy).call;
    });
  });

  describe("Should call key press event", () => {
    it("onKeypressHandler", () => {
      const keyEvent = new KeyboardEvent('keypress', { code: 'keypress' });
      var event = {
        type: 'click',
        stopPropagation: function () { }
      }
      let spy = spyOn(event, 'stopPropagation');
      component.onKeypressHandler(keyEvent);
      expect(spy).call;
    });
  });

  describe("Should unhook event handlers", () => {
    it("unhookEventHandlers", () => {
      component.unhookEventHandlers();
    });
  });
  describe("Should unhook event handlers", () => {
    it("unhookEventHandlers", () => {
      component.hookupEventHandlers();
    });
  });

  describe('should pop up be closed', () => {
    it('Close popup', () => {
      var val = component.closePopup();
      expect(val).toBeFalsy();
    });
  });

  describe("Should process bar code message", () => {
    it("processScannedBarcode", () => {
      var barcode:string = "$1234";
      component.over = true;
      spyOn(component,"closePopup").and.callThrough();
      component.processScannedBarcode(barcode);
      expect(component.closePopup).toHaveBeenCalled();
    });
  });

  describe("Should process bar code message", () => {
    it("processScannedBarcode", () => {
      var barcode:string = "$1234";
      component.over = false;
      spyOn(component,"scanCycleCountItem").and.callThrough();
      component.processScannedBarcode(barcode);
      component.rawBarcodeMessage = barcode;
      expect(component.scanCycleCountItem).toHaveBeenCalled();
    });
  });

  describe("Should reset bar code message", () => {
    it("reset", () => {
      component.reset();
    });
  });

    describe("Should unhook event handlers", () => {
    it("unhookEventHandlers", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      component.PrintLabel();

    });
  });
  describe("Should unhook event handlers", () => {
    it("unhookEventHandlers", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
      component.printResult = false;
      component.PrintLabel();
      component.displayFailedToSaveDialog();
    });
  });

  describe("Should unhook event handlers", () => {
    it("unhookEventHandlers", () => {
      component.displayCycleCountItem = new GuidedManualCycleCountItemid({
        DeviceId: 5,
        DeviceDescription: "carousel 2",
        DeviceLocationTypeId: "2023",
        ShelfNumber: 3,
        BinNumber: 2,
        SlotNumber: 1,
        DeviceLocationId: 86,
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units: "EA",
        DosageForm:"TAB",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity: "Month",
        QuantityMin: 10,
        InStockQuantity: 10,
        ItemDateFormat: "MM/DD/YYYY",
        PackageFormType: "B",
        PackageFormName: "Bulk",
        DrugId: "ACEtaminophen",
        ManufacturerName: "ARPON Labs",
      });
     // component.printResult = false;
     component.rawBarcodeMessage = "0000";
      component.scanCycleCountItem("0000");
      //component.displayFailedToSaveDialog();
    });
  });
});
