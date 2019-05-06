import 'jest';

import wifi from '../src/wifi';
import { needToInitialise } from './_helpers';

describe('wifi.getCurrentConnections()', () => {
  it('should not be initialised', async () => {
    try {
      expect(await wifi.getCurrentConnections()).toThrowError(Error);
    } catch (error) {
      expect(error.message).toBe(needToInitialise);
    }
  });

  it('should be initialised', async () => {
    expect(wifi.init()).toBeTruthy();
    expect((await wifi.getCurrentConnections()).length > 0).toBeTruthy();
  });
});
