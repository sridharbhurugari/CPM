import { Component, Input, EventEmitter, Output } from "@angular/core";
import { IColHeaderSortChanged } from '../events/i-col-header-sort-changed';

@Component({
  selector: '[app-col-header-sortable]',
  template: ''
})
export class MockColHeaderSortable {
  @Input()
  currentSortPropertyName: string;
  @Input()
  headerResourceKey: string;
  @Input()
  columnPropertyName: string;

  @Input()
  customColumnSortOrder: 'asc' | 'desc';

  @Input()
  wrap: boolean;

  @Output()
  columnSelected: EventEmitter<IColHeaderSortChanged> = new EventEmitter();
}
