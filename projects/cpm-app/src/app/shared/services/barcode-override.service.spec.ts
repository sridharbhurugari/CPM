import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BarcodeOverrideService } from './barcode-override.service';
import { BarcodeParsingService } from './barcode-parsing.service';
import { BarcodeSafetyStockService } from './barcode-safety-stock.service';
import { SimpleDialogService } from './dialogs/simple-dialog.service';
import { UserPermissionsCacheService } from './user-permissions-cache.service';

describe('BarcodeOverrideService', () => {
  let canOverrideBarcode = false;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: BarcodeParsingService, useValue: { } },
      { provide: SimpleDialogService, useValue: { } },
      { provide: BarcodeSafetyStockService, useValue: { } },
      { provide: UserPermissionsCacheService, useValue: { canOverrideBarcode: () => of(canOverrideBarcode) } },
      BarcodeOverrideService,
    ],
  }));

  it('should be created', () => {
    const service: BarcodeOverrideService = TestBed.get(BarcodeOverrideService);
    expect(service).toBeTruthy();
  });
});
