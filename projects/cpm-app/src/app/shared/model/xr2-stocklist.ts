import { IXr2Stocklist } from '../../api-core/data-contracts/i-xr2-stocklist';

export class Xr2Stocklist implements IXr2Stocklist {

  constructor(invoiceItem: IXr2Stocklist) {
    Object.assign(this, invoiceItem);
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
}
