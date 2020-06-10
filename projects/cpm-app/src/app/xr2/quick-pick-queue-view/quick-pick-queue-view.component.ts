import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GridComponent as OCGridComp, PersistService } from '@omnicell/webcorecomponents';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WindowService } from '../../shared/services/window-service';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { shareReplay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quick-pick-queue-view',
  templateUrl: './quick-pick-queue-view.component.html',
  styleUrls: ['./quick-pick-queue-view.component.scss']
})
export class QuickPickQueueViewComponent implements OnInit {

  private _quickPickDispenseBoxes: QuickPickQueueItem[];

  gridoneKey = "gridone";
  restoreWidths = Array(6).fill(0);
  hasPersistedData = false;

  searchMap = {};

  @ViewChild('ocgrid', { static: false }) ocgrid: OCGridComp;

  @Input()
  set quickPickQueueItems(value: QuickPickQueueItem[]) {
    this._quickPickDispenseBoxes = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  get quickPickQueueItems(): QuickPickQueueItem[] {
    return this._quickPickDispenseBoxes;
  }

  constructor(
    private windowService: WindowService,
    private wpfActionController: WpfActionControllerService,
    private persistService: PersistService,
    private quickPickQueueService: Xr2QuickPickQueueService,) {
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
