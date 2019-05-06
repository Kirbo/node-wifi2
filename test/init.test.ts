import 'jest';

import wifi from '../src/wifi';

let mockProcess: any;

describe('wifi.init()', () => {
  beforeAll(() => {
    mockProcess = {
      env: {
        PWD: process.env.PWD,
        NODE_ENV: 'not_working',
      },
      argv: [...process.argv],
      platform: process.platform,
      exit: () => undefined,
    };
  });

  it('should initialise using platform', async () => {
    wifi.init({}, mockProcess);
    expect(wifi.os).toBe(process.platform);
  });

  it('should initialise mocking linux', async () => {
    wifi.init({}, {
      ...mockProcess,
      platform: 'linux',
    });
    expect(wifi.os).toBe('linux');
  });

  it('should initialise mocking mac', async () => {
    wifi.init({}, {
      ...mockProcess,
      platform: 'darwin',
    });
    expect(wifi.os).toBe('darwin');
  });

  it('should initialise mocking windows', async () => {
    wifi.init({}, {
      ...mockProcess,
      platform: 'win32',
    });
    expect(wifi.os).toBe('win32');
  });
});
