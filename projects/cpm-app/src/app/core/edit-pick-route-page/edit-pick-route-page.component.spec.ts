import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPickRoutePageComponent } from './edit-pick-route-page.component';
import { MockTranslatePipe } from '../testing/mock-translate-pipe.spec';
import { SharedModule } from '../../shared/shared.module';
import { GridModule, ButtonActionModule, FooterModule, LayoutModule, PopupWindowService } from '@omnicell/webcorecomponents';
import { EditDeviceSequenceComponent } from '../edit-device-sequence/edit-device-sequence.component';
import { ActivatedRoute } from '@angular/router';
import { WpfActionControllerService } from '../../shared/services/wpf-action-controller/wpf-action-controller.service';
import { PickRoutesService } from '../../api-core/services/pick-routes.service';
import { DevicesService } from '../../api-core/services/devices.service';
import { of } from 'rxjs';

describe('EditPickRoutePageComponent', () => {
  let component: EditPickRoutePageComponent;
  let fixture: ComponentFixture<EditPickRoutePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPickRoutePageComponent, MockTranslatePipe, EditDeviceSequenceComponent ],
      imports: [
        GridModule,
        SharedModule,
        ButtonActionModule,
        LayoutModule,
        FooterModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap : { get: () => '' } } } },
        { provide: PickRoutesService, useValue: { get: () => of({}) } },
        { provide: DevicesService, useValue: { get: () => of([]) } },
        { provide: WpfActionControllerService, useValue: { } },
        { provide: PopupWindowService, useValue: { } },
      ],
    })
    .overrideComponent(EditDeviceSequenceComponent, {
      set: {
        template: ''
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPickRoutePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
