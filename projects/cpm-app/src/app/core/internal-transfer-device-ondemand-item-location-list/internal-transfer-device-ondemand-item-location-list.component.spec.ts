import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule, FooterModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockGridSortCol } from '../../shared/testing/mock-grid-sort-col.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { InternalTransferDeviceOndemandItemLocationListComponent } from './internal-transfer-device-ondemand-item-location-list.component';

describe('InternalTransferDeviceOndemandItemLocationListComponent', () => {
  let component: InternalTransferDeviceOndemandItemLocationListComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemLocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferDeviceOndemandItemLocationListComponent ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,
        MockColHeaderSortable,
        MockAppHeaderContainer,
        MockGridSortCol,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceOndemandItemLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
