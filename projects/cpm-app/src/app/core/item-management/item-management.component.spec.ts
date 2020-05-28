import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementComponent } from './item-management.component';
import { MockAppHeaderContainer } from '../testing/mock-app-header.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { SearchModule, GridModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ItemManagementService } from '../../api-core/services/item-management.service';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ColHeaderSortableComponent } from '../../shared/components/col-header-sortable/col-header-sortable.component';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

describe('ItemManagementComponent', () => {
  let component: ItemManagementComponent;
  let fixture: ComponentFixture<ItemManagementComponent>;
  const wpfActionControllerServiceStub = () => ({
    ExecuteBackAction: () => ({})
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemManagementComponent, MockAppHeaderContainer, MockSearchPipe, MockTranslatePipe, MockColHeaderSortable],
      imports: [SearchModule, GridModule],
      providers: [
        { provide: ItemManagementService, useValue: { get: () => of([]) } },
        { provide: Location, useValue: location },
        {
          provide: WpfActionControllerService,
          useFactory: wpfActionControllerServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
