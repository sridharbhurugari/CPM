import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-cp-general-header',
    template: '',
})
export class MockCpGeneralHeaderComponent {

  @Output() backEvent: EventEmitter<void> = new EventEmitter();
  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() title: string;
  @Input() subtitle: string;
  @Input() showSearchBox: boolean = true;
}
