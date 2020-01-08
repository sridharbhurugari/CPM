import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { map, shareReplay, filter, single, pluck } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { NumericComponent } from '@omnicell/webcorecomponents';
import { InputsModule } from '@omnicell/webcorecomponents';
import { IGuidedCycleCount } from '../../api-core/data-contracts/i-guided-cycle-count';
import { GuidedCycleCountService } from '../../api-core/services/guided-cycle-count-service';
import { GuidedCycleCount } from '../model/guided-cycle-count';


@Component({
  selector: 'app-guidedinvmgmt-cyclecount-page',
  templateUrl: './guidedinvmgmt-cyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-cyclecount-page.component.scss']
})

export class GuidedInvMgmtCycleCountPageComponent implements OnInit, AfterViewInit {
  @ViewChild('numericEle', null) numericElement: NumericComponent;  
  displayCycleCountItem: Observable<IGuidedCycleCount>;

  titleHeader = '\'GUIDED_CYCLE_COUNT\' | translate';
  route: any;
  constructor(    
    private activatedRoute: ActivatedRoute,
    private guidedCycleCountService: GuidedCycleCountService
    ) { }

  ngOnInit() {
    var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');

    this.displayCycleCountItem = this.guidedCycleCountService.get(deviceId).pipe(map(guidedCycleCountItems => {
      return guidedCycleCountItems.map(p => new GuidedCycleCount(p))[0];
   }));
  }

  ngAfterViewInit() {
  }

  navigateBack(){
  }

}