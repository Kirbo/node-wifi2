import { WifiConfig } from 'node-wifi2';
import { exec } from 'child_process';

import { normalizeBssid } from '../helpers';
import networkUtils from '../network-utils';
import env from '../env';

import { nmcli } from './_constants';

export const parse = (config: WifiConfig, scanResults: any) => {
  const lines = scanResults.split('\n');

  if (config.iface) {
    lines.shift();
  }

  const networks = [];
  for (const line of lines) {
    if (line !== '') {
      const fields = line.replace(/\\\:/g, '&&').split(':');
      if (fields.length >= 9) {
        networks.push({
          ssid: fields[1].replace(/\&\&/g, ':'),
          bssid: normalizeBssid(fields[2].replace(/\&\&/g, ':')),
          mac: normalizeBssid(fields[2].replace(/\&\&/g, ':')), // for retrocompatibility with version 1.x
          mode: fields[3].replace(/\&\&/g, ':'),
          channel: parseInt(fields[4].replace(/\&\&/g, ':'), 10),
          frequency: parseInt(fields[5].replace(/\&\&/g, ':'), 10),
          signal_level: networkUtils.dBFromQuality(fields[6].replace(/\&\&/g, ':')),
          quality: parseFloat(fields[6].replace(/\&\&/g, ':')),
          security: fields[7].replace(/\&\&/g, ':') !== '(none)' ? fields[7].replace(/\&\&/g, ':') : 'none',
          security_flags: {
            wpa: fields[8].replace(/\&\&/g, ':'),
            rsn: fields[9].replace(/\&\&/g, ':'),
          },
        });
      }
    }
  }

  return networks;
};

const scan = (config: WifiConfig) => (
  new Promise(async (resolve, reject) => {
    try {
      let interfaceStr = '';

      if (config.iface) {
        const iface = config.iface.toString();
        interfaceStr = ` ifname '${iface}'`;
      }

      // tslint:disable-next-line:max-line-length
      const command = `${nmcli} nmcli --terse --fields active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags device wifi list${interfaceStr}`;

      exec(command, { env }, (error, results) => {
        if (error) {
          throw error;
        }

        resolve(parse(config, results));
      });
    } catch (error) {
      reject(error);
    }
  })
);

export default scan;
