import { Component, Input } from "@angular/core";

@Component({
  selector: 'oc-numeric',
  template: ''
})
export class MockOcNumeric {
  @Input() units: string;
  @Input() disabled: boolean;
  @Input() maxValue: number;
  @Input() maxDecimalDigit: number;
  @Input() ngModel: any;
}
