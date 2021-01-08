import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockSearchBox } from '../../../core/testing/mock-search-box.spec';
import { MockSearchPipe } from '../../../core/testing/mock-search-pipe.spec';
import { MockCpClickableIconComponent } from '../../testing/mock-cp-clickable-icon.spec';

import { CpGeneralHeaderComponent } from './cp-general-header.component';

describe('CpGeneralHeaderComponent', () => {
  let component: CpGeneralHeaderComponent;
  let fixture: ComponentFixture<CpGeneralHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpGeneralHeaderComponent, MockCpClickableIconComponent,
        MockSearchBox, MockSearchPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpGeneralHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
