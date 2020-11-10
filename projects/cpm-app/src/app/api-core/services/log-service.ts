import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { LogSeverity, LogVerbosity } from 'oal-core';
import { LoggingCategory } from '../../shared/constants/logging-category';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService
  ) { }

  logMessage(verbosity: LogVerbosity, severity: LogSeverity, category: LoggingCategory, message: string) {
    console.log(message);
    const url = this.ocapUrlBuilderService.buildUrl('/api/logging/logsingleevent');
    message = severity.toString().substr(0, 1) + ' ' + category.toString() + ' ' + message;
    return this.httpClient.post(url, { TimeStamp: new Date().toLocaleString() ,
       Message: message, Verbosity: verbosity, LogLevel: severity, CategoryName: category, ApplicationPrefix: '' } , {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
