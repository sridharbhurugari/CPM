import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IRowIndexChanged } from '../events/i-row-index-changed';

@Component({
    selector: 'app-row-reorder-buttons',
    template: ''
})
export class MockRowReorderButtonsComponent {
    @Output()
    rowMovedUp: EventEmitter<any> = new EventEmitter();

    @Output()
    rowMovedDown: EventEmitter<any> = new EventEmitter();

    @Output()
    rowIndexChanged: EventEmitter<IRowIndexChanged<any>> = new EventEmitter();

    @Input()
    value: any;

    @Input()
    allowEditIndex: boolean;

    @Input()
    index: number;

    @Input()
    orderableLength: number;

    @Input()
    upDisabled: boolean;

    @Input()
    downDisabled: boolean;

    @Input()
    disabled: boolean;
}