import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CheckboxModule, GridModule, InputsModule } from '@omnicell/webcorecomponents';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';

import { InternalTransferPickNeedsListComponent } from './internal-transfer-pick-needs-list.component';

describe('InternalTransferPickNeedsListComponent', () => {
  let component: InternalTransferPickNeedsListComponent;
  let fixture: ComponentFixture<InternalTransferPickNeedsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        InternalTransferPickNeedsListComponent,
        MockColHeaderSortable,
        MockTranslatePipe,
      ],
      imports: [ 
        CheckboxModule,
        GridModule,
        FormsModule,
        InputsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTransferPickNeedsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
