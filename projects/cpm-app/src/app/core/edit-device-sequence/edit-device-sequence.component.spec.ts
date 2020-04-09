import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceSequenceComponent } from './edit-device-sequence.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ButtonActionModule, CheckboxModule, GridModule } from '@omnicell/webcorecomponents';
import { SharedModule } from '../../shared/shared.module';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';

describe('EditDeviceSequenceComponent', () => {
  let component: EditDeviceSequenceComponent;
  let fixture: ComponentFixture<EditDeviceSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeviceSequenceComponent, MockTranslatePipe ],
      imports: [
        ButtonActionModule,
        CheckboxModule,
        GridModule,
        SharedModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSelectionChanged', () => {
    it('should emit deviceSequenceChanged', () => {
      spyOn(component.deviceSequenceChanged, 'emit');
      component.onOrderChanged({ changedValue: undefined, orderedValues: [] });
      expect(component.deviceSequenceChanged.emit).toHaveBeenCalled();
    });
  })

  describe('onOrderChanged', () => {
    it('should emit deviceSequenceChanged', () => {
      spyOn(component.deviceSequenceChanged, 'emit');
      component.onSelectionChanged({ changeType: SelectionChangeType.selected, unselectedValues: [], changedValue: undefined, selectedValues: [] });
      expect(component.deviceSequenceChanged.emit).toHaveBeenCalled();
    });
  })
});
