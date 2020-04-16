import {Injectable} from '@angular/core';
import {HubConfigurationConstants} from '../../shared/constants/hub-configuration-constants';

@Injectable({
  providedIn: 'root'
})

export class HubConfigurationService {

  _hubName: string;

  constructor() {
    this._hubName = HubConfigurationConstants.hubName;
  }

  public get hubName() {
    return this._hubName;
  }
}
