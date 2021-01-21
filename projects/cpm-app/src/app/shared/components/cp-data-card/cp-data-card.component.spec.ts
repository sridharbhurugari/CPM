import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpDataCardComponent } from './cp-data-card.component';

describe('CpDataCardComponent', () => {
  let component: CpDataCardComponent;
  let fixture: ComponentFixture<CpDataCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpDataCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
