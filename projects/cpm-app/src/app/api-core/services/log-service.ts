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

  logMessageAsync(verbosity: LogVerbosity, severity: LogSeverity, category: string, message: string) {
    this.logMessage(verbosity, severity, category, message).subscribe();
  }

  private logMessage(verbosity: LogVerbosity, severity: LogSeverity, category: string, message: string) {
    console.log(message);
    const url = this.ocapUrlBuilderService.buildUrl('/api/AngularLogging/logsingleevent');
    return this.httpClient.post(url, { TimeStamp: new Date(),
       Message: message, Verbosity: verbosity, LogLevel: severity, CategoryName: category, ApplicationPrefix: 'CPMAPP' } , {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }
}
