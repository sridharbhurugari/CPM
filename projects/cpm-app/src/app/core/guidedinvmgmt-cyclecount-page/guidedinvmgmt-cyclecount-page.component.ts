import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { map, shareReplay, filter, single, pluck } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { NumericComponent } from '@omnicell/webcorecomponents';
import { InputsModule } from '@omnicell/webcorecomponents';


@Component({
  selector: 'app-guidedinvmgmt-cyclecount-page',
  templateUrl: './guidedinvmgmt-cyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-cyclecount-page.component.scss']
})

export class GuidedInvMgmtCycleCountPageComponent implements OnInit, AfterViewInit {
  @ViewChild('numericEle', null) numericElement: NumericComponent;  
 

  titleHeader = '\'GUIDED_CYCLE_COUNT\' | translate';
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}