import { formatDate } from '@angular/common';
import { IInvoiceDetailItem } from '../../api-core/data-contracts/i-invoice-detail-item';
import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';
export class Xr2Stocklist implements IXr2Stocklist {

  constructor(invoiceItem: IXr2Stocklist) {
    Object.assign(this, invoiceItem);
    if(this.InvoiceItemDetails)
    {
      this.InvoiceItemDetails.forEach(item => {
        item.LocalReceiveDate = formatDate(item.ReceivedDate, 'MM/dd/yyyy h:mm:ss a', 'en-us');
      });
    }
  }

  ItemFormattedGenericName: string
  ItemTradeName: string
  ItemId: string
  QuantityReceived: number
  QuantityStocked: number
  InProgress: boolean
  InvoiceNumber: string
  PoNumber: string
  OrderDate: Date
  SourceId: string
  DeviceId: number
  DeviceDescription: string
  UnitsOfIssue: string
  RestockTrayIds: Array<string>
  InvoiceItemDetails: Array<IInvoiceDetailItem>
}
