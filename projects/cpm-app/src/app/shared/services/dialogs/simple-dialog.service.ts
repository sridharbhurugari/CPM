import { Injectable } from '@angular/core';
import { PopupDialogService, PopupDialogProperties, PopupDialogType } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class SimpleDialogService {
  okButtonText$: Observable<string>;

  constructor(
    private dialogService: PopupDialogService,
    private translateService: TranslateService,
  ) {
    this.okButtonText$ = translateService.get('OK');
  }

  displayErrorOk(titleResourceKey: string, messageResourceKey: string) {
    this.displayOk(titleResourceKey, messageResourceKey, PopupDialogType.Error);
  }

  displayInfoOk(titleResourceKey: string, messageResourceKey: string) {
    this.displayOk(titleResourceKey, messageResourceKey, PopupDialogType.Info);
  }

  private displayOk(titleResourceKey: string, messageResourceKey: string, type: PopupDialogType) {
    const title$ = this.translateService.get(titleResourceKey);
    const message$ = this.translateService.get(messageResourceKey);
    const uniqueId = Guid.create().toString();
    forkJoin(title$, message$, this.okButtonText$).subscribe(r => {
      this.display(uniqueId, r[0], r[1], r[2], type);
    });
  }

  private display(uniqueId: string, title: string, message: string, primaryButtonText: string, type: PopupDialogType) {
    const properties = new PopupDialogProperties(uniqueId);
    properties.primaryButtonText = primaryButtonText;
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = type;
    properties.timeoutLength = 0;
    this.dialogService.showOnce(properties);
  }
}
