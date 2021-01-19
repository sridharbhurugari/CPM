import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IVerificationDestinationItem } from '../../api-core/data-contracts/i-verification-destination-item';
import { VerificationService } from '../../api-core/services/verification.service';
import { VerificationRouting } from '../../shared/enums/verification-routing';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { IVerificationNavigationParameters } from '../../shared/interfaces/i-verification-navigation-parameters';
import { VerificationDestinationItem } from '../../shared/model/verification-destination-item';

@Component({
  selector: 'app-verification-destination-page',
  templateUrl: './verification-destination-page.component.html',
  styleUrls: ['./verification-destination-page.component.scss']
})
export class VerificationDestinationPageComponent implements OnInit {

  @Output() pageNavigationEvent: EventEmitter<IVerificationNavigationParameters> = new EventEmitter();

  @Input() navigationParameters: IVerificationNavigationParameters;

  private backRoute = VerificationRouting.OrderPage;
  private continueRoute = VerificationRouting.DetailsPage;

  verificationDestinationItems: Observable<IVerificationDestinationItem[]>;
  searchTextFilter: string;
  colHeaderSort: IColHeaderSortChanged;

  constructor(
    private translateService: TranslateService,
    private verificationService: VerificationService
  ) { }

  ngOnInit() {
    this.loadVerificationDestinationItems();
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
      OrderId: this.navigationParameters.OrderId,
      DestinationId: verificationDestinationItem.DestinationId,
      PriorityCodeDescription: this.navigationParameters.PriorityCodeDescription,
      Date: this.navigationParameters.Date,
      Route: this.continueRoute
    } as IVerificationNavigationParameters

    this.pageNavigationEvent.emit(navigationParams);
  }

  getHeaderSubtitle() {
    return `${this.navigationParameters.OrderId} - ${this.transformDateTime(this.navigationParameters.Date)}`
  }

  private loadVerificationDestinationItems(): void {
    if(!this.navigationParameters || !this.navigationParameters.OrderId) {
      return;
    }

    this.verificationDestinationItems = this.verificationService.getVerificationDestinations(this.navigationParameters.OrderId).pipe(
      map((verificationOrderItems) => {
        return verificationOrderItems.map((verificationItem) => {
          return new VerificationDestinationItem(verificationItem);
        });
      }), shareReplay(1)
    );
  }

  private transformDateTime(date: Date): string {
    const orderDate = new Date(date).toLocaleString(this.translateService.getDefaultLang());
    return orderDate;
   }

}
