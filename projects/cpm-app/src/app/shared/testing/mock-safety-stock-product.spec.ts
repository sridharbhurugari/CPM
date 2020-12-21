import { Component, Input } from '@angular/core';
import { ISafetyStockProductData } from '../model/i-safety-stock-product-data';

@Component({
  selector: 'app-safety-stock-product',
  template: '',
})
export class MockSafetyStockProductComponent {
  @Input()
  safetyStockProductData: ISafetyStockProductData;
}