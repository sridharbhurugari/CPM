import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColHeaderSortableComponent } from './col-header-sortable.component';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';
import { SvgIconModule, SvgiconComponent } from '@omnicell/webcorecomponents';
import { SortDirection } from '../../constants/sort-direction';

describe('ColHeaderSortableComponent', () => {
  let component: ColHeaderSortableComponent;
  let fixture: ComponentFixture<ColHeaderSortableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ColHeaderSortableComponent,
        MockTranslatePipe,
      ],
      imports: [
        SvgIconModule
      ]
    })
    .overrideComponent(SvgiconComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColHeaderSortableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given headerClicked for resize', () => {
    it('should not emit columnSelected event', () => {
      spyOn(component.columnSelected, 'emit');
      component.headerClicked({ target: { classList: { contains: () => true } }});
      expect(component.columnSelected.emit).not.toHaveBeenCalled();
    });
  });

  describe('given currentSortPropertyName is not equal to columnPropertyName', () => {
    it('should emit columnSelected event with sort asc', () => {
      spyOn(component.columnSelected, 'emit');
      component.currentSortPropertyName = 'otherProperty';
      component.headerClicked({ target: { classList: { contains: () => false } }});
      expect(component.columnSelected.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        SortDirection: SortDirection.ascending
      }));
    });
  });

  describe('given currentSortPropertyName is equal to columnPropertyName', () => {
    it('should emit columnSelected event with sort desc', () => {
      spyOn(component.columnSelected, 'emit');
      component.columnPropertyName = 'thisProperty';
      component.currentSortPropertyName = component.columnPropertyName;
      component.headerClicked({ target: { classList: { contains: () => false } }});
      expect(component.columnSelected.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        SortDirection: SortDirection.descending
      }));
    });
  });
});
