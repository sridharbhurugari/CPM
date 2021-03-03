import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonActionModule, FooterModule, LayoutModule  } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { InternalTransferDeviceOndemandItemLocationsPageComponent } from './internal-transfer-device-ondemand-item-locations-page.component';

describe('InternalTransferDeviceOndemandItemLocationsPageComponent', () => {
  let component: InternalTransferDeviceOndemandItemLocationsPageComponent;
  let fixture: ComponentFixture<InternalTransferDeviceOndemandItemLocationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTransferDeviceOndemandItemLocationsPageComponent ],
      imports: [
        LayoutModule,
        FooterModule,
        ButtonActionModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferDeviceOndemandItemLocationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
