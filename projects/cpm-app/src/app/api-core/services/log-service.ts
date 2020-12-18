import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { LogVerbosity } from 'oal-core';
import { CpmLogLevel } from '../../shared/enums/cpm-log-level';
import { CoreEventConnectionService } from './core-event-connection.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ILoggerConfigurationUpdateEvent } from '../events/i-logger-configuration-update-event';
import { LoggerConfiguration } from '../../shared/model/logger-configuration';

@Injectable({
  providedIn: 'root'
})
export class LogService implements OnDestroy {

  systemLoggerConfiguration: LoggerConfiguration;
  ngUnsubscribe = new Subject();

  constructor(
    private httpClient: HttpClient,
    private ocapUrlBuilderService: OcapUrlBuilderService,
    private ocapHttpHeadersService: OcapHttpHeadersService,
  ) {
    this.loadConfiguration();
   }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  logMessageAsync(verbosity: LogVerbosity, severity: CpmLogLevel, category: string, message: string) {
    if(this.shouldLogWithSystemVerbosityLevel(verbosity)) {
      this.logMessage(verbosity, severity, category, message).subscribe();
    }
  }

  async loadConfiguration() {
    this.systemLoggerConfiguration = await this.getConfiguration().toPromise();
  }

  private logMessage(verbosity: LogVerbosity, severity: CpmLogLevel, category: string, message: string) {
    const url = this.ocapUrlBuilderService.buildUrl('/api/AngularLogging/logsingleevent');
    return this.httpClient.post(url, { TimeStamp: new Date(),
       Message: message, Verbosity: verbosity, LogLevel: severity, CategoryName: category, ApplicationPrefix: '' } , {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  private getConfiguration(): Observable<LoggerConfiguration> {
    const url = this.ocapUrlBuilderService.buildUrl('/api/AngularLogging/getloggerconfiguration');
    return this.httpClient.get<LoggerConfiguration>(url, {
      headers: this.ocapHttpHeadersService.getHeaders()
    });
  }

  private shouldLogWithSystemVerbosityLevel(logMessageVerbosityLevel: LogVerbosity) {
    if(!this.systemLoggerConfiguration) {
      return false;
    }

    return this.systemLoggerConfiguration.LogVerbosityLevel >= logMessageVerbosityLevel;
  }
}
