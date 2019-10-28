import { TestBed } from '@angular/core/testing';

import { OcapUrlBuilderService } from './ocap-url-builder.service';

describe('OcapUrlBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OcapUrlBuilderService = TestBed.get(OcapUrlBuilderService);
    expect(service).toBeTruthy();
  });
});
