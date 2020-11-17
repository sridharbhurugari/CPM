import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-tab-contents]',
  templateUrl: './tab-contents.component.html',
  styleUrls: ['./tab-contents.component.scss']
})
export class TabContentsComponent implements OnInit {

  @Input()
  tabKey: string;

  nativeElement: any;

  constructor(
    element: ElementRef,
  ) {
    this.nativeElement = element.nativeElement;
  }

  ngOnInit() {
  }

}
