import { IGridColumnDefinition } from "../interfaces/i-grid-column-definition";


export interface IDetailsSimpleGridPopupData<T> {
  popupTitle: string
  columnDefinition: IGridColumnDefinition<T>[];
  description: string;
  id: string;
  detailsList: string[];
  gridData: T[];
  descriptionTitleResourceKey: string;
  idTitleResourceKey: string;
  listTitleResourceKey: string;
  primaryButtonTextResourceKey?: string;
  secondaryButtonTextResourceKey?: string;
  showPrimaryButton: boolean
  showSecondaryButton: boolean;
}
