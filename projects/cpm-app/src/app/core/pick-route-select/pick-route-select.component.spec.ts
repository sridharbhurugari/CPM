import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridModule } from '@omnicell/webcorecomponents';
import { PickRouteSelectComponent } from './pick-route-select.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
describe('PickRouteSelectComponent', () => {
  let component: PickRouteSelectComponent;
  let fixture: ComponentFixture<PickRouteSelectComponent>;

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
    const newId: number = 11;
    component.selectedId = 1;
    component.SelectionChange.subscribe(g => {
       expect(g).toEqual(newId);
       gogo();
    });
    component.selectionChanged(newId);
    expect(component.selectedId).toEqual(newId);
});

  it('select change', async(() => {
    const listMap = new Map<number, string>();
    listMap.set(1, 'Default');
    listMap.set(2, 'Two');
    listMap.set(3, 'Three');

    component.listMap = listMap;
    component.selectedId = 1;
    component.colDescription = 'test description';
    fixture.detectChanges();
    spyOn(component, 'selectionChanged').and.callThrough();
    const radios = fixture.debugElement.queryAll(By.css('input.ocRadioButton'));
    let radio1;
    let radio2;
    let counter = 1;
    for (const r of radios) {
      const rElement = r.nativeElement;
      if (rElement.id === '1') {
        radio1 = rElement;
      }
      else if (rElement.id === '2') {
        radio2 = rElement;
      }
      counter++;
    }
    component.selectionChanged(2);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
    expect(component.selectionChanged).toHaveBeenCalled();
    expect(radio1.checked).toEqual(false);
    expect(radio2.checked).toEqual(true);
  });
}));
});
