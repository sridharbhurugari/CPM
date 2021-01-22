import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Guid } from "guid-typescript";
import { SelectableDeviceInfo } from "../../shared/model/selectable-device-info";
import { BarcodeScanMessage } from "../model/barcode-scan-message";
import { QuickPickDrawerData } from "../model/quick-pick-drawer-data";
import { QuickPickError } from "../model/quick-pick-error";
import { QuickPickQueueItem } from "../model/quick-pick-queue-item";

@Component({
  selector: 'app-quick-pick-drawer-view',
  template: ''
})
export class MockQuickPickDrawerViewComponent {
    @Output() quickPickActive: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() rerouteQuickPick: EventEmitter<Guid> = new EventEmitter<Guid>();
    @Output() failedEvent: EventEmitter<QuickPickError> = new EventEmitter<QuickPickError>()

    @Input() selectedDeviceInformation: SelectableDeviceInfo;
    @Input() quickpickDrawers: QuickPickDrawerData[];
    @Input() scanMessage: BarcodeScanMessage;
}