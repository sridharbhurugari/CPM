import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-cp-data-card',
    template: '',
})
export class MockCpDataCardComponent {

  @Input() showLoading: boolean = false;
  @Input() title: string;
  @Input() iconString: string;
  @Input() iconTheme: string;
  @Input() toastType: string;
  @Input() toastMsgResourceKey: string;
  @Input() data1: string;
  @Input() dataLabel1: string;
  @Input() data2: string;
  @Input() dataLabel2: string;
  @Input() data3: string;
  @Input() dataLabel3: string;
}
