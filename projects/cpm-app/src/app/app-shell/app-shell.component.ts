import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { OcAnimationSize } from '@omnicell/webcorecomponents';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements AfterViewInit {
  loading: boolean;
  loadingData = {
    supportingText: '',
    size: OcAnimationSize.large
  };

  constructor(
    private router: Router
  ) {
    this.loading = true;
  }

  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.router.events.subscribe(e => {
      if(e instanceof NavigationStart){
        this.loading = true;
        return;
      }

      if(e instanceof NavigationEnd || e instanceof NavigationCancel){
        this.loading = false;
        return;
      }
    })
  }
}
