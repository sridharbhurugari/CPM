import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColHeaderSortableComponent } from './col-header-sortable.component';
import { MockTranslatePipe } from '../../../core/testing/mock-translate-pipe.spec';
import { SvgIconModule, SvgiconComponent } from '@omnicell/webcorecomponents';

describe('ColHeaderSortableComponent', () => {
  let component: ColHeaderSortableComponent;
  let fixture: ComponentFixture<ColHeaderSortableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ColHeaderSortableComponent,
        MockTranslatePipe,
      ],
      imports: [
        SvgIconModule
      ]
    })
    .overrideComponent(SvgiconComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColHeaderSortableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
