import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-cp-clickable-icon',
    template: '',
})
export class MockCpClickableIconComponent {

    @Input() width: number = 30;
    @Input() height: number = 30;
    @Input() icon: string;
    @Input() theme: string;
    @Input() label: string;
    @Input() disabled: boolean = false;

    @Output() clickEvent: EventEmitter<any> = new EventEmitter();
}