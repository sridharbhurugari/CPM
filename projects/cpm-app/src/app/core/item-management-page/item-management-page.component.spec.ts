import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagementPageComponent } from './item-management-page.component';

describe('ItemManagementPageComponent', () => {
  let component: ItemManagementPageComponent;
  let fixture: ComponentFixture<ItemManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
