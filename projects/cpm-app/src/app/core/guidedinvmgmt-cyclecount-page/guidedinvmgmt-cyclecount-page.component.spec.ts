import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ActivatedRoute } from '@angular/router';
import { GuidedCycleCountService } from '../../api-core/services/guided-cycle-count-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { FormsModule } from '@angular/forms';
import { GuidedInvMgmtCycleCountPageComponent } from './guidedinvmgmt-cyclecount-page.component';
import { GuidedCycleCount } from '../model/guided-cycle-count';
import { of } from 'rxjs';
import { NumericComponent, DatepickerComponent, OcEventService } from '@omnicell/webcorecomponents';
import { EventManager } from '@angular/platform-browser';
describe('GuidedInvMgmtCycleCountPageComponent', () => {
  let component: GuidedInvMgmtCycleCountPageComponent;
  let fixture: ComponentFixture<GuidedInvMgmtCycleCountPageComponent>;
  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { queryParamMap: { get: () => ({}) } }
    });
    const guidedCycleCountServiceStub = () => ({
      get: deviceID => {
        const obj = {
          DeviceLocationId: 1,
    ItemId: '1',
    BrandNameFormatted: '',
    GenericNameFormatted: '',
    ParLevel: 0,
    ReorderLevel: 0,
    ExpirationDate: null,
    ExpirationDateFormatted: '',
    LocationDescription: '',
    QuantityOnHand: 0,
    ReorderSource: '',
    ItmExpDateGranularity: "Month",
    QuantityMin: 10,
    InStockQuantity: 10
        };
        return of([obj]);

      },
      post: (deviceId, update) => ({ subscribe: f => f({}) })
    });
    const wpfActionControllerServiceStub = () => ({
      ExecuteBackAction: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [GuidedInvMgmtCycleCountPageComponent, MockTranslatePipe],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        {
          provide: GuidedCycleCountService,
          useFactory: guidedCycleCountServiceStub
        },
        {
          provide: WpfActionControllerService,
          useFactory: wpfActionControllerServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(GuidedInvMgmtCycleCountPageComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('navigateBack', () => {
    it('makes expected calls', () => {
      const wpfActionControllerServiceStub: WpfActionControllerService = fixture.debugElement.injector.get(
        WpfActionControllerService
      );
      spyOn(
        wpfActionControllerServiceStub,
        'ExecuteBackAction'
      ).and.callThrough();
      component.navigateBack();
      expect(
        wpfActionControllerServiceStub.ExecuteBackAction
      ).toHaveBeenCalled();
    });
  });
  describe('navigateContinue', () => {
    it('makes expected calls', () => {
      component.displayCycleCountItem = new GuidedCycleCount({
        DeviceLocationId: 86,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"Day",
        QuantityMin:10,
        InStockQuantity:10
      });
      const wpfActionControllerServiceStub: WpfActionControllerService = fixture.debugElement.injector.get(
        WpfActionControllerService
      );
      spyOn(
        wpfActionControllerServiceStub,
        'ExecuteBackAction'
      ).and.callThrough();
      component.navigateContinue();
      expect(
        wpfActionControllerServiceStub.ExecuteBackAction
      ).toHaveBeenCalled();
    });
  });
  describe('cycle count data retrieval',()=>{
    it('cycle count data retrieval',() => {
      var deviceID = "1";
      fixture.detectChanges();
    });
 });
  describe('Sending proper date with required format', () => {
    it('return required date format', () => {
      var testDate = new Date('Tue Mar 31 2020 19:27:40 GMT+0530');
      var strDate = component.FormatExpireDate(testDate);
      expect('03/31/2020').toBe(strDate);
    });
  });
  describe('Sending proper date with required format', () => {
    it('return required date format', () => {
      var testDate = new Date('');
      var strDate = component.FormatExpireDate(testDate);
      expect('0NaN/0NaN/NaN').toEqual(strDate);
    });
  });

  describe('returns last item true', () => {
    it('return with is last item', () => {
      component.itemCount = 1;
      component.IsLastItem(); 
      expect(component.isLastItem).toBeTruthy();
    });
  });
  describe('returns last item false', () => {
    it('return with is last item', () => {
      component.itemCount = 3;
      component.IsLastItem(); 
      expect(component.isLastItem).toBeFalsy();
    });
  });
  
  describe('returning false component data', () => {
    it('return proper valid component', () => {
      component.displayCycleCountItem = new GuidedCycleCount({
        DeviceLocationId: 86,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"Day",
        QuantityMin:10,
        InStockQuantity:10
      });
      var localcopy = [];
      component.cycleCountItemsCopy = localcopy;
      component.cycleCountItemsCopy.push(component.displayCycleCountItem);
      var validComp = component.showValidComponent();
      expect(validComp).toBeFalsy();
    });
  });
  describe('returning true component data', () => {
    it('return proper valid component', () => {
      component.displayCycleCountItem = new GuidedCycleCount({
        DeviceLocationId: 86,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"Day",
        QuantityMin:10,
        InStockQuantity:10,
      });
      var localcopy = [];
      component.cycleCountItemsCopy = localcopy;
      component.cycleCountItemsCopy.push(component.displayCycleCountItem);
      component.cycleCountItemsCopy.push(component.displayCycleCountItem);
      component.cycleCountItemsCopy.push(component.displayCycleCountItem);
      var validComp = component.showValidComponent();
      expect(validComp).toBeTruthy();
    });
  });
  describe('next record with 0 records validation',()=>{
    it('returns the true if zero records',() => {
      component.itemCount = 0 ;
      component.nextRecord();
      var bReturn = component.isLastItem;
      expect(true).toBe(bReturn);
    });
  });
  describe('next record with more than 1 records validation',()=>{
    it('returns the true if zero records',() => {
      component.currentItemCount = 2;
      component.cycleCountItemsCopy = [];
      component.cycleCountItemsCopy.push(new GuidedCycleCount({
        DeviceLocationId: 86,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"Day",
        QuantityMin:10,
        InStockQuantity:10,
      }));
      component.cycleCountItemsCopy.push(new GuidedCycleCount({
        DeviceLocationId: 87,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"Day",
        QuantityMin:10,
        InStockQuantity:10
      }));
      component.itemCount = 2;
      component.nextRecord();
      var bReturn = component.isLastItem;
      expect(bReturn).toBeFalsy();
    });
  });
  describe('next record with more than 1 records validation',()=>{
    it('returns the true if zero records',() => {
      component.currentItemCount = 1;
      component.cycleCountItemsCopy = [];
      component.cycleCountItemsCopy.push(new GuidedCycleCount({
        DeviceLocationId: 86,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"Day",
        QuantityMin:10,
        InStockQuantity:10,
      }));
      component.cycleCountItemsCopy.push(new GuidedCycleCount({
        DeviceLocationId: 87,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"Day",
        QuantityMin:10,
        InStockQuantity:10
      }));
      component.itemCount = 2;
      component.currentItemCount = 1;
      component.nextRecord();
      var bReturn = component.isLastItem;
      expect(bReturn).toBeTruthy();
    });
  });
  describe('returns item expiredate granularity', () => {
    it('returns item expiredate granularity', () => {
      component.displayCycleCountItem = new GuidedCycleCount({
        DeviceLocationId: 87,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"Month",
        QuantityMin:10,
        InStockQuantity:10
      });
      var value = component.CheckItemExpGranularity(); 
      expect(value).toBeFalsy();
    });
  });
  describe('returns item expiredate granularity', () => {
    it('returns item expiredate granularity', () => {
      component.displayCycleCountItem = new GuidedCycleCount({
        DeviceLocationId: 87,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"None",
        QuantityMin:10,
        InStockQuantity:10,
      });
      var value = component.CheckItemExpGranularity(); 
      expect(value).toBeTruthy();
    });
  });
  describe('disable action buttons', () => {
    it('disable action buttons', () => {
      component.isLastItem = true;
      component.DisableActionButtons(true); 
      expect(component.nextButtonDisable).toBeFalsy();
      expect(component.doneButtonDisable).toBeTruthy();
    });
  });
  describe('returns last item false', () => {
    it('return with is last item', () => {
      component.isLastItem = false;
      component.DisableActionButtons(true); 
      expect(component.nextButtonDisable).toBeTruthy();
      expect(component.doneButtonDisable).toBeFalsy();
    });
  });
  describe('date changes validation', () => {
    it('date changes validation', () => {
      component.onDateChange('');
      var dummy,dummy1;
      component.numericElement = new NumericComponent(dummy,dummy1);
      component.numericElement.displayValue = "0";
      component.DisableActionButtons(true); 
      expect(component.nextButtonDisable).toBeTruthy();
      expect(component.doneButtonDisable).toBeFalsy();
    });
  });
  describe('date changes validation', () => {
    it('date changes validation', () => {
      component.onDateChange(null);
      var dummy,dummy1;
      component.numericElement = new NumericComponent(dummy,dummy1);
      component.numericElement.displayValue = "0";
      component.DisableActionButtons(true); 
      expect(component.nextButtonDisable).toBeTruthy();
      expect(component.doneButtonDisable).toBeFalsy();
    });
  });
  describe('date changes validation', () => {
    it('date changes validation', () => {
      component.onDateChange("01/02/2021");
      var dummy,dummy1;
      component.numericElement = new NumericComponent(dummy,dummy1);
      component.numericElement.displayValue = "10";
      component.DisableActionButtons(false); 
      expect(component.nextButtonDisable).toBeFalsy();
      expect(component.doneButtonDisable).toBeFalsy();
    });
  });
  describe('quantity changes validation', () => {
    it('quantity changes validation', () => {
      component.onQuantityChange("0");
      var dummy,dummy1;
      component.datepicker = new DatepickerComponent(dummy,dummy1);
      var datevalue = component.datepicker.selectedDate;
      expect(datevalue).toEqual('');
      component.daterequired = false;
      expect(component.daterequired).toBeFalsy();
    });
  });
  describe('quantity changes validation', () => {
    it('quantity changes validation', () => {
      component.displayCycleCountItem = new GuidedCycleCount({
        DeviceLocationId: 87,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"Month",
        QuantityMin:10,
        InStockQuantity:10,
      });
      var value = component.CheckItemExpGranularity(); 
      expect(value).toBeFalsy();
      component.datepicker = new DatepickerComponent(dummy,dummy1);
      component.datepicker.selectedDate = null;
      component.onQuantityChange("0");
      var dummy,dummy1;

      var datevalue = component.datepicker.selectedDate;
      expect(datevalue).toEqual('');
      component.daterequired = false;
      expect(component.daterequired).toBeFalsy();
      component.DisableActionButtons(false);
    });
  });
  describe('quantity changes validation', () => {
    it('quantity changes validation', () => {
      component.displayCycleCountItem = new GuidedCycleCount({
        DeviceLocationId: 87,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNameFormatted: "acetaminophen 500mg tab",
        Units:"EA",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        ExpirationDateFormatted: "10/03/2020",
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal",
        ItmExpDateGranularity:"Month",
        QuantityMin:10,
        InStockQuantity:10,
      });
      var value = component.CheckItemExpGranularity(); 
      expect(value).toBeFalsy();
      component.datepicker = new DatepickerComponent(dummy,dummy1);
      component.datepicker.selectedDate = null;
      component.onQuantityChange("10");
      var dummy,dummy1;
      var datevalue = component.datepicker.selectedDate;
      expect(datevalue).toEqual('');
      component.daterequired = true;
      expect(component.daterequired).toBeTruthy();
      component.DisableActionButtons(true);
    });
  });
  describe('skip the item', () => {
    it('skip the item ', () => {
      const wpfActionControllerServiceStub: WpfActionControllerService = fixture.debugElement.injector.get(
        WpfActionControllerService
      );
      spyOn(
        wpfActionControllerServiceStub,
        'ExecuteBackAction'
      ).and.callThrough();
      component.isLastItem = false;
      component.navigateSkip();
      expect(
        wpfActionControllerServiceStub.ExecuteBackAction
      ).toHaveBeenCalled();
    });
  });
 });
