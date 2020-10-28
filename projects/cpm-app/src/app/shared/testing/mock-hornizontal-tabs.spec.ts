import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-tabs',
  template: '',
})
export class MockHorizontalTabsComponent {
  @Input()
  tabHeaderResourceKeys: string[]

  @Input()
  selectedTab: string;
}