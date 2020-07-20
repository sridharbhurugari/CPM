import { Injectable } from '@angular/core';
import { QuickPickError } from '../../xr2/model/quick-pick-error';
import { PopupDialogService, PopupDialogType, PopupDialogProperties } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class QuickPickErrorService {
  private translationMap: Map<string, string>;
  private quickPickTranslatables = [
    'INVALID_SCAN_BARCODE_HEADER',
    'INVALID_SCAN_BARCODE',
    'INVALID_SCAN_QUICKPICK_INPROGRESS_HEADER',
    'INVALID_SCAN_QUICKPICK_INPROGRESS',
    'FAILEDTOPRINT_HEADER_TEXT',
    'FAILEDTOPRINT_BODY_TEXT',
    'FAILEDTOUNLOCKQUICKPICKDOOR_HEADER_TEXT',
    'FAILEDTOUNLOCKQUICKPICKDOOR_BODY_TEXT',
    'FAILEDTOREROUTE_HEADER_TEXT',
    'FAILEDTOREROUTE_BODY_TEXT',
    'FAILEDTOSAVE_HEADER_TEXT',
    'FAILEDTOSAVE_BODY_TEXT'
  ];

  constructor(
    private dialogService: PopupDialogService,
    private translateService: TranslateService
    ) {
      this.createTranslationMap();
    }

   /* istanbul ignore next */
  display(error: QuickPickError) {
    const properties = new PopupDialogProperties('Role-Status-Warning');
    switch (error) {
      case QuickPickError.ScanNotFound:
        properties.titleElementText = this.translationMap.get('INVALID_SCAN_BARCODE_HEADER');
        properties.messageElementText  = this.translationMap.get('INVALID_SCAN_BARCODE');
        properties.dialogDisplayType = PopupDialogType.Warning;
        break;
      case QuickPickError.ScanUnavailable:
        properties.titleElementText = this.translationMap.get('INVALID_SCAN_QUICKPICK_INPROGRESS_HEADER');
        properties.messageElementText  = this.translationMap.get('INVALID_SCAN_QUICKPICK_INPROGRESS');
        properties.dialogDisplayType = PopupDialogType.Warning;
        break;
      case QuickPickError.PrintFailure:
        properties.titleElementText = this.translationMap.get('FAILEDTOPRINT_HEADER_TEXT');
        properties.messageElementText  = this.translationMap.get('FAILEDTOPRINT_BODY_TEXT');
        properties.dialogDisplayType = PopupDialogType.Error;
        break;
      case QuickPickError.UnlockFailure:
        properties.titleElementText = this.translationMap.get('FAILEDTOUNLOCKQUICKPICKDOOR_HEADER_TEXT');
        properties.messageElementText  = this.translationMap.get('FAILEDTOUNLOCKQUICKPICKDOOR_BODY_TEXT');
        properties.dialogDisplayType = PopupDialogType.Error;
        break;
      case QuickPickError.RerouteFailure:
        properties.titleElementText = this.translationMap.get('FAILEDTOREROUTE_HEADER_TEXT');
        properties.messageElementText  = this.translationMap.get('FAILEDTOREROUTE_BODY_TEXT');
        properties.dialogDisplayType = PopupDialogType.Error;
        break;
      default:
        properties.titleElementText = this.translationMap.get('FAILEDTOSAVE_HEADER_TEXT');
        properties.messageElementText  = this.translationMap.get('FAILEDTOSAVE_BODY_TEXT');
        properties.dialogDisplayType = PopupDialogType.Error;
        break;
    }

    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'Ok';
    properties.timeoutLength = 60;
    this.dialogService.showOnce(properties);
  }

   /* istanbul ignore next */
  private createTranslationMap() {
    this.translationMap = new Map<string, string>();
    for (const translatable of this.quickPickTranslatables) {
      this.translateService.get(translatable)
      .subscribe(translation => { this.translationMap.set(translatable, translation); });
    }
  }
}
