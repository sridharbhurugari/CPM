import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridModule } from '@omnicell/webcorecomponents';
import { PickRouteSelectComponent } from './pick-route-select.component';
import { FormsModule } from '@angular/forms';
import { FormStatusImageModule } from '@omnicell/webcorecomponents/esm5/lib/form-status-image/form-status-image.module';

describe('PickRouteSelectComponent', () => {
  let component: PickRouteSelectComponent;
  let fixture: ComponentFixture<PickRouteSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickRouteSelectComponent ],
      imports: [ GridModule, FormsModule, FormStatusImageModule ]
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
});
