import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeOverrideService } from '../../services/barcode-override.service';
import { BarcodeParsingService } from '../../services/barcode-parsing.service';
import { BarcodeSafetyStockService } from '../../services/barcode-safety-stock.service';
import { MockValidationIconComponent } from '../../testing/mock-validation-icon.spec';

import { SafetyStockProductComponent } from './safety-stock-product.component';

describe('SafetyStockProductComponent', () => {
  let component: SafetyStockProductComponent;
  let fixture: ComponentFixture<SafetyStockProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SafetyStockProductComponent,
        MockValidationIconComponent,
      ],
      providers: [
        { provide: BarcodeParsingService, useValue: { } },
        { provide: BarcodeOverrideService, useValue: { } },
        { provide: BarcodeSafetyStockService, useValue: { } },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyStockProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
