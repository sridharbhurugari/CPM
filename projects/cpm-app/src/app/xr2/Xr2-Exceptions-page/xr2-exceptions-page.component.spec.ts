import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Xr2ExceptionsPageComponent } from './xr2-exceptions-page.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { GridModule, FooterModule, LayoutModule, SvgIconModule, SearchModule, ButtonActionModule, PopupDialogService } from '@omnicell/webcorecomponents';
import { of, never, Subject } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { Xr2ExceptionsService } from '../../api-xr2/services/xr2-exceptions.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { TranslateService } from '@ngx-translate/core';
import { Xr2ExceptionsItem } from '../model/xr2-exceptions-item';
import { PopupDialogServiceStub } from "../../shared/testing/popup-dialog-service-stub";
import { ActivatedRoute, Router, Params, NavigationExtras, RouterModule } from '@angular/router';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { IXr2ExceptionsItem } from '../../api-xr2/data-contracts/i-xr2-exception-item';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';
import { BarcodeScanService } from 'oal-core';
import { IConfigurationValue } from '../../shared/interfaces/i-configuration-value';

describe('Xr2ExceptionsPageComponent', () => {
  let component: Xr2ExceptionsPageComponent;
  let fixture: ComponentFixture<Xr2ExceptionsPageComponent>;
  let event: IColHeaderSortChanged = { ColumnPropertyName: "TrayID", SortDirection: "asc" };
  let eventSelected: IXr2ExceptionsItem = { TrayID: "c00004", DeviceID: "5", CompletedDateTime: "2020-06-01 07:41:19.763", TrayDescription: "", ExceptionPockets: "", DeviceName: "",IsReturn: false };
  let router: Partial<Router>;
  let xr2ExceptionsService: Partial<Xr2ExceptionsService>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let systemConfigurationService: Partial<SystemConfigurationService>;
  let translateService: Partial<TranslateService>;
  let popupDialogService: Partial<PopupDialogService>;
  let barcodeScanService: Partial<BarcodeScanService>;
  let configurationValue: IConfigurationValue = { Value: '15', Category: '', SubCategory: '' };
  let mockPopupDialogService: PopupDialogService;
  beforeEach(async(() => {
    xr2ExceptionsService = {
      get: () => of([]),
      gettraytypes: () => of([])
    };
    wpfActionControllerService = {
      ExecuteWpfContinueNavigationAction: jasmine.createSpy('ExecuteWpfContinueNavigationAction'),
      ExecuteContinueNavigationAction: jasmine.createSpy('ExecuteContinueNavigationAction')
    };

    systemConfigurationService = { GetConfigurationValues: () => of(configurationValue) };
    translateService = { get: jasmine.createSpy('get') };
    barcodeScanService = {
      reset: jasmine.createSpy('reset').and.returnValue(of({})),
      handleKeyInput: jasmine.createSpy('handleKeyInput').and.returnValue(of({})),
      isScannerInput: jasmine.createSpy('isScannerInput').and.returnValue(of({})),
    };

    TestBed.configureTestingModule({
      declarations: [Xr2ExceptionsPageComponent, MockTranslatePipe,
        MockColHeaderSortable, MockAppHeaderContainer, MockSearchPipe],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule, ButtonActionModule],
      providers: [
        { provide: Xr2ExceptionsService, useValue: xr2ExceptionsService },
        { provide: WpfActionControllerService, useValue: wpfActionControllerService },
        { provide: SystemConfigurationService, useValue: systemConfigurationService },
        {
          provide: TranslateService,
          useValue: { get: (x: string) => of(`{x}_TRANSLATED`) },
        },
        { provide: PopupDialogService, useValue: popupDialogService },
        { provide: BarcodeScanService, useValue: barcodeScanService },
        { provide: PopupDialogService, useClass: PopupDialogServiceStub },
      ]
    })
      .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2ExceptionsPageComponent);
    mockPopupDialogService = TestBed.get(PopupDialogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('column selected ', () => {
    component.displayExceptionsList$.source;
    component.displayExceptionsList$ = component.displayExceptionsList$.pipe(map(exceptions => {
      return this.sort(exceptions, "desc");
    }));
    expect(component.columnSelected(event));
  });
  describe('navigation on page', () => {
    it('navigates details page', () => {
      component.navigatedetailspage(eventSelected);
    });
  });
  describe("Should display wrong bar code pop up window dialog for invalid trays", () => {
    it("displayWrongBarCodeDialog should display unknown item dialog", () => {
      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      component.displayWrongBarCodeDialog(true);

      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
      var title: string = "display";
    });
  });
  describe("Should display wrong bar code pop up window dialog for wrong bar code", () => {
    it("displayWrongBarCodeDialog should display unknown item dialog", () => {
      spyOn(mockPopupDialogService, "showOnce").and.callThrough();
      component.displayWrongBarCodeDialog(false);

      expect(mockPopupDialogService.showOnce).toHaveBeenCalled();
      var title: string = "display";
    });
  });
  describe("Should process bar code message", () => {
    it("processScannedBarcode", () => {
      component.rawBarcodeMessage = "C00000";
      component.processScannedBarcode("c00000");
    });
  });
  describe("Should reset bar code message", () => {
    it("reset", () => {
      component.reset();
    });
  });
  describe("Should return tray type exists or not", () => {
    it("navigatedetailspage", () => {
      component.traytypesList = ["CO", "C1", "C2"];
      component.rawBarcodeMessage = "C00000";
      component.showthedetailspageordialog();
      component.navigatedetailspage(eventSelected)
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
  describe("Should call  windows key press event", () => {
    it("onKeypressHandler", () => {
      const event = new KeyboardEvent("keypress", {
        "key": "Enter"
      });
      window.dispatchEvent(event);
      fixture.detectChanges();
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
});
