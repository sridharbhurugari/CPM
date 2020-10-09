import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-cp-data-label',
  templateUrl: './cp-data-label.component.html',
  styleUrls: ['./cp-data-label.component.scss']
})
export class CPDataLabelComponent implements OnInit {
  @Input() dataSize: number = 25;
  @Input() labelSize: number = 15;
  @Input() data: string;
  @Input() label: string;
  constructor() { }
  ngOnInit() {
  }
}
