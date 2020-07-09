import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitResizeComponent } from './split-resize.component';

describe('SplitResizeComponent', () => {
  let component: SplitResizeComponent;
  let fixture: ComponentFixture<SplitResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('set sideLeftBasis', () => {
    describe('with value less than min width', () => {
      it('should be min width', () => {
        component.minSideWidth = 50;
        component.sideLeftBasis = 10;
        expect(component.sideLeftBasis).toBe(component.minSideWidth);
      });
    });

    describe('with value that would cause right side to be less than min width', () => {
      it('should be less than that value', () => {
        let largeValue = 10000;
        component.sideLeftBasis = largeValue;
        expect(component.sideLeftBasis).toBeLessThan(largeValue);
      });
    });

    describe('with valid value', () => {
      it('should be equal to the value', () => {
        component.minSideWidth = 10;
        const validValue = component.minSideWidth + 1;
        component.sideLeftBasis = validValue;
        expect(component.sideLeftBasis).toBe(validValue);
      });
    })
  });

  describe('onMouseLeave', () => {
    it('should set sliding false', () => {
      component.sliding = true;
      component.onMouseLeave();
      expect(component.sliding).toBeFalsy();
    });
  });

  describe('onMouseUp', () => {
    it('should set sliding false', () => {
      component.sliding = true;
      component.onMouseUp();
      expect(component.sliding).toBeFalsy();
    });
  });

  describe('onMouseMove', () => {
    beforeEach(() => {
      component.sideLeftBasis = 10;
    });

    describe('given sliding false', () => {
      beforeEach(() => {
        component.sliding = false;
      });

      it('should not set sideLeftBasis', () => {
        const valueBeforeMove = component.sideLeftBasis;
        const mouseEvent: any = {
          x: component.sideLeftBasis + 20
        }
        component.onMouseMove(mouseEvent)
        expect(component.sideLeftBasis).toBe(valueBeforeMove);
      });
    });

    describe('given sliding true', () => {
      beforeEach(() => {
        component.sliding = true;
      });

      it('should set sideLeftBasis', () => {
        const moveValue = component.sideLeftBasis + 20;
        const mouseEvent: Partial<MouseEvent> = {
          x: moveValue
        }
        component.onMouseMove(mouseEvent as any)
        expect(component.sideLeftBasis).toBe(moveValue);
      });
    });
  });

  describe('onSliderMouseDown', () => {
    it('should set sliding true', () => {
      const mouseEvent: Partial<MouseEvent> = {
        preventDefault: () => {}
      }
      component.onSliderMouseDown(mouseEvent as any);
      expect(component.sliding).toBeTruthy();
    })
  });
});
