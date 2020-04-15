import { NgModule, AfterContentInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@omnicell/webcorecomponents';
import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { IPickRouteDevice } from '../../api-core/data-contracts/i-pickroute-device';

@Component({
  selector: 'app-pick-route-select',
  templateUrl: './pick-route-select.component.html',
  styleUrls: ['./pick-route-select.component.scss']
})
export class PickRouteSelectComponent implements OnInit {
public groupName = 'RadioList';
  constructor() {
   }

@Input()
listMap: Map<IPickRouteDevice, string>;
@Input()
selectedItem: IPickRouteDevice;
@Input()
colDescription = 'My Description';
@Output()
SelectionChange: EventEmitter<IPickRouteDevice> = new EventEmitter<IPickRouteDevice>();

ngOnInit() {
  }

selectionChanged(selectionItem: IPickRouteDevice) {
    if (selectionItem !== this.selectedItem) {
      this.selectedItem = selectionItem;
      this.SelectionChange.emit(this.selectedItem);
    }
  }
}
