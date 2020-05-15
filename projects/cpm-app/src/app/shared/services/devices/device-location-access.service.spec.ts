// import { TestBed } from '@angular/core/testing';

// import { DeviceLocationAccessService } from './device-location-access.service';
// import { CarouselLocationAccessService } from './carousel-location-access.service';
// import { OpenStorageLocationAccessService } from './open-storage-location-access.service';
// import { DeviceLocationAccessResult } from '../../enums/device-location-access-result';
// import { of } from 'rxjs';
// import { DeviceLocationTypeId } from '../../constants/device-location-type-id';

// describe('DeviceLocationAccessService', () => {
//   let service: DeviceLocationAccessService;
//   let carouselService: Partial<CarouselLocationAccessService>;

//   beforeEach(() => {
//     let carouselServiceMock: Partial<CarouselLocationAccessService> = {
//       deviceLocationTypeId: DeviceLocationTypeId.Carousel,
//       accessLocation: () => { return of(DeviceLocationAccessResult.Succeeded); },
//     };
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: CarouselLocationAccessService, useValue: carouselServiceMock },
//         { provide: OpenStorageLocationAccessService, useValue: {} },
//       ]
//     })
//     service = TestBed.get(DeviceLocationAccessService);
//     carouselService = TestBed.get(CarouselLocationAccessService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('accessLocation', () => {
//     describe('given carousel location', () => {
//       it('should call carousel location access service', () => {
//         spyOn(carouselService, 'accessLocation');
//         let deviceLocation: any = { deviceLocationTypeId: DeviceLocationTypeId.Carousel };
//         let itemDisplay: any = { };
//         service.accessLocation(deviceLocation, itemDisplay);
//         expect(carouselService.accessLocation).toHaveBeenCalled();
//       });
//     });
//   });
// });
