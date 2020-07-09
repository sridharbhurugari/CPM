import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowReorderButtonsComponent } from './row-reorder-buttons.component';
import { ButtonActionModule } from '@omnicell/webcorecomponents';
import { FormsModule } from '@angular/forms';

describe('RowReorderButtonsComponent', () => {
  let component: RowReorderButtonsComponent;
  let fixture: ComponentFixture<RowReorderButtonsComponent>;
  const orderableLength = 10;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowReorderButtonsComponent ],
      imports: [
        ButtonActionModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowReorderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onIndexChanged', () => {
    beforeEach(() => {
      spyOn(component.rowIndexChanged, 'emit');
    });

    describe('given original index is 5', () => {
      let originalIndex = 5;
      beforeEach(() => {
        component.index = originalIndex;
        component.orderableLength = orderableLength;
      });

      describe('and index is edited to null value', () => {
        beforeEach(() => {
          component.indexDisplayEdit = null;
          component.onIndexChanged();
        });

        it('should set indexDisplayEdit back to original value', () => {
          expect(component.indexDisplayEdit).toBe(originalIndex + 1);
        });

        it('should not emit IRowIndexChanged', () => {
          expect(component.rowIndexChanged.emit).not.toHaveBeenCalled();
        });
      });

      describe('and index is edited to negative number', () => {
        beforeEach(() => {
          component.indexDisplayEdit = -5;
          component.onIndexChanged();
        });

        it('should emit IRowIndexChanged with min index', () => {
          expect(component.rowIndexChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({ newIndex: 0 }));
        });
      });

      describe('and index is edited to value greater than number of orderable values', () => {
        beforeEach(() => {
          component.indexDisplayEdit = orderableLength + 5;
          component.onIndexChanged();
        });

        it('should emit IRowIndexChanged with max index', () => {
          expect(component.rowIndexChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({ newIndex: orderableLength - 1 }));
        });
      });

      describe('and index is edited to new value', () => {
        let newIndexDisplayEdit;
        beforeEach(() => {
          newIndexDisplayEdit = component.indexDisplayEdit + 1
          component.indexDisplayEdit = newIndexDisplayEdit;
          component.onIndexChanged();
        });

        it('should emit IRowIndexChanged', () => {
          expect(component.rowIndexChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({ newIndex: newIndexDisplayEdit - 1 }));
        });
      });
    });

    describe('given original index is first', () => {
      let originalIndex = 0;
      beforeEach(() => {
        component.index = originalIndex;
        component.orderableLength = orderableLength;
      });

      describe('and index is edited to null value', () => {
        beforeEach(() => {
          component.indexDisplayEdit = null;
          component.onIndexChanged();
        });

        it('should set indexDisplayEdit back to original value', () => {
          expect(component.indexDisplayEdit).toBe(originalIndex + 1);
        });

        it('should not emit IRowIndexChanged', () => {
          expect(component.rowIndexChanged.emit).not.toHaveBeenCalled();
        });
      });

      describe('and index is edited to negative number', () => {
        beforeEach(() => {
          component.indexDisplayEdit = -5;
          component.onIndexChanged();
        });

        it('should set indexDisplayEdit to 1', () => {
          expect(component.indexDisplayEdit).toBe(1);
        });

        it('should not emit IRowIndexChanged', () => {
          expect(component.rowIndexChanged.emit).not.toHaveBeenCalled();
        });
      });

      describe('and index is edited to value greater than number of orderable values', () => {
        beforeEach(() => {
          component.indexDisplayEdit = orderableLength + 5;
          component.onIndexChanged();
        });

        it('should emit IRowIndexChanged with max index', () => {
          expect(component.rowIndexChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({ newIndex: orderableLength - 1 }));
        });
      });

      describe('and index is edited to new value', () => {
        let newIndexDisplayEdit;
        beforeEach(() => {
          newIndexDisplayEdit = component.indexDisplayEdit + 1;
          component.indexDisplayEdit = newIndexDisplayEdit;
          component.onIndexChanged();
        });

        it('should emit IRowIndexChanged', () => {
          expect(component.rowIndexChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({ newIndex: newIndexDisplayEdit - 1 }));
        });
      });
    });

    describe('given original index is last', () => {
      let originalIndex;
      beforeEach(() => {
        originalIndex = orderableLength - 1;
        component.index = originalIndex;
        component.orderableLength = orderableLength;
      });

      describe('and index is edited to null value', () => {
        beforeEach(() => {
          component.indexDisplayEdit = null;
          component.onIndexChanged();
        });

        it('should set indexDisplayEdit back to original value', () => {
          expect(component.indexDisplayEdit).toBe(originalIndex + 1);
        });

        it('should not emit IRowIndexChanged', () => {
          expect(component.rowIndexChanged.emit).not.toHaveBeenCalled();
        });
      });

      describe('and index is edited to negative number', () => {
        beforeEach(() => {
          component.indexDisplayEdit = -5;
          component.onIndexChanged();
        });

        it('should emit IRowIndexChanged with min index', () => {
          expect(component.rowIndexChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({ newIndex: 0 }));
        });
      });

      describe('and index is edited to value greater than number of orderable values', () => {
        beforeEach(() => {
          component.indexDisplayEdit = orderableLength + 5;
          component.onIndexChanged();
        });

        it('should set indexDisplayEdit back to original value', () => {
          expect(component.indexDisplayEdit).toBe(originalIndex + 1);
        });

        it('should not emit IRowIndexChanged', () => {
          expect(component.rowIndexChanged.emit).not.toHaveBeenCalled();
        });
      });

      describe('and index is edited to new value', () => {
        let newIndexDisplayEdit;
        beforeEach(() => {
          newIndexDisplayEdit = component.indexDisplayEdit - 1;
          component.indexDisplayEdit = newIndexDisplayEdit;
          component.onIndexChanged();
        });

        it('should emit IRowIndexChanged', () => {
          expect(component.rowIndexChanged.emit).toHaveBeenCalledWith(jasmine.objectContaining({ newIndex: newIndexDisplayEdit - 1 }));
        });
      });
    });
  });
});
