import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cp-data-card',
  templateUrl: './cp-data-card.component.html',
  styleUrls: ['./cp-data-card.component.scss']
})
export class CpDataCardComponent implements OnInit {

  @Input() showLoading: boolean = false;
  @Input() title: string;
  @Input() iconString: string;
  @Input() iconTheme: string;
  @Input() data1: string;
  @Input() dataLabel1: string;
  @Input() data2: string;
  @Input() dataLabel2: string;
  @Input() data3: string;
  @Input() dataLabel3: string;


  constructor() { }

  ngOnInit() {
  }
}
