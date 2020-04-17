import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupWindowModule, ButtonActionModule, FooterModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';

import { ConfirmPopupComponent } from './confirm-popup.component';
import { IConfirmPopupData } from '../../model/i-confirm-popup-data';

describe('ConfirmPopupComponent', () => {
  let component: ConfirmPopupComponent;
  let fixture: ComponentFixture<ConfirmPopupComponent>;
  let data: IConfirmPopupData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPopupComponent, MockTranslatePipe ],
      imports: [
        PopupWindowModule,
        ButtonActionModule,
        FooterModule,
       ]
    })
    .compileComponents();
    data = {
      headerResourceKey: '',
      confirmTextboxResourceKey: '',
    };

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopupComponent);
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
    it('should dismiss with true', () => {
      spyOn(component.dismiss, 'next');
      component.continue();
      expect(component.dismiss.next).toHaveBeenCalledWith(true);
    });
  });
});
