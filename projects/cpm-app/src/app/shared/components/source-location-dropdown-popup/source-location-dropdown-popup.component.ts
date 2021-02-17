import { Component, OnInit, Output } from '@angular/core';
import { SingleselectRowItem } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { ISourceLocationDropdownPopupData } from '../../model/i-source-location-dropdown-popup-data';

@Component({
  selector: 'app-source-location-dropdown-popup',
  templateUrl: './source-location-dropdown-popup.component.html',
  styleUrls: ['./source-location-dropdown-popup.component.scss']
})
export class SourceLocationDropdownPopupComponent implements OnInit {
  data: ISourceLocationDropdownPopupData;

  selectedRowItem: SingleselectRowItem;

  @Output()
  dismiss: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.selectedRowItem = this.data.defaultrow;
  }

  cancel() {
    this.dismiss.next(false);
  }

  continue() {
    this.data.selectedrow = this.selectedRowItem;
    this.dismiss.next(true);
  }

  onSelectionChanged($event) {
    this.selectedRowItem = $event;
  }
}
