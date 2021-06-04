import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { of, Subject } from "rxjs";
import { DestockService } from "../../api-xr2/services/destock.service";
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import { DestockTypeInfo } from "../model/destock-type-info";
import { SimpleDialogService } from "../../shared/services/dialogs/simple-dialog.service";
import { DestockEventConnectionService } from "../services/destock-event-connection.service";
import { DestockDataEvent } from "../model/destock-data-event";
import { TranslateService } from "@ngx-translate/core";
import {
  ProgressAnimationComponent,
  FooterModule,
  ButtonActionModule,
} from "@omnicell/webcorecomponents";
import { MockDestockHeaderComponent } from "../../shared/testing/mock-destock-header-component.spec";
import { MockTranslatePipe } from "../../core/testing/mock-translate-pipe.spec";
import { DestockPageComponent } from "./destock-page.component";
import { WindowService } from "../../shared/services/window-service";
import { WpfInteropService } from "../../shared/services/wpf-interop.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DevicesService } from "../../api-core/services/devices.service";

describe("DestockPageComponent", () => {
  let component: DestockPageComponent;
  let fixture: ComponentFixture<DestockPageComponent>;
  let translateService: Partial<TranslateService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let destockService: Partial<DestockService>;
  let deviceDestockTypeInfo: Partial<DestockTypeInfo[]>;
  let destockEventConnectionService: Partial<DestockEventConnectionService>;
  let devicesService: Partial<DevicesService>;
  let router: Partial<Router>;

  beforeEach(async(() => {
    translateService = {
      get: jasmine.createSpy("get").and.returnValue(of(translateService)),
    };
    simpleDialogService = {
      displayErrorOk: jasmine.createSpy("displayErrorOk"),
      displayInfoOk: jasmine.createSpy("displayInfoOk"),
    };
    destockService = {
      get: jasmine.createSpy("get").and.returnValue(of(DestockService)),
      print: jasmine.createSpy("print").and.returnValue(of(DestockService)),
    };

    destockEventConnectionService = {
      DestockIncomingDataSubject: new Subject<DestockDataEvent>(),
      DestockIncomingDataErrorSubject: new Subject<any>(),
      ngUnsubscribe: new Subject(),
    };

    const deviceId = 4;
    const firstDevice: SelectableDeviceInfo = {
      Description: "firstDevice",
      DeviceId: deviceId,
      DefaultOwnerName: "string",
      DeviceTypeId: "string",
      CurrentLeaseHolder: null,
      IsActive: true,
    };
    const devices: SelectableDeviceInfo[] = [firstDevice];
    router = { navigate: jasmine.createSpy("navigate") };
    let activatedRoute = { snapshot: { paramMap: { get: () => deviceId } } };
    devicesService = {
      getAllXr2Devices: () => of(devices),
    };

    TestBed.configureTestingModule({
      declarations: [
        DestockPageComponent,
        MockDestockHeaderComponent,
        ProgressAnimationComponent,
        MockTranslatePipe,
      ],
      imports: [ButtonActionModule, FooterModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: DestockService, useValue: destockService },
        {
          provide: DestockEventConnectionService,
          useValue: destockEventConnectionService,
        },
        {
          provide: WpfInteropService,
          useValue: { wpfViewModelActivated: new Subject() },
        },
        { provide: WindowService, useValue: { getHash: () => "" } },
        { provide: DevicesService, useValue: devicesService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
