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
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let simpleDialogService: Partial<SimpleDialogService>;
  let printWithBaseData: jasmine.Spy;

  beforeEach(async(() => {
    wpfActionControllerService = { ExecuteBackAction: () => { } };
    spyOn(wpfActionControllerService, 'ExecuteBackAction');
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
        { provide: WpfActionControllerService, useValue: wpfActionControllerService },
        { provide: DevicesService, useValue: { get: () => of([]) } },
        { provide: DeviceReplenishmentNeedsService, useValue: { getDeviceItemNeeds: () => of(needs) } },
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

  describe('goBack', () => {
    it('should call wpfActionControllerService.back', () => {
      component.goBack();
      expect(wpfActionControllerService.ExecuteBackAction).toHaveBeenCalled();
    });
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
});
