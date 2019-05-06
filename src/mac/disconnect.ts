import { WifiConfig } from 'node-wifi2';
import { exec } from 'child_process';

import env from '../env';

import { airport } from './_constants';

const disconnectFromWifi = (config: WifiConfig) => (
  new Promise((resolve, reject) => {
    try {
    let iface = 'en0';

    if (config.iface) {
      iface = config.iface.toString();
    }

    exec(`sudo ${airport} '${iface}' -z`, { env }, (error, resp, stderr) => {
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
