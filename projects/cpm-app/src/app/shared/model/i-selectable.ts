import { EventEmitter } from '@angular/core';
import { ISelectionStateChanged } from './i-selection-state-changed';

export interface ISelectable<T> {
    SelectionStateChanged: EventEmitter<ISelectionStateChanged<T>>;
    IsSelected: boolean;
}