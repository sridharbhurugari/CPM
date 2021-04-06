import { Injectable } from '@angular/core';
import { PopupDialogService, PopupDialogProperties, PopupDialogType, PopupDialogComponent } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { Guid } from 'guid-typescript';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimpleDialogService {
  okButtonText$: Observable<string>;
  cancelButtonText$: Observable<any>;

  constructor(
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
  ) {
    this.okButtonText$ = translateService.get('OK').pipe(shareReplay(1));
    this.cancelButtonText$ = translateService.get('CANCEL').pipe(shareReplay(1));
  }

  displayWarningOk(titleResourceKey: string, messageResourceKey: string, messageParams?: Object) {
    this.displayOk(titleResourceKey, messageResourceKey, PopupDialogType.Warning, messageParams);
  }

  getWarningOkPopup(titleResourceKey: string, messageResourceKey: string, messageParams?: Object): Observable<PopupDialogComponent> {
    return this.getOkPopup(titleResourceKey, messageResourceKey, PopupDialogType.Warning, messageParams);
  }

  getWarningCancelPopup(titleResourceKey: string, messageResourceKey: string, messageParams?: Object): Observable<PopupDialogComponent> {
    return this.getCancelPopup(titleResourceKey, messageResourceKey, PopupDialogType.Warning, messageParams);
  }

  displayErrorOk(titleResourceKey: string, messageResourceKey: string, messageParams?: Object) {
    this.displayOk(titleResourceKey, messageResourceKey, PopupDialogType.Error, messageParams);
  }

  displayInfoOk(titleResourceKey: string, messageResourceKey: string, messageParams?: Object) {
    this.displayOk(titleResourceKey, messageResourceKey, PopupDialogType.Info, messageParams);
  }

  private displayOk(titleResourceKey: string, messageResourceKey: string, type: PopupDialogType, messageParams?: Object) {
    const title$ = this.translateService.get(titleResourceKey);
    const message$ = this.translateService.get(messageResourceKey, messageParams);
    const uniqueId = Guid.create().toString();
    forkJoin(title$, message$, this.okButtonText$).subscribe(r => {
      this.display(uniqueId, r[0], r[1], r[2], type);
    });
  }

  private displayCancel(titleResourceKey: string, messageResourceKey: string, type: PopupDialogType, messageParams?: Object) {
    const title$ = this.translateService.get(titleResourceKey);
    const message$ = this.translateService.get(messageResourceKey, messageParams);
    const uniqueId = Guid.create().toString();
    forkJoin(title$, message$, this.cancelButtonText$).subscribe(r => {
      this.display(uniqueId, r[0], r[1], r[2], type);
    });
  }

  private getOkPopup(titleResourceKey: string, messageResourceKey: string, type: PopupDialogType, messageParams?: Object): Observable<PopupDialogComponent> {
    const title$ = this.translateService.get(titleResourceKey);
    const message$ = this.translateService.get(messageResourceKey, messageParams);
    const uniqueId = Guid.create().toString();
    return forkJoin(title$, message$, this.cancelButtonText$).pipe(map(r => {
      return this.display(uniqueId, r[0], r[1], r[2], type);
    }));
  }

  private getCancelPopup(titleResourceKey: string, messageResourceKey: string, type: PopupDialogType, messageParams?: Object): Observable<PopupDialogComponent> {
    const title$ = this.translateService.get(titleResourceKey);
    const message$ = this.translateService.get(messageResourceKey, messageParams);
    const uniqueId = Guid.create().toString();
    return forkJoin(title$, message$, this.cancelButtonText$).pipe(map(r => {
      return this.display(uniqueId, r[0], r[1], r[2], type);
    }));
  }

  private display(uniqueId: string, title: string, message: string, primaryButtonText: string, type: PopupDialogType): PopupDialogComponent {
    const properties = new PopupDialogProperties(uniqueId);
    properties.primaryButtonText = primaryButtonText;
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = type;
    properties.timeoutLength = 0;
    return this.dialogService.showOnce(properties);
  }
}
