import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InternalTransferPick } from '../model/internal-transfer-pick';

@Component({
  selector: 'app-internal-transfer-pick-needs-list',
  template: '',
})
export class MockInternalTransferPickNeedsListComponent {
  @Input()
  itemNeeds: InternalTransferPick[];

  @Output()
  pickTotalChanged: EventEmitter<number> = new EventEmitter<number>();
}