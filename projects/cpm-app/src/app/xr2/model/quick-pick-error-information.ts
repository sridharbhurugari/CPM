import { Guid } from 'guid-typescript';
import { IQuickPickErrorInformation } from '../../api-xr2/data-contracts/i-quick-pick-error-information';
import { QuickPickEventTypes } from './quick-pick-event-types';

export class QuickPickErrorInformation implements IQuickPickErrorInformation {
  constructor(quickPickQueueItem: IQuickPickErrorInformation) {
    Object.assign(this, quickPickQueueItem);
  }

  ErrorType: QuickPickEventTypes;
  ErrorDescription: string;
  ErrorIdentifier: Guid;
}
