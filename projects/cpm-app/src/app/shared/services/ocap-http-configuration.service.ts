import { Injectable } from '@angular/core';
import { IOcapHttpConfiguration } from '../interfaces/i-ocap-http-configuration';
import { ConfigurationService } from 'oal-core';

@Injectable({
  providedIn: 'root'
})
export class OcapHttpConfigurationService {
  ocapHttpConfiguration: IOcapHttpConfiguration;

  constructor(private configurationService: ConfigurationService) { }

  get(): IOcapHttpConfiguration{
    if(!this.ocapHttpConfiguration){
      this.setConfiguration();
    }

    return this.ocapHttpConfiguration;
  }

  private setConfiguration(){
    const clientId = this.configurationService.getItem('clientid');
    const apiKey = this.configurationService.getItem('apiKey');
    const machineName = this.configurationService.getItem('machinename');
    const ocapclientName = this.configurationService.getItem('clientname');
    const ocapserverip = this.configurationService.getItem('ocapserverip');
    const ocapport = this.configurationService.getItem('port');
    const ocapsecured = this.configurationService.getItem('usesecured');
    const ocaplocale = this.configurationService.getItem('userlocale');
    if(!ocapserverip){
      this.ocapHttpConfiguration = { apiKey: '', machineName: '', clientId: '', ocapServerIP: '', port: '',
       useSecured: 'true', userLocale: 'en-US', clientName: 'CpmAngular' };
      return;
    }
    this.ocapHttpConfiguration = { apiKey: apiKey, machineName: machineName, clientId: clientId, ocapServerIP: ocapserverip,
       port: ocapport, useSecured: ocapsecured, userLocale: ocaplocale,
       clientName: ocapclientName == null ? 'CpmAngular' : ocapclientName };
  }
}
