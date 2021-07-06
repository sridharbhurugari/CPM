import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementListComponent } from './item-management-list.component';
import { MockGridSortCol } from '../../shared/testing/mock-grid-sort-col.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { WindowService } from '../../shared/services/window-service';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { GridModule, PopupDialogService,ButtonActionModule } from '@omnicell/webcorecomponents';
import { HttpClientModule } from '@angular/common/http';
import { ItemManagementService } from '../../api-core/services/item-management.service';
import { of, Subject } from 'rxjs';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { Xr2InventoryPdfGridReportService } from '../../shared/services/printing/xr2-inventory-pdf-grid-report-service';
import { TranslateService } from '@ngx-translate/core';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DevicesService } from '../../api-core/services/devices.service';
import * as _ from 'lodash';

describe('ItemManagementListComponent', () => {
  let component: ItemManagementListComponent;
  let fixture: ComponentFixture<ItemManagementListComponent>;
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let printWithBaseData: jasmine.Spy;
  let tableBody: jasmine.Spy;
  let devicesService: Partial<DevicesService>;

  beforeEach(async(() => {
    printWithBaseData = jasmine.createSpy('printWithBaseData');
   tableBody = jasmine.createSpy('buildTableBody');;

    devicesService = {
      getAllXr2Devices: () => of([])
    };
    const pdfGridReportService: Partial<Xr2InventoryPdfGridReportService> = {
      printWithBaseData
    };
    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };
    const popupDismissedSubject = new Subject<boolean>();
    TestBed.configureTestingModule({
      declarations: [
        ItemManagementListComponent,
        MockSearchBox,
        MockAppHeaderContainer,
        MockSearchPipe,
        MockTranslatePipe,
        MockColHeaderSortable,
        MockGridSortCol
      ],
      imports: [
        GridModule,
        ButtonActionModule,
        HttpClientModule
      ],
      providers: [
        { provide: WindowService, useValue: { }} ,
        { provide: ItemManagementService, useValue: { get: () => of([]) }},
        { provide: TableBodyService, useValue: { buildTableBody: () => of({}) } },
        { provide: Xr2InventoryPdfGridReportService, useValue: pdfGridReportService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: PdfPrintService, useValue: { getReportBaseData: () => of({}) } },
        { provide: PopupDialogService, useValue: simpleDialogService },
        { provide: DevicesService, useValue: devicesService},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
