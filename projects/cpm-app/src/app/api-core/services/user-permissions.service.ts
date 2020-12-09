import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

@Injectable({
    providedIn: 'root'
})
export class UserPermissionsService {

    constructor(
        private httpClient: HttpClient,
        private ocapUrlBuilderService: OcapUrlBuilderService,
        private ocapHttpHeadersService: OcapHttpHeadersService
    ) { }

    get(): Observable<string[]> {
        const url = this.ocapUrlBuilderService.buildUrl('/api/users/current/permissions');
        return this.httpClient.get<string[]>(url, { headers: this.ocapHttpHeadersService.getHeaders() });
    }
}
