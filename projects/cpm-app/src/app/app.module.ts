import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';
import { ApiCoreModule } from './api-core/api-core.module';
import { ApiXr2Module } from './api-xr2/api-xr2.module';
import { Xr2Module } from './xr2/xr2.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OalCoreModule, OcapHttpClientService } from 'oal-core';

import { ProgressAnimationModule,
         LayoutModule,
         ProgressbarModule,
         FooterModule,
         ProgressbarService,
         ProgressbarInterceptor,
         PopupDialogService,
         PopupWindowModule,
         PopupWindowService,
         ToastService,
         ToastModule,
         DaterangeModule,
         SvgIconModule
       } from '@omnicell/webcorecomponents';
import { SharedModule } from './shared/shared.module';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { registerLocaleData } from '@angular/common';
import { BaseRouteReuseStrategy } from './core/base-route-reuse-strategy/base-route-reuse-strategy';

registerLocaleData(localeEn, 'en-US', localeEnExtra);
registerLocaleData(localeFr, 'fr-CA', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ApiXr2Module,
    ApiCoreModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
    }),
    OalCoreModule.forRoot({
      environment,
      httpClientService: OcapHttpClientService,
      configEndpointKey: 'configEndpoint'
    }),
    ProgressAnimationModule,
    LayoutModule,
    ProgressbarModule,
    FooterModule,
    SharedModule,
    RouterModule,
    PopupWindowModule,
    ToastModule,
    DaterangeModule,
    SvgIconModule,
  ],
  providers: [
    ProgressbarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressbarInterceptor,
      multi: true
    },
    PopupDialogService,
    PopupWindowService,
    ToastService,
    {provide: RouteReuseStrategy, useClass: BaseRouteReuseStrategy},
    BaseRouteReuseStrategy,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
