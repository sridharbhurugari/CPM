import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cp-icon-button',
  templateUrl: './cp-icon-button.component.html',
  styleUrls: ['./cp-icon-button.component.scss']
})
export class CpIconButtonComponent implements OnInit {

  @Input() width: number = 30;
  @Input() height: number = 30;
  @Input() icon: string;
  @Input() theme: string;
  @Input() label: string;

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.clickEvent.emit(null);
  }

}
