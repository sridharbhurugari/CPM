import { IXr2ExceptionDetailsItem } from '../../api-xr2/data-contracts/i-xr2-exception-details-item';

export class Xr2ExceptionDetailsItem implements IXr2ExceptionDetailsItem {

  constructor(xr2ExceptiondetailsItem: IXr2ExceptionDetailsItem) {
    Object.assign(this, xr2ExceptiondetailsItem);
  }
  TrayID: string;
  TrayDescription: string;
  DeviceName: string;
  CompletedDateTime: string;
  IsReturn: boolean;
  Reason: string;
  PocketColumn: string;
  PocketRow: string;
  ItemDescription:string;
  ItemID: string;
  BarCode: string;
}
