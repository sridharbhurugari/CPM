import { Component, Input } from '@angular/core';

@Component({
  selector: '[app-headered-content-control]',
  template: '',
})
export class MockHeaderedContentControlComponent {
  @Input()
  headerResourceKey: string;

  @Input()
  headerValue: string;

  @Input()
  headerFontWeight: number = 400;

  @Input()
  headerFontSizePx: number = 14;

  @Input()
  contentBackgroundColor: string;

  @Input()
  showIcon: boolean;
}