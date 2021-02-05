import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';

@Component({
  selector: 'app-xr2-queue-page',
  templateUrl: './xr2-queue-page.component.html',
  styleUrls: ['./xr2-queue-page.component.scss']
})
export class Xr2QueuePageComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject();

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;

  constructor(
    wpfInteropService: WpfInteropService,
  ) {
    wpfInteropService.wpfViewModelActivated.pipe(takeUntil(this._ngUnsubscribe)).subscribe(() => {
      this.xr2QueueNavigationParameters = null;
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
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
