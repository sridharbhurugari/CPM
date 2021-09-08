import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { IPrepackVerificationQueueDetail } from '../../api-core/data-contracts/i-prepack-verification-queue-detail';
import { PrepackVerificationService } from '../../api-core/services/prepack-verification.service';
import { IOcapHttpConfiguration } from '../../shared/interfaces/i-ocap-http-configuration';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { PrepackVerificationQueueDetailComponent } from "./prepack-verification-queue-detail.component";
import { MockTranslatePipe } from "../testing/mock-translate-pipe.spec";
import { TranslateService } from "@ngx-translate/core";
import {
  NumericComponent,
  DatepickerComponent,
  PopupDialogService,
  PopupDialogProperties,
  PopupDialogType,
  DateFormat,
  SearchDropdownComponent,
  ToastService,
  PopupDialogComponent,
} from "@omnicell/webcorecomponents";
import { Location } from '@angular/common';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';

describe("PrepackVerificationQueueDetailComponent", () => {
  let locationMock: Partial<Location>;
  let component: PrepackVerificationQueueDetailComponent;
  let fixture: ComponentFixture<PrepackVerificationQueueDetailComponent>;
  let prepackVerificationService: Partial<PrepackVerificationService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let popupDialogComponent;
  let router
  let timeoutEventEmmiter: EventEmitter<string> = new EventEmitter();
  let okButtonEventEmmiter: EventEmitter<string> = new EventEmitter();

  let ocapConfig: IOcapHttpConfiguration = {
    apiKey: '39252',
    clientId: '32903512',
    machineName: 'machine329',
    ocapServerIP: '127.0.0.1',
    port: '3928',
    useSecured: 'true',
    userLocale: 'en-US',
    clientName: 'client1'
  };
  let queueDetail = {
    ItemId: "ItemId",
    DeviceId: 1,
    ManufacturerName: "ManufacturerName",
    ManufacturerLotNumber: "ManufacturerLotNumber",
    ManufacturerExpirationDate: new Date(),
    PrepackLotNumber: "PrepackLotNumber",
    PrepackExpirationDate: new Date(),
    DrugIdentifier: "12345",
    QuantityToPackage: 11,
    DestinationDeviceLocationId: 1,
    PackagedDate: new Date(),
    DestinationLocationDescription: "DestinationLocationDescription",
    GenericNameFormatted: "GenericNameFormatted",
    BrandNameFormatted: "BrandNameFormatted",
    UnitOfIssue: "Each"
  } as IPrepackVerificationQueueDetail ;

  beforeEach(async () => {
    router = { navigate: () => { } };
    spyOn(router, 'navigate');

    prepackVerificationService = {
      getDetail: jasmine
      .createSpy("getDetail")
      .and.returnValue(of(queueDetail)),
      approve: jasmine
      .createSpy("approve")
      .and.returnValue(of(true))
    };

    locationMock = {
      back: jasmine
      .createSpy("back")
    };

    popupDialogComponent = {
      didClickPrimaryButton: okButtonEventEmmiter,
      didTimeoutDialog: timeoutEventEmmiter
    };

    spyOn(timeoutEventEmmiter, "subscribe");
    spyOn(okButtonEventEmmiter, "subscribe");

    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      getWarningOkPopup: jasmine.createSpy('getWarningOkPopup').and.returnValue(of(popupDialogComponent))
    };

    await TestBed.configureTestingModule({
      declarations: [PrepackVerificationQueueDetailComponent, MockTranslatePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: router },
        {
          provide: PrepackVerificationService,
          useValue: prepackVerificationService,
        },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap : { get: () => '1' } } } },
        { provide: OcapHttpConfigurationService, useValue: { get: () => ocapConfig } },
        { provide: Location, useValue: locationMock },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        {
          provide: TranslateService,
          useValue: { get: (x: string) => of(`{x}_TRANSLATED`) },
        }
      ],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepackVerificationQueueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    describe('should create', () => {
    it('should ...', () => {
      expect(component).toBeTruthy();
    });

    describe('Back Click Button Action', () => {
      it('should emit back event on back click', () => {
        component.onBackClick();

        expect(locationMock.back).toHaveBeenCalled();
      });
    });

    describe('Data on init', () => {
      it('should not display warning popup', () => {
        component.ngOnInit();
        expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalledTimes(0);
      })
    });

    describe('Verify Click', () => {
      it('should not display warning popup', () => {
        component.approve();
        expect(simpleDialogService.getWarningOkPopup).toHaveBeenCalledTimes(0);
      })
    });

    describe('Inform and return', () => {
      it('should subscribe to button click and timeout', () => {
        component.informAndReturn();
        expect(timeoutEventEmmiter.subscribe).toHaveBeenCalled();
        expect(okButtonEventEmmiter.subscribe).toHaveBeenCalled();
      })
    });

  });
})

