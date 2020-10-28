import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ButtonActionModule, FooterModule, LayoutModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { DeviceReplenishmentNeedsService } from '../../api-core/services/device-replenishment-needs.service';
import { ItemLocaitonDetailsService } from '../../api-core/services/item-locaiton-details.service';
import { OrderItemPendingQuantitiesService } from '../../api-core/services/order-item-pending-quantities.service';
import { PicklistLineIdsService } from '../../api-core/services/picklist-line-ids.service';
import { PicklistLinesService } from '../../api-core/services/picklist-lines.service';
import { OcapHttpConfigurationService } from '../../shared/services/ocap-http-configuration.service';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { MockGuidedItemHeaderComponent } from '../../shared/testing/mock-guided-item-header.spec';
import { MockHeaderedContentControlComponent } from '../../shared/testing/mock-headered-content-control.spec';
import { MockHorizontalTabsComponent } from '../../shared/testing/mock-hornizontal-tabs.spec';
import { MockSplitFixedComponent } from '../../shared/testing/mock-spit-fixed.spec';
import { MockTabContentsComponent } from '../../shared/testing/mock-tab-contents.spec';
import { MockValidationIconComponent } from '../../shared/testing/mock-validation-icon.spec';
import { MockInternalTransferPickNeedsListComponent } from '../testing/mock-internal-transfer-pick-needs-list.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { InternalTransferPickPageComponent } from './internal-transfer-pick-page.component';

describe('InternalTransferPickPageComponent', () => {
  let component: InternalTransferPickPageComponent;
  let fixture: ComponentFixture<InternalTransferPickPageComponent>;

  beforeEach(async(() => {
    let deviceLocationId = 3290;
    TestBed.configureTestingModule({
      declarations: [ 
        InternalTransferPickPageComponent,
        MockGuidedItemHeaderComponent,
        MockHorizontalTabsComponent,
        MockTabContentsComponent,
        MockHeaderedContentControlComponent,
        MockValidationIconComponent,
        MockInternalTransferPickNeedsListComponent,
        MockSplitFixedComponent,
        MockTranslatePipe,
      ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: PicklistLineIdsService, useValue: { getLineIdsForWorkstation: () => { return of([]); } } },
        { provide: OcapHttpConfigurationService, useValue: { get: () => { return { clientId: '' } } } },
        { provide: PicklistLinesService, useValue: { get: () => { return of({ ItemId: '', SourceDeviceLocationId: deviceLocationId }) } } },
        { provide: DeviceReplenishmentNeedsService, useValue: { getDeviceNeedsForItem: () => { return of([]) } } },
        { provide: WpfActionControllerService, useValue: { } },
        { provide: ItemLocaitonDetailsService, useValue: { get: () => { return of([{ DeviceLocationId: deviceLocationId, DeviceLocation: { } }]) } } },
        { provide: OrderItemPendingQuantitiesService, useValue: { get: () => { return of(null) } } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferPickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
