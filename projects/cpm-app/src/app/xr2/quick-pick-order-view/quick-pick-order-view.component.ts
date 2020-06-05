import { Component, OnInit, Input, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { nameof } from '../../shared/functions/nameof';
import { switchMap } from 'rxjs/operators';
import { SearchBoxComponent } from '@omnicell/webcorecomponents';
import { QuickPickOrderItem } from '../model/quick-pick-order-item';
import { TranslateService } from '@ngx-translate/core';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { WindowService } from '../../shared/services/window-service';

@Component({
  selector: 'app-quick-pick-order-view',
  templateUrl: './quick-pick-order-view.component.html',
  styleUrls: ['./quick-pick-order-view.component.scss']
})
export class QuickPickOrderViewComponent implements OnInit {

  private _quickpickOrderItems: QuickPickOrderItem[];

  @Input()
  set quickpickOrderItems(value: QuickPickOrderItem[]) {
    this._quickpickOrderItems = value;
    if (this.windowService.nativeWindow) {
      this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    }
  }

  get quickpickOrderItems(): QuickPickOrderItem[] {
    return this._quickpickOrderItems;
  }

  constructor(
    private windowService: WindowService,
    private translateService: TranslateService,
    private actr: ActivatedRoute,
    private wpfActionController: WpfActionControllerService) {
      const mockList = [{
        OrderId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: "First Dose",
        PriorityCodeDescription: '',
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: "Stat",
        PriorityCodeDescription: '',
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: "First Dose",
        PriorityCodeDescription: '',
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: "Stat",
        PriorityCodeDescription: '',
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: "First Dose",
        PriorityCodeDescription: '',
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        PriorityCode: '',
        PriorityCodeColor: 'orange',
        Destination: "Room 4657, South White, Skylar",
        DestinationId: '',
        DestinationType: "Stat",
        PriorityCodeDescription: '',
        Date: "5/3/2020 10:15 AM",
      },
      {
        OrderId: '',
        PriorityCode: '',
        PriorityCodeColor: 'red',
        Destination: "Nursing Area 33",
        DestinationId: '',
        DestinationType: "First Dose",
        PriorityCodeDescription: '',
        Date: "5/3/2020 10:15 AM",
      }
    ];

      this.quickpickOrderItems = mockList;
  }

  // @ViewChild('searchBox', {
  //   static: true
  // })
  // searchElement: SearchBoxComponent;

  // searchTextFilter: string;

  // searchFields = [nameof<QuickPickOrderItem>('Destination'), nameof<QuickPickOrderItem>('PriorityCodeDescription')];

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    // this.searchElement.searchOutput$
    //   .pipe(
    //     switchMap((searchData: string) => {
    //       return of(searchData);
    //     })
    //   )
    //   .subscribe(data => {
    //     this.searchTextFilter = data;
    //     if (this.windowService.nativeWindow) {
    //       this.windowService.nativeWindow.dispatchEvent(new Event('resize'));
    //     }
    //   });
  }

  ngOnDestroy(): void {
  }

  back() {
    this.wpfActionController.ExecuteContinueAction();
  }

}
