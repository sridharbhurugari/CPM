import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickControlDataStatus } from '../model/quick-pick-control-data-status';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quick-pick-drawer-details-view',
  templateUrl: './quick-pick-drawer-details-view.component.html',
  styleUrls: ['./quick-pick-drawer-details-view.component.scss']
})
export class QuickPickDrawerDetailsViewComponent implements OnInit {

  private _detailedDrawerData: QuickPickDrawerData;

  controlDataStatus: typeof QuickPickControlDataStatus = QuickPickControlDataStatus;

  @Output() closeQuickPickDetailsCard: EventEmitter<any> = new EventEmitter<any>();
  @Output() printQuickPickDrawerLabel: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set detailedDrawerData(value: QuickPickDrawerData) {
    this._detailedDrawerData = value;
  }

  get detailedDrawerData(): QuickPickDrawerData {
    return this._detailedDrawerData;
  }

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  onPrintClick() {
    this.printQuickPickDrawerLabel.emit();
  }

  onBackClick() {
    this.closeQuickPickDetailsCard.emit();
  }

  getHeaderStyle() {
    let headerStyle = {};

    if (this.detailedDrawerData.Status !== this.controlDataStatus.Empty) {
      headerStyle = {
        'background-color': this.detailedDrawerData.ColorCode,
        'color': 'white',  // TODO this needs to be based on the background...
        // White text on white, yellow or other light priority will not be good.
        // CPM has a determiner for this, we probably need to match that in Angular
      };
    }

    return headerStyle;
  }

  getTrafficLightProperties(detailedDrawerData: QuickPickDrawerData) {
    const pendingUnlockTranslatable = 'PENDING_UNLOCK';
    const inProgressTranslatable = 'IN_PROGRESS';
    let pendingUnlockTranslated = '';
    let inProgressTranslated = '';
    let color = '';
    let text = '';

    this.translateService.get(pendingUnlockTranslatable).subscribe((res: string) => {
      pendingUnlockTranslated = res;
    });
    this.translateService.get(inProgressTranslatable).subscribe((res: string) => {
      inProgressTranslated = res;
    });

    if (detailedDrawerData.Status === 2) {
      color = 'yellow';
      text = pendingUnlockTranslated;
    } else if (detailedDrawerData.Status === 3) {
      color = 'green';
      text = inProgressTranslated;
    } else if (detailedDrawerData.Status === 4) {
      color = 'red';
      text = detailedDrawerData.ErrorInfo.ErrorDescription;
    }

    return {
      color,
      text
    };
  }
}
