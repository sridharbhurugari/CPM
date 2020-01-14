import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { IPickRouteDetail } from '../../api-core/data-contracts/i-pickroute-detail';
import { DevicesService } from '../../api-core/services/devices.service';
import { PickRoutesService } from '../../api-core/services/pick-routes.service';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { PopupDialogService, PopupDialogProperties, PopupWindowService, PopupWindowProperties } from '@omnicell/webcorecomponents';
import { TextResultPopupComponent } from '../../shared/components/text-result-popup/text-result-popup.component';
import { ITextResultPopupData } from '../../shared/model/i-text-result-popup-data';

@Component({
  selector: 'app-edit-pick-route-page',
  templateUrl: './edit-pick-route-page.component.html',
  styleUrls: ['./edit-pick-route-page.component.scss']
})
export class EditPickRoutePageComponent implements OnInit {

  pickRoute$: Observable<IPickRouteDetail>;

  enabledDevices$: Observable<IDeviceSequenceOrder[]>;
  disabledDevices$: Observable<IDeviceSequenceOrder[]>;

  newDeviceSequence: IDeviceSequenceOrder[];

  constructor(
    private route: ActivatedRoute,
    private pickRoutesService: PickRoutesService,
    private devicesService: DevicesService,
    private wpfActionControllerService: WpfActionControllerService,
    private popupWindowService: PopupWindowService,
  ) { }

  ngOnInit() {
    var pickRouteId = this.route.snapshot.queryParamMap.get('pickRouteId');
    this.pickRoute$ = this.pickRoutesService.get(pickRouteId).pipe(shareReplay(1));
    var allDevices$ = this.devicesService.get().pipe(shareReplay(1));

    this.enabledDevices$ = forkJoin(this.pickRoute$, allDevices$).pipe(map(results => {
      var pickRouteDetail = results[0];
      var allDevices = results[1];
      var enabledDevices = allDevices.map(x => {
        var pickRouteDevice = pickRouteDetail.DeviceSequence.find(d => d.DeviceId == x.Id);
        var isSelected = pickRouteDevice != undefined;
        if(!isSelected){
          return null;
        }

        var sequenceOrder = pickRouteDevice.SequenceOrder;

        return {
          DeviceId: x.Id,
          DeviceDescription: x.Description,
          SequenceOrder: sequenceOrder,
        }
      });

      return enabledDevices.filter(x => x != null).sort((a, b) => a.SequenceOrder - b.SequenceOrder);
    }));

    this.disabledDevices$ = forkJoin(this.pickRoute$, allDevices$).pipe(map(results => {
      var pickRouteDetail = results[0];
      var allDevices = results[1];
      var disabledDevices = allDevices.map(x => {
        var pickRouteDevice = pickRouteDetail.DeviceSequence.find(d => d.DeviceId == x.Id);
        var isSelected = pickRouteDevice != undefined;
        if(isSelected){
          return null;
        }

        var sequenceOrder = 999;

        return {
          DeviceId: x.Id,
          DeviceDescription: x.Description,
          SequenceOrder: sequenceOrder,
        }
      });

      return disabledDevices.filter(x => x != null);
    }));
  }

  navigateBack() {
    this.wpfActionControllerService.ExecuteBackAction();
  }

  saveAs() {
    var properties = new PopupWindowProperties();
    var data: ITextResultPopupData = {
      headerResourceKey: 'SAVE_AS',
      placeholderTextResouceKey: 'NEW_ROUTE_NAME',
      initialValue: undefined,
      resultValue: null,
      beforeTextboxResourceKey: 'ROUTE_SAVEAS_BEFORE',
      afterTextboxResourceKey: 'ROUTE_SAVEAS_AFTER'
    };
    properties.data = data;

    var component = this.popupWindowService.show(TextResultPopupComponent, properties) as unknown as TextResultPopupComponent;
    component.dismiss.subscribe(selectedConfirm => {
      if(selectedConfirm){
        // this.pickRoutesService.saveAs(data.resultValue, this.newDeviceSequence);
      }
    });
  }

  onDeviceSequenceChanged(newDeviceSequence: IDeviceSequenceOrder[]){
    for(var i = 0; i < newDeviceSequence.length; i++){
      var device = newDeviceSequence[i];
      device.SequenceOrder = i + 1;
    }

    this.newDeviceSequence = newDeviceSequence;
  }
}
