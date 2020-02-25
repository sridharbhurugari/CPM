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
  private _hubUrl;// = 'http://localhost:8077';

  public receivedSubject = new Subject<string>();
  public dispenseBoxCompleteSubject = new Subject<string>();
  public orderBoxCountSubject = new Subject<string>();

  constructor() {
    //this._hubUrl = this.getHubUrl();
  }

  public async startUp(): Promise<void> {
    this._hubConnection = new hubConnection(this._hubUrl);

    await this.createHubProxy();

    this.configureEventHandlers();

    await this._hubConnection.start()
    .done(() => { this.onConnectionStartSucceeded(); })
    .fail(() => { this.onConnectionStartFailed(); });
  };

  private getHubUrl(): string {
    const ocapConfigString = localStorage.getItem('ocap');
    const ocapConfig = JSON.parse(ocapConfigString);

    const ocapServerIP = ocapConfig.ocapServerIP;
    const port = ocapConfig.port;
    const useSecured = ocapConfig.useSecured;

    const protocol = useSecured ? 'https' : 'http';

    const hubUrl = `${protocol}://${ocapServerIP}:${port}`;
    alert(hubUrl);
    return hubUrl;
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
    this._hubProxy.on('dispenseBoxComplete', message => { this.onComplete(message); });
    this._hubProxy.on('orderBoxCount', message => { this.onCount(message); });
  }

  protected onReceived(message: string): void {
    console.log('Received ' + message);
    this.receivedSubject.next(message);
  }

  protected onComplete(message: string): void {
    console.log('Received complete ' + message);
    this.dispenseBoxCompleteSubject.next(message);
  }

  protected onCount(message: string): void {
    console.log('Received count ' + message);
    this.orderBoxCountSubject.next(message);
  }

}
