import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowReorderButtonsComponent } from './row-reorder-buttons.component';
import { ButtonActionModule } from '@omnicell/webcorecomponents';

describe('RowReorderButtonsComponent', () => {
  let component: RowReorderButtonsComponent;
  let fixture: ComponentFixture<RowReorderButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowReorderButtonsComponent ],
      imports: [
        ButtonActionModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowReorderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
