import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { OcapConfigurationConstants } from '../constants/ocap-configuration-constants';
import { IOcapHttpConfiguration } from '../interfaces/i-ocap-http-configuration';

@Injectable({
  providedIn: 'root'
})
export class OcapHttpConfigurationService {
  ocapHttpConfiguration: IOcapHttpConfiguration;

  constructor(private localStorageService: LocalStorageService) { }

  get(): IOcapHttpConfiguration{
    if(!this.ocapHttpConfiguration){
      this.setConfiguration();
    }

    return this.ocapHttpConfiguration;
  }

  private setConfiguration(){
    var ocapConfigurationString = this.localStorageService.getItem(OcapConfigurationConstants.storageKey);
    if(!ocapConfigurationString){
      this.ocapHttpConfiguration = { apiKey: '', machineName: '', clientId: '', ocapServerIP: '', port: '', useSecured: 'true', userLocale: 'en-US' };
      return;
    }

    this.ocapHttpConfiguration = JSON.parse(ocapConfigurationString);
  }
}
