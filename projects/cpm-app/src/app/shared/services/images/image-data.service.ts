import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  constructor() { }

  /* istanbul ignore next */
  getBase64ImageFromUrl(url: string): Observable<string> {
    return new Observable<string>(subscriber => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        subscriber.next(dataURL);
        subscriber.complete();
      };
      img.onerror = error => {
        subscriber.error(error);
        subscriber.complete();
      };
      img.src = url;
    }).pipe(shareReplay(1));
  }
}
