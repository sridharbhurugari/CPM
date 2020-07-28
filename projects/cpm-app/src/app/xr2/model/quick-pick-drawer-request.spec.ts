import { QuickPickDrawerRequest } from './quick-pick-drawer-request';

describe('QuickPickQueueItem', () => {
  it('should create an instance', () => {
    expect(new QuickPickDrawerRequest(null, null)).toBeTruthy();
  });
});
