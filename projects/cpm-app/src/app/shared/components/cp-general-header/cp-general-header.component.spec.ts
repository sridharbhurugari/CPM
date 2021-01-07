import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpGeneralHeaderComponent } from './cp-general-header.component';

describe('CpGeneralHeaderComponent', () => {
  let component: CpGeneralHeaderComponent;
  let fixture: ComponentFixture<CpGeneralHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpGeneralHeaderComponent ]
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
});
