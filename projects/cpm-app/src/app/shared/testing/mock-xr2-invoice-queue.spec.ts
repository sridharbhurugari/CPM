import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
import { IColHeaderSortChanged } from '../events/i-col-header-sort-changed';
import { SelectableDeviceInfo } from '../model/selectable-device-info';
import { Xr2Stocklist } from '../model/xr2-stocklist';

@Component({
  selector: 'app-xr2-invoices-queue',
  template: ''
})


export class MockXr2InvoicesQueueComponent {
  @Output() sortEvent: EventEmitter<IColHeaderSortChanged> = new EventEmitter();
  @Output() detailsClickEvent: EventEmitter<IXr2Stocklist> = new EventEmitter();
  @Output() displayYesNoDialogEvent: EventEmitter<IXr2Stocklist> = new EventEmitter();

  @Input() unfilteredInvoiceItems: Xr2Stocklist[]
  @Input() selectedDeviceInformation: SelectableDeviceInfo;
  @Input() searchTextFilter: string;

  deleteInvoice = (invoice: IXr2Stocklist) => {}
}
