import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { OalCoreModule, OcapHttpClientService } from 'oal-core';
import { CoreModule } from './core/core.module';
import { ApiCoreModule } from './api-core/api-core.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProgressAnimationModule,
         LayoutModule,
         ProgressbarModule,
         FooterModule,
         ProgressbarService,
         ProgressbarInterceptor
       } from '@omnicell/webcorecomponents';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ApiCoreModule,
    OalCoreModule.forRoot({environment: environment, httpClientService: OcapHttpClientService, configEndpointKey: 'configEndpoint'}),
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
    }),
    ProgressAnimationModule,
    LayoutModule,
    ProgressbarModule,
    FooterModule,
  ],
  providers: [
    ProgressbarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressbarInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}