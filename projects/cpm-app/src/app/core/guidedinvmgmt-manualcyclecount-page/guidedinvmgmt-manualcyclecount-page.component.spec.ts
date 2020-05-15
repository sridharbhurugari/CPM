// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { GuidedinvmgmtManualcyclecountPageComponent } from './guidedinvmgmt-manualcyclecount-page.component';

// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
// import { ActivatedRoute } from '@angular/router';
// import { GuidedManualCycleCountServiceService } from '../../api-core/services/guided-manual-cycle-count-service.service';
// import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
// import { FormsModule } from '@angular/forms';
// import { GuidedManualCycleCountItemid } from '../../api-core/data-contracts/guided-manual-cycle-count-itemid';
// import { of, Subject } from 'rxjs';
// import { NumericComponent, DatepickerComponent, PopupDialogService } from '@omnicell/webcorecomponents';
// import { CarouselLocationAccessService } from '../../shared/services/devices/carousel-location-access.service';
// import { CoreEventConnectionService } from '../../api-core/services/core-event-connection.service';
// import { DeviceLocationTypeId } from '../../shared/constants/device-location-type-id';
// import { TranslateService } from '@ngx-translate/core';

// describe('GuidedinvmgmtManualcyclecountPageComponent', () => {
//   let component: GuidedinvmgmtManualcyclecountPageComponent;
//   let fixture: ComponentFixture<GuidedinvmgmtManualcyclecountPageComponent>;
//   let carouselLocationAccessService: Partial<CarouselLocationAccessService>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ GuidedinvmgmtManualcyclecountPageComponent ]
//     })
//    .compileComponents();
//  }));

//   beforeEach(() => {
//    fixture = TestBed.createComponent(GuidedinvmgmtManualcyclecountPageComponent);
//     component = fixture.componentInstance;
//    fixture.detectChanges();
//   });

//   it('should create', () => {
//    expect(component).toBeTruthy();
//   });

//   describe('navigateBack', () => {
//     it('calls ExecuteBackAction', () => {
//       const item: any = { };
//       component.displayCycleCountItem = item;
//       const wpfActionControllerServiceStub: WpfActionControllerService = fixture.debugElement.injector.get(
//         WpfActionControllerService
//       );
//       spyOn(
//         wpfActionControllerServiceStub,
//         'ExecuteBackAction'
//       ).and.callThrough();
//       component.navigateBack();
//       expect(
//         wpfActionControllerServiceStub.ExecuteBackAction
//       ).toHaveBeenCalled();
//     });

//     describe('given carousel location', () => {
//       let item: any = { };
//       beforeEach(() => {
//         item.DeviceLocationTypeId = DeviceLocationTypeId.Carousel;
//         component.displayCycleCountItem = item;
//       })

//       it('should clear lightbar', () => {
//         component.navigateBack();
//         expect(carouselLocationAccessService.clearLightbar).toHaveBeenCalled();
//       })
//     });

//     describe('given open storage location', () => {
//       let item: any = { };
//       beforeEach(() => {
//         item.DeviceLocationTypeId = DeviceLocationTypeId.OpenStorage;
//         component.displayCycleCountItem = item;
//       })

//       it('should not clear lightbar', () => {
//         component.navigateBack();
//         expect(carouselLocationAccessService.clearLightbar).not.toHaveBeenCalled();
//       })
//     });
//   });
//   describe('navigateContinue with month item granularity', () => {
//     it('navigateContinue with month item granularity', () => {
//       // component.displayCycleCountItem = new GuidedManualCycleCountItemid({
//       //   DeviceId: 5,
//       //   DeviceDescription: 'carousel 2',
//       //   DeviceLocationTypeId: '2023',
//       //   ShelfNumber: 3,
//       //   BinNumber: 2,
//       //   SlotNumber: 1,
//       //   DeviceLocationId: 86,  
//       //   ItemId: "ace500t",
//       //   BrandNameFormatted: "Tylenol 500mg tab",
//       //   GenericNameFormatted: "acetaminophen 500mg tab",
//       //   Units:"EA",
//       //   ParLevel: 60,
//       //   ReorderLevel: 30,
//       //   ExpirationDate: new Date(),
//       //   ExpirationDateFormatted: "10/03/2020",
//       //   LocationDescription: "Carosel 01-01-01",
//       //   QuantityOnHand: 55,
//       //   ReorderSource: "Internal",
//       //   ItmExpDateGranularity:"Month",
//       //   QuantityMin:10,
//       //   InStockQuantity:10,
//       //   ItemDateFormat: "MM/DD/YYYY"
//       // });
//       const wpfActionControllerServiceStub: WpfActionControllerService = fixture.debugElement.injector.get(
//         WpfActionControllerService
//       );
//       spyOn(
//         wpfActionControllerServiceStub,
//         'ExecuteBackAction'
//       ).and.callThrough();
//       component.navigateContinue();
//       expect(
//         wpfActionControllerServiceStub.ExecuteBackAction
//       ).toHaveBeenCalled();
//     });
//     describe('cycle count data retrieval',()=>{
//       it('cycle count data retrieval',() => {
//         fixture.detectChanges();
//       });
//    });
//     describe('Sending proper date with required format', () => {
//       it('return required date format', () => {
//         var testDate = new Date('Tue Mar 31 2020 19:27:40 GMT+0530');
//         var strDate = component.FormatExpireDate(testDate);
//         expect('03/31/2020').toBe(strDate);
//       });
//     });
//     describe('Sending wrong date', () => {
//       it('return required date format', () => {
//         var testDate = new Date('');
//         var strDate = component.FormatExpireDate(testDate);
//         expect('0NaN/0NaN/NaN').toEqual(strDate);
//       });
//     });
//   });

// });
