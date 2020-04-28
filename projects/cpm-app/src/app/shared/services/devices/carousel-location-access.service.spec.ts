import { TestBed } from '@angular/core/testing';

import { CarouselLocationAccessService } from './carousel-location-access.service';
import { CarouselCommandsService } from '../../../api-core/services/carousel-commands.service';
import { CoreEventConnectionService } from '../../../api-core/services/core-event-connection.service';
import { Subject } from 'rxjs';
import { IDeviceOperationResultEvent } from '../../../api-core/events/i-device-operation-result-event';

describe('CarouselLocationAccessService', () => {
  beforeEach(() => {
    var coreEventConnectionService: Partial<CoreEventConnectionService> = {
      deviceOperationResultEventSubject: new Subject<IDeviceOperationResultEvent>()
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: CarouselCommandsService, useValue: {} },
        { provide: CoreEventConnectionService, useValue: coreEventConnectionService },
      ]
    })
  });

  it('should be created', () => {
    const service: CarouselLocationAccessService = TestBed.get(CarouselLocationAccessService);
    expect(service).toBeTruthy();
  });
});
