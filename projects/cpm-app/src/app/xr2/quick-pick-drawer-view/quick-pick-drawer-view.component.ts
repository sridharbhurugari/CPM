import { Component, OnInit, Input } from '@angular/core';

import { QuickPickDrawer} from './../model/quick-pick-drawer';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-quick-pick-drawer-view',
  templateUrl: './quick-pick-drawer-view.component.html',
  styleUrls: ['./quick-pick-drawer-view.component.scss']
})
export class QuickPickDrawerViewComponent implements OnInit {

  showDetailedView = false;
  _quickpickDrawers: QuickPickDrawer[];

  get quickpickDrawers(): QuickPickDrawer[] {
    return this._quickpickDrawers;
  }

  @Input()
  set quickpickDrawers(value: QuickPickDrawer[]) {
    this._quickpickDrawers = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  constructor(private windowService: WindowService) {
    const mockList = [
      new QuickPickDrawer];

    this.quickpickDrawers = mockList;
   }

  ngOnInit() {
  }

  openDetailedView(event) {
    this.showDetailedView = true;
  }

  closeDetailedView() {
    this.showDetailedView = false;
  }

}
