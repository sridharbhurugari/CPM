import { Component, Input } from '@angular/core';

@Component({
  selector: '[app-tab-contents]',
  template: '',
})
export class MockTabContentsComponent {
  @Input()
  tabKey: string;
}