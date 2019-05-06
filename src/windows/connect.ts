import { WifiConfig, WifiAccessPointConnect } from 'node-wifi2';
import { exec } from 'child_process';

import env from '../env';

import { networksetup } from './_constants';

const connectToWifi = (config: WifiConfig, accessPoint: WifiAccessPointConnect) => (
  new Promise((resolve, reject) => {
    try {
    let iface = 'en0';

    if (config.iface) {
      iface = config.iface.toString();
    }

    const { ssid, password } = accessPoint;

    exec(`${networksetup} -setairportnetwork '${iface}' '${ssid}' '${password}'`, { env }, (err, resp, stderr) => {
      if (resp && resp.indexOf('Failed to join network') >= 0) {
        resolve(resp);
      } else if (resp && resp.indexOf('Could not find network') >= 0) {
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

export default connectToWifi;
