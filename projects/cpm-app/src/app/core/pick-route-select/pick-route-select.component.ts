import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pick-route-select',
  templateUrl: './pick-route-select.component.html',
  styleUrls: ['./pick-route-select.component.scss']
})
export class PickRouteSelectComponent implements OnInit {
  private _pickRouteIdSelected: number;



  constructor() { }
  @Input()
  radioRange: any[];
  @Input('pickRouteIdSelected')
  set pickRouteIdSelected(value: number) {
    this._pickRouteIdSelected = value;
}
get pickRouteIdSelected(): number {
  return this._pickRouteIdSelected;
}
  @Output()
  prChange: EventEmitter<number> = new EventEmitter<number>();
  ngOnInit() {
  }

  selectionChanged(event: any) {
    this.prChange.emit(+event.value);
  }
}
