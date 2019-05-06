import { WifiConfig, WifiAccessPointConnect } from 'node-wifi2';
import { exec } from 'child_process';

import env from '../env';

import { nmcli } from './_constants';

const connectToWifi = (config: WifiConfig, accessPoint: WifiAccessPointConnect) => (
  new Promise((resolve, reject) => {
    try {
      let interfaceStr = '';

      if (config.iface) {
        const iface = config.iface.toString();
        interfaceStr = ` ifname '${iface}'`;
      }

      const { ssid, password } = accessPoint;

      exec(`${nmcli} -w 10 device wifi connect '${ssid}' password '${password}'${interfaceStr}`, { env }, (error, resp, stderr) => {
        if (error) {
          throw error;
        } else if (stderr) {
          throw stderr;
        } else if (resp.includes('Error: ')) {
          throw resp.replace('Error: ', '');
        }
        resolve(resp);
      });
    } catch (error) {
      reject(error);
    }
  })
);

export default connectToWifi;
