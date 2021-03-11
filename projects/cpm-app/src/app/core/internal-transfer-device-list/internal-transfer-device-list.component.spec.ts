import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferDeviceListComponent } from './internal-transfer-device-list.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { GridModule } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockGridSortCol } from '../../shared/testing/mock-grid-sort-col.spec';
import { MockButtonToggle } from '../testing/mock-button-toggle-box.spec';
import { IDeviceReplenishmentNeed } from '../../api-core/data-contracts/i-device-replenishment-need';

describe('InternalTransferDeviceListComponent', () => {
  let component: InternalTransferDeviceListComponent;
  let fixture: ComponentFixture<InternalTransferDeviceListComponent>;

  let deviceNeedsData: IDeviceReplenishmentNeed[] = [
    { DeviceId: 1, DeviceDescription: "Device Description 1", ItemsBelowReorderLevel: 6, AssignedItems: 4 },
    { DeviceId: 2, DeviceDescription: "Device Description 2", ItemsBelowReorderLevel: 2, AssignedItems: 10 },
    { DeviceId: 3, DeviceDescription: "Device Description 3", ItemsBelowReorderLevel: 0, AssignedItems: 4 },
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InternalTransferDeviceListComponent,
        MockTranslatePipe,
        MockSearchBox,
        MockSearchPipe,
        MockColHeaderSortable,
        MockAppHeaderContainer,
        MockGridSortCol,
        MockButtonToggle,
      ],
      imports: [
        GridModule,
      ],
      providers: [
        { provide: TranslateService, useValue: { get: () => of([]) } },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceListComponent);
    component = fixture.componentInstance;
    component.transferByNeeds = true;
    component.deviceNeeds = deviceNeedsData;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
