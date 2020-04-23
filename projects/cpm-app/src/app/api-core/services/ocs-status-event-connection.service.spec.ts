import { TestBed } from '@angular/core/testing';

import { OcsStatusEventConnectionService } from './ocs-status-event-connection.service';
import { EventConnectionService } from '../../xr2/services/event-connection.service';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';

describe('OcsStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
    { provide: EventConnectionService, useValue: {} },
    { provide: ConfigurationService, useValue: { getItem: () => {} } },
    { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
  ]
}));

  it('should be created', () => {
    const service: OcsStatusEventConnectionService = TestBed.get(OcsStatusEventConnectionService);
    expect(service).toBeTruthy();
  });
});
