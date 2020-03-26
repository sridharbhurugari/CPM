import { Component, OnInit, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IPopupWindowContainer, TextboxComponent } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { ITextResultPopupData } from '../../model/i-text-result-popup-data';

@Component({
  selector: 'app-text-result-popup',
  templateUrl: './text-result-popup.component.html',
  styleUrls: ['./text-result-popup.component.scss']
})
export class TextResultPopupComponent implements OnInit, OnDestroy, IPopupWindowContainer {
  placeholderTextResourceKey: string;

  beforeTextboxResourceKey: string;

  afterTextboxResourceKey: string;

  textValue: string;

  data: ITextResultPopupData;

  intersectionObserver: IntersectionObserver;

  @Output()
  dismiss: Subject<boolean> = new Subject<boolean>();

  @ViewChild('nameInput', { static: true })
  nameInput: TextboxComponent;

  constructor() { }

  ngOnInit() {
    this.textValue = this.data.initialValue;
    this.placeholderTextResourceKey = this.data.placeholderTextResouceKey;
    this.beforeTextboxResourceKey = this.data.beforeTextboxResourceKey ;
    this.afterTextboxResourceKey = this.data.afterTextboxResourceKey;
    var textInput = this.nameInput.inputView;

    this.intersectionObserver = new IntersectionObserver(entries => {
      if(textInput.nativeElement.offsetParent != null){
        textInput.nativeElement.focus();
      }
    });

    this.intersectionObserver.observe(textInput.nativeElement);
  }

  ngOnDestroy(): void {
    this.intersectionObserver.disconnect();
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
