import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cp-data-card',
  templateUrl: './cp-data-card.component.html',
  styleUrls: ['./cp-data-card.component.scss']
})
export class CpDataCardComponent implements OnInit {

  @Input() showLoading: boolean = false;
  @Input() title: string;
  @Input() width: string = "300px";
  @Input() height: string = "100px";
  @Input() iconString: string;
  @Input() iconSize: string = "10%";
  @Input() iconTheme: string;
  @Input() toastType: string;
  @Input() toastMsgResourceKey: string;
  @Input() data1: string;
  @Input() dataLabel1: string;
  @Input() data2: string;
  @Input() dataLabel2: string;
  @Input() data3: string;
  @Input() dataLabel3: string;

  @Output() iconClicked: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }
  OnIconClicked() {
    this.iconClicked.emit(this.title);
  }
  ngOnInit() {
  }
}
