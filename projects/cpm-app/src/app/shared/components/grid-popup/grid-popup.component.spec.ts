import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupWindowModule, ButtonActionModule, FooterModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';
import { IGridColumnDefinition } from '../../interfaces/i-grid-column-definition';
import { IGridPopupData } from '../../model/i-grid-popup-data';

import { GridPopupComponent } from './grid-popup.component';

describe('GridPopupComponent', () => {
  let component: GridPopupComponent<any>;
  let fixture: ComponentFixture<GridPopupComponent<any>>;
  let data: IGridPopupData<any> = {
    popupTitle: "POPUP",
    descriptionTitleResourceKey: "DESCRIPTIONRESOURCE",
    description: "DESCRIPTION",
    idTitleResourceKey: "IDRESOURCE",
    id: "ID",
    listTitleResourceKey: "LISTRESOURCE",
    detailsList: ["LIST"],
    columnDefinition: [
      { width: "1%" } as IGridColumnDefinition<any>,
      { width: "2%" } as IGridColumnDefinition<any>,
      { width: "3%" } as IGridColumnDefinition<any>
    ],
    gridData: [ {Id: '1' }, {Id: '2' }, {Id: '3' } ],
    showPrimaryButton: true,
    showSecondaryButton: false,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPopupComponent, MockTranslatePipe ],
      imports:  [ PopupWindowModule, ButtonActionModule, FooterModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPopupComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Button Actions', () => {
    it('should dismiss with true on primary button click', () => {
      spyOn(component.dismiss, 'next');

      component.primaryButtonClick();

      expect(component.dismiss.next).toHaveBeenCalledWith(true);
    });

    it('should dismiss with false on secondary button click', () => {
      spyOn(component.dismiss, 'next');

      component.secondaryButtonClick();

      expect(component.dismiss.next).toHaveBeenCalledWith(false);
    });

    it('should dismiss with false on cancel button click', () => {
      spyOn(component.dismiss, 'next');

      component.cancel();

      expect(component.dismiss.next).toHaveBeenCalledWith(false);
    });
  });

  describe('Styling', () => {
    it('should alternate grid row colors', () => {
      const whiteHex = "#FFFFFF";
      const lightGreyHex = "#E9E9E9"

      for(let i = 0; i < 7; i+=2) {
        expect(component.getRowColor(i)).toBe(whiteHex);
      }

      for(let i = 1; i < 8; i+=2) {
        expect(component.getRowColor(i)).toBe(lightGreyHex);
      }
    });
  });

    describe('Grid Sizing', () => {
      it('should stringify column sizes', () => {
        const expectedString = "1% 2% 3%";

        const str = component.getGridColumnWidths();

        expect(str).toBe(expectedString);
      });
    });
});
