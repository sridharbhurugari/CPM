import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICompletePickData } from '../model/i-completed-pick-data';
import { IGuidedPickData } from '../model/i-guided-pick-data';

@Component({
  selector: 'app-guided-pick',
  template: '',
})
export class MockGuidedPickComponent {
  @Input()
  guidedPickData: IGuidedPickData;

  @Output()
  pickCompleted: EventEmitter<ICompletePickData> = new EventEmitter<ICompletePickData>();

  @Output()
  pauseClicked: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  holdClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
}