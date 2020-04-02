import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { hubConnection, hubProxy } from 'signalr-no-jquery';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

@Injectable({
  providedIn: 'root'
})
export class EventConnectionService {

  public receivedSubject = new Subject<string>();

  protected _hubConnection: hubConnection;
  protected _hubProxy: hubProxy;

  private _hubName = 'EventHub';

  constructor(
    protected configurationService: ConfigurationService,
    protected ocapUrlBuilderService: OcapUrlBuilderService
    ) { }

  public async startUp(): Promise<void> {

    const queryString = this.getQueryString();
    const hubUrl =  this.ocapUrlBuilderService.buildUrl('');
    const options = {
        qs: queryString,
        logging: false,
        useDefaultPath: true,
    };

    this._hubConnection = new hubConnection(hubUrl, options);

    await this.createHubProxy();

    this.configureEventHandlers();

    await this._hubConnection.start()
    .done(() => { this.onConnectionStartSucceeded(); })
    .fail(() => { this.onConnectionStartFailed(); });
  };

  private async createHubProxy(): Promise<void> {
    this._hubProxy = this._hubConnection.createHubProxy(this._hubName);
  }

  public shutdown(): void {
    /*this.setToIdle();
    this.unhookEventHandlers();
    this.signalRService.stop();
    this.signalRService.dispose();*/
  }

  private onConnectionStartSucceeded(): void {
    console.log('Hub working');
  }

  private onConnectionStartFailed(): void {
    console.log('Hub not working');
  }

  private configureEventHandlers(): void {
    this._hubProxy.on('serverMessageSent', message => { this.onReceived(message); });
  }

  protected onReceived(message: any): void {
    console.log('Received ' + message);
    this.receivedSubject.next(message);
    return;
  }

  private getQueryString(): string {

    const ocapClientDetails = this.configurationService.getItem('ocap');

    const apiKey = ocapClientDetails.apiKey;
    const machineName =  ocapClientDetails.machineName;
    const clientId =  ocapClientDetails.clientId;

    const queryString = `x-clientid=${clientId}&x-apikey=${apiKey}&x-machinename=${machineName}`;

    return queryString;
  }
}
