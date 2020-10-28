import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { PopupDialogService } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { MockDeviceLocationAccessComponent } from '../../testing/mock-device-location-access.spec';
import { MockHeaderedContentControlComponent } from '../../testing/mock-headered-content-control.spec';
import { MockScalableTextComponent } from '../../testing/mock-scalable-text.spec';

import { GuidedItemHeaderComponent } from './guided-item-header.component';

describe('GuidedItemHeaderComponent', () => {
  let component: GuidedItemHeaderComponent;
  let fixture: ComponentFixture<GuidedItemHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        GuidedItemHeaderComponent,
        MockScalableTextComponent,
        MockDeviceLocationAccessComponent,
        MockHeaderedContentControlComponent,
      ],
      providers: [
        { provide: TranslateService, useValue: { get: (x: string) => of(`{x}_TRANSLATED`) } },
        { provide: PopupDialogService, useValue: { showOnce: jasmine.createSpy('showOnce') } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidedItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
