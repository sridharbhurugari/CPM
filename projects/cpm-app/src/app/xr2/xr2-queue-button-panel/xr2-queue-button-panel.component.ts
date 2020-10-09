import { Component, Input, OnInit } from '@angular/core';
import { release } from 'os';

@Component({
  selector: 'app-xr2-queue-button-panel',
  templateUrl: './xr2-queue-button-panel.component.html',
  styleUrls: ['./xr2-queue-button-panel.component.scss']
})
export class Xr2QueueButtonPanelComponent implements OnInit {

  @Input() releaseAllDisabled: boolean;
  @Input() printAllDisabled: boolean;
  @Input() rerouteAllDisabled: boolean;


  constructor() { }

  ngOnInit() {
    this.setAllDisabled();
  }

  private setAllDisabled() {
    this.releaseAllDisabled = true;
    this.printAllDisabled = true;
    this.rerouteAllDisabled = true;
  }

}
