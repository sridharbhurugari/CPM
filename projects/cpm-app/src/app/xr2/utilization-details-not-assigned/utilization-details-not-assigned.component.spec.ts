import { EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { ProgressAnimationComponent, FooterModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { MockDestockHeaderComponent } from '../../shared/testing/mock-destock-header-component.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { DetailsNotAssignedComponent } from './utilization-details-not-assigned.component';
import { UtilizationDeailsService } from '../services/utilization-details.service';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { DevicesService } from '../../api-core/services/devices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { IUnassignedMedicationInfoDetail } from '../../api-xr2/data-contracts/i-utilization-unassigned-medication-info-detail';
import { SelectableDeviceInfo } from '../../shared/model/selectable-device-info';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';

describe('NotAssignedPageComponent', () => {
  let component: DetailsNotAssignedComponent ;
  let fixture: ComponentFixture<DetailsNotAssignedComponent>;
  let translateService: Partial<TranslateService>;
  let utilizationDeailsService: Partial<UtilizationDeailsService>;
  let devicesService: Partial<DevicesService>;
  let router: Partial<Router>;

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

    router = {navigate: jasmine.createSpy('navigate') };
    let activatedRoute = { snapshot: { paramMap : { get: () => deviceId } } };

    let unassignedMedicationInfoDetail: IUnassignedMedicationInfoDetail[] = [];
    utilizationDeailsService = {
      notAssigned: jasmine.createSpy('notAssigned').and.returnValue(of(unassignedMedicationInfoDetail)),
    };

    devicesService = {
      getAllXr2Devices: () => of(devices)
    };
    TestBed.configureTestingModule({
      declarations: [ DetailsNotAssignedComponent, MockSearchPipe, MockDestockHeaderComponent, MockTranslatePipe ],
      imports: [ ButtonActionModule,
        FooterModule ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UtilizationDeailsService, useValue: utilizationDeailsService },
        { provide: DevicesService, useValue: devicesService},
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsNotAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Search filter text on search filter event', () => {
    const filter = 'filter';

    component.onSearchTextFilterEvent(filter);

    expect(component.searchTextFilter).toBe(filter);
  });

  describe('Back Click Button Action', () => {
    it('should emit back event on back click', () => {
      component.onBackClick();

      expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.stringMatching('xr2/utilization')]));
    });
  });

  describe('Queue filtering/sorting', () => {
    it('should set sort order on column selected event', () => {
      const mockSortEvent = {} as IColHeaderSortChanged;
      const expectedSortOrder = 'asc';
      const expectedColumnName = 'column';
      mockSortEvent.SortDirection = expectedSortOrder;
      mockSortEvent.ColumnPropertyName = expectedColumnName;

      component.columnSelected(mockSortEvent);

      expect(component.currentSortPropertyName).toBe(expectedColumnName);
    });
  });
});

