import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { IPopupWindowContainer, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { IDropdownPopupData } from '../../model/i-dropdown-popup-data';

@Component({
  selector: 'app-dropdown-popup',
  templateUrl: './dropdown-popup.component.html',
  styleUrls: ['./dropdown-popup.component.scss']
})
export class DropdownPopupComponent implements OnInit, IPopupWindowContainer {

  data: IDropdownPopupData; 
  
  selectedRowItem: SingleselectRowItem;
  checkboxSelected: boolean;

  @Output()
  dismiss: Subject<boolean> = new Subject<boolean>();    

  constructor() { }

  ngOnInit() {
    this.selectedRowItem = this.data.defaultrow;
    this.checkboxSelected = this.data.checkboxSelected;
    this.showCheckbox(this.selectedRowItem.value);
  }

  cancel() {    
    this.dismiss.next(false);
  }

  continue() {
    this.data.selectedrow = this.selectedRowItem;
    this.data.selectedcheckbox = this.checkboxSelected;    
    this.dismiss.next(true);    
  }

  onSelectionChanged($event) {
    this.showCheckbox($event.value);
    this.selectedRowItem = $event;
  }

  onSelect(selected: boolean) {
    this.checkboxSelected = selected;
  }  

  showCheckbox(selectedValue: string) {
    let found = false;

    this.data.checkboxHideSelection.forEach(x => {
      if (x.value === selectedValue){
        found = true;   
        this.checkboxSelected = false;     
      }
    })   
    this.data.showCheckbox = !found;
  }
}
