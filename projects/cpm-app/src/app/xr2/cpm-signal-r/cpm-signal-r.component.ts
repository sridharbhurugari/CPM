import { Component, OnInit } from '@angular/core';
import { CpmSignalRService } from '../services/cpm-signal-r.service';

@Component({
  selector: 'app-cpm-signal-r',
  templateUrl: './cpm-signal-r.component.html',
  styleUrls: ['./cpm-signal-r.component.scss']
})
export class CpmSignalRComponent implements OnInit {

  codeImport = `
    constructor(private _cpmSignalRService: CpmSignalRService) {}

    ngOnInit() {
        this._cpmSignalRService.init();
    }`;

    constructor(private _cpmSignalRService: CpmSignalRService) {}

  ngOnInit() {
  }

  OnDestroy() {
    this._cpmSignalRService.shutdown();
    alert('dave');
  }

}
