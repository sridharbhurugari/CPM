import { Component, OnInit, ViewChild } from '@angular/core';
import { QuickPickDrawerData } from './../model/quick-pick-drawer-data';
import { Observable, of } from 'rxjs';
import { QuickPickQueueItem } from '../model/quick-pick-queue-item';
import { switchMap } from 'rxjs/operators';
import { Xr2QuickPickQueueService } from '../../api-xr2/services/xr2-quick-pick-queue.service';
import { Xr2QuickPickDrawerService } from '../../api-xr2/services/quick-pick-drawer.service';
import { SearchBoxComponent, SingleselectRowItem, PopupDialogService, PopupDialogType,
  PopupDialogProperties } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { Xr2QuickPickQueueDeviceService } from '../../api-xr2/services/xr2-quick-pick-queue-device.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { QuickPickEventConnectionService } from '../../xr2/services/quick-pick-event-connection.service';
import { TranslateService } from '@ngx-translate/core';
import { IQuickPickQueueItem } from '../../api-xr2/data-contracts/i-quick-pick-queue-item';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { SystemConfigurationService } from '../../shared/services/system-configuration.service';

@Component({
  selector: 'app-quick-pick-page',
  templateUrl: './quick-pick-page.component.html',
  styleUrls: ['./quick-pick-page.component.scss']
})
export class QuickPickPageComponent implements OnInit {

  quickpickDrawers: Observable<QuickPickDrawerData[]>;
  quickPickQueueItems: Observable<QuickPickQueueItem[]>;
  searchTextFilter: Observable<string>;

  robotSelectionDisabled = false;
  outputDeviceDisplayList: SingleselectRowItem[] = [];
  defaultDeviceDisplyItem: SingleselectRowItem;
  selectedDeviceId: string;
  popupTimeoutSeconds = 10;


  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;


  constructor(
    private quickPickQueueService: Xr2QuickPickQueueService,
    private quickPickDeviceService: Xr2QuickPickQueueDeviceService,
    private quickPickDrawerService: Xr2QuickPickDrawerService,
    private quickPickEventConnectionService: QuickPickEventConnectionService,
    private windowService: WindowService,
    private ocapHttpConfigurationService: OcapHttpConfigurationService,
    private translateService: TranslateService,
    private changeDetector: ChangeDetectorRef,
    private dialogService: PopupDialogService,
    private systemConfigurationService: SystemConfigurationService
    ) {
      this.quickPickQueueItems = of([]);
    }

  ngOnInit() {
      this.getActiveXr2Devices();
      this.systemConfigurationService.GetConfigurationValues('TIMEOUTS', 'POP_UP_MESSAGE_TIMEOUT').subscribe(result => {
        console.log('popup message timeout : ' + result);
        console.log(result);
        this.popupTimeoutSeconds = (Number(result.Value));
      });
  }

  /* istanbul ignore next */
  ngAfterViewInit(): void {
    this.quickPickEventConnectionService.QuickPickQueueUpdateSubject.subscribe(event => this.onQuickPickQueueUpdate(event));
    this.quickPickEventConnectionService.QuickPickErrorUpdateSubject.subscribe(event => this.onQuickPickErrorUpdate(event));

    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = of(data);
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  private onQuickPickQueueUpdate(event) {
    if (event.DeviceId !== undefined && event.DeviceId.toString() !== this.selectedDeviceId) {
      return;
    }

    this.loadPicklistsQueueItems();
  }

  private onQuickPickErrorUpdate(event) {
    if (event.DeviceId !== undefined && event.DeviceId.toString() !== this.selectedDeviceId) {
      return;
    }
    this.displayQuickPickError(event.ErrorMessage);
  }

  async getActiveXr2Devices() {
    const results = await this.quickPickDeviceService.get().toPromise();
    const newList: SingleselectRowItem[] = [];

    const currentClientId = this.ocapHttpConfigurationService.get().clientId;
    let defaultFound: SingleselectRowItem;
    results.forEach(selectableDeviceInfo => {
      const selectRow = new SingleselectRowItem(selectableDeviceInfo.Description, selectableDeviceInfo.DeviceId.toString());
      newList.push(selectRow);

      if (!defaultFound && selectableDeviceInfo.CurrentLeaseHolder.toString() === currentClientId) {
        defaultFound = selectRow;
      }
    });

    this.outputDeviceDisplayList = newList;

    if (defaultFound) {
      this.selectedDeviceId = defaultFound.value;
      this.defaultDeviceDisplyItem = this.outputDeviceDisplayList.find(x => x.value === this.selectedDeviceId);
      this.loadDrawersData();
      this.loadPicklistsQueueItems();
    }
  }

  onQuickPickActive(isActive: boolean) {
    this.robotSelectionDisabled = isActive;
  }

  /* istanbul ignore next */
  onDeviceSelectionChanged($event) {
    if (this.selectedDeviceId !== $event.value) {
      this.searchElement.clearSearch(null);
      this.selectedDeviceId = $event.value;
      this.loadDrawersData();
      this.loadPicklistsQueueItems();
    }
  }

  onRerouteQuickPick($event: IQuickPickQueueItem) {
    this.quickPickQueueService.reroute($event).subscribe(
      () => {
        this.loadPicklistsQueueItems();
      }, error => {
        this.displayFailedToSaveDialog();
        this.loadPicklistsQueueItems();
      });
  }

  private loadPicklistsQueueItems(): void {
    if (!this.selectedDeviceId) {
      return;
    }

    this.quickPickQueueService.get(this.selectedDeviceId).subscribe(items => {
      this.quickPickQueueItems = of(items);
    });
  }

  private loadDrawersData() {
    if (!this.selectedDeviceId) {
      return;
    }

    this.quickPickDrawerService.getAllDrawers(this.selectedDeviceId).subscribe(data => {
      this.quickpickDrawers = of(data);
    });
  }

  /* istanbul ignore next */
  private displayFailedToSaveDialog(): void {
    const properties = new PopupDialogProperties('Role-Status-Warning');
    this.translateService.get('FAILEDTOSAVE_HEADER_TEXT').subscribe(result => { properties.titleElementText = result; });
    this.translateService.get('FAILEDTOSAVE_BODY_TEXT').subscribe(result => { properties.messageElementText = result; });
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'Ok';
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.dialogService.showOnce(properties);
  }

  private displayQuickPickError(message): void {
    const properties = new PopupDialogProperties('Role-Status-Warning');
    this.translateService.get('XR2_QUICK_PICK_ERROR_HEADER').subscribe(result => { properties.titleElementText = result; });
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.primaryButtonText = 'Ok';
    properties.dialogDisplayType = PopupDialogType.Error;
    properties.timeoutLength = this.popupTimeoutSeconds;
    this.dialogService.showOnce(properties);
  }
}
