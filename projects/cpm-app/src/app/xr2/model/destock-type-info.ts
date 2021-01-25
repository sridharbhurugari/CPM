import { IDestockTypeInfo} from '../../api-xr2/data-contracts/i-destock-type-info';

export class DestockTypeInfo implements IDestockTypeInfo {
  constructor(destockTypeInfo: IDestockTypeInfo) {
    Object.assign(this, destockTypeInfo);
  }
  Xr2DestockType_ResourcesManager: string;
  Xr2DestockType_Display: string;
  Barcode: string;
  DefaultDisplayOrder: number;
  DaysToExpire: number;
  ItemCount: number;
  BinCount: number;
}
