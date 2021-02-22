import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'oc-button-toggle',
  template: ''
})
export class MockButtonToggle {

  @Input() disabled: boolean;
  @Input() onLabel: string;
  @Input() offLabel: string;
  @Input() switchtype: string;
  @Input() data: boolean;
  @Input() ngModel: any;
}
