import { Component, AfterViewInit, OnInit } from '@angular/core';
import { OcAnimationSize } from '@omnicell/webcorecomponents';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OcapConfigurationConstants } from './shared/constants/ocap-configuration-constants';
import { LocalStorageService } from './shared/services/local-storage.service';
import { WindowService } from './shared/services/window-service';
import { IOcapHttpConfiguration } from './shared/interfaces/i-ocap-http-configuration';
import { ConfigurationService, OcapHttpClientService } from 'oal-core';
import { EventConnectionService } from './xr2/services/event-connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'cpm-app';
  loadingData = {
    supportingText: '',
    size: OcAnimationSize.large
  };
  loading: boolean;

  constructor(
    private router: Router,
    translate: TranslateService,
    windowService: WindowService,
    localStorageService: LocalStorageService,
    configurationService: ConfigurationService,
    httpClient: OcapHttpClientService,
    private eventConnectionService: EventConnectionService,
  ){
    this.loading = true;
    if(windowService.nativeWindow){
      var ocap : Partial<IOcapHttpConfiguration> = {};
      var win = windowService.nativeWindow as Window;
      var url = new URL(win.location.href);
      var searchParams = new URLSearchParams(url.search.split('?')[1]);
      searchParams.forEach((v, k) => {
        ocap[k] = v == "True" ? 'true' : v == "False" ? 'false' : v || '';
      })

      localStorageService.setItemObject(OcapConfigurationConstants.storageKey, ocap);
      configurationService.init(httpClient);
      translate.setDefaultLang(ocap.userLocale || 'en-US');
      eventConnectionService.startUp();
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
