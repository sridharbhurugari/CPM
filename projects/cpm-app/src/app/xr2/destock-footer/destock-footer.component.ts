import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-destock-footer',
  templateUrl: './destock-footer.component.html',
  styleUrls: ['./destock-footer.component.scss']
})
export class DestockFooterComponent implements OnInit {

  @Input() eventTime: string;
  @Output() refreshEvent: EventEmitter<any> = new EventEmitter();  

  constructor() { }

  ngOnInit() {    
  }

  onRefreshClick() {    
    this.refreshEvent.emit(null);
  }
}
