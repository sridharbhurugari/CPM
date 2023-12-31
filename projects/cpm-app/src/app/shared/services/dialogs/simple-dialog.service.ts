import { Injectable } from '@angular/core';
import { PopupDialogService, PopupDialogProperties, PopupDialogType, PopupDialogComponent } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { Guid } from 'guid-typescript';
import { map, shareReplay } from 'rxjs/operators';
import { SystemConfigurationService } from '../system-configuration.service';
import { IConfigurationValue } from '../../interfaces/i-configuration-value';

@Injectable({
  providedIn: 'root'
})
export class SimpleDialogService {
  okButtonText$: Observable<string>;
  cancelButtonText$: Observable<any>;
  yesButtonText$: Observable<string>;
  noButtonText$: Observable<string>;
  popupTimeoutSeconds$: Observable<IConfigurationValue>

  constructor(
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
    private systemConfigurationService: SystemConfigurationService
  ) {
    this.okButtonText$ = translateService.get('OK').pipe(shareReplay(1));
    this.cancelButtonText$ = translateService.get('CANCEL').pipe(shareReplay(1));
    this.yesButtonText$ = translateService.get('YES').pipe(shareReplay(1));
    this.noButtonText$ = translateService.get('NO').pipe(shareReplay(1));
    this.popupTimeoutSeconds$ = this.systemConfigurationService.GetConfigurationValues('TIMEOUTS', 'POP_UP_MESSAGE_TIMEOUT')
    .pipe(shareReplay(1)) as Observable<IConfigurationValue>;
  }

  displayWarningOk(titleResourceKey: string, messageResourceKey: string, messageParams?: Object) {
    this.displayOk(titleResourceKey, messageResourceKey, PopupDialogType.Warning, messageParams);
  }

  getWarningOkPopup(titleResourceKey: string, messageResourceKey: string, messageParams?: Object): Observable<PopupDialogComponent> {
    return this.getOkPopup(titleResourceKey, messageResourceKey, PopupDialogType.Warning, messageParams);
  }

  getErrorOkPopup(titleResourceKey: string, messageResourceKey: string, messageParams?: Object): Observable<PopupDialogComponent> {
    return this.getOkPopup(titleResourceKey, messageResourceKey, PopupDialogType.Error, messageParams);
  }

  getWarningCancelPopup(titleResourceKey: string, messageResourceKey: string, messageParams?: Object): Observable<PopupDialogComponent> {
    return this.getCancelPopup(titleResourceKey, messageResourceKey, PopupDialogType.Warning, messageParams);
  }

  getInfoYesNoPopup(titleResourceKey: string, messageResourceKey: string, messageParams?: Object): Observable<PopupDialogComponent>  {
    return this.getYesNoPopup(titleResourceKey, messageResourceKey, PopupDialogType.Info, messageParams);
  }

  displayErrorOk(titleResourceKey: string, messageResourceKey: string, messageParams?: Object) {
    this.displayOk(titleResourceKey, messageResourceKey, PopupDialogType.Error, messageParams);
  }

  displayInfoOk(titleResourceKey: string, messageResourceKey: string, messageParams?: Object) {
    this.displayOk(titleResourceKey, messageResourceKey, PopupDialogType.Info, messageParams);
  }

  displayInfoYesNo(titleResourceKey: string, messageResourceKey: string, messageParams?: Object) {
    this.displayYesNoDialog(titleResourceKey, messageResourceKey, PopupDialogType.Info, messageParams);
  }

  displayWarningYesNo(titleResourceKey: string, messageResourceKey: string, messageParams?: Object) {
    this.displayYesNoDialog(titleResourceKey, messageResourceKey, PopupDialogType.Warning, messageParams);
  }

  private displayOk(titleResourceKey: string, messageResourceKey: string, type: PopupDialogType, messageParams?: Object) {
    const title$ = this.translateService.get(titleResourceKey);
    const message$ = this.translateService.get(messageResourceKey, messageParams);
    const uniqueId = Guid.create().toString();
    forkJoin(title$, message$, this.okButtonText$, this.popupTimeoutSeconds$).subscribe(r => {
      this.display(uniqueId, r[0], r[1], r[2], type, Number(r[3].Value));
    });
  }

  private displayYesNoDialog(titleResourceKey: string, messageResourceKey: string, type: PopupDialogType, messageParams?: Object) {
    const title$ = this.translateService.get(titleResourceKey);
    const message$ = this.translateService.get(messageResourceKey, messageParams);
    const uniqueId = Guid.create().toString();
    forkJoin(title$, message$, this.noButtonText$, this.yesButtonText$).subscribe(r => {
      this.displaySecondary(uniqueId, r[0], r[1], r[2], r[3], type);
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
    return forkJoin(title$, message$, this.okButtonText$, this.popupTimeoutSeconds$).pipe(map(r => {
      return this.display(uniqueId, r[0], r[1], r[2], type, Number(r[3].Value));
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

  private getYesNoPopup(titleResourceKey: string, messageResourceKey: string, type: PopupDialogType, messageParams?: Object): Observable<PopupDialogComponent> {
    const title$ = this.translateService.get(titleResourceKey);
    const message$ = this.translateService.get(messageResourceKey, messageParams);
    const uniqueId = Guid.create().toString();
    return forkJoin(title$, message$, this.noButtonText$, this.yesButtonText$).pipe(map(r => {
      return this.displaySecondary(uniqueId, r[0], r[1], r[2], r[3], type);
    }));
  }

  private display(uniqueId: string, title: string, message: string, primaryButtonText: string, type: PopupDialogType, timeoutSeconds: number = 0): PopupDialogComponent {
    const properties = new PopupDialogProperties(uniqueId);
    properties.primaryButtonText = primaryButtonText;
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = type;
    properties.timeoutLength = timeoutSeconds;
    return this.dialogService.showOnce(properties);
  }

  private displaySecondary(uniqueId: string, title: string, message: string, primaryButtonText: string, secondaryButtonText: string, type: PopupDialogType, timeoutSeconds: number = 0): PopupDialogComponent {
    const properties = new PopupDialogProperties(uniqueId);
    properties.primaryButtonText = primaryButtonText;
    properties.secondaryButtonText = secondaryButtonText;
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = true;
    properties.dialogDisplayType = type;
    properties.timeoutLength = timeoutSeconds;
    return this.dialogService.showOnce(properties);
  }
}
