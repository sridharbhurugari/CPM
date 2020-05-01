import { Component, OnInit } from '@angular/core';
import { IPopupWindowContainer } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-spinner-popup',
  templateUrl: './spinner-popup.component.html',
  styleUrls: ['./spinner-popup.component.scss']
})
export class SpinnerPopupComponent implements OnInit, IPopupWindowContainer {
  data: any;

  dismiss: Subject<boolean>;

  constructor() { }

  ngOnInit() {
  }
}
