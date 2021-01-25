import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockGridSortCol } from '../../shared/testing/mock-grid-sort-col.spec';
import { DestockTypeInfoComponent } from './destock-typeinfo.component';

describe('DestockTypeInfoComponent ', () => {
  let component: DestockTypeInfoComponent ;
  let fixture: ComponentFixture<DestockTypeInfoComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ DestockTypeInfoComponent,
        MockSearchPipe,
        MockTranslatePipe,
        MockColHeaderSortable,
        MockGridSortCol],
      imports: [],
      providers: [GridModule, ButtonActionModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestockTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

