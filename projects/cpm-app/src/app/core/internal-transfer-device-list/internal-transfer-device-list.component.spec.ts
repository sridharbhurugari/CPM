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

describe('InternalTransferDeviceListComponent', () => {
  let component: InternalTransferDeviceListComponent;
  let fixture: ComponentFixture<InternalTransferDeviceListComponent>;
  let transferByNeeds: boolean;

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
    fixture.detectChanges();
    component.transferByNeeds = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
