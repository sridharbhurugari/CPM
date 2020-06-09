import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GridComponent as OCGridComp, PersistService } from '@omnicell/webcorecomponents';

import { QuickPickDispenseBox } from '../model/quick-pick-dispense-box';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-quick-pick-queue-view',
  templateUrl: './quick-pick-queue-view.component.html',
  styleUrls: ['./quick-pick-queue-view.component.scss']
})
export class QuickPickQueueViewComponent implements OnInit {

  private _quickPickDispenseBoxes: QuickPickDispenseBox[];

  gridoneKey = "gridone";
  restoreWidths = Array(6).fill(0);
  hasPersistedData = false;

  searchMap = {};

  @ViewChild('ocgrid', { static: false }) ocgrid: OCGridComp;

  @Input()
  set quickPickDispenseBoxes(value: QuickPickDispenseBox[]) {
    this._quickPickDispenseBoxes = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  get quickPickDispenseBoxes(): QuickPickDispenseBox[] {
    return this._quickPickDispenseBoxes;
  }

  constructor(
    private windowService: WindowService,
    private wpfActionController: WpfActionControllerService,
    private persistService: PersistService) {
  }

  ngOnInit() {

  }

  onWidthsChange(data: number[]) {
    this.persistService.browserSave(this.gridoneKey, data);
    if (!this.hasPersistedData) {
      this.hasPersistedData = true;
    }
  }

  onColSearchChange(data: any) {
    this.searchMap = data;
  }

  trackByFunction(index, item) {
    if (!item) {
      return null;
    }
    return item.id;
  }

  ngOnDestroy() {
    this.searchMap = null;
  }

  back() {
    this.wpfActionController.ExecuteContinueAction();
  }

  onSkipClick() {
  }

}
