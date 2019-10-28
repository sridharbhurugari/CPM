import { Injectable } from '@angular/core';
import { OcapHttpConfigurationService } from './ocap-http-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class OcapUrlBuilderService {

  constructor(private ocapHttpConfigurationService: OcapHttpConfigurationService) { }

  buildUrl(fragment: string){
    var config = this.ocapHttpConfigurationService.get();
    var ipAddress = config.ocapServerIP;
    var port = config.port;
    var protocol = config.useSecured ? 'https' : 'http';

    return `${protocol}://${ipAddress}:${port}${fragment}`
  }
}
