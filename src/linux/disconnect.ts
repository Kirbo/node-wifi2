import { WifiConfig } from 'node-wifi2';
import { exec } from 'child_process';

import env from '../env';

import { nmcli } from './_constants';

const disconnectFromWifi = (config: WifiConfig) => (
  new Promise((resolve, reject) => {
    try {
      let interfaceStr = '';

      if (config.iface) {
        const iface = config.iface.toString();
        interfaceStr = ` ${iface}`;
      }

      exec(`${nmcli} device disconnect${interfaceStr}`, { env }, (error, resp, stderr) => {
        if (error) {
          throw error;
        } else if (stderr) {
          throw stderr;
        }
        resolve(resp);
      });
    } catch (error) {
      reject(error);
    }
  })
);

export default disconnectFromWifi;
