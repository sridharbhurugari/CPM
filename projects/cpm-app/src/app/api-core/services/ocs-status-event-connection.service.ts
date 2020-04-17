import { Injectable } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { EventConnectionService } from '../../xr2/services/event-connection.service';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { HttpClient } from '@angular/common/http';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';

@Injectable({
  providedIn: 'root'
})
export class OcsStatusEventConnectionService extends EventConnectionService {

  public ocsIsHealthySubject = new Subject<boolean>();

  constructor(
    configurationService: ConfigurationService,
    ocapUrlBuilderService: OcapUrlBuilderService
    ) {
    super(configurationService, ocapUrlBuilderService);
   }

  public async openEventConnection(): Promise<void> {
    this.startUp();
    this.receivedSubject.subscribe(message => this.ocsStatusEventHandlers(message));
  }

  private ocsStatusEventHandlers(message: any): void {
    if (message === undefined) {
      return;
    }

    if (message.EventId === undefined) {
      return;
    }

    if (message.EventId === 'Ocs2Available') {
      this.ocsIsHealthySubject.next(true);
      return;
    }

    if (message.EventId === 'Ocs2Unavailable') {
      this.ocsIsHealthySubject.next(false);
      return;
    }
  }
}
