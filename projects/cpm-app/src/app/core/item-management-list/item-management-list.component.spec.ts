import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementListComponent } from './item-management-list.component';
import { MockGridSortCol } from '../../shared/testing/mock-grid-sort-col.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { WindowService } from '../../shared/services/window-service';
import { MockSearchBox } from '../testing/mock-search-box.spec';

describe('ItemManagementListComponent', () => {
  let component: ItemManagementListComponent;
  let fixture: ComponentFixture<ItemManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ItemManagementListComponent,
        MockSearchBox,
        MockAppHeaderContainer,
        MockSearchPipe,
        MockTranslatePipe,
        MockColHeaderSortable,
        MockGridSortCol
      ],
      providers: [
        { provide: WindowService, useValue: { } }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
