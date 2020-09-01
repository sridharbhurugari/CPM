import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-notification',
    template: ''
})
export class MockNotificationComponent {
    @Input() icon: string;
    @Input() text: string;
    @Input() backgroundColor: string;
    @Input() fontColor: string;
    @Input() width = 250;
    @Input() height = 35;
}