import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
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

  public startedSubject = new ReplaySubject(1);

  public started: boolean = false;

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
  }

  public async startUp(): Promise<void> {
    this._hubUrl =  this.ocapUrlBuilderService.buildUrl('');
    this.initialize();
    await this.createHubProxy();
    this.configureEventHandlers();
    this._hubConnection
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
    this.receivedSubject.next(message);
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
    this._hubProxy = this._hubConnection.createHubProxy(this._hubName);
  }

  private onConnectionStart(): void {
    console.log('Attempting to connect SignalR Hub at: ' + this.url);
  }

  private onConnectionStartSucceeded(): void {
    console.log('SignalR Hub connection has been established');
    console.log('Connection ID: ' + this.connectionId);
    console.log('Hub Name: ' + this.hubName);
    this.started = true;
    this.startedSubject.next();
  }

  private onConnectionStartFailed(error: Error): void {
    console.log('Failed to establish a SignalR Hub connection at: ' + this.url + '. Error: ' + error);
  }

  private configureEventHandlers(): void {
    this._hubProxy.on('serverMessageSent', message => { this.onReceived(message); });
  }

  private disposeHubConnection() {
    if (this._hubConnection === null) {
      return;
    }

    this._hubConnection.stop();
    this._hubConnection = null;
  }

  private getQueryString(): string {

    const ocapClientDetails = this.configurationService.getItem(OcapConfigurationConstants.storageKey);

    const apiKey = ocapClientDetails.apiKey;
    const machineName =  ocapClientDetails.machineName;
    const clientId =  ocapClientDetails.clientId;

    const queryString = `x-clientid=${clientId}&x-apikey=${apiKey}&x-machinename=${machineName}`;

    return queryString;
  }
}
