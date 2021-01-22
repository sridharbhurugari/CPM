import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoggerService } from 'oal-core';
import { EventConnectionService } from './event-connection.service';
import { LocalStorageService } from './local-storage.service';
import { WindowService } from './window-service';

import { WpfInteropService } from './wpf-interop.service';

describe('WpfInteropService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: WindowService, useValue: { } },
      { provide: Router, useValue: { } },
      { provide: LocalStorageService, useValue: { } },
      { provide: EventConnectionService, useValue: { } },
      { provide: LoggerService, useValue: { } },
    ]
  }));

  it('should be created', () => {
    const service: WpfInteropService = TestBed.get(WpfInteropService);
    expect(service).toBeTruthy();
  });
});
