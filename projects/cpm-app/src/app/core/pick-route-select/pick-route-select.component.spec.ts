import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridModule } from '@omnicell/webcorecomponents';
import { PickRouteSelectComponent } from './pick-route-select.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IPickRouteDevice } from '../../api-core/data-contracts/i-pickroute-device';
import { IDeviceSequenceOrder } from '../../api-core/data-contracts/i-device-sequenceorder';

describe('PickRouteSelectComponent', () => {
  let component: PickRouteSelectComponent;
  let fixture: ComponentFixture<PickRouteSelectComponent>;
  let mockPickRouteDevices: IDeviceSequenceOrder[];

  const defaultItem: IPickRouteDevice = {
    PickRouteId: 1,
    RouteDescription: 'Default',
    PickRouteGuid: '11111-11-1111-1111',
    PickRouteDevices: mockPickRouteDevices,
  };

  const itemTwo: IPickRouteDevice = {
    PickRouteId: 2,
    RouteDescription: 'Two',
    PickRouteGuid: '22222-22-2222-2222',
    PickRouteDevices: mockPickRouteDevices,
  };

  const itemThree: IPickRouteDevice = {
    PickRouteId: 3,
    RouteDescription: 'Three',
    PickRouteGuid: '33333-33-3333-3333',
    PickRouteDevices: mockPickRouteDevices,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickRouteSelectComponent ],
      imports: [ GridModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickRouteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selectionChanged event', (gogo) => {

    component.selectedItem = defaultItem ;
    component.SelectionChange.subscribe(g => {
       expect(g).toEqual(itemTwo);
       gogo();
    });
    component.selectionChanged(itemTwo);
    expect(component.selectedItem).toEqual(itemTwo);
  });

  it('select change', async(() => {
    const listMap = new Map<IPickRouteDevice, string>();

    listMap.set(defaultItem, defaultItem.RouteDescription);
    listMap.set(itemTwo, itemTwo.RouteDescription);
    listMap.set(itemThree, itemThree.RouteDescription);

    component.listMap = listMap;
    component.selectedItem = defaultItem;
    component.colDescription = 'test description';
    fixture.detectChanges();
    spyOn(component, 'selectionChanged').and.callThrough();
    const radios = fixture.debugElement.queryAll(By.css('input.ocRadioButton'));
    let radio1: { checked: any; };
    let radio2: { checked: any; };
    let radio3: { checked: any; };
    for (const r of radios) {
      const rElement = r.nativeElement;
      if (rElement.id === defaultItem.PickRouteId.toString()) {
        radio1 = rElement;
      } else if (rElement.id === itemTwo.PickRouteId.toString()) {
        radio2 = rElement;
      } else if (rElement.id === itemThree.PickRouteId.toString()) {
        radio3 = rElement;
      }
    }

    component.selectionChanged(itemTwo);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.selectionChanged).toHaveBeenCalled();
      expect(radio1.checked).toEqual(false);
      expect(radio2.checked).toEqual(true);
      expect(radio3.checked).toEqual(false);
    });
  }));
});
