import { IInvoiceDetailItem } from "./i-invoice-detail-item";

export interface IXr2Stocklist {
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
  RestockTrayIds: Array<string>
  InvoiceItemDetails: Array<IInvoiceDetailItem>
}
