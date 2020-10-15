import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CPDataLabelComponent } from './cp-data-label.component';
describe('CpDataLabelComponent', () => {
  let component: CPDataLabelComponent;
  let fixture: ComponentFixture<CPDataLabelComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPDataLabelComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CPDataLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

