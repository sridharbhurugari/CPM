import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPopupComponent } from './dropdown-popup.component';
import { PopupWindowModule, ButtonActionModule, FooterModule, SingleselectDropdownModule, CheckboxModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';

import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { IPopupWindowContainer, SingleselectRowItem, CheckboxComponent } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { IDropdownPopupData } from '../../model/i-dropdown-popup-data';

describe('DropdownPopupComponent', () => {
  let component: DropdownPopupComponent;
  let fixture: ComponentFixture<DropdownPopupComponent>;
  let data: IDropdownPopupData;

  let fakes: SingleselectRowItem[] = [];
  let fake: SingleselectRowItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownPopupComponent, MockTranslatePipe ],
      imports: [
        PopupWindowModule,        
        ButtonActionModule,
        FooterModule,
        SingleselectDropdownModule,
        CheckboxModule 
      ]
    })
    .compileComponents();
    data = {
      popuptitle: '',
      dropdowntitle: '',    
      dropdownrows: fakes,
      defaultrow: fake,
      showCheckbox: true,
      checkboxLabel: '',
      checkboxSelected: true,
      checkboxHideSelection: fakes,
      selectedrow: fake,
      selectedcheckbox: true
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPopupComponent);
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

  /*describe('continue', () => {
    it('should dismiss with resultValue from textValue and true', () => {
      var expectedValue1 = new SingleselectRowItem("test", "test", true);
      component.selectedRowItem = expectedValue1;
      var expectedValue2 = true;
      component.checkboxSelected = expectedValue2;
      spyOn(component.dismiss, 'next');
      component.continue();
      expect(component.data.selectedrow).toBe(expectedValue1);
      expect(component.data.selectedcheckbox).toBe(expectedValue2);
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

  describe('onSelect', () => {
    it('should set checkboxSelected to true', () => {
      var expectedValue = true;
      component.onSelect(expectedValue);
      expect(component.checkboxSelected).toBe(expectedValue);
    });
  });

  describe('onSelect', () => {
    it('should set checkboxSelected to false', () => {
      var expectedValue = false;
      component.onSelect(expectedValue);
      expect(component.checkboxSelected).toBe(expectedValue);
    });
  });*/
});
