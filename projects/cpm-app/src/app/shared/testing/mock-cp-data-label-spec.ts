import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-cp-data-label',
  template: '',
})

export class MockCpDataLabelComponent implements OnInit {
  @Input() dataSize: number = 25;
  @Input() labelSize: number = 15;
  @Input() numberedData: number;
  @Input() label: string;
  constructor() { }
  ngOnInit() {
  }
}
