import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { hubConnection, hubProxy } from 'signalr-no-jquery'
import { StorageService } from 'oal-core/lib/services/configuration/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventConnectionService {
  protected _hubConnection: hubConnection;
  protected _hubProxy: hubProxy;

  private _hubName = 'PubService';

  public receivedSubject = new Subject<string>();

  constructor() {
    //this._hubUrl = this.getHubUrl();
  }

  public async startUp(): Promise<void> {

    const hubUrl = this.getHubUrl();

    const queryString = this.getQueryString();
    const options = {
      qs: queryString,
      logging: false,
      useDefaultPath: true,
    };

    this._hubConnection = await new hubConnection(hubUrl, options);

    await this.createHubProxy();

    this.configureEventHandlers();

    await this._hubConnection.start()
    .done(() => { this.onConnectionStartSucceeded(); })
    .fail(() => { this.onConnectionStartFailed(); });
  };

  private getHubUrl(): string {
    const ocapServerIP = localStorage.getItem('ocapServerIP');
    const port = localStorage.getItem('port');
    const useSecured = localStorage.getItem('useSecured');

    const protocol = useSecured ? 'https' : 'http';

    const hubUrl = `${protocol}://${ocapServerIP}:${port}`;

    return hubUrl;
  }

  private getQueryString(): string {
    const clientId = localStorage.getItem('clientId');
    const apiKey = localStorage.getItem('apiKey');
    const machineName = localStorage.getItem('machineName');

    const queryString = `x-clientid=${clientId}&x-apikey=${apiKey}&x-machinename=${machineName}`;

    return queryString;
  }

  private async createHubProxy(): Promise<void> {
    this._hubProxy = this._hubConnection.createHubProxy(this._hubName);
  }

  private onConnectionStartSucceeded(): void {
    console.log('Hub working');
  }

  private onConnectionStartFailed(): void {
    console.log('Hub not working');
  }

  private configureEventHandlers(): void {
    this._hubConnection.received(dataReceived => { this.onReceived(dataReceived); });
  }

  protected onReceived(message: string): void {
    console.log('Received ' + message);
    this.receivedSubject.next(message);
  }
}
