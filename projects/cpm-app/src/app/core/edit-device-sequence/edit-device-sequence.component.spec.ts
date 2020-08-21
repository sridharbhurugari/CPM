import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceSequenceComponent } from './edit-device-sequence.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { ButtonActionModule, CheckboxModule, GridModule, PopupWindowService, PopupWindowProperties, SingleselectRowItem} from '@omnicell/webcorecomponents';
import { SelectionChangeType } from '../../shared/constants/selection-change-type';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { DropdownPopupComponent } from '../../shared/components/dropdown-popup/dropdown-popup.component';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';
import { OutputDevice } from '../../api-xr2/data-contracts/output-device';
import { DeviceOutput } from '../../api-xr2/data-contracts/device-output';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockRowReorderButtonsComponent } from '../../shared/testing/mock-row-reorder-buttons.spec';


describe('EditDeviceSequenceComponent', () => {
  let component: EditDeviceSequenceComponent;
  let fixture: ComponentFixture<EditDeviceSequenceComponent>;
  let popupWindowService: any;
  const popupDismissedSubject = new Subject<boolean>();  

  beforeEach(async(() => {
    const popupResult: Partial<DropdownPopupComponent> = { dismiss: popupDismissedSubject };
    const showSpy = jasmine.createSpy('show').and.returnValue(popupResult);
    popupWindowService = { show: showSpy };
    TestBed.configureTestingModule({
      declarations: [ 
        EditDeviceSequenceComponent,
        MockTranslatePipe,
        MockCpClickableIconComponent,
        MockRowReorderButtonsComponent,
      ],
      imports: [
        ButtonActionModule,
        CheckboxModule,
        GridModule,
      ],
      providers: [
        { provide: TranslateService, useValue: { get: () => of([]) } },
        { provide: PopupWindowService, useValue: popupWindowService }
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

  describe('onOutputDeviceEditClick', () => {
    beforeEach(() => {
      const deviceOutput: DeviceOutput = {
        DeviceOutputType: '2104',
        IsAutoFill: false
      };
      
      const device: OutputDevice = {
        DeviceId: '2104',
        Label: 'CARTMODULE',
        IsActive: true
      };     
  
      const deviceSequence: IDeviceSequenceOrder = {        
        DeviceId: 1,
        DeviceDescription: 'test',
        SequenceOrder: 1,
        DeviceType: '1',
        DeviceOutput: deviceOutput,
        OutputDevices: [device]
      };        
  
      component.onOutputDeviceEditClick(deviceSequence);
    });
    
    it('should present dropdown popup', () => {          
      expect(popupWindowService.show).toHaveBeenCalled();
    });

    describe('given dropdown popup dismissed with ok', () => {
      it('should emit deviceSequenceChanged', () => {
        spyOn(component.deviceSequenceChanged, 'emit'); 
        popupDismissedSubject.next(true);       
        expect(component.deviceSequenceChanged.emit).toHaveBeenCalled();
      });
    });
  });
});
