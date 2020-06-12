import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GridComponent as OCGridComp, PersistService } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { nameof } from '../../shared/functions/nameof';

@Component({
  selector: 'app-quick-pick-queue-view',
  templateUrl: './quick-pick-queue-view.component.html',
  styleUrls: ['./quick-pick-queue-view.component.scss']
})
export class QuickPickQueueViewComponent implements OnInit {

  private _quickPickDispenseBoxes: QuickPickQueueItem[];

  _searchTextFilter: string;

  gridoneKey = "gridone";
  restoreWidths = Array(6).fill(0);
  hasPersistedData = false;

  @ViewChild('ocgrid', { static: false })
    ocgrid: OCGridComp;

  @Input()
  set searchTextFilter(value: string) {
    this._searchTextFilter = value;
  }

  get searchTextFilter(): string {
    return this._searchTextFilter;
  }

  searchFields = [nameof<QuickPickQueueItem>('PriorityDescription'), nameof<QuickPickQueueItem>('DestinationLine1'),
  , nameof<QuickPickQueueItem>('DestinationLine2')];

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
    private persistService: PersistService) {
  }

  ngOnInit() {
  }

  /* istanbul ignore next */
  onWidthsChange(data: number[]) {
    this.persistService.browserSave(this.gridoneKey, data);
    if (!this.hasPersistedData) {
      this.hasPersistedData = true;
    }
  }

  onSkipClick() {
    console.log("Skip Clicked!")
  }

}
