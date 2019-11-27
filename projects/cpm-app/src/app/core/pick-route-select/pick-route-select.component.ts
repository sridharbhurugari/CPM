import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@omnicell/webcorecomponents';
import { Component, OnInit, Input, EventEmitter, Output, Optional } from '@angular/core';

@NgModule({
  imports: [CommonModule, FormsModule, GridModule],
  declarations: [PickRouteSelectComponent],
  exports: [PickRouteSelectComponent]
})

@Component({
  selector: 'app-pick-route-select',
  templateUrl: './pick-route-select.component.html',
  styleUrls: ['./pick-route-select.component.scss']
})
export class PickRouteSelectComponent implements OnInit {
public groupName: string = 'RadioList';
  constructor() {
   }
  @Input()
  listMap: Map<number, string>;
  @Input()
  selectedId: number = 0;
  @Input()
  colDescription: string = 'My Description';
  @Output()
  SelectionChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
  }

  selectionChanged(selectionId: number) {
    if (selectionId !== this.selectedId) {
      this.selectedId = selectionId;
      this.SelectionChange.emit(selectionId);
    }
  }
}
