import { Injectable } from '@angular/core';
import { ConfigurationService, HubConnectionBase, LoggerService, DeferredUtility, LogVerbosity } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { HubConfigurationService } from './hub-configuration.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventConnectionService extends HubConnectionBase {

  public startedSubject = new ReplaySubject(1);

  constructor(private loggerService: LoggerService, deferredUtility: DeferredUtility, configurationService: ConfigurationService,
              private hubConfigurationService: HubConfigurationService, private ocapUrlBuilderService: OcapUrlBuilderService) {
      super(loggerService, deferredUtility, configurationService);
      this.connectionStartedSubject.subscribe(() => this.startedSubject.next());
  }

  public async startUp(): Promise<void> {
    console.log('EventConnectionService.Startup called, current connection alive: ' + this.isConnectionAlive().toString());

    if (!this.isConnectionAlive()) {
    await this.start(this.ocapUrlBuilderService.buildUrl(''), this.hubConfigurationService.hubName);
    console.log('EventConnectionService.Startup complete, current connection alive: ' + this.isConnectionAlive().toString());
    }
  }

  protected onReceived(message: string): void {
    const refMap = {};
    const eventArgsAsAny = message as any;

    if (eventArgsAsAny.M === 'RegisterClientInfo') {
      console.log(message);
      return;
    }

    const serializedObject = eventArgsAsAny.A[0];
    // The function below resolves circular dependencies in JSON when using JSON.NET
    // PreserveReferencesHandling settings.  Angular JSON won't resolve these for you.
    const deserializedObject = JSON.parse(serializedObject, function(key, value) {
      if (key === '$id') {
        // Since we are in a separate function 'this' is local
        refMap[value] = this;
        return value;
      }
      if (value && value.$ref) { return refMap[value.$ref]; }
      return value;
    });
    this.receivedSubject.next(deserializedObject);
    return;
  }
}
