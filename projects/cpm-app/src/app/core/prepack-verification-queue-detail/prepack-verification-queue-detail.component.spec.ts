import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
} from "@omnicell/webcorecomponents";

describe("PrepackVerificationQueueDetailComponent", () => {
  let component: PrepackVerificationQueueDetailComponent;
  let fixture: ComponentFixture<PrepackVerificationQueueDetailComponent>;
  let prepackVerificationService: Partial<PrepackVerificationService>;
  let router

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

        expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.stringMatching('core/prepackVerification')]));
      });
    });

  });
})
