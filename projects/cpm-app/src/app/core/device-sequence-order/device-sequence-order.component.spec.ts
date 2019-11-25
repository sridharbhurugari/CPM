import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridModule } from '@omnicell/webcorecomponents';
import { DeviceSequenceOrderComponent } from './device-sequence-order.component';

describe('DeviceSequenceOrderComponent', () => {
  let component: DeviceSequenceOrderComponent;
  let fixture: ComponentFixture<DeviceSequenceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSequenceOrderComponent ],
      imports: [ GridModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSequenceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
