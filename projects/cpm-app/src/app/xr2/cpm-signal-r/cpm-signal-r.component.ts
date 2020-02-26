import { Component, OnInit, OnDestroy } from '@angular/core';
import { CpmSignalRService } from '../services/cpm-signal-r.service';

@Component({
  selector: 'app-cpm-signal-r',
  templateUrl: './cpm-signal-r.component.html',
  styleUrls: ['./cpm-signal-r.component.scss']
})
export class CpmSignalRComponent implements OnInit, OnDestroy  {

  codeImport = `
    constructor(private _cpmSignalRService: CpmSignalRService) {}

    ngOnInit() {
        this._cpmSignalRService.init();
    }`;

    constructor(private _cpmSignalRService: CpmSignalRService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this._cpmSignalRService.shutdown();
    alert('dave');
  }

}
