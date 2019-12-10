import { TestBed } from '@angular/core/testing';

import { PriorityCodeRouteAssignmentsService } from './priority-code-route-assignments.service';
import { HttpClient } from '@angular/common/http';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { OcapHttpHeadersService } from '../../shared/services/ocap-http-headers.service';

describe('PriorityCodeRouteAssignmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: { get: () => {}} },
      { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
      { provide: OcapHttpHeadersService, useValue: { getHeaders: () => {}} },
    ]
  }));

  it('should be created', () => {
    const service: PriorityCodeRouteAssignmentsService = TestBed.get(PriorityCodeRouteAssignmentsService);
    expect(service).toBeTruthy();
  });
});
