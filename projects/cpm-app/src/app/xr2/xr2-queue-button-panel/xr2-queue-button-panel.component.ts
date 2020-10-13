import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-xr2-queue-button-panel',
  templateUrl: './xr2-queue-button-panel.component.html',
  styleUrls: ['./xr2-queue-button-panel.component.scss']
})
export class Xr2QueueButtonPanelComponent implements OnInit {

  @Input() printDisabled: boolean;
  @Input() releaseDisabled: boolean;
  @Input() rerouteDisabled: boolean;

  @Output() rerouteEvent: EventEmitter<void> = new EventEmitter();
  @Output() releaseEvent: EventEmitter<void> = new EventEmitter();
  @Output() printEvent: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }
}
