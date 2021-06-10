import {
  Component,
  OnInit,
} from "@angular/core";
import * as _ from "lodash";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, forkJoin, merge, Subject } from "rxjs";
import {
  NumericComponent,
  DatepickerComponent,
  SingleselectComponent,
  ButtonActionComponent,
  DateFormat,
  Util,
  PopupDialogService,
  PopupDialogComponent,
  PopupDialogProperties,
  PopupDialogType,
} from "@omnicell/webcorecomponents";
import { map, switchMap, shareReplay, filter, takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

import { IPrepackVerificationQueueDetail } from "../../api-core/data-contracts/i-prepack-verification-queue-detail";
import { PrepackVerificationService } from "../../api-core/services/prepack-verification.service";
@Component({
  selector: "app-prepack-verification-queue-detail",
  templateUrl: "./prepack-verification-queue-detail.component.html",
  styleUrls: ["./prepack-verification-queue-detail.component.scss"],
})
export class PrepackVerificationQueueDetailComponent implements OnInit  {
    data$: Observable<IPrepackVerificationQueueDetail>;

    constructor(
     private prepackVerificationService: PrepackVerificationService,
     private router: Router,
     activatedRoute: ActivatedRoute) {
     const prepackVerificationQueueId: number = Number.parseInt(activatedRoute.snapshot.paramMap.get('prepackVerificationQueueId'));
     this.data$ = prepackVerificationService.getDetail(prepackVerificationQueueId).pipe(shareReplay(1));
     }

     ngOnInit() {
     }

    onBackClick() {
     this.router.navigate(['core/prepackVerification']);
    }
    }
