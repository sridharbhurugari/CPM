import { Component, Input, OnInit } from '@angular/core';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';

@Component({
  selector: 'app-xr2-queue-page',
  templateUrl: './xr2-queue-page.component.html',
  styleUrls: ['./xr2-queue-page.component.scss']
})
export class Xr2QueuePageComponent implements OnInit {

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;

  constructor() { }

  ngOnInit() {
  }

  onNavigationParameterUpdateEvent(event: IXr2QueueNavigationParameters) {
    this.xr2QueueNavigationParameters = event;
  }

}
