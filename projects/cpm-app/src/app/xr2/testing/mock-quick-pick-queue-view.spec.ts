import { Component, EventEmitter, Input, Output } from "@angular/core";
import { QuickPickQueueItem } from "../model/quick-pick-queue-item";

@Component({
  selector: 'app-quick-pick-queue-view',
  template: ''
})
export class MockQuickPickQueueViewComponent {
  @Input()
  searchTextFilter: string;

  @Input()
  quickPickQueueItems: QuickPickQueueItem[];

  @Output()
  rerouteQuickPick: EventEmitter<QuickPickQueueItem> = new EventEmitter<QuickPickQueueItem>();
}