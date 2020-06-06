import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuickPickDrawer } from '../model/quick-pick-drawer';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() drawer: QuickPickDrawer;

  @Output() printClicked: EventEmitter<QuickPickDrawer> = new EventEmitter<QuickPickDrawer>();

  constructor() { }

  ngOnInit() {
  }

  onPrintClick() {
    this.printClicked.emit(this.drawer);
  }

}
