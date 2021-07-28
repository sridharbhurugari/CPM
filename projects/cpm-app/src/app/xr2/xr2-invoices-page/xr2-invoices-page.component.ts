import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WpfActionPaths } from '../../core/constants/wpf-action-paths';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

@Component({
  selector: 'app-xr2-stocking-page',
  templateUrl: './xr2-invoices-page.component.html',
  styleUrls: ['./xr2-invoices-page.component.scss']
})
export class Xr2InvoicesPageComponent implements OnInit, AfterViewInit {

  constructor(private wpfActionControllerService: WpfActionControllerService) { }
  
  ngAfterViewInit(): void {

  }

  ngOnInit() {
  }

  navigateExisting() {
    let RestockTray =  {
      DeviceId: 2,
      IsReturn: false,
      RestockTrayStatus: 0,
      TrayId: 11,
      IsInvoiceTray: true,
    } as IRestockTray;

    this.wpfActionControllerService.ExecuteActionNameWithData(WpfActionPaths.XR2EditTrayPath, { RestockTray });
  }

  navigateNew(){
    let RestockTray =  {
      DeviceId: 2,
      IsReturn: false,
      RestockTrayStatus: 0,
      TrayId: 11,
      IsInvoiceTray: true,
    } as IRestockTray;

    this.wpfActionControllerService.ExecuteActionNameWithData(WpfActionPaths.XR2AddTrayPath, { RestockTray });
  }

}

export interface IRestockTray {
  DeviceId: number,
  IsReturn: boolean,
  RestockTrayStatus: number,
  TrayId: number,
  IsInvoiceTray: boolean,
}
