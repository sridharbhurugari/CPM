import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';
import { nameof } from '../../shared/functions/nameof';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-internal-transfer-device-list',
  templateUrl: './internal-transfer-device-list.component.html',
  styleUrls: ['./internal-transfer-device-list.component.scss']
})
export class InternalTransferDeviceListComponent implements OnInit {
  private _deviceNeeds: IDeviceReplenishmentNeed[];

  readonly deviceDescriptionPropertyName: string = nameof<IDeviceReplenishmentNeed>('DeviceDescription');
  readonly countPropertyName: string = nameof<IDeviceReplenishmentNeed>('ItemsBelowReorderLevel');

  searchPropertyNames: string[] = [
    this.deviceDescriptionPropertyName,
  ]

  searchTextFilter: string;

  @Input()
  set deviceNeeds(value: IDeviceReplenishmentNeed[]) {
    this._deviceNeeds = value;
    this.windowService.dispatchResizeEvent();
  }

  get deviceNeeds(): IDeviceReplenishmentNeed[] {
    return this._deviceNeeds;
  }

  @ViewChild('ocsearchbox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  @Output()
  deviceSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private windowService: WindowService
  ) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(): void {
    this.searchElement.searchOutput$
      .subscribe(data => {
        this.searchTextFilter = data;
        this.windowService.dispatchResizeEvent();
      });
  }
}
