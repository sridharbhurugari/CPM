import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quick-pick-drawer-details-view',
  templateUrl: './quick-pick-drawer-details-view.component.html',
  styleUrls: ['./quick-pick-drawer-details-view.component.scss']
})
export class QuickPickDrawerDetailsViewComponent implements OnInit {

  @Output() backClicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onBackClick() {
    this.backClicked.emit();
  }

}
