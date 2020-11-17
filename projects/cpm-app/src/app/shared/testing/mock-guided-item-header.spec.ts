import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItemHeaderInfo } from '../model/i-item-header-info';

@Component({
    selector: 'app-guided-item-header',
    template: '',
})
export class MockGuidedItemHeaderComponent {
    @Input()
    itemHeaderInfo: IItemHeaderInfo;

    @Output()
    leaseDenied: EventEmitter<any> = new EventEmitter();
}