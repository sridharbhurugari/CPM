import { Component, OnInit, Output } from '@angular/core';
import { IPopupWindowContainer } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { ITextResultPopupData } from '../../model/i-text-result-popup-data';

@Component({
  selector: 'app-text-result-popup',
  templateUrl: './text-result-popup.component.html',
  styleUrls: ['./text-result-popup.component.scss']
})
export class TextResultPopupComponent implements OnInit, IPopupWindowContainer {
  placeholderTextResourceKey: string;

  beforeTextboxResourceKey: string;

  afterTextboxResourceKey: string;

  textValue: string;

  data: ITextResultPopupData;

  @Output()
  dismiss: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.textValue = this.data.initialValue;
    this.placeholderTextResourceKey = this.data.placeholderTextResouceKey;
    this.beforeTextboxResourceKey = this.data.beforeTextboxResourceKey ;
    this.afterTextboxResourceKey = this.data.afterTextboxResourceKey;
  }

  cancel() {
    this.data.resultValue = null;
    this.dismiss.next(false);
  }

  continue() {
    this.data.resultValue = this.textValue;
    this.dismiss.next(true);
  }

  textValueChanged(newValue: string){
    this.textValue = newValue;
  }
}
