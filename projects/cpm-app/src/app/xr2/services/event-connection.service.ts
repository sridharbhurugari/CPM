import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { signalR, hubConnection, hubProxy } from 'signalr-no-jquery';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { HubConfigurationService } from './hub-configuration.service';
import { OcapConfigurationConstants} from '../../shared/constants/ocap-configuration-constants';

@Injectable({
  providedIn: 'root'
})
export class EventConnectionService {

  protected _hubConnection: hubConnection;
  protected _hubProxy: hubProxy;
  private _hubUrl: string;
  private _hubName: string;

  public receivedSubject = new Subject<string>();

  public get connectionState(): signalR.connectionState {
    if (this._hubConnection === null) {
        return signalR.connectionState.disconnected;
    }

    return this._hubConnection.state;
  }

    public get url(): string {
      return this._hubUrl;
    }

    public get connectionId(): string {
      return this._hubConnection.id;
    }

    public get headers() {
      return this._hubConnection.headers;
    }

    public get hubName(): string {
      return this._hubName;
    }

  constructor(
    hubConfigurationService: HubConfigurationService,
    protected configurationService: ConfigurationService,
    protected ocapUrlBuilderService: OcapUrlBuilderService
  ) {
    this._hubName = hubConfigurationService.hubName;
    this._hubUrl =  this.ocapUrlBuilderService.buildUrl('');
  }

  public async startUp(): Promise<void> {
    this.initialize();
    await this.createHubProxy();
    await this._hubConnection
    .start(() => {this.onConnectionStart(); })
    .done(() => { this.onConnectionStartSucceeded(); })
    .fail((error) => { this.onConnectionStartFailed(error); });
  }

  public stop() {
    this._hubConnection.stop();
  }

  public dispose() {
    this.disposeHubConnection();
  }

  protected onReceived(message: any): void {
    const eventArgsAsAny = message as any;
    const serializedObject = eventArgsAsAny.A[0];
    const deserializedObject = JSON.parse(serializedObject);

    this.receivedSubject.next(deserializedObject);
    return;
  }

  private initialize() {
    const queryString = this.getQueryString();
    const options = {
        qs: queryString,
        logging: false,
        useDefaultPath: true,
    };
    this._hubConnection = new hubConnection(this._hubUrl, options);
  }

  private async createHubProxy(): Promise<void> {
    this._hubProxy = await this._hubConnection.createHubProxy(this.hubName);
    this.hookupProxyEventHandlers();
  }

  private onConnectionStart(): void {
    console.log('Attempting to connect SignalR Hub at: ' + this.url);
  }

  private onConnectionStartSucceeded(): void {
    console.log('SignalR Hub connection has been established');
    console.log('Connection ID: ' + this.connectionId);
    console.log('Hub Name: ' + this.hubName);
    this.hookupHubEventHandlers();
  }

  private onConnectionStartFailed(error: Error): void {
    console.log('Failed to establish a SignalR Hub connection at: ' + this.url + '. Error: ' + error);
  }

  private disposeHubConnection() {
    if (this._hubConnection === null) {
      return;
    }

    this.unhookHubEventHandlers();
    this.unhookProxyEventHandlers();
    this._hubConnection.stop();
    this._hubConnection = null;
  }

  private hookupHubEventHandlers(): void {
    if (this.isInvalid(this._hubConnection)) {
        return;
    }

    this._hubConnection.disconnected(() => {
        this.onConnectionClosed();
    });
    this._hubConnection.connectionSlow(() => {
        this.onConnectionSlow();
    });
    this._hubConnection.error(error => {
        this.onError(error);
    });
    this._hubConnection.received(dataReceived => {
        this.onReceived(dataReceived);
    });
    this._hubConnection.reconnected(() => {
        this.onReconnected();
    });
    this._hubConnection.reconnecting(() => {
        this.onReconnecting();
    });
    this._hubConnection.stateChanged(stateChange => {
        this.onConnectionStateChanged(stateChange);
    });
  }

  private unhookHubEventHandlers(): void {
    if (this.isInvalid(this._hubConnection)) {
        return;
    }

    this._hubConnection.disconnected(() => {});
    this._hubConnection.connectionSlow(() => {});
    this._hubConnection.error(error => {});
    this._hubConnection.received(dataReceived => {});
    this._hubConnection.reconnected(() => {});
    this._hubConnection.reconnecting(() => {});
    this._hubConnection.stateChanged(stateChange => {});
}

  protected hookupProxyEventHandlers(): void {
    this._hubProxy.on('ServerConnected', () => {
        this.onProxyEventServerConnected();
    });

    this._hubProxy.on('ServerReconnected', canResume => {
        this.onProxyEventServerReconnected(canResume);
    });
  }

  protected unhookProxyEventHandlers(): void {
    this._hubProxy.off('ServerConnected', () => {
        this.onProxyEventServerConnected();
    });

    this._hubProxy.off('ServerReconnected', canResume => {
        this.onProxyEventServerReconnected(canResume);
    });
  }

  private onConnectionClosed(): void {
      console.log('SignalR Disconnected');
  }

  private onConnectionSlow(): void {
    console.log('SignalR Connection Slow');
  }

  private onError(error: Error): void {
    console.log('SignalR Error' + error);
  }

  private onProxyEventServerConnected(): void {
    console.log('SignalR Proxy Event Connected');
  }

  private onProxyEventServerReconnected(canResume: boolean): void {
    console.log('SignalR Proxy Event Reconnected');
  }

  private onReconnected(): void {
    console.log('SignalR Reconnected');
  }

  private onReconnecting(): void {
    console.log('SignalR Reconnecting');
  }

  private onConnectionStateChanged(stateChange): void {
    console.log('SignalR Connection State Changed ' + stateChange);
  }

  protected isValid(variable: any): boolean {
    return variable !== undefined && variable !== null;
}

protected isInvalid(variable: any): boolean {
    return !this.isValid(variable);
}

  private getQueryString(): string {

    const ocapClientDetails = this.configurationService.getItem(OcapConfigurationConstants.storageKey);

    const apiKey = ocapClientDetails.apiKey;
    const machineName =  ocapClientDetails.machineName;
    const clientId =  ocapClientDetails.clientId;
    const clientName = ocapClientDetails.clientName;

    const queryString = `x-clientid=${clientId}&x-apikey=${apiKey}&x-machinename=${machineName}&x-clientname=${clientName}`;
    return queryString;
  }
}
