import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() icon: string;
  @Input() text: string;
  @Input() backgroundColor: string;
  @Input() fontColor: string;
  @Input() width = 0;
  @Input() height = 0;

  constructor() { }

  ngOnInit() {
  }

  getDimensions() {
    return {
      'width': this.width.toString() + 'px',
      'height': this.height.toString() + 'px'
    };
  }

}
