import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SortDirection } from '../../shared/constants/sort-direction';
import { SearchBoxComponent, PopupDialogService } from '@omnicell/webcorecomponents';
import { WindowService } from '../../shared/services/window-service';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { filter, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { Many } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { nameof } from '../../shared/functions/nameof';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { IPrepackVerificationQueueItem } from '../../api-core/data-contracts/i-prepack-verification-queue-item';
import { PrepackVerificationQueueItem } from '../model/prepack-verification-queue-item';
import { PrepackVerificationService } from '../../api-core/services/prepack-verification.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';

@Component({
  selector: 'app-prepack-verification-queue',
  templateUrl: './prepack-verification-queue.component.html',
  styleUrls: ['./prepack-verification-queue.component.scss']
})
export class PrepackVerificationQueueComponent implements OnInit {   
  
  @Output() sortEvent: EventEmitter<IColHeaderSortChanged> = new EventEmitter();

  @ViewChild('searchBox', {
    static: true
  })
  searchElement: SearchBoxComponent;
  searchTextFilter: string;  
  searchPipe: SearchPipe = new SearchPipe();
  searchFields = [nameof<PrepackVerificationQueueItem>('ItemDescription'), nameof<PrepackVerificationQueueItem>('DeviceDescription')];
  currentSortPropertyName: string;
  columnSortDirection: SortDirection;    

  prepackVerificationItems$: Observable<IPrepackVerificationQueueItem[]>;
  unfilteredPrepackVerificationQueueItems: PrepackVerificationQueueItem[];
  filteredPrepackVerificationQueueItems: PrepackVerificationQueueItem[];
  
  descriptionPropertyName = nameof<PrepackVerificationQueueItem>('ItemDescription');
  packagerPropertyName = nameof<PrepackVerificationQueueItem>('DeviceDescription');  
  qtyPackagedPropertyName = nameof<PrepackVerificationQueueItem>('PackagedQty');
  datePropertyName = nameof<PrepackVerificationQueueItem>('PackDate');

  constructor(
    private prepackVerificationService: PrepackVerificationService,
    private windowService: WindowService,    
    private wpfInteropService: WpfInteropService,
    public translateService: TranslateService) {
      //this.setupDataRefresh();
    }

  ngOnInit() {
    this.loadPrepackVerificationQueueItems();
  }

  ngAfterViewInit(): void {
    this.configureSearchHandler();
  }

  ngUnsubscribe(): void  {

  }

  private loadPrepackVerificationQueueItems(): void {  

    this.prepackVerificationItems$ = this.prepackVerificationService.getPrepackQueueData().pipe(
    map((prepackVerificationItems) => {
      return prepackVerificationItems.map((verificationItem) => {
        console.log(verificationItem);
        return new PrepackVerificationQueueItem(verificationItem);
      });
    }), shareReplay(1)
    );

    this.prepackVerificationItems$.subscribe((pvi) => { 
      this.unfilteredPrepackVerificationQueueItems = pvi;
      this.filteredPrepackVerificationQueueItems = pvi;
     });
  }  

  columnSelected(event: IColHeaderSortChanged): void {
    this.currentSortPropertyName = event.ColumnPropertyName;
    this.columnSortDirection = event.SortDirection;
    this.filteredPrepackVerificationQueueItems = this.sort(this.filteredPrepackVerificationQueueItems, event.SortDirection);
    this.sortEvent.emit(event);
  }

  sort(verificationQueueItems: PrepackVerificationQueueItem[], sortDirection: Many<boolean | 'asc' | 'desc'>): PrepackVerificationQueueItem[] {
    return _.orderBy(verificationQueueItems, x => x[this.currentSortPropertyName], sortDirection);
  }

  onDeleteClick(){
      this.searchTextFilter = 'hi'
    }

  private configureSearchHandler() {
    this.searchElement.searchOutput$
      .pipe(
        switchMap((searchData: string) => {
          return of(searchData);
        })
      )
      .subscribe(data => {
        this.filteredPrepackVerificationQueueItems = this.filterBySearchText(data, this.unfilteredPrepackVerificationQueueItems);
      });
  }

 /* istanbul ignore next */
 fromWPFNgOnInit() {
  this.ngOnInit();
}

/* istanbul ignore next */
//private setupDataRefresh() {
//  let hash = this.windowService.getHash();
// this.wpfInteropService.wpfViewModelActivated
//    .pipe(filter(x => x == hash),takeUntil(this.ngUnsubscribe))
//    .subscribe(() => {               
//      this.ngOnInit();        
//    });
//}

  /* istanbul ignore next */
  private filterBySearchText(text: string, unfilteredArray: PrepackVerificationQueueItem[]) {
    if(!unfilteredArray) return [];

    return this.searchPipe.transform(unfilteredArray, text, this.searchFields);
  } 
}
