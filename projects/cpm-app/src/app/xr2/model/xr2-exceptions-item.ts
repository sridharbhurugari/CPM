import { IXr2ExceptionsItem } from '../../api-xr2/data-contracts/i-xr2-exception-item';

export class Xr2ExceptionsItem implements IXr2ExceptionsItem {

  constructor(xr2ExceptionsItem: IXr2ExceptionsItem) {
    Object.assign(this, xr2ExceptionsItem);
  }
  TrayID: string;
  TrayDescription: string;
  ExceptionPockets: string;
  DeviceName: string;
  CompletedDateTime: string;
}
