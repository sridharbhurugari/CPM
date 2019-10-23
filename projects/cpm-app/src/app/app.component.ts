import { Component, AfterViewInit } from '@angular/core';
import { OcAnimationSize, ProgressbarService } from '@omnicell/webcorecomponents';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationService, HttpClientService } from 'oal-core';
import { WindowRef } from './services/window-ref';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'cpm-app';
  loadingData = {
    supportingText:'', 
    size: OcAnimationSize.large
  };
  loading: boolean;

  constructor(
    private router: Router,
    translate: TranslateService,
    configurationService: ConfigurationService,
    httpClient: HttpClientService,
    windowService: WindowRef
  ){
    this.loading = true;
    translate.setDefaultLang('en-us');
    if(windowService.nativeWindow){
      var ocap = {};
      var win = windowService.nativeWindow as Window;
      var url = new URL(win.location.href);
      var searchParams = new URLSearchParams(url.search.split('?')[1]);
      searchParams.forEach((v, k) => {
        ocap[k] = v == "True" ? 'true' : v == "False" ? 'false' : v || '';
      })

      configurationService.init(httpClient, {'ocap': ocap});
    }
  }

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
