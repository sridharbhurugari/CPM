import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmSignalRComponent } from './cpm-signal-r.component';

describe('CpmSignalRComponent', () => {
  let component: CpmSignalRComponent;
  let fixture: ComponentFixture<CpmSignalRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpmSignalRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpmSignalRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
