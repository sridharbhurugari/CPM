import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-split-resize',
    template: ''
})
export class MockSplitResizeComponent {
    @Input()
    minSideWidth: number = 360;

    @Input()
    includeHeaderSpacer: boolean = false;
}