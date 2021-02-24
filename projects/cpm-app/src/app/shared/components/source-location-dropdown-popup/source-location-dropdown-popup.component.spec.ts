import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonActionModule, FooterModule, PopupWindowModule, SingleselectDropdownModule, SingleselectRowItem } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';
import { ISourceLocationDropdownPopupData } from '../../model/i-source-location-dropdown-popup-data';
import { SourceLocationDropdownPopupComponent } from './source-location-dropdown-popup.component';

describe('SourceLocationDropdownPopupComponent', () => {
  let component: SourceLocationDropdownPopupComponent;
  let fixture: ComponentFixture<SourceLocationDropdownPopupComponent>;
  let data: ISourceLocationDropdownPopupData;

  let dropdownRowData: SingleselectRowItem[] = [];
  let defaultRowData: SingleselectRowItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceLocationDropdownPopupComponent, MockTranslatePipe ],    imports: [
        PopupWindowModule,
        ButtonActionModule,
        FooterModule,
        SingleselectDropdownModule
      ]
    })
    .compileComponents();

    defaultRowData = new SingleselectRowItem("test", "test", true);
    dropdownRowData.push(defaultRowData);
    dropdownRowData.push(new SingleselectRowItem("test1", "test1", true));
    dropdownRowData.push(new SingleselectRowItem("test2", "test2", true));

    data = {
      popupTitle: 'TEST POPUP',
      dropdownTitle: 'TEST DROPDOWN',
      dropdownRows: dropdownRowData,
      defaultRow: defaultRowData,
      selectedRow: defaultRowData,
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceLocationDropdownPopupComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancel', () => {
    it('should dismiss with false', () => {
      spyOn(component.dismiss, 'next');
      component.cancel();
      expect(component.dismiss.next).toHaveBeenCalledWith(false);
    });
  });

  describe('continue', () => {
    it('should dismiss with resultValue from textValue and true', () => {
      var chosenRow = new SingleselectRowItem("test", "test", true);
      component.selectedRowItem = chosenRow;
      spyOn(component.dismiss, 'next');
      component.continue();
      expect(component.data.selectedRow).toEqual(chosenRow);
      expect(component.dismiss.next).toHaveBeenCalledWith(true);
    });
  });

  describe('onSelectionChanged', () => {
    it('should set selected row', () => {
      var expectedValue = new SingleselectRowItem("test", "test", true);
      component.onSelectionChanged(expectedValue);
      expect(component.selectedRowItem).toBe(expectedValue);
    });
  });
});
