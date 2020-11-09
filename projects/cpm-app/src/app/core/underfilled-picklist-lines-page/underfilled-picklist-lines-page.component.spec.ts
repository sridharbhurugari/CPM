import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FooterModule, LayoutModule, ButtonActionModule, PopupWindowService, PopupDialogService } from '@omnicell/webcorecomponents';
import { UnderfilledPicklistLinesPageComponent } from './underfilled-picklist-lines-page.component';
import { UnderfilledPicklistLinesComponent } from '../underfilled-picklist-lines/underfilled-picklist-lines.component';
import { of, Subject } from 'rxjs';
import { UnderfilledPicklistLinesService } from '../../api-core/services/underfilled-picklist-lines.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderContainerComponent } from '../../shared/components/header-container/header-container.component';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { PdfGridReportService } from '../../shared/services/printing/pdf-grid-report-service';
import { TranslateService } from '@ngx-translate/core';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockedDatePipe} from '../testing/mock-date-pipe.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { DatePipe } from '@angular/common';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { ResetPickRoutesService } from '../../api-core/services/reset-pick-routes';
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';
import { WorkstationTrackerData } from '../../api-core/data-contracts/workstation-tracker-data';
import { WorkstationTrackerService } from '../../api-core/services/workstation-tracker.service';


