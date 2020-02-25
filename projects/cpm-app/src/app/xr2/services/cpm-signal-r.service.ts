import { Injectable } from '@angular/core';
import { LoggerService, ConfigurationService, SignalRService, LogVerbosity, TokenService } from 'oal-core';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class CpmSignalRService {

  private messageSubscription;
  private hubName = 'PubService';

  constructor(private configurationService: ConfigurationService,
              private signalRService: SignalRService,
              private loggerService: LoggerService,
              private ocapHttpConfigurationService: OcapHttpConfigurationService) {
    this.startSignalRService();
  }

  private async startSignalRService(): Promise<void> {
    const hubUrl = this.getHubUrl();
    const options = this.buildOptionsParam();
    await this.signalRService.start(hubUrl, this.hubName, options);
    this.hookupEventHandlers();
  }

  private buildOptionsParam(): any {
    const ocapHttpConfig = this.ocapHttpConfigurationService.get();
    const apiKey = ocapHttpConfig.apiKey;
    const clientId = ocapHttpConfig.clientId;
    const machineName = ocapHttpConfig.machineName;
    const ocapServerIP = this.configurationService.getItem('ocapServerIP');
    const port = this.configurationService.getItem('port');
    const endpointPrefix = this.configurationService.getItem('endpointPrefix');
    const useSecured = this.configurationService.getItem('useSecured');
    const options = { qs : 'apiKey=' + apiKey + ';clientId=' + clientId + ';machineName=' + machineName +
    ';useSecured=' + useSecured + ';port=' + port + ';ocapServerIP=' + ocapServerIP + ';endpointPrefix=' +
    endpointPrefix + ';userLocal=en-US;'  };

    return options;
  };

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
