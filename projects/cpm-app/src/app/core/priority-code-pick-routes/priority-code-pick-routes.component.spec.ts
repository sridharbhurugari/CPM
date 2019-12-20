import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridModule, SearchBoxComponent } from '@omnicell/webcorecomponents';
import { PriorityCodePickRoutesComponent } from './priority-code-pick-routes.component';

import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { MockSearchPipe } from '../testing/mock-search-pipe.spec';
import { MockSearchBox } from '../testing/mock-search-box.spec';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

describe('PriorityCodePickRoutesComponent', () => {
  let component: PriorityCodePickRoutesComponent;
  let fixture: ComponentFixture<PriorityCodePickRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityCodePickRoutesComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox ],
      providers: [
        { provide: WpfActionControllerService, useVaule: { } }
      ],
      imports: [
        GridModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityCodePickRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
