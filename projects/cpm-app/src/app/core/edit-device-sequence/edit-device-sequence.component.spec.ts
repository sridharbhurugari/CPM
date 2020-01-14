import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceSequenceComponent } from './edit-device-sequence.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ButtonActionModule, CheckboxModule, GridModule } from '@omnicell/webcorecomponents';
import { SharedModule } from '../../shared/shared.module';

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
});
