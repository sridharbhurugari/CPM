import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Xr2ExceptionsPageComponent } from './xr2-exceptions-page.component';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { GridModule, FooterModule, LayoutModule, SvgIconModule, SearchModule, ButtonActionModule } from '@omnicell/webcorecomponents';
import { of, never } from 'rxjs';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { Xr2ExceptionsService } from '../../api-xr2/services/xr2-exceptions.service';
import { IColHeaderSortChanged } from '../../shared/events/i-col-header-sort-changed';
import { Xr2ExceptionsItem } from '../model/xr2-exceptions-item';
describe('Xr2ExceptionsPageComponent', () => {
  let component: Xr2ExceptionsPageComponent;
  let fixture: ComponentFixture<Xr2ExceptionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Xr2ExceptionsPageComponent, MockTranslatePipe,
        MockColHeaderSortable, MockAppHeaderContainer, MockSearchPipe ],
      imports: [GridModule, FooterModule, LayoutModule, SearchModule, SvgIconModule, ButtonActionModule],
      providers: [
        { provide: Xr2ExceptionsService, useValue: { get: () => of([]) } },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2ExceptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('column selected ', () => {
    component.currentSortPropertyName = "Tray Description";
  });
});
