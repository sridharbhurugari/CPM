import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceLocationDropdownPopupComponent } from './source-location-dropdown-popup.component';

describe('SourceLocationDropdownPopupComponent', () => {
  let component: SourceLocationDropdownPopupComponent;
  let fixture: ComponentFixture<SourceLocationDropdownPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceLocationDropdownPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceLocationDropdownPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
