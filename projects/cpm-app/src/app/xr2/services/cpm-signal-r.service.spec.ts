import { TestBed } from '@angular/core/testing';

import { CpmSignalRService } from './cpm-signal-r.service';
import { HttpClient } from '@angular/common/http';

describe('CpmSignalRService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: 'env', useValue: { } },
      { provide: 'configEndpointKey', useValue: { } },
      { provide: HttpClient, useValue: { } },
    ]
  }));

  it('should be created', () => {
    const service: CpmSignalRService = TestBed.get(CpmSignalRService);
    expect(service).toBeTruthy();
  });
});
