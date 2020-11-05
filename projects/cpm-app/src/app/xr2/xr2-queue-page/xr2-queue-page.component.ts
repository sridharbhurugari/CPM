import { Component, Input, OnInit } from '@angular/core';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';

@Component({
  selector: 'app-xr2-queue-page',
  templateUrl: './xr2-queue-page.component.html',
  styleUrls: ['./xr2-queue-page.component.scss']
})
export class Xr2QueuePageComponent implements OnInit {

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;

  constructor() { }

  ngOnInit() {
  }

  onDetailsPageBackNavigation() {
    this.xr2QueueNavigationParameters = null;
  }

  onDetailsPageContinueNavigation(event: IXr2QueueNavigationParameters) {
    this.xr2QueueNavigationParameters = event;
  }

  onXr2PageConfigurationUpdateEvent(event: IXr2QueuePageConfiguration) {
    this.savedPageConfiguration = event;
  }
}
