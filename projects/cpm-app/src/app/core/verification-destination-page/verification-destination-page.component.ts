import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IVerificationDashboardData } from '../../api-core/data-contracts/i-verification-dashboard-data';
import { IVerificationDestinationItem } from '../../api-core/data-contracts/i-verification-destination-item';
import { VerificationService } from '../../api-core/services/verification.service';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { IVerificationPageConfiguration } from '../../shared/interfaces/i-verification-page-configuration';
import { VerificationDashboardData } from '../../shared/model/verification-dashboard-data';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';

@Component({
  selector: 'app-verification-destination-page',
  templateUrl: './verification-destination-page.component.html',
  styleUrls: ['./verification-destination-page.component.scss']
})
export class VerificationDestinationPageComponent implements OnInit, AfterContentChecked {

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();
  @Output() pageConfigurationUpdateEvent: EventEmitter<IVerificationPageConfiguration> = new EventEmitter();

  @Input() navigationParameters: IVerificationNavigationParameters;
  @Input() savedPageConfiguration: IVerificationPageConfiguration;

  private backRoute = VerificationRouting.OrderPage;
  private continueRoute = VerificationRouting.DetailsPage;

  verificationDestinationItems: Observable<IVerificationDestinationItem[]>;
  verificationDashboardData: Observable<IVerificationDashboardData>;

  searchTextFilter: string;
  colHeaderSort: IColHeaderSortChanged;

  constructor(
    private translateService: TranslateService,
    private verificationService: VerificationService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadVerificationDestinationItems();
    this.loadVerificationDashboardData();
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onBackEvent(): void {
    const navigationParams = {} as IVerificationNavigationParameters;
    navigationParams.Route = this.backRoute;
    this.pageNavigationEvent.emit(navigationParams);
  }

  onSearchTextFilterEvent(filterText: string): void {
    this.searchTextFilter = filterText;
  }

  onSortEvent(event: IColHeaderSortChanged): void {
    this.colHeaderSort = event;
  }

  onGridRowClickEvent(verificationDestinationItem: VerificationDestinationItem): void {
    const navigationParams = {
      DeviceId: this.navigationParameters.DeviceId,
      OrderId: this.navigationParameters.OrderId,
      DestinationId: verificationDestinationItem.DestinationId,
      DestinationLine1: verificationDestinationItem.DestinationLine1,
      DestinationLine2: verificationDestinationItem.DestinationLine2,
      DeviceDescription: this.navigationParameters.DeviceDescription,
      PriorityCodeDescription: this.navigationParameters.PriorityCodeDescription,
      Date: this.navigationParameters.Date,
      Route: this.continueRoute
    } as IVerificationNavigationParameters;

    const savedPageConfiguration = this.createSavedPageConfiguration();

    this.pageNavigationEvent.emit(navigationParams);
    this.pageConfigurationUpdateEvent.emit(savedPageConfiguration);
  }

  getHeaderSubtitle() {
    return `${this.navigationParameters.DeviceDescription} -
    ${this.navigationParameters.OrderId} - ${this.transformDateTime(this.navigationParameters.Date)}`
  }

  private loadVerificationDestinationItems(): void {
    if(!this.navigationParameters || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    this.verificationDestinationItems = this.verificationService
    .getVerificationDestinations(this.navigationParameters.DeviceId.toString(), this.navigationParameters.OrderId).pipe(
      map((verificationOrderItems) => {
        return verificationOrderItems.map((verificationItem) => {
          return new VerificationDestinationItem(verificationItem);
        });
      }), shareReplay(1)
    );
  }

  private loadVerificationDashboardData(): void {
    if(!this.navigationParameters || !this.navigationParameters.OrderId || !this.navigationParameters.DeviceId) {
      return;
    }

    this.verificationDashboardData = this.verificationService
    .getVerificationDashboardData(this.navigationParameters.DeviceId.toString(), this.navigationParameters.OrderId).pipe(
      map((verificationDashboardData) => {
        return new VerificationDashboardData(verificationDashboardData)
      }), shareReplay(1)
    );
  }

  private createSavedPageConfiguration() {
    return {
      searchTextFilterOrder: this.savedPageConfiguration.searchTextFilterOrder,
      colHeaderSortOrder: this.savedPageConfiguration.colHeaderSortOrder,
      searchTextFilterDestination: this.searchTextFilter,
      colHeaderSortDestination: this.colHeaderSort
    } as IVerificationPageConfiguration;
  }

  private transformDateTime(date: Date): string {
    const orderDate = new Date(date).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
   }

}
