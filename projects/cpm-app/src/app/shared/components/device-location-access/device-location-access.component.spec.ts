import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLocationAccessComponent } from './device-location-access.component';
import { ButtonActionModule, PopupDialogService } from '@omnicell/webcorecomponents';
import { DeviceLocationAccessService } from '../../services/devices/device-location-access.service';
import { TranslateService } from '@ngx-translate/core';
import { DeviceLeaseService } from '../../services/devices/device-lease.service';
import { of } from 'rxjs';

describe('DeviceLocationAccessComponent', () => {
  let component: DeviceLocationAccessComponent;
  let fixture: ComponentFixture<DeviceLocationAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceLocationAccessComponent ],
      imports: [
        ButtonActionModule,
      ],
      providers: [
        { provide: DeviceLocationAccessService, useValue: { } },
        { provide: DeviceLeaseService, useValue: { } },
        { provide: PopupDialogService, useValue: { } },
        { provide: TranslateService, useValue: { get: () => of('') } },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceLocationAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
