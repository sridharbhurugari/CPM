import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementComponent } from './item-management.component';
import { SearchModule, GridModule } from '@omnicell/webcorecomponents';
import { ItemManagementService } from '../../api-core/services/item-management.service';
import { of, Subject } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemManagement } from '../model/item-management';
import { WpfInteropService } from '../../shared/services/wpf-interop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-management-list',
  template: '',
})
class MockItemManagementList {
  @Input()
  items: ItemManagement[];

  @Output()
  itemIdSelected: EventEmitter<string> = new EventEmitter<string>();
}

describe('ItemManagementComponent', () => {
  let component: ItemManagementComponent;
  let fixture: ComponentFixture<ItemManagementComponent>;
  const wpfActionControllerServiceStub = () => ({
    ExecuteBackAction: () => ({})
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemManagementComponent, MockItemManagementList ],
      imports: [SearchModule, GridModule],
      providers: [
        { provide: ItemManagementService, useValue: { get: () => of([]) } },
        { provide: Location, useValue: location },
        {
          provide: WpfActionControllerService,
          useFactory: wpfActionControllerServiceStub
        },
        { provide: WpfInteropService, useValue: { wpfViewModelActivated: new Subject() } },
        { provide: ActivatedRoute, useValue: { snapshot: { routeConfig: { path: '' } } } },
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
