import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderfilledPicklistsPageComponent } from './underfilled-picklists-page.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GridModule } from '@omnicell/webcorecomponents';
import { UnderfilledPicklistsService } from '../../api-core/services/underfilled-picklists.service';
import { of } from 'rxjs';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { Component, Input } from '@angular/core';
import { UnderfilledPicklist } from '../model/underfilled-picklist';
import { PickingEventConnectionService } from '../../api-core/services/picking-event-connection.service';

@Component({
  selector: 'app-underfilled-picklists',
  template: ''
})
class MockUnderfilledPicklistsComponent {
  @Input()picklists: UnderfilledPicklist[];
}

describe('UnderfilledPicklistsPageComponent', () => {
  let component: UnderfilledPicklistsPageComponent;
  let fixture: ComponentFixture<UnderfilledPicklistsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderfilledPicklistsPageComponent, MockUnderfilledPicklistsComponent ],
      imports: [
        GridModule,
        TranslateModule.forChild()
      ],
      providers: [
        { provide: UnderfilledPicklistsService, useValue: { get: () => of([]) } },
        { provide: WpfActionControllerService, useValue: { }},
        { provide: TranslateService, useValue: { get: (k: any) => of(k) }},
        { provide: PickingEventConnectionService, useValue: { }}
      ]
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
