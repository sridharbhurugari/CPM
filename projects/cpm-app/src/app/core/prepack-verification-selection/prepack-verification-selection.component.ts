import { Component, OnInit } from '@angular/core';
import { PrepackVerificationQueueItem } from '../model/prepack-verification-queue-item';
import { nameof } from '../../shared/functions/nameof';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) {
      this.prepackVerificationQueueItems = router.getCurrentNavigation().extras.state.PrepackVerificationQueueItems as PrepackVerificationQueueItem[];
      this.itemDescription = router.getCurrentNavigation().extras.state.ItemDescription as string;
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
