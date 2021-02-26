import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-icon',
  template: '',
})
export class MockValidationIconComponent {
  @Input()
  toastTileResourceKey: string;

  @Input()
  toastMsgResourceKey: string;

  @Input()
  iconString: string;

  @Input()
  toastType: 'info' | 'warn' | 'error'

  @Input()
  iconTheme: 'dark';

  @Input()
  iconHeight = 50;

  @Input()
  iconWidth = 50;
}
