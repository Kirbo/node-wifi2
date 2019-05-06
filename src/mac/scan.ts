import { WifiConfig } from 'node-wifi2';
import { exec } from 'child_process';

import { dBFromQuality, frequencyFromChannel, normalizeBssid } from '../network-utils';
import env from '../env';

import { airport } from './_constants';

export const parseAirport = (terms: any, str: any) => {
  const lines = str.split('\n');
  const colMac = lines[0].indexOf(terms.BSSID);
  const colRssi = lines[0].indexOf(terms.RSSI);
  const colChannel = lines[0].indexOf(terms.CHANNEL);
  const colHt = lines[0].indexOf(terms.HT);
  const colSec = lines[0].indexOf(terms.SECURITY);

  const wifis = [];
  for (let i = 1, l = lines.length; i < l; i++) {
    const bssid = normalizeBssid(lines[i].substr(colMac, colRssi - colMac));
    let securityFlags = lines[i].substr(colSec).trim();
    let security = 'none';
    if (securityFlags !== 'NONE') {
      security = securityFlags.replace(/\(.*?\)/g, '');
      securityFlags = securityFlags.match(/\((.*?)\)/g);
    } else {
      security = 'none';
      securityFlags = [];
    }
    wifis.push({
      mac: bssid,
      bssid,
      ssid: lines[i].substr(0, colMac).trim(),
      channel: parseInt(lines[i].substr(colChannel, colHt - colChannel), 10),
      frequency: parseInt(frequencyFromChannel(lines[i].substr(colChannel, colHt - colChannel).trim()), 10),
      signal_level: lines[i].substr(colRssi, colChannel - colRssi).trim(),
      quality: dBFromQuality(lines[i].substr(colRssi, colChannel - colRssi).trim()),
      security,
      security_flags: securityFlags,
    });
  }
  wifis.pop();
  return wifis;
};

const scan = (config: WifiConfig) => (
  new Promise(async (resolve, reject) => {
    try {
      exec(`${airport} -s`, { env }, (error, results) => {
        if (error) {
          throw error;
        }

        const terms = {
          BSSID: 'BSSID',
          RSSI: 'RSSI',
          CHANNEL: 'CHANNEL',
          HT: 'HT',
          SECURITY: 'SECURITY',
          CC: 'CC',
        };
        resolve(parseAirport(terms, results));
      });
    } catch (error) {
      reject(error);
    }
  })
);

export default scan;