describe('UnderfilledPicklistLinesPageComponent', () => {
  let component: UnderfilledPicklistLinesPageComponent;
  let fixture: ComponentFixture<UnderfilledPicklistLinesPageComponent>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let printWithBaseData: jasmine.Spy;
  const date = new Date();
  const pickListLinesData: UnderfilledPicklistLine[] = [{
    IsChecked: false, PicklistLineId: 'pllid1241',
    ItemFoundInCPM: 'unknown item identifier',
    ItemLocation: 'unassigned item identifier',
    InDeviceItem: 'missing route',
    canReroute: true,
    DestinationId: '1241', DestinationType: 'P', PriorityCode: 'Patient', PicklistTypeDb: 'P', ItemId: '8939',
    ItemFormattedGenericName: 'aectonla', ItemBrandName: 'ace', PatientRoom: '2121', PatientName: 'BIN', AreaDescription: '121',
    DestinationOmni: 'omni', FillDate: date, PickItemLocationDescription: 'Picking', FillQuantity: 10, OrderQuantity: 20,
    DisplayPatientRoomAndArea: false, DisplayPatientRoom: false, DisplayArea: true, DisplayOmniName: true,
    DisplayPatientNameSecondLine: true, PharmacyQOH: 10101, UnfilledReason: 'unfilled', PrintFillDate: '10/10/2020',
    DisplayFillRequired: '10/20', DisplayDestionationValue: '134,', DescriptionSortValue: 'sort', DestinationSortValue: 'sorint',
    ItemFormatedDescription: '5% dextrose in water 1000ml bag', ItemBrandDescription: 'Tylenol', ItemIdDescription: '001EEE',
    AreaDesctiptionForReport: '#Childeren Hospital', patientNameForReport: 'Aaron, Derron', DestinationOmniForReport: 'POD 3B ext28270'
  },
  {
    IsChecked: false, PicklistLineId: 'pllid1242',
    ItemFoundInCPM: 'unknown item identifier',
    ItemLocation: 'unassigned item identifier',
    InDeviceItem: 'missing route',
    canReroute: true,
    DestinationId: '1242', DestinationType: 'P', PriorityCode: 'Area', PicklistTypeDb: 'P', ItemId: '8939',
    ItemFormattedGenericName: 'aectonla', ItemBrandName: 'ace', PatientRoom: '2122', PatientName: 'Jhon', AreaDescription: '122',
    DestinationOmni: 'omni', FillDate: date, PickItemLocationDescription: 'Picking', FillQuantity: 10, OrderQuantity: 20,
    DisplayPatientRoomAndArea: false, DisplayPatientRoom: false, DisplayArea: true, DisplayOmniName: true,
    DisplayPatientNameSecondLine: true, PharmacyQOH: 10101, UnfilledReason: 'unfilled', PrintFillDate: '10/11/2020',
    DisplayFillRequired: '10/20', DisplayDestionationValue: '134,', DescriptionSortValue: 'sort', DestinationSortValue: 'sorint',
    ItemFormatedDescription: '5% dextrose in water 1000ml bag', ItemBrandDescription: 'Tylenol', ItemIdDescription: '001EEE',
    AreaDesctiptionForReport: '#Childeren Hospital', patientNameForReport: 'Aaron, Derron', DestinationOmniForReport: 'POD 3B ext28270'
  },
  {
    IsChecked: false, PicklistLineId: 'pllid1243',
    ItemFoundInCPM: 'unknown item identifier',
    ItemLocation: 'unassigned item identifier',
    InDeviceItem: 'missing route',
    canReroute: true,
    DestinationId: '1243', DestinationType: 'P', PriorityCode: 'FirstDose', PicklistTypeDb: 'P', ItemId: '8939',
    ItemFormattedGenericName: 'aectonla', ItemBrandName: 'ace', PatientRoom: '2123', PatientName: 'Jack', AreaDescription: '123',
    DestinationOmni: 'omni', FillDate: date, PickItemLocationDescription: 'Picking', FillQuantity: 10, OrderQuantity: 20,
    DisplayPatientRoomAndArea: false, DisplayPatientRoom: false, DisplayArea: true, DisplayOmniName: true,
    DisplayPatientNameSecondLine: true, PharmacyQOH: 10101, UnfilledReason: 'unfilled', PrintFillDate: '10/12/2020',
    DisplayFillRequired: '10/20', DisplayDestionationValue: '134,', DescriptionSortValue: 'sort', DestinationSortValue: 'sorint',
    ItemFormatedDescription: '5% dextrose in water 1000ml bag', ItemBrandDescription: 'Tylenol', ItemIdDescription: '001EEE',
    AreaDesctiptionForReport: '#Childeren Hospital', patientNameForReport: 'Aaron, Derron', DestinationOmniForReport: 'POD 3B ext28270'
  },
];

  beforeEach(async(() => {
    wpfActionControllerService = { ExecuteBackAction: () => { } };
    spyOn(wpfActionControllerService, 'ExecuteBackAction');
    printWithBaseData = jasmine.createSpy('printWithBaseData');
    const pdfGridReportService: Partial<PdfGridReportService> = {
      printWithBaseData
    };
    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };
    const popupDismissedSubject = new Subject<boolean>();
    spyOn(DatePipe.prototype, 'transform').and.returnValue('M/d/yyyy h:mm:ss a');
    const popupResult: Partial<DropdownPopupComponent> = { dismiss: popupDismissedSubject };
    const workstationTrackerService: Partial<WorkstationTrackerService> = { GetWorkstationShortName: () => of(''), UnTrack: () => of() };
    const showSpy = jasmine.createSpy('show').and.returnValue(popupResult);
    spyOn(workstationTrackerService, 'GetWorkstationShortName').and.returnValue(of(''));

    TestBed.configureTestingModule({
      declarations: [
        UnderfilledPicklistLinesPageComponent,
        UnderfilledPicklistLinesComponent,
        MockTranslatePipe,
        MockedDatePipe,
        MockAppHeaderContainer,
      ],
      providers: [
        { provide: UnderfilledPicklistLinesService, useValue: { get: () => of([]) } },
        { provide: UnderfilledPicklistsService, useValue: { getForOrder: () => of(''),
        doesUserHaveDeletePicklistPermissions: () => of(true) } },

        { provide: ResetPickRoutesService, useValue: { reset: () => of() } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: TableBodyService, useValue: { buildTableBody: () => of({}) } },
        { provide: PdfGridReportService, useValue: pdfGridReportService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: PdfPrintService, useValue: { getReportBaseData: () => of({}) } },
        { provide: WpfActionControllerService, useValue: wpfActionControllerService },
        { provide: WorkstationTrackerService, useValue: workstationTrackerService },
        { provide: PopupDialogService, useValue: simpleDialogService }
      ],
      imports: [
        FooterModule,
        LayoutModule,
        ButtonActionModule,
      ]
    })
    .overrideComponent(UnderfilledPicklistLinesComponent, {
      set: {
        template: ''
      }
    })
    .overrideComponent(HeaderContainerComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderfilledPicklistLinesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.picklistLines$ = of(pickListLinesData);
    component.reportPickListLines$ = component.picklistLines$;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Unfilled record selection', () => {
    it('Should get report data ', fakeAsync(() => {
      component.reportPickListLines$ = of(pickListLinesData);
      const getReportFields = spyOn(component, 'getReportData').and.callThrough();
      component.ngOnInit();
      tick();
      expect(getReportFields).toHaveBeenCalledTimes(1);
    }));
  });

  describe('navigateBack', () => {
    it('should call wpfActionControllerService.back', () => {
      component.navigateBack();
      expect(wpfActionControllerService.ExecuteBackAction).toHaveBeenCalled();
    });
  });

  describe('Button Enabled', () => {
    it('should be enabled', () => {
      // Selected > 0
      component.currentItemCountSelected = 1;
      // request status == none
      component.requestStatus = 'none';
      expect(component.buttonEnabled === true);
    });

    it('should NOT be enabled for selected count', () => {
      // Selected = 0 will fail
      component.currentItemCountSelected = 0;
      // request status == none will pass
      component.requestStatus = 'none';
      expect(component.buttonVisible === false);
    });

    it('should NOT be enabled for status', () => {
      // Selected = 1 would pass
      component.currentItemCountSelected = 1;
      // request status !== none willfail
      component.requestStatus = 'printing';
      expect(component.buttonVisible === false);
    });
  });


  describe('Close Button Visible', () => {
    it('should be visible', () => {
      expect(component.buttonVisible === true);
    });

    it('should NOT be visible', () => {
      TestBed.overrideProvider(UnderfilledPicklistsService, {useValue: { getForOrder: () => of(''),
      doesUserHaveDeletePicklistPermissions: () => of(true) }});
      expect(component.buttonVisible === false);
    });
  });

  describe('print', () => {
    describe('succeeded', () => {
      const pickList: any = {};
      const baseData: any = {};
      beforeEach(() => {
        pickList.OrderId = 'PHA00000101';
        pickList.PriorityCode = 'Patient';
        component.reportBaseData$ = of(baseData);
        component.picklist$ = of(pickList);
      });
      it('should display info dialog', () => {
        printWithBaseData.and.returnValue(of(true));
        component.print();
        expect(new DatePipe('en-US').transform('yyyy-dd-mm|hh:mm:ss')).toEqual('M/d/yyyy h:mm:ss a');
        expect(simpleDialogService.displayInfoOk).toHaveBeenCalled();
      });
    });
    describe('failed', () => {
      const pickList: any = {};
      const baseData: any = {};
      beforeEach(() => {
        pickList.OrderId = 'PHA00000101';
        pickList.PriorityCode = 'Patient';
        component.reportBaseData$ = of(baseData);
        component.picklist$ = of(pickList);
      });
      it('should display error dialog', () => {
        printWithBaseData.and.returnValue(of(false));
        component.requestStatus = 'none';
        component.print();
        expect(simpleDialogService.displayErrorOk).toHaveBeenCalled();
      });
    });
  });

});
