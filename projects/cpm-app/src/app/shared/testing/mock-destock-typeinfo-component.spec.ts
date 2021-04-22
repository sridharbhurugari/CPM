import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DestockTypeInfo } from '../../xr2/model/destock-type-info';

@Component({
  selector: 'app-destock-type-info',
  template: ''
})

export class MockDestockTypeInfoComponent {
  @Input() deviceDestockTypeInfo: DestockTypeInfo[];
  @Input() searchTextFilter: string;
  @Output() printLabel: EventEmitter<DestockTypeInfo> = new EventEmitter<DestockTypeInfo>();
}
