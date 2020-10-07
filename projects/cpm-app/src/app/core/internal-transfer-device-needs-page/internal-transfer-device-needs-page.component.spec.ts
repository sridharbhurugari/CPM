import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferDeviceNeedsPageComponent } from './internal-transfer-device-needs-page.component';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ButtonActionModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { ActivatedRoute } from '@angular/router';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { of } from 'rxjs';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { Input, Component } from '@angular/core';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { PdfGridReportService } from '../../shared/services/printing/pdf-grid-report-service';
import { TableBodyService } from '../../shared/services/printing/table-body.service';
import { TranslateService } from '@ngx-translate/core';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { PdfPrintService } from '../../api-core/services/pdf-print-service';

@Component({
  selector: 'app-internal-transfer-items-list',
  template: ''
})
class MockInternalTransferItemsListComponent {
  @Input()itemNeeds: IItemReplenishmentNeed[]
}

describe('InternalTransferDeviceNeedsPageComponent', () => {
  let component: InternalTransferDeviceNeedsPageComponent;
  let fixture: ComponentFixture<InternalTransferDeviceNeedsPageComponent>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let printWithBaseData: jasmine.Spy;

  beforeEach(async(() => {
    printWithBaseData = jasmine.createSpy('printWithBaseData');
    let pdfGridReportService: Partial<PdfGridReportService> = {
      printWithBaseData: printWithBaseData
    };

    const needs = [
      {
        Xr2Item: true
      }
    ];

    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
      displayInfoOk: jasmine.createSpy('displayInfoOk'),
    };

    TestBed.configureTestingModule({
      declarations: [
        InternalTransferDeviceNeedsPageComponent,
        MockInternalTransferItemsListComponent,
        MockAppHeaderContainer,
        MockTranslatePipe,
      ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap : { get: () => '8' } } } },
        { provide: WpfActionControllerService, useVaule: { } },
        { provide: DevicesService, useValue: { get: () => of([]) } },
        { provide: DeviceReplenishmentNeedsService,
          useValue: { getDeviceItemNeeds: () => of(needs),
             pickDeviceItemNeeds: () => of([]) }},
        { provide: TableBodyService, useValue: { buildTableBody: () => of({}) } },
        { provide: PdfGridReportService, useValue: pdfGridReportService },
        { provide: TranslateService, useValue: { get: () => of('') } },
        { provide: SimpleDialogService, useValue: simpleDialogService },
        { provide: PdfPrintService, useValue: { getReportBaseData: () => of({}) } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceNeedsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('print', () => {
    describe('succeeded', () => {
      it('should display info dialog', () => {
        printWithBaseData.and.returnValue(of(true));
        component.print();
        expect(simpleDialogService.displayInfoOk).toHaveBeenCalled();
      });
    });
    describe('failed', () => {
      it('should display error dialog', () => {
        printWithBaseData.and.returnValue(of(false));
        component.print();
        expect(simpleDialogService.displayErrorOk).toHaveBeenCalled();
      });
    });
  });

  describe('pick', () => {
    describe('succeeded', () => {
      it('should display info dialog', () => {
        component.itemsToPick.push({
          ItemBrandName: 'Brand Name',
          ItemFormattedGenericName: ' Generic Name',
          ItemId: 'MED01234',
          DeviceParLevel: 8000,
          DeviceQuantityNeeded: 1200,
          DeviceQuantityOnHand: 0,
          DeviceRestockLevel: 1200,
          Xr2Item: true,
          DisplayDeviceQuantityNeeded: '1220 EA',
          DisplayDeviceQuantityOnHand: '0 EA',
          DisplayNumberOfPackages: 'Packs: 1, 5, 10',
          DisplayPackageSize: 'Package Size: 1, 5, 10',
          DisplayQohNumberOfPackages: 'Packs: 0, 0, 0',
          PackSize: 1,
          PendingDevicePickQuantity: 0,
          UnitOfIssue: 'EA',
          PickLocationDescription: 'Test',
          PickLocationDeviceLocationId: 79141,
          PickLocationQoh: 500
        });
        printWithBaseData.and.returnValue(of(true));
        component.pick();
        expect(simpleDialogService.displayInfoOk).toHaveBeenCalled();
      });
    });
    describe('failed', () => {
      it('should display error dialog', () => {
        component.itemsToPick = new Array();
        component.pick();
        expect(simpleDialogService.displayErrorOk).toHaveBeenCalled();
      });
    });
  });

});
