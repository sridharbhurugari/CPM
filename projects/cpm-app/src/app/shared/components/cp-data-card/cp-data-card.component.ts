import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cp-data-card',
  templateUrl: './cp-data-card.component.html',
  styleUrls: ['./cp-data-card.component.scss']
})
export class CpDataCardComponent implements OnInit {

  @Input() showLoading: boolean = false;
  @Input() title: string;
  @Input() width: string = "330px";
  @Input() height: string = "130px";
  @Input() margin: string = "10px";
  @Input() iconString: string;
  @Input() iconSize: string = "10%"; // icon size in header
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
  @Output() cardClicked: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }
  OnIconClicked() {
    this.iconClicked.emit(this.title);
  }

  OnCardClicked() {
    this.cardClicked.emit(this.title);
  }
  ngOnInit() {
  }
}
