import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistsPageComponent } from './underfilled-picklists-page.component';
import { UnderfilledPicklistsComponent } from '../underfilled-picklists/underfilled-picklists.component';
import { TranslateModule, TranslateService, TranslatePipe } from '@ngx-translate/core';
import { GridModule } from '@omnicell/webcorecomponents';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { of } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';

describe('UnderfilledPicklistsPageComponent', () => {
  let component: UnderfilledPicklistsPageComponent;
  let fixture: ComponentFixture<UnderfilledPicklistsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderfilledPicklistsPageComponent, UnderfilledPicklistsComponent ],
      imports: [
        GridModule,
        TranslateModule.forChild()
      ],
      providers: [
        { provide: UnderfilledPicklistsService, useValue: { get: () => of([]) } },
        { provide: WpfActionControllerService, useVaule: { }}
      ]
    })
    .overrideComponent(UnderfilledPicklistsComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderfilledPicklistsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
