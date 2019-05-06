import { WifiWrapper, WifiConfig, WifiAccessPointConnect, WifiAccessPointDelete } from 'node-wifi2';

import mac from './mac';
import linux from './linux';
import windows from './windows';

const platforms = {
  linux: () => linux,
  darwin: () => mac,
  win32: () => windows,
} as {
  [key: string]: () => WifiWrapper,
};

class Wifi {
  private platform: WifiWrapper;
  private initialised: boolean = false;
  private config: WifiConfig = {
    debug: false,
    iface: null,
  };

  public init(config: WifiConfig = {}) {
    try {
      this.platform = platforms[process.platform || 'default']();
      this.initialised = true;
      this.config = config;

      return this.platform;
    } catch (error) {
      return error;
    }
  }

  public scan() {
    try {
      this.isInitialised();
      return this.platform.scan(this.config);
    } catch (error) {
      return error;
    }
  }

  public getCurrentConnections() {
    try {
      this.isInitialised();
      return this.platform.getCurrentConnections(this.config);
    } catch (error) {
      return error;
    }
  }

  public connect(accessPoint: WifiAccessPointConnect) {
    try {
      this.isInitialised();
      return this.platform.connectToWifi(this.config, accessPoint);
    } catch (error) {
      return error;
    }
  }

  public deleteConnection(accessPoint: WifiAccessPointDelete) {
    try {
      this.isInitialised();
      return this.platform.deleteConnection(this.config, accessPoint);
    } catch (error) {
      return error;
    }
  }

  public disconnect() {
    try {
      this.isInitialised();
      return this.platform.disconnectFromWifi(this.config);
    } catch (error) {
      return error;
    }
  }

  private isInitialised = () => {
    if (!this.initialised) {
      // tslint:disable-next-line:no-string-throw
      throw 'You need to initialise first: wifi.init();';
    }
  }
}

export default new Wifi();
