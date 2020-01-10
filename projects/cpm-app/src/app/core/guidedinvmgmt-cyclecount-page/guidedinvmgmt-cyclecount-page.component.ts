import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { map, shareReplay, filter, single, pluck, count } from 'rxjs/operators';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { NumericComponent } from '@omnicell/webcorecomponents';
import { InputsModule } from '@omnicell/webcorecomponents';
import { IGuidedCycleCount } from '../../api-core/data-contracts/i-guided-cycle-count';
import { GuidedCycleCountService } from '../../api-core/services/guided-cycle-count-service';
import { GuidedCycleCount } from '../model/guided-cycle-count';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { GuidedCycleCountUpdate } from '../model/guided-cycle-count-update';


@Component({
  selector: 'app-guidedinvmgmt-cyclecount-page',
  templateUrl: './guidedinvmgmt-cyclecount-page.component.html',
  styleUrls: ['./guidedinvmgmt-cyclecount-page.component.scss']
})

export class GuidedInvMgmtCycleCountPageComponent implements OnInit, AfterViewInit {
  @ViewChild('numericEle', null) numericElement: NumericComponent;  
  displayCycleCountItem: IGuidedCycleCount;
  cycleCountItems: Observable<IGuidedCycleCount[]>;
  isLastItem: boolean;

  titleHeader = '\'GUIDED_CYCLE_COUNT\' | translate';
  route: any;
  constructor(    
    private activatedRoute: ActivatedRoute,
    private guidedCycleCountService: GuidedCycleCountService,
    private wpfActionController: WpfActionControllerService
    ) { }

    mockData = [
      new GuidedCycleCount({
        DeviceLocationId: 86,  
        ItemId: "ace500t",
        BrandNameFormatted: "Tylenol 500mg tab",
        GenericNamdFOrmatted: "acetaminophen 500mg tab",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        LocationDescription: "Carosel 01-01-01",
        QuantityOnHand: 55,
        ReorderSource: "Internal"
      }),
      new GuidedCycleCount({
        DeviceLocationId: 87,  
        ItemId: "ace325t",
        BrandNameFormatted: "Tylenol 325mg tab",
        GenericNamdFOrmatted: "acetaminophen 325mg tab",
        ParLevel: 60,
        ReorderLevel: 30,
        ExpirationDate: new Date(),
        LocationDescription: "Carosel 01-01-02",
        QuantityOnHand: 52,
        ReorderSource: "Internal"
      }),
    ];

  ngOnInit() {
    var deviceId = this.activatedRoute.snapshot.queryParamMap.get('deviceId');

    //this.cycleCountItems = this.guidedCycleCountService.get(deviceId).pipe(map(guidedCycleCountItems => {
    //  
    //  return guidedCycleCountItems.map(p => new GuidedCycleCount(p));
    //}));
    
    this.cycleCountItems = of(this.mockData);
    this.nextRecord();
  }

  ngAfterViewInit() {
  }

  navigateBack(){
    this.wpfActionController.ExecuteBackAction();
  }

  navigateContinue(){
    var updateSucceeded = false;

    let update = new GuidedCycleCountUpdate({
      DeviceLocationId: this.displayCycleCountItem.DeviceLocationId,
      ItemId: this.displayCycleCountItem.ItemId,
      ExpirationData: this.displayCycleCountItem.ExpirationDate,
      QuantityOnHand: this.displayCycleCountItem.QuantityOnHand
        });

    this.guidedCycleCountService.post(update).pipe(map(success => {
      updateSucceeded = success;
      return success;
    }));


    if(this.isLastItem){
      this.wpfActionController.ExecuteContinueAction();
    }else{
      this.nextRecord();
    }
  }

  nextRecord(){
    var itemCount = 0;
    this.cycleCountItems.subscribe(x => {
      this.displayCycleCountItem = x[0];
      x.splice(0, 1);
      itemCount = x.length;

    });

    if(itemCount == 0){
      this.isLastItem = true;
    }
  }
}