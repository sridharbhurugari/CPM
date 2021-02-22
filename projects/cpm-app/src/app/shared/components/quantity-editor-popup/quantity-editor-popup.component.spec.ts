import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantityEditorPopupComponent } from './quantity-editor-popup.component';
import { IQuantityEditorPopupData } from '../../model/i-quantity-editor-popup-data';
import { PopupWindowModule, ButtonActionModule, FooterModule } from '@omnicell/webcorecomponents';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';
import { MockOcNumeric } from '../../../core/testing/mock-oc-numeric.spec';

describe('QuantityEditorPopupComponent', () => {
  let component: QuantityEditorPopupComponent;
  let fixture: ComponentFixture<QuantityEditorPopupComponent>;
  let data: IQuantityEditorPopupData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuantityEditorPopupComponent,
        MockTranslatePipe,
        MockOcNumeric
       ],
      imports: [
        PopupWindowModule,
        ButtonActionModule,
        FooterModule,
      ]
    })
    .compileComponents();

    data = {
      popupTitle: 'TEST POPUP',
      quantityDescritpion: 'TEST DESCRIPTION',
      quantitySubDescritpion: 'TEST SUBDESCRIPTION',
      packSize: 5,
      requestedQuantity: 0,
      unitOfIssue: "EA"
      };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityEditorPopupComponent);
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
      component.quantityToPick = 100;
      spyOn(component.dismiss, 'next');
      component.continue();
      expect(component.data.requestedQuantity).toEqual(component.quantityToPick);
      expect(component.dismiss.next).toHaveBeenCalledWith(true);
    });
  });

  describe('pickQtyChanged', () => {
    it('should set quantityToPick', () => {
      component.packsToPick = 2;
      component.pickQtyChanged();
      expect(component.quantityToPick).toEqual(10);
    });
  });
});
