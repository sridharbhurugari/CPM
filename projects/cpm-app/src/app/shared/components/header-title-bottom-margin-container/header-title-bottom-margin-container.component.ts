import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-title-bottom-margin-container',
  templateUrl: './header-title-bottom-margin-container.component.html',
  styleUrls: ['./header-title-bottom-margin-container.component.scss']
})
export class HeaderTitleBottomMarginContainerComponent implements OnInit {
  @Input()
  title: string;

  constructor() { }

  ngOnInit() {
  }
}
