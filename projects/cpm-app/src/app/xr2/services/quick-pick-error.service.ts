import { Injectable } from '@angular/core';
import { QuickPickError } from '../../xr2/model/quick-pick-error';
import { PopupDialogService, PopupDialogType, PopupDialogProperties } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class QuickPickErrorService {

  constructor(
    private dialogService: PopupDialogService,
    private translateService: TranslateService
    ) { }

   /* istanbul ignore next */
  display(error: QuickPickError) {
    const properties = new PopupDialogProperties('Role-Status-Warning');
    switch (error) {
      case QuickPickError.ScanNotFound:
        this.translateService.get('INVALID_SCAN_BARCODE_HEADER')
          .subscribe(result => { properties.titleElementText = result; });
        this.translateService.get('INVALID_SCAN_BARCODE')
          .subscribe(result => { properties.messageElementText = result; });
        properties.dialogDisplayType = PopupDialogType.Warning;
        break;
      case QuickPickError.ScanUnavailable:
        this.translateService.get('INVALID_SCAN_QUICKPICK_INPROGRESS_HEADER')
          .subscribe(result => { properties.titleElementText = result; });
        this.translateService.get('INVALID_SCAN_QUICKPICK_INPROGRESS')
          .subscribe(result => { properties.messageElementText = result; });
        properties.dialogDisplayType = PopupDialogType.Warning;
        break;
      case QuickPickError.PrintFailure:
        this.translateService.get('FAILEDTOPRINT_HEADER_TEXT')
          .subscribe(result => { properties.titleElementText = result; });
        this.translateService.get('FAILEDTOPRINT_BODY_TEXT')
          .subscribe(result => { properties.messageElementText = result; });
        properties.dialogDisplayType = PopupDialogType.Error;
        break;
      case QuickPickError.UnlockFailure:
        this.translateService.get('FAILEDTOUNLOCKQUICKPICKDOOR_HEADER_TEXT')
          .subscribe(result => { properties.titleElementText = result; });
        this.translateService.get('FAILEDTOUNLOCKQUICKPICKDOOR_BODY_TEXT')
          .subscribe(result => { properties.messageElementText = result; });
        properties.dialogDisplayType = PopupDialogType.Error;
        break;
      case QuickPickError.RerouteFailure:
        this.translateService.get('FAILEDTOREROUTE_HEADER_TEXT')
          .subscribe(result => { properties.titleElementText = result; });
        this.translateService.get('FAILEDTOREROUTE_BODY_TEXT')
          .subscribe(result => { properties.messageElementText = result; });
        properties.dialogDisplayType = PopupDialogType.Error;
        break;
      default:
        this.translateService.get('FAILEDTOSAVE_HEADER_TEXT')
          .subscribe(result => { properties.titleElementText = result; });
        this.translateService.get('FAILEDTOSAVE_BODY_TEXT')
          .subscribe(result => { properties.messageElementText = result; });
        properties.dialogDisplayType = PopupDialogType.Error;
        break;
    }
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'Ok';
    properties.timeoutLength = 60;
    this.dialogService.showOnce(properties);
  }
}
