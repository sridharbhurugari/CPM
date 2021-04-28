import { EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { ProgressAnimationComponent, FooterModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { MockDestockHeaderComponent } from '../../shared/testing/mock-destock-header-component.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { DetailsPocketsWithErrorsComponent } from './utilization-details-pockets-with-errors.component';
import { UtilizationDeailsService } from '../services/utilization-details.service';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { DevicesService } from '../../api-core/services/devices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { IErroredMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-errored-medication-info-detail';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';

describe('DestockPageComponent', () => {
  let component: DetailsPocketsWithErrorsComponent ;
  let fixture: ComponentFixture<DetailsPocketsWithErrorsComponent>;
  let translateService: Partial<TranslateService>;
  let utilizationDeailsService: Partial<UtilizationDeailsService>;
  let devicesService: Partial<DevicesService>;

  beforeEach(async(() => {
    const deviceId = 4;
    const firstDevice: SelectableDeviceInfo = { Description: 'firstDevice',
    DeviceId: deviceId,
    DefaultOwnerName: "string",
    DeviceTypeId: "string",
    CurrentLeaseHolder: null,
    IsActive: true };
    const devices: SelectableDeviceInfo[] = [ firstDevice ];

    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of()),
      getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
    };

    let activatedRoute = { snapshot: { paramMap : { get: () => deviceId } } };

    let erroredMedicationInfoDetail: IErroredMedicationInfoDetail[] = [];
    utilizationDeailsService = {
      pocketsWithErrors: jasmine.createSpy('pocketsWithErrors').and.returnValue(of(erroredMedicationInfoDetail)),
    };

    devicesService = {
      getAllXr2Devices: () => of(devices)
    };
    TestBed.configureTestingModule({
      declarations: [ DetailsPocketsWithErrorsComponent, MockSearchPipe, MockDestockHeaderComponent, MockTranslatePipe ],
      imports: [ ButtonActionModule,
        FooterModule ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UtilizationDeailsService, useValue: utilizationDeailsService },
        { provide: DevicesService, useValue: devicesService},
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: activatedRoute },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPocketsWithErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

