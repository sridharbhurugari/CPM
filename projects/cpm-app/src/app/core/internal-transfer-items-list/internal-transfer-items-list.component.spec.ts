import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferItemsListComponent } from './internal-transfer-items-list.component';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { CheckboxModule, GridModule } from '@omnicell/webcorecomponents';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockGridSortCol } from '../../shared/testing/mock-grid-sort-col.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';

describe('InternalTransferItemsListComponent', () => {
  let component: InternalTransferItemsListComponent;
  let fixture: ComponentFixture<InternalTransferItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        InternalTransferItemsListComponent,
        MockAppHeaderContainer,
        MockSearchPipe,
        MockTranslatePipe,
        MockSearchBox,
        MockColHeaderSortable,
        MockGridSortCol,
      ],
      imports: [
        GridModule,
        CheckboxModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
