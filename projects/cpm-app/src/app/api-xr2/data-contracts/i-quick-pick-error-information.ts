import { Guid } from 'guid-typescript';
import { QuickPickEventTypes } from './../../xr2/model/quick-pick-event-types';

export interface IQuickPickErrorInformation {
  ErrorType: QuickPickEventTypes;
  ErrorDescription: string;
  ErrorIdentifier: Guid;
}
