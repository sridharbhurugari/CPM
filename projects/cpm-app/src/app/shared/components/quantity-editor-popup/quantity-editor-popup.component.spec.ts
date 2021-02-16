import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityEditorPopupComponent } from './quantity-editor-popup.component';

describe('QuantityEditorPopupComponent', () => {
  let component: QuantityEditorPopupComponent;
  let fixture: ComponentFixture<QuantityEditorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityEditorPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityEditorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
