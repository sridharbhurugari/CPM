import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scalable-text',
  template: ''
})
export class MockScalableTextComponent {

  @Input()
  textValue: string;

  constructor() { }
}