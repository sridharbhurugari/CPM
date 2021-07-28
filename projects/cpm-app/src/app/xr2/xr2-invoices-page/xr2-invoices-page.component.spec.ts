import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ButtonActionModule, FooterModule, GridModule, PopupDialogModule, PopupDialogService, SingleselectDropdownModule, SvgIconModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { LogService } from '../../api-core/services/log-service';
import { InvoicesService } from '../../api-xr2/services/invoices.service';
import { MockSearchBox } from '../../core/testing/mock-search-box.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { SimpleDialogService } from '../../shared/services/dialogs/simple-dialog.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';
import { MockXr2DeviceSelectionHeaderComponent } from '../../shared/testing/mock-xr2-device-selection-header-component.spec';
import { Xr2InvoicesQueueComponent } from '../xr2-invoices-queue/xr2-invoices-queue.component';
import { Xr2InvoicesPageComponent } from './xr2-invoices-page.component';

describe('Xr2InvoicesPageComponent', () => {
  let component: Xr2InvoicesPageComponent;
  let fixture: ComponentFixture<Xr2InvoicesPageComponent>
  let wpfActionControllerService: Partial<WpfActionControllerService>;
  let invoicesService: Partial<InvoicesService>;
  let logService: Partial<LogService>;
  let dialogService: Partial<PopupDialogService>;
  let translateService: Partial<TranslateService>;
  let simpleDialogService: Partial<SimpleDialogService>;

  beforeEach(async(() => {
    wpfActionControllerService = { ExecuteBackAction: jasmine.createSpy('ExecuteBackAction') };

    invoicesService = {
      getInvoiceItems: jasmine.createSpy('getInvoiceItems').and.returnValue(of([])),
      deleteInvoice: jasmine.createSpy('deleteInvoice').and.returnValue(of(true)),
    };

    logService = { logMessageAsync: jasmine.createSpy('logMessageAsync') };

    dialogService = { showOnce: jasmine.createSpy('showOnce') };

    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService)),
      getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US')),
    };

    simpleDialogService = {
      displayErrorOk: jasmine.createSpy('displayErrorOk'),
    };

    TestBed.configureTestingModule({
      declarations: [ Xr2InvoicesPageComponent, Xr2InvoicesQueueComponent,  MockCpClickableIconComponent, MockSearchBox,
        MockTranslatePipe, MockColHeaderSortable, MockSearchPipe, MockCpDataLabelComponent, MockXr2DeviceSelectionHeaderComponent],
      imports: [GridModule, ButtonActionModule, PopupDialogModule, HttpClientModule, FooterModule, SingleselectDropdownModule, SvgIconModule],
      providers: [
        { provide: WpfActionControllerService, useValue: wpfActionControllerService },
        { provide: InvoicesService, useValue: invoicesService },
        { provide: LogService, useValue: logService },
        { provide: PopupDialogService, useValue: dialogService },
        { provide: TranslateService, useValue: translateService },
        { provide: SimpleDialogService, useValue: simpleDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2InvoicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
