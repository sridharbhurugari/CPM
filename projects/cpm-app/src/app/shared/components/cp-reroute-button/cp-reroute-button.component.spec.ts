import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpRerouteButtonComponent } from './cp-reroute-button.component';

describe('CpRerouteButtonComponent', () => {
  let component: CpRerouteButtonComponent;
  let fixture: ComponentFixture<CpRerouteButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpRerouteButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpRerouteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
