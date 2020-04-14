import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  windowRef: any;
  constructor(
    @Inject(PLATFORM_ID)platformId: string,
  ){
    if(isPlatformBrowser(platformId)){
      this.windowRef = window;
    }
    else{
      this.windowRef = null;
    }
  }

  get nativeWindow() : any {
    return this.windowRef;
  }
}