import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import {  Observable } from 'rxjs';
import { nameof } from '../../shared/functions/nameof';
import { map} from 'rxjs/operators';
import { WindowService } from '../../shared/services/window-service';
import { IPriorityCodePickRoute } from '../../api-core/data-contracts/i-priority-code-pick-route';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { PickRouteDevices } from '../model/pickroute-devices';



@Component({
  selector: 'app-priority-code-route-assignments',
  templateUrl: './priority-code-route-assignments.component.html',
  styleUrls: ['./priority-code-route-assignments.component.scss']
})
export class PriorityCodeRouteAssignmentsComponent implements AfterViewInit {

  @Input()
  pickrouteDevices: PickRouteDevices[];
  devices: IDeviceSequenceOrder[];
  priorityCode: IPriorityCodePickRoute;
radioRange: any[];
constructor(
    private windowService: WindowService
  ) { }

  ngAfterViewInit(): void {
    this.radioRange = this.pickrouteDevices.map(r => this.prdToRadio(r));
  }

 prdToRadio(pk: PickRouteDevices) {
    let displayField = pk.RouteDescription;
    let valueField = pk.PickRouteId;
    let disabled = true;
    return {displayField , valueField , disabled};
  }

}
