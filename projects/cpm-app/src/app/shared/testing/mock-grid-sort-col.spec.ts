import { Input, Output, EventEmitter, Directive } from '@angular/core';

@Directive({
  selector: '[appGridSortCol]'
})
export class MockGridSortCol {
  @Input()
  initialSortPropertyName: string;

  @Input()
  initialSortDirection: 'asc' | 'desc';

  @Input()
  orderableValues: any[];

  @Output()
  valuesReordered: EventEmitter<any[]> = new EventEmitter<any[]>();
}