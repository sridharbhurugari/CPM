import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextResultPopupComponent } from './text-result-popup.component';
import { PopupWindowModule, TextboxModule, ButtonActionModule, FooterModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';
import { ITextResultPopupData } from '../../model/i-text-result-popup-data';

describe('TextResultPopupComponent', () => {
  let component: TextResultPopupComponent;
  let fixture: ComponentFixture<TextResultPopupComponent>;
  let data: ITextResultPopupData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextResultPopupComponent, MockTranslatePipe ],
      imports: [
        PopupWindowModule,
        TextboxModule,
        ButtonActionModule,
        FooterModule,
      ]
    })
    .compileComponents();
    data = {
      afterTextboxResourceKey: '',
      beforeTextboxResourceKey: '',
      headerResourceKey: '',
      initialValue: '',
      placeholderTextResouceKey: '',
      resultValue: ''
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextResultPopupComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cancel', () => {
    it('should dismiss with null resultValue and false', () => {
      spyOn(component.dismiss, 'next');
      component.cancel();
      expect(component.data.resultValue).toBeNull();
      expect(component.dismiss.next).toHaveBeenCalledWith(false);
    });
  });

  describe('continue', () => {
    it('should dismiss with resultValue from textValue and true', () => {
      var expectedValue = 'entered text';
      component.textValue = expectedValue;
      spyOn(component.dismiss, 'next');
      component.continue();
      expect(component.data.resultValue).toBe(expectedValue);
      expect(component.dismiss.next).toHaveBeenCalledWith(true);
    });
  });

  describe('textValueChanged', () => {
    it('should set textValue', () => {
      var expectedValue = 'entered text';
      component.textValueChanged(expectedValue);
      expect(component.textValue).toBe(expectedValue);
    });
  });
});
