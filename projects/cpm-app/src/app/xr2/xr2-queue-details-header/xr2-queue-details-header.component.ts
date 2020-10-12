import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OutputDeviceAction } from '../../shared/enums/output-device-actions';
import { WindowService } from '../../shared/services/window-service';
import { PicklistQueueItem } from '../model/picklist-queue-item';

@Component({
  selector: 'app-xr2-queue-details-header',
  templateUrl: './xr2-queue-details-header.component.html',
  styleUrls: ['./xr2-queue-details-header.component.scss']
})
export class Xr2QueueDetailsHeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  private updateDisableSelectAll$: Subscription;
  private updateMultiSelectMode$: Subscription;

  disabledButtonActions: any;
  multiSelectMode = false;
  outputDeviceAction: typeof OutputDeviceAction = OutputDeviceAction;

  @Input() updateDisableSelectAllEvent: Observable<any>;
  @Input() updateMultiSelectModeEvent: Observable<any>;

  @Output() backEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() searchTextFilterEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() rerouteAllEvent: EventEmitter<void> = new EventEmitter();
  @Output() releaseAllEvent: EventEmitter<void> = new EventEmitter();
  @Output() printAllEvent: EventEmitter<void> = new EventEmitter();

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;


  constructor(private windowService: WindowService) {
   }

  ngOnInit() {
    this.setButtonPanelDefaults();
    this.updateMultiSelectMode$ = this.updateMultiSelectModeEvent.subscribe((event) => {
      this.updateMultiSelectMode(event);
    });
    this.updateDisableSelectAll$ = this.updateDisableSelectAllEvent.subscribe((event) => {
      this.updateButtonPanel(event);
    });
  }

  ngAfterViewInit() {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilterEvent.emit(data);
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }

  ngOnDestroy() {
    this.updateDisableSelectAll$.unsubscribe();
    this.updateMultiSelectMode$.unsubscribe();
  }

  onBackClick() {
    this.backEvent.emit();
  }

  private setButtonPanelDefaults() {
    const properties = {};
    for (const action in OutputDeviceAction) {
      if (!isNaN(Number(action))) {
        properties[action] = true;
      }
    }

    this.disabledButtonActions = properties;
  }

  private updateButtonPanel(actionDisableMap: Map<OutputDeviceAction, Set<PicklistQueueItem>>) {
    const disabledActions = {};
    for (const action in OutputDeviceAction) {
      if (!isNaN(Number(action))) {
        const isDisabled = actionDisableMap.get(Number(action)).size > 0 ? true : false;
        disabledActions[action] = this.multiSelectMode ? isDisabled : true;
      }
    }

    this.disabledButtonActions = disabledActions;
  }

  private updateMultiSelectMode(state: boolean) {
    this.multiSelectMode = state;
  }
}
