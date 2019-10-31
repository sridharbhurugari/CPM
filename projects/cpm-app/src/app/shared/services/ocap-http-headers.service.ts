import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpHeaders } from '@angular/common/http';
import { OcapConfigurationConstants } from '../constants/ocap-configuration-constants';
import { OcapHttpConfigurationService } from './ocap-http-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class OcapHttpHeadersService {

  constructor(private ocapHttpConfigurationService: OcapHttpConfigurationService) { }

  getHeaders(): HttpHeaders {
    var ocapHttpConfig = this.ocapHttpConfigurationService.get();
    var headers: { [name: string]: string | string[]; } = { };
    headers[OcapConfigurationConstants.apiKeyHeader] = ocapHttpConfig.apiKey;
    headers[OcapConfigurationConstants.machineNameHeader] = ocapHttpConfig.machineName;
    headers[OcapConfigurationConstants.clientIdHeader] = ocapHttpConfig.clientId;

    return new HttpHeaders(headers);
  }
}
