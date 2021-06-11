import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridModule } from '@omnicell/webcorecomponents';
import { TranslateService } from '@ngx-translate/core';
import { DeviceSequenceOrderComponent } from './device-sequence-order.component';
import { of } from 'rxjs';
import { IDevice } from '../../api-core/data-contracts/i-device';
import { DeviceOutput } from '../../api-xr2/data-contracts/device-output';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';

describe('DeviceSequenceOrderComponent', () => {
  let component: DeviceSequenceOrderComponent;
  let fixture: ComponentFixture<DeviceSequenceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSequenceOrderComponent ],
      imports: [ GridModule ],
      providers: [
        { provide: TranslateService, useValue: { get: () => of([]) } }
      ]
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
  describe('getCurrentOutputDeviceDescription', () => {
    it('should outpudevice description text' ,() => {
      const routeDevice1: IDevice = {Id: 5, Description: 'routeDevice1', DeviceType: '2100', OutputDevices: null};
      const outputDevices : OutputDevice = {
        DeviceId: '0',
        Label: "AUTOFILL",
        IsActive: false
      };
      const assignedDefaultOutputDevice: DeviceOutput = {
        DeviceOutputType: '0',
        IsAutoFill: false
      };
  
      const deviceSequence1: IDeviceSequenceOrder = {
        SequenceOrder: 1,
        DeviceId: routeDevice1.Id,
        DeviceDescription: routeDevice1.Description,
        DeviceType: routeDevice1.DeviceType,
        DeviceOutput: assignedDefaultOutputDevice,
        OutputDevices: routeDevice1.OutputDevices};
       const result = component.getCurrentOutputDeviceDescription(deviceSequence1);
       expect(result).not.toEqual('');
    })
  });
});
