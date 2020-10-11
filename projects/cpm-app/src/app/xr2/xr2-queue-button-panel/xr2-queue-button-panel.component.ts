import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-xr2-queue-button-panel',
  templateUrl: './xr2-queue-button-panel.component.html',
  styleUrls: ['./xr2-queue-button-panel.component.scss']
})
export class Xr2QueueButtonPanelComponent implements OnInit {

  @Input() printAllDisabled: boolean;
  @Input() releaseAllDisabled: boolean;
  @Input() rerouteAllDisabled: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
