import { Injectable, OnDestroy } from '@angular/core';
import { ConfigurationService, HubConnectionBase, LoggerService, DeferredUtility, LogVerbosity } from 'oal-core';
import { OcapUrlBuilderService } from './ocap-url-builder.service';
import { HubConfigurationService } from './hub-configuration.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventConnectionService extends HubConnectionBase implements OnDestroy {
  private isConnectedStarted: boolean;

  public startedSubject = new ReplaySubject(1);
  public ngUnsubscribe = new Subject();

  public get isConnected(): boolean {
    return this.isConnectedStarted;
  }

  constructor(private loggerService: LoggerService, deferredUtility: DeferredUtility, configurationService: ConfigurationService,
              private hubConfigurationService: HubConfigurationService, private ocapUrlBuilderService: OcapUrlBuilderService) {
      super(loggerService, deferredUtility, configurationService);

      this.isConnectedStarted = false;
      this.SubscribeToConnectionEvents();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public async startUp(): Promise<void> {
    console.log('EventConnectionService.Startup called, current connection alive: ' + this.isConnectionAlive().toString());

    if (this.isConnectedStarted) {
      // Connection is already started - it will handle reconnections on it's own until disconnected.
      return;
    }

    await this.start(this.ocapUrlBuilderService.buildUrl(''), this.hubConfigurationService.hubName);
    console.log('EventConnectionService.Startup complete, current connection alive: ' + this.isConnectionAlive().toString());
  }

  /* istanbul ignore next */
  protected onReceived(message: string): void {
    const refMap = {};
    const eventArgsAsAny = message as any;

    if (eventArgsAsAny.M === 'RegisterClientInfo') {
      // This is a registration message we will get when connecting, not always on each connection.
      // Instead of treating it like an event, stop it here, log it for tracking.
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

  SubscribeToConnectionEvents() {
    this.connectionStartedSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => { this.startedSubject.next(); this.isConnectedStarted = true; });
    this.disconnectedSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => { this.startedSubject = new ReplaySubject(1); this.isConnectedStarted = false; });
  }
}
