import { Component, Input, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WindowService } from '../../shared/services/window-service';
import { SearchBoxComponent, PopupDialogService } from '@omnicell/webcorecomponents';
import { nameof } from '../../shared/functions/nameof';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import * as _ from 'lodash';
import { SortDirection } from '../../shared/constants/sort-direction';
import { WorkstationTrackerService } from '../../api-core/services/workstation-tracker.service';
import { WorkstationTrackerData } from '../../api-core/data-contracts/workstation-tracker-data';
import { OperationType } from '../../api-core/data-contracts/operation-type';
import { PopupDialogProperties, PopupDialogType, } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-underfilled-picklists',
  templateUrl: './underfilled-picklists.component.html',
  styleUrls: ['./underfilled-picklists.component.scss']
})
export class UnderfilledPicklistsComponent implements AfterViewInit, OnInit {
  private _picklists: UnderfilledPicklist[];

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;

  searchTextFilter: string;

  searchFields = [
    nameof<UnderfilledPicklist>('DescriptionSearchValue'),
    nameof<UnderfilledPicklist>('DesintationSearchValue'),
    nameof<UnderfilledPicklist>('DateSearchValue'),
    nameof<UnderfilledPicklist>('PriorityDescription'),
    nameof<UnderfilledPicklist>('OrderId'),
  ];

  sequencePropertyName = nameof<UnderfilledPicklist>('SequenceOrder');
  orderPropertyName = nameof<UnderfilledPicklist>('OrderId');
  typePropertyName =  nameof<UnderfilledPicklist>('PriorityDescription');
  descriptionPropertyName =  nameof<UnderfilledPicklist>('DescriptionSearchValue');
  destinationPropertyName = nameof<UnderfilledPicklist>('DesintationSearchValue');
  datePropertyName = nameof<UnderfilledPicklist>('CompletedDate');

  currentSortPropertyName : string = this.datePropertyName;
  sortOrder: SortDirection = SortDirection.descending;
  workstation: string;
  okButtonText: string;
  orderInUseTitle: string;

  @Input()
  set picklists(value: UnderfilledPicklist[]){
    this._picklists = value;
    if(this.windowService.nativeWindow){
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  get picklists(): UnderfilledPicklist[]{
    return this._picklists;
  }

  constructor(
    private windowService: WindowService,
    private wpfActionControllerService: WpfActionControllerService,
    private workstationTrackerService: WorkstationTrackerService,
    private dialogService: PopupDialogService,
    public translateService: TranslateService,
  ) {
  }

  ngOnInit() {
    this.translateService.get('OK').subscribe(s => this.okButtonText = s);
    this.translateService.get('ORDER_IN_USE_TITLE').subscribe(s => this.orderInUseTitle = s);
    this.workstationTrackerService.GetWorkstationShortName().subscribe(s => this.workstation = s);
  }

  ngAfterViewInit(): void {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.searchTextFilter = data;
        if (this.windowService.nativeWindow) {
          this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
        }
      });
  }

  navigate(orderId: string){
    const workstationTrackerData: WorkstationTrackerData = {
      Id: orderId,
      Operation: OperationType.Unfilled,
      ConnectionId: null,
      WorkstationShortName: this.workstation
    };
    this.workstationTrackerService.GetWorkstationShortNames(workstationTrackerData).subscribe(success => {
      if (success.length > 0) {
        const workstationsInUse = this.buildWorkstationsInUseStringFromResult(success);
        this.translateService
        .get('ORDER_IN_USE_MSG', {
          workstations: workstationsInUse
        })
        .subscribe((result) => {
          this.displayInfo(this.orderInUseTitle, result);
          return;
        });
        return;
      }

      this.workstationTrackerService.Track(workstationTrackerData).subscribe().add(() => {
        this.wpfActionControllerService.ExecuteContinueNavigationAction(`core/picklists/underfilled/picklistLines`, {orderId: orderId});
      });
    }, err => {
      this.wpfActionControllerService.ExecuteContinueNavigationAction(`core/picklists/underfilled/picklistLines`, {orderId: orderId});
    });
  }

  buildWorkstationsInUseStringFromResult(result): string {
    let workstationsInUse = '\n';
    let first = true;
    _.forEach(result, wk => {
      if (!first) {
        workstationsInUse += ', ';
      }
      workstationsInUse += wk;
      first = false;
    });

    return workstationsInUse;
  }

  columnSelected(event: IColHeaderSortChanged){
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.sortOrder = event.SortDirection;
    this.picklists = _.orderBy(this._picklists, x => x[this.currentSortPropertyName], event.SortDirection)
  }

  displayInfo(title, message) {
    const properties = new PopupDialogProperties();
    properties.primaryButtonText = this.okButtonText;
    properties.titleElementText = title;
    properties.messageElementText = message;
    properties.showPrimaryButton = true;
    properties.showSecondaryButton = false;
    properties.dialogDisplayType = PopupDialogType.Info;
    properties.timeoutLength = 0;
    this.dialogService.showOnce(properties);
  }
}
