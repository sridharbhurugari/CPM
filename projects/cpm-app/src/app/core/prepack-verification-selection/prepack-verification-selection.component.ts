import { Component, OnInit } from '@angular/core';
import { PrepackVerificationQueueItem } from '../model/prepack-verification-queue-item';
import { nameof } from '../../shared/functions/nameof';
import { Router, ActivatedRoute } from '@angular/router';
import { PrepackVerificationSelectionCacheService } from '../utilities/prepack-verification-selection-cache.service';

@Component({
  selector: 'app-prepack-verification-selection',
  templateUrl: './prepack-verification-selection.component.html',
  styleUrls: ['./prepack-verification-selection.component.scss']
})
export class PrepackVerificationSelectionComponent implements OnInit {

  prepackVerificationQueueItems: PrepackVerificationQueueItem[];
  itemDescription: string;

  idPropertyName = nameof<PrepackVerificationQueueItem>('PrepackVerificationQueueId');
  descriptionPropertyName = nameof<PrepackVerificationQueueItem>('ItemDescription');
  itemIdPropertyName = nameof<PrepackVerificationQueueItem>('ItemId');
  packagerPropertyName = nameof<PrepackVerificationQueueItem>('DeviceDescription');
  qtyPackagedPropertyName = nameof<PrepackVerificationQueueItem>('QuantityToPackage');
  datePropertyName = nameof<PrepackVerificationQueueItem>('PackagedDate');

  constructor(private router: Router,
    private prepackVerificationSelectionCacheService: PrepackVerificationSelectionCacheService) {
      this.prepackVerificationQueueItems = prepackVerificationSelectionCacheService.Get();
    }


  ngOnInit() {
  }

  public NavigateToPrepackVerificationDetailsPage(rowClicked: PrepackVerificationQueueItem) {
    this.router.navigate(["core/prepackVerificationDetail/", rowClicked.PrepackVerificationQueueId]);
  }

  orderChanged(orderedItems: PrepackVerificationQueueItem[]) {
    this.prepackVerificationQueueItems = orderedItems;
  }

  onBackClick() {
    this.router.navigate(["core/prepackVerification"]);
  }

}
