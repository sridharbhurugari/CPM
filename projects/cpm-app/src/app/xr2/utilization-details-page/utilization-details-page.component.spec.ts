import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationDetailsPageComponent } from './utilization-details-page.component';
import { ProgressAnimationComponent, ButtonActionModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { Router, ActivatedRoute } from '@angular/router';
import { Xr2StorageCapacityDetailsDisplayService } from '../../api-xr2/services/xr2-storage-capacity-details-display.service';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { Input, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'oc-search-box',
  template: ''
})

class MockSearchBox {
  searchOutput$: Observable<string> = of();
  @Input()placeHolderText: string;

  clearSearch() {};
  sendSearchData(data: string) { return of() }
}

describe('UtilizationDetailsPageComponent', () => {
  let component: UtilizationDetailsPageComponent;
  let fixture: ComponentFixture<UtilizationDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ UtilizationDetailsPageComponent, ProgressAnimationComponent, MockSearchPipe, MockTranslatePipe, MockCpClickableIconComponent, MockSearchBox ],
    imports: [ ButtonActionModule],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      { provide: Router, useValue: {} },
      { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: { get: () => of()} } } },
      { provide: TranslateService, useValue: { get: () => of([]) } },
      { provide: Xr2StorageCapacityDetailsDisplayService, useValue: { get: () => of([])} }
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

