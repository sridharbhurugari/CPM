import { TestBed } from '@angular/core/testing';

import { PriorityCodePickRoutesService } from './priority-code-pick-routes.service';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';

describe('PriorityCodePickRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: { get: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
    ]
  }));

  it('should be created', () => {
    const service: PriorityCodePickRoutesService = TestBed.get(PriorityCodePickRoutesService);
    expect(service).toBeTruthy();
  });
});
