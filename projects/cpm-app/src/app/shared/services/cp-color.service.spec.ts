import { TestBed } from '@angular/core/testing';

import { CpColorService } from './cp-color.service';

describe('CpColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service: CpColorService = TestBed.get(CpColorService);
    expect(service).toBeTruthy();
  });

  it('should pick light text color on dark background', () => {
    const service: CpColorService = TestBed.get(CpColorService);

    const blackColor = '#000000';
    const whiteColor = '#FFFFFF';

    const result = service.pickTextColorBasedOnBackgroundColor(blackColor, whiteColor, blackColor);

    expect(result).toEqual(whiteColor);
  });

  it('should pick dark text color on light background', () => {
    const service: CpColorService = TestBed.get(CpColorService);

    const blackColor = '#000000';
    const whiteColor = '#FFFFFF';

    const result = service.pickTextColorBasedOnBackgroundColor(whiteColor, whiteColor, blackColor);

    expect(result).toEqual(blackColor);
  });
});
