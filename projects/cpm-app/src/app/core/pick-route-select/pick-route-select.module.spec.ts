import { PickRouteSelectModule } from './pick-route-select.module';

describe('PickRouteSelectModule', () => {
  let pickRouteSelectModule: PickRouteSelectModule;

  beforeEach(() => {
    pickRouteSelectModule = new PickRouteSelectModule();
  });

  it('should create an instance', () => {
    expect(pickRouteSelectModule).toBeTruthy();
  });
});
