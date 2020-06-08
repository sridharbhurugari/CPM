import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { QuickPickDrawer } from '../model/quick-pick-drawer';

@Component({
  selector: 'app-quick-pick-drawer-details-view',
  templateUrl: './quick-pick-drawer-details-view.component.html',
  styleUrls: ['./quick-pick-drawer-details-view.component.scss']
})
export class QuickPickDrawerDetailsViewComponent implements OnInit {

  @Input() detailedDrawer: QuickPickDrawer;

  @Output() backClicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onBackClick() {
    this.backClicked.emit();
  }

}
