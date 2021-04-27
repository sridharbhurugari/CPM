import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationDetailsPageComponent } from './utilization-details-page.component';

describe('UtilizationDetailsPageComponent', () => {
  let component: UtilizationDetailsPageComponent;
  let fixture: ComponentFixture<UtilizationDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
