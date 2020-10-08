import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FooterModule, LayoutModule, ButtonActionModule } from '@omnicell/webcorecomponents';

import { UnderfilledPicklistLinesPageComponent } from './underfilled-picklist-lines-page.component';
import { UnderfilledPicklistLinesComponent } from '../underfilled-picklist-lines/underfilled-picklist-lines.component';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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
import { MockedDatePipe} from '../testing/mock-date-pipe.spec'
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { DatePipe } from '@angular/common';
import { UnderfilledPicklistLine } from '../model/underfilled-picklist-line';


describe('UnderfilledPicklistLinesPageComponent', () => {
  let component: UnderfilledPicklistLinesPageComponent;
  let fixture: ComponentFixture<UnderfilledPicklistLinesPageComponent>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let printWithBaseData: jasmine.Spy;
  let date = new Date();
  let pickListLinesData: UnderfilledPicklistLine[] = [{
    DestinationId:"1241", DestinationType:"P", PriorityCode:"Patient", PicklistTypeDb:"P",ItemId:"8939",
    ItemFormattedGenericName:"aectonla", ItemBrandName:"ace", PatientRoom:"2121", PatientName:"BIN",AreaDescription:"121",
    DestinationOmni:"omni", FillDate: date, PickItemLocationDescription:"Picking", FillQuantity:10, OrderQuantity:20,
    DisplayPatientRoomAndArea:false, DisplayPatientRoom:false, DisplayArea:true, DisplayOmniName:true,
    DisplayPatientNameSecondLine:true,PharmacyQOH:10101, UnfilledReason:"unfilled", PrintFillDate:"10/10/2020",
    DisplayFillRequired:"10/20", DisplayDestionationValue:"134,", DescriptionSortValue:"sort", DestinationSortValue:"sorint",
    ItemFormatedDescription: "5% dextrose in water 1000ml bag", ItemBrandDescription:"Tylenol",ItemIdDescription:"001EEE"
  },
  {
    DestinationId:"1242", DestinationType:"P", PriorityCode:"Area", PicklistTypeDb:"P",ItemId:"8939",
    ItemFormattedGenericName:"aectonla", ItemBrandName:"ace", PatientRoom:"2122", PatientName:"Jhon",AreaDescription:"122",
    DestinationOmni:"omni", FillDate: date, PickItemLocationDescription:"Picking", FillQuantity:10, OrderQuantity:20,
    DisplayPatientRoomAndArea:false, DisplayPatientRoom:false, DisplayArea:true, DisplayOmniName:true,
    DisplayPatientNameSecondLine:true,PharmacyQOH:10101, UnfilledReason:"unfilled", PrintFillDate:"10/11/2020",
    DisplayFillRequired:"10/20", DisplayDestionationValue:"134,", DescriptionSortValue:"sort", DestinationSortValue:"sorint",
    ItemFormatedDescription: "5% dextrose in water 1000ml bag", ItemBrandDescription:"Tylenol",ItemIdDescription:"001EEE"
  },
  {
    DestinationId:"1243", DestinationType:"P", PriorityCode:"FirstDose", PicklistTypeDb:"P",ItemId:"8939",
    ItemFormattedGenericName:"aectonla", ItemBrandName:"ace", PatientRoom:"2123", PatientName:"Jack",AreaDescription:"123",
    DestinationOmni:"omni", FillDate: date, PickItemLocationDescription:"Picking", FillQuantity:10, OrderQuantity:20,
    DisplayPatientRoomAndArea:false, DisplayPatientRoom:false, DisplayArea:true, DisplayOmniName:true,
    DisplayPatientNameSecondLine:true,PharmacyQOH:10101, UnfilledReason:"unfilled", PrintFillDate:"10/12/2020",
    DisplayFillRequired:"10/20", DisplayDestionationValue:"134,", DescriptionSortValue:"sort", DestinationSortValue:"sorint",
    ItemFormatedDescription: "5% dextrose in water 1000ml bag", ItemBrandDescription:"Tylenol",ItemIdDescription:"001EEE"
  },
];
  
  beforeEach(async(() => {
    wpfActionControllerService = { ExecuteBackAction: () => { } };
    spyOn(wpfActionControllerService, 'ExecuteBackAction');
    printWithBaseData = jasmine.createSpy('printWithBaseData');
    let pdfGridReportService: Partial<PdfGridReportService> = {
      printWithBaseData: printWithBaseData
    };
    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };
    spyOn(DatePipe.prototype,'transform').and.returnValue('M/d/yyyy h:mm:ss a');

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
        { provide: UnderfilledPicklistsService, useValue: { getForOrder: () => of() } },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: TableBodyService, useValue: { buildTableBody: () => of({}) } },
        { provide: PdfGridReportService, useValue: pdfGridReportService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: PdfPrintService, useValue: { getReportBaseData: () => of({}) } },
        { provide: WpfActionControllerService, useValue: wpfActionControllerService }
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

  describe('print', () => {
    describe('succeeded', () => {
      let pickList: any = {};
      let baseData: any = {};
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
      let pickList: any = {};
      let baseData: any = {};
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
