import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IDestockTypeInfo } from '../../api-xr2/data-contracts/i-destock-type-info';
import { DestockService } from '../../api-xr2/services/destock.service';
import { IXr2QueueNavigationParameters } from '../../shared/interfaces/i-xr2-queue-navigation-parameters';
import { IXr2QueuePageConfiguration } from '../../shared/interfaces/i-xr2-queue-page-configuration';

@Component({
  selector: 'app-destock-page',
  templateUrl: './destock-page.component.html',
  styleUrls: ['./destock-page.component.scss']
})
export class DestockPageComponent implements OnInit {

  @Input() xr2QueueNavigationParameters: IXr2QueueNavigationParameters;
  @Input() savedPageConfiguration: IXr2QueuePageConfiguration;
  deviceId: number;
  deviceDestockTypeInfo = new Observable<IDestockTypeInfo[]>();
  constructor(private destockService: DestockService) { }

  ngOnInit() {
  }

  onDetailsPageBackNavigation() {
    this.xr2QueueNavigationParameters = null;
  }
  onPrint(event: IDestockTypeInfo) {
  }

  onChangedDeviceId() {
// update screen with controller info
this.destockService.get(this.deviceId).subscribe(() => this.deviceDestockTypeInfo), shareReplay(1);
// this.deviceDestockTypeInfo = this.destockService.get(this.deviceId).pipe(map(x => {
//   const displayObjects = x.map(d => new IDestockTypeInfo(d));
//   return displayObjects;
// }), shareReplay(1));
      }

  onRequestXr2CurrentNumbers() {
// Request for Device Id
// If No Device - request button shouldn't be available.
// update screen and save results to db
  }

}
