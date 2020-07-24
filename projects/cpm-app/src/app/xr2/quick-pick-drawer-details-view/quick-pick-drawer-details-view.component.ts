import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuickPickDrawerData } from '../model/quick-pick-drawer-data';
import { QuickPickControlDataStatus } from '../model/quick-pick-control-data-status';
import { TranslateService } from '@ngx-translate/core';
import { CpColorService } from '../../shared/services/cp-color.service';
import { BarcodeScanMessage } from '../model/barcode-scan-message';

@Component({
  selector: 'app-quick-pick-drawer-details-view',
  templateUrl: './quick-pick-drawer-details-view.component.html',
  styleUrls: ['./quick-pick-drawer-details-view.component.scss']
})
export class QuickPickDrawerDetailsViewComponent implements OnInit {

  private _detailedDrawerData: QuickPickDrawerData;
  private _scanMessage: BarcodeScanMessage;

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

  @Input()
  set scanMessage(value: BarcodeScanMessage) {
    this._scanMessage = value;
  }

  get scanMessage(): BarcodeScanMessage {
    return this._scanMessage;
  }

  constructor(private translateService: TranslateService, private colorService: CpColorService) { }

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
        'color': this.detailedDrawerData.ColorCode ?
        this.colorService.pickTextColorBasedOnBackgroundColor(this.detailedDrawerData.ColorCode, '#FFFFFF', '#000000') : 'black'
      };
    }

    return headerStyle;
  }

  getTrafficLightProperties(detailedDrawerData: QuickPickDrawerData) {

    let color = '';
    let text = '';
    let isBlinking =  false;

    if (detailedDrawerData.Status === 1) {
      color = 'gray';
      isBlinking = false;
      this.translateService.get('SCAN_TO_UNLOCK').subscribe((res: string) => {
        text = res;
      });
    } else if (detailedDrawerData.Status === 2) {
      color = 'yellow';
      isBlinking = true;
      this.translateService.get('PENDING_UNLOCK').subscribe((res: string) => {
        text = res;
      });
    } else if (detailedDrawerData.Status === 3) {
      color = 'green';
      isBlinking = true;
      this.translateService.get('IN_PROGRESS').subscribe((res: string) => {
        text = res;
      });
    } else if (detailedDrawerData.Status === 4) {
      color = 'red';
      isBlinking = true;
      text = detailedDrawerData.ErrorInfo.ErrorDescription;
    }

    return {
      color,
      text,
      isBlinking
    };
  }
}
