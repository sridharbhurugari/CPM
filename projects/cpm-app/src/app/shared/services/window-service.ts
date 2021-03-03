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

  dispatchResizeEvent() {
    if (this.nativeWindow) {
      this.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  getHash() {
    if(!this.nativeWindow) {
      return;
    }

    return this.nativeWindow.location.hash;
  }
}
