import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPopupComponent } from './dropdown-popup.component';
import { PopupWindowModule, ButtonActionModule, FooterModule, SingleselectDropdownModule, CheckboxModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';

import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { IPopupWindowContainer, SingleselectRowItem, CheckboxComponent } from '@omnicell/webcorecomponents';
import { Subject } from 'rxjs';
import { IDropdownPopupData } from '../../model/i-dropdown-popup-data';
import { analyzeAndValidateNgModules } from '@angular/compiler';

describe('DropdownPopupComponent', () => {
  let component: DropdownPopupComponent;
  let fixture: ComponentFixture<DropdownPopupComponent>;
  let data: IDropdownPopupData;

  let dropdownrowdata: SingleselectRowItem[] = [];
  let defaultrowdata: SingleselectRowItem;

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
    defaultrowdata = new SingleselectRowItem("test", "test", true);
    data = {
      popuptitle: 'TEST POPUP',
      dropdowntitle: 'TEST DROPDOWN',    
      dropdownrows: dropdownrowdata,
      defaultrow: defaultrowdata,
      showCheckbox: true,
      checkboxLabel: '',
      checkboxSelected: true,
      checkboxHideSelection: dropdownrowdata,
      selectedrow: defaultrowdata,
      selectedcheckbox: true,
      selectText: ''
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

  describe('continue', () => {
    it('should dismiss with resultValue from textValue and true', () => {
      var chosenRow = new SingleselectRowItem("test", "test", true);
      component.selectedRowItem = chosenRow;
      var chosenCheck = true;
      component.checkboxSelected = chosenCheck;
      spyOn(component.dismiss, 'next');
      component.continue();
      expect(component.data.selectedrow).toBe(chosenRow);
      expect(component.data.selectedcheckbox).toBe(chosenCheck);
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
  });
});
