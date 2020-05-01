import { TestBed } from '@angular/core/testing';

import { EventConnectionService } from '../../xr2/services/event-connection.service';
import { ConfigurationService } from 'oal-core';
import { OcapUrlBuilderService } from '../../shared/services/ocap-url-builder.service';
import { CoreEventConnectionService } from './core-event-connection.service';

describe('CoreEventConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
    { provide: EventConnectionService, useValue: {} },
    { provide: ConfigurationService, useValue: { getItem: () => {} } },
    { provide: OcapUrlBuilderService, useValue: { buildUrl: () => {}} },
  ]
}));

  it('should be created', () => {
    const service: CoreEventConnectionService = TestBed.get(CoreEventConnectionService);
    expect(service).toBeTruthy();
  });
});
