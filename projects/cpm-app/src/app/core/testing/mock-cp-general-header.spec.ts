import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-cp-general-header',
  template: ''
})
export class MockCpGeneralHeaderContainer {
  @Output() backEvent: EventEmitter<void> = new EventEmitter();
  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() title: string;
  @Input() subtitle: string;
  @Input() searchFilterText: string;
  @Input() showSearchBox: boolean = true;
}
