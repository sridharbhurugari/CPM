import { Injectable } from '@angular/core';
import {
  LoggerService, ConfigurationService, SignalRService, LogVerbosity, TokenService,
  HttpClientService, HostNotificationService, OcapHttpClientService, IHttpClient
} from 'oal-core';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { Subject } from 'rxjs';
import { PicklistQueueItem } from '../model/picklist-queue-item';

const TokenKey = 'ocs-user-token';
const payloadKey = 'ocap-user-token';

@Injectable({
  providedIn: 'root'
})
export class CpmSignalRService {

  private messageSubscription;
  private hubName = 'PubService';

  public addOrUpdatePicklistQueueItemSubject = new Subject<PicklistQueueItem>();
  public removePicklistQueueItemSubject = new Subject<PicklistQueueItem>();

  constructor(
    private configurationService: ConfigurationService,
    ocapHttpClient: OcapHttpClientService,
    private signalRService: SignalRService,
    private loggerService: LoggerService) {
  }

  public init(): void {
    this.configurationService.setItem('tokenpayloadKey', payloadKey);
    this.startSignalRService();
  }

  public shutdown(): void {
    this.unhookEventHandlers();
    this.signalRService.stop();
  }

  private async startSignalRService(): Promise<void> {
    const hubUrl = this.getHubUrl();
    await this.signalRService.start(hubUrl, this.hubName);
    this.hookupEventHandlers();
  }

  private hookupEventHandlers(): void {
    this.messageSubscription = this.signalRService.receivedSubject.subscribe(message => this.onReceived(message));
  }

  private unhookEventHandlers(): void {
    this.messageSubscription.unsubscribe();
  }

  private onReceived(eventArgs: string): void {
    const eventArgsAsAny = eventArgs as any;
    const serializedObject = eventArgsAsAny.A[0];
    const deserializedObject = JSON.parse(serializedObject);

    const messageTypeName: string = deserializedObject.$type;

    this.loggerService.logInfo(
      LogVerbosity.ExtremeVerbose,
      'SignalR',
      `CpmSignalRService.onReceived() - Received ${messageTypeName}.`
    );

    if (messageTypeName === undefined) {
      return;
    }

    if (messageTypeName.includes('AddOrUpdatePicklistQueueItemMessage')) {
      this.addOrUpdatePicklistQueueItemSubject.next(deserializedObject);
      return;
    }

    if (messageTypeName.includes('RemovePicklistQueueItemMessage')) {
      this.removePicklistQueueItemSubject.next(deserializedObject);
      return;
    }
  }

  private getHubUrl(): string {
    const ocapServerIP = this.configurationService.getItem('ocapServerIP');
    const port = this.configurationService.getItem('port');
    const useSecured = this.configurationService.getItem('useSecured');

    const protocol = useSecured ? 'https' : 'http';

    const hubUrl = `${protocol}://${ocapServerIP}:${port}`;

    return hubUrl;
  }
}
