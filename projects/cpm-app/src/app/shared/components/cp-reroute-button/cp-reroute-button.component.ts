import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cp-reroute-button',
  templateUrl: './cp-reroute-button.component.html',
  styleUrls: ['./cp-reroute-button.component.scss']
})
export class CpRerouteButtonComponent implements OnInit {

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.clickEvent.emit(null);
  }

}
