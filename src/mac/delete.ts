import { WifiConfig, WifiAccessPointDelete } from 'node-wifi2';
import { exec } from 'child_process';

import env from '../env';

import { networksetup } from './_constants';

const deleteConnection = (config: WifiConfig, accessPoint: WifiAccessPointDelete) => (
  new Promise((resolve, reject) => {
    try {
      let iface = 'en0';

      if (config.iface) {
        iface = config.iface.toString();
      }

      const { ssid } = accessPoint;

      exec(`${networksetup} -removepreferredwirelessnetwork '${iface}' '${ssid}'`, { env }, (err, resp, stderr) => {
        if (resp && resp.indexOf('was not found in the preferred networks list') >= 0) {
          resolve(resp);
        } else {
          throw err;
        }
      });
    } catch (error) {
      reject(error);
    }
  })
);

export default deleteConnection;
