import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { IPrepackVerificationQueueDetail } from "../../api-core/data-contracts/i-prepack-verification-queue-detail";
import { PrepackVerificationService } from "../../api-core/services/prepack-verification.service";
import { OcapHttpConfigurationService } from "../../shared/services/ocap-http-configuration.service";
import { Location } from "@angular/common";
@Component({
  selector: "app-prepack-verification-queue-detail",
  templateUrl: "./prepack-verification-queue-detail.component.html",
  styleUrls: ["./prepack-verification-queue-detail.component.scss"],
})
export class PrepackVerificationQueueDetailComponent implements OnInit {
  data$: Observable<IPrepackVerificationQueueDetail>;
  userLocale: string;
  validatedQuantity: number = 1;
  time: Date = new Date();
  timeIntervalId: any;

  constructor(
    private prepackVerificationService: PrepackVerificationService,
    ocapConfigService: OcapHttpConfigurationService,
    private router: Router,
    activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.timeIntervalId = setInterval(() => {
      this.time = new Date();
    }, 1);
    this.userLocale = ocapConfigService.get().userLocale;
    const prepackVerificationQueueId: number = Number.parseInt(
      activatedRoute.snapshot.paramMap.get("prepackVerificationQueueId")
    );
    this.data$ = prepackVerificationService
      .getDetail(prepackVerificationQueueId)
      .pipe(
        map((data) => {
          this.validatedQuantity = data.QuantityToPackage;
          return data;
        }),
        shareReplay(1)
      );
  }

  ngOnInit() {}

  onBackClick() {
    this.location.back();
  }
}
