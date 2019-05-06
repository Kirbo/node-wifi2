import { WifiConfig, WifiAccessPointDelete } from 'node-wifi2';
import { exec } from 'child_process';

import env from '../env';

import { nmcli } from './_constants';

const deleteConnection = (config: WifiConfig, accessPoint: WifiAccessPointDelete) => (
  new Promise((resolve, reject) => {
    try {
      let iface = 'en0';

      if (config.iface) {
        iface = config.iface.toString();
      }

      const { ssid } = accessPoint;

      exec(`${nmcli} connection delete id '${ssid}'`, { env }, (error, resp, stderr) => {
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

export default deleteConnection;
