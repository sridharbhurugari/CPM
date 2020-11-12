import { AfterViewInit, Component, ContentChild, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { forkJoin, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { IItemLocationDetail } from '../../api-core/data-contracts/i-item-location-detail';
import { IItemReplenishmentNeed } from '../../api-core/data-contracts/i-item-replenishment-need';
import { IOrderItemPendingQuantity } from '../../api-core/data-contracts/i-order-item-pending-quantity';
import { IPicklistLine } from '../../api-core/data-contracts/i-picklist-line';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { OrderItemPendingQuantitiesService } from '../../api-core/services/order-item-pending-quantities.service';
import { PicklistLineIdsService } from '../../api-core/services/picklist-line-ids.service';
import { PicklistLinesService } from '../../api-core/services/picklist-lines.service';
import { dateTimeToday } from '../../shared/functions/dateTimeToday';
import { sumValues } from '../../shared/functions/sumValues';
import { IItemHeaderInfo } from '../../shared/model/i-item-header-info';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { InternalTransferPick } from '../model/internal-transfer-pick';
import { IPicklistLineFillData } from '../../api-core/data-contracts/i-picklist-line-fill-data';
import { IPicklistLinePackSizeFillData } from '../../api-core/data-contracts/i-picklist-line-pack-size-fill-data';

@Component({
  selector: 'app-internal-transfer-pick-page',
  templateUrl: './internal-transfer-pick-page.component.html',
  styleUrls: ['./internal-transfer-pick-page.component.scss']
})
export class InternalTransferPickPageComponent {
  orderId: string;
  picklistLineIds$: Observable<Guid[]>;
  totalLines$: Observable<number>;
  picklistLineIndex: number = 0;
  currentLine$: Observable<IPicklistLine>;
  currentNeedsDetails$: Observable<IItemReplenishmentNeed[]>;
  isLastLine$: Observable<boolean>;
  itemHeaderInfo$: Observable<IItemHeaderInfo>;
  userLocale: string;
  itemLocationDetails$: Observable<IItemLocationDetail[]>;
  pickLocation$: Observable<IItemLocationDetail>;
  pharmacyQoh$: Observable<number>;
  pickTotal$: Observable<number>;
  itemNeedPicks$: Observable<InternalTransferPick[]>;
  pickTotalIcon: string;
  expDateIcon: string;
  expDateInPast$: Observable<boolean>;
  orderItemPendingQtys$: Observable<IOrderItemPendingQuantity>;

  constructor(
    activatedRoute: ActivatedRoute,
    picklistLineIdsService: PicklistLineIdsService,
    ocapConfigService: OcapHttpConfigurationService,
    private picklistLinesService: PicklistLinesService,
    private deviceReplenishmentNeedsService: DeviceReplenishmentNeedsService,
    private wpfActionControllerService: WpfActionControllerService,
    private itemLocationDetailsService: ItemLocaitonDetailsService,
    private orderItemPendingQuantitiesService: OrderItemPendingQuantitiesService
  ) {
    this.orderId = activatedRoute.snapshot.queryParamMap.get('orderId');
    let allDevices = activatedRoute.snapshot.queryParamMap.get('allDevices');
    if (allDevices) {
      this.picklistLineIds$ = picklistLineIdsService.getLineIds(this.orderId).pipe(shareReplay(1));
    } else {
      this.picklistLineIds$ = picklistLineIdsService.getLineIdsForWorkstation(this.orderId, ocapConfigService.get().clientId).pipe(shareReplay(1));
    }

    this.totalLines$ = this.picklistLineIds$.pipe(map(x => x.length));
    this.updateCurrentLineDetails();
    this.userLocale = ocapConfigService.get().userLocale;
  }

  pickTotalChanged(pickTotal: number) {
    this.pickTotal$ = of(pickTotal);
  }

  navigateContinue() {
    this.wpfActionControllerService.ExecuteActionName('Continue');
  }

  navigateBack() {
    this.wpfActionControllerService.ExecuteActionName('Back');
  }

  hold(isLast: boolean) {
    if (isLast) {
      this.navigateContinue();
    } else {
      this.next();
    }
  }

  completePick() {
    forkJoin(this.currentLine$, this.pickTotal$, this.isLastLine$).subscribe(results => {
      let line = results[0];
      let pickTotal = results[1];
      let isLast = results[2];
      this.pickItem(line, pickTotal, isLast);
    });
  }

  private pickItem(line: IPicklistLine, pickTotal: number, isLast: boolean) {

    const packPicks: IPicklistLineFillData = {
      PicklistLineId: line.PicklistLineId,
      PickDeviceLocationId: line.SourceDeviceLocationId,
      TotalPickQuantity: line.PickQuantity,
      PackSizeFills: new Array()
    };

    this.currentNeedsDetails$.subscribe(needsDetails => {
      const needsDetail = needsDetails.find(() => needsDetail.ItemId === line.ItemId);
      if (needsDetail.Xr2Item) {

        const packFill: IPicklistLinePackSizeFillData = {
          PackSize: needsDetail.PackSize,
          FillQuantityInPacks:  line.PickQuantity / needsDetail.PackSize
        };

        packPicks.PackSizeFills.push(packFill);
      }
    });

    this.picklistLinesService.completePick(packPicks).subscribe(x => {
      if (isLast) {
        this.navigateContinue();
      } else {
        this.next();
      }
    });
  }

  private next() {
    this.picklistLineIndex = this.picklistLineIndex + 1;
    this.updateCurrentLineDetails();
  }

  private completeZeroPick() {
    forkJoin(this.currentLine$, this.isLastLine$).subscribe(results => {
      let line = results[0];
      let pickTotal = 0;
      let isLast = results[1];
      this.pickItem(line, pickTotal, isLast);
    });
  }

  private updateCurrentLineDetails() {
    this.currentLine$ = this.picklistLineIds$.pipe(map(x =>
       x[this.picklistLineIndex]), switchMap(x => this.picklistLinesService.get(x)), shareReplay(1));
    this.isLastLine$ = this.totalLines$.pipe(map(x => x === this.picklistLineIndex + 1));
    this.currentNeedsDetails$ = this.currentLine$.pipe(switchMap(x =>
       this.deviceReplenishmentNeedsService.getDeviceNeedsForItem(x.DestinationDeviceId, x.ItemId)), shareReplay(1));
    this.currentNeedsDetails$.subscribe(x => {
      if (!x || !x.length) {
        this.completeZeroPick();
      } else {
        this.continueLoadCurrentLineDetails();
      }
    });
  }

  private continueLoadCurrentLineDetails() {
    this.itemLocationDetails$ = this.currentLine$.pipe(switchMap(x => this.itemLocationDetailsService.get(x.ItemId)), shareReplay(1));
    this.orderItemPendingQtys$ = this.currentLine$.pipe(switchMap(x => this.orderItemPendingQuantitiesService.get(x.OrderId, x.ItemId)), shareReplay(1));
    this.itemNeedPicks$ = forkJoin(this.currentNeedsDetails$, this.currentLine$).pipe(map(results => {
      let itemNeeds = results[0];
      let line = results[1];
      return itemNeeds.map(n => new InternalTransferPick(n, line.PickQuantity));
    }));

    this.pharmacyQoh$ = this.itemLocationDetails$.pipe(map(x => sumValues(x, il => il.QuantityOnHand)));

    this.pickLocation$ = forkJoin(this.currentLine$, this.itemLocationDetails$).pipe(map(results => {
      let currentLine: IPicklistLine = results[0];
      let itemLocationDetails: IItemLocationDetail[] = results[1];
      return itemLocationDetails.find(x => x.DeviceLocationId == currentLine.SourceDeviceLocationId);
    }));

    this.itemHeaderInfo$ = forkJoin(this.currentLine$, this.pickLocation$).pipe(map(results => {
      let currentLine: IPicklistLine = results[0];
      let pickLocation: IItemLocationDetail = results[1];
      return {
        DeviceDescription: pickLocation.DeviceDescription,
        ShelfNumber: pickLocation.DeviceLocation.Shelf,
        BinNumber: pickLocation.DeviceLocation.Bin,
        SlotNumber: pickLocation.DeviceLocation.Slot,
        DeviceLocationTypeId: pickLocation.DeviceLocation.LocationTypeId,
        DeviceId: pickLocation.DeviceId,
        DeviceLocationId: pickLocation.DeviceLocationId,
        DeviceLocationAccessQuantity: currentLine.PickQuantity,
        DeviceLocationAccessUnits: pickLocation.UnitOfIssue,
        ItemGenericNameFormatted: currentLine.FormattedGenericName,
        ItemTradeName: currentLine.BrandName,
        ItemId: currentLine.ItemId,
        LocationDescription: pickLocation.LocationDescription,
      };
    }))

    this.expDateInPast$ = this.pickLocation$.pipe(map(pickLocation => {
      let today = dateTimeToday();
      let expDate = new Date(pickLocation.ExpirationDate);
      return pickLocation.ExpirationDateGranularity != 'None' && pickLocation.QuantityOnHand > 0 && expDate < today;
    }));
  }
}
