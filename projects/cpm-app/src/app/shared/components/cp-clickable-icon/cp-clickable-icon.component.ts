import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cp-clickable-icon',
  templateUrl: './cp-clickable-icon.component.html',
  styleUrls: ['./cp-clickable-icon.component.scss']
})
export class CPClickableIconComponent implements OnInit {

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
