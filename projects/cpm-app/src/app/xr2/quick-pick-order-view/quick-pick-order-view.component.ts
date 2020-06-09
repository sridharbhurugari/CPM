import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GridComponent as OCGridComp, PersistService } from '@omnicell/webcorecomponents';

import { QuickPickOrderItem } from '../model/quick-pick-order-item';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-quick-pick-order-view',
  templateUrl: './quick-pick-order-view.component.html',
  styleUrls: ['./quick-pick-order-view.component.scss']
})
export class QuickPickOrderViewComponent implements OnInit {

  private _quickpickOrderItems: QuickPickOrderItem[];

  gridoneKey = "gridone";
  restoreWidths = Array(6).fill(0);
  hasPersistedData = false;

  searchMap = {};

  @ViewChild('ocgrid', { static: false }) ocgrid: OCGridComp;

  @Input()
  set quickpickOrderItems(value: QuickPickOrderItem[]) {
    this._quickpickOrderItems = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  get quickpickOrderItems(): QuickPickOrderItem[] {
    return this._quickpickOrderItems;
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
