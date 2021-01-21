import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockSearchBox } from '../../../core/testing/mock-search-box.spec';
import { MockSearchPipe } from '../../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';
import { MockCpClickableIconComponent } from '../../testing/mock-cp-clickable-icon.spec';

import { CpGeneralHeaderComponent } from './cp-general-header.component';

describe('CpGeneralHeaderComponent', () => {
  let component: CpGeneralHeaderComponent;
  let fixture: ComponentFixture<CpGeneralHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpGeneralHeaderComponent, MockCpClickableIconComponent,
        MockSearchBox, MockSearchPipe, MockTranslatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpGeneralHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Eventing', () => {
    it('Should send back event on back click', () => {
      const backEventSpy = spyOn(component.backEvent, 'emit');

      component.onBackClick();

      expect(backEventSpy).toHaveBeenCalledTimes(1);
    })
  })
});
