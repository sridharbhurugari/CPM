import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { GridModule, ButtonActionModule, PopupDialogModule } from '@omnicell/webcorecomponents';
import { of } from 'rxjs';
import { MockAppHeaderContainer } from '../../core/testing/mock-app-header.spec';
import { MockSearchBox } from '../../core/testing/mock-search-box.spec';
import { MockSearchPipe } from '../../core/testing/mock-search-pipe.spec';
import { MockTranslatePipe } from '../../core/testing/mock-translate-pipe.spec';
import { MockColHeaderSortable } from '../../shared/testing/mock-col-header-sortable.spec';
import { MockCpClickableIconComponent } from '../../shared/testing/mock-cp-clickable-icon.spec';
import { MockCpDataLabelComponent } from '../../shared/testing/mock-cp-data-label.spec';

import { Xr2InvoicesQueueComponent } from './xr2-invoices-queue.component';

describe('Xr2InvoicesQueueComponent', () => {
  let component: Xr2InvoicesQueueComponent;
  let fixture: ComponentFixture<Xr2InvoicesQueueComponent>;
  let translateService: Partial<TranslateService>;


  beforeEach(async(() => {
    translateService = {
      get: jasmine.createSpy('get').and.returnValue(of(translateService)),
      getDefaultLang: jasmine.createSpy('getDefaultLang').and.returnValue(of('en-US'))
    };

    TestBed.configureTestingModule({
      declarations: [ Xr2InvoicesQueueComponent, MockTranslatePipe, MockSearchPipe, MockSearchBox,
        MockColHeaderSortable, MockAppHeaderContainer, MockCpClickableIconComponent, MockCpDataLabelComponent ],
      imports: [GridModule, ButtonActionModule, PopupDialogModule, HttpClientModule],
      providers: [
        { provide: TranslateService, useValue: translateService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Xr2InvoicesQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
