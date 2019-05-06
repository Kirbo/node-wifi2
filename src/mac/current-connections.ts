import { WifiConfig } from 'node-wifi2';
import { exec } from 'child_process';

import { normalizeBssid } from '../helpers';
import networkUtils from '../network-utils';
import env from '../env';

import { airport } from './_constants';

const parseAirport = (stdout: string) => {
  const lines = stdout.split('\n');

  const connections = [] as object[];
  let connection = {} as {
    [key: string]: number | string | [],
  };
  lines.forEach((line: string) => {
    if (line.match(/[ ]*agrCtlRSSI: (.*)/)) {
      connection.signal_level = parseInt(line.match(/[ ]*agrCtlRSSI: (.*)/)[1], 10);
      connection.quality = networkUtils.qualityFromDB(line.match(/[ ]*agrCtlRSSI: (.*)/)[1]);
    } else if (line.match(/[ ]*BSSID: ([a-zA-Z0-1:]*)/)) {
      const bssid = line.match(/[ ]*BSSID: ([0-9A-Fa-f:]*)/)[1];
      connection.mac = normalizeBssid(bssid);
      connection.bssid = normalizeBssid(bssid);
    } else if (line.match(/[ ]*SSID: (.*)/)) {
      connection.ssid = line.match(/[ ]*SSID: (.*)/)[1];
    } else if (line.match(/[ ]*link auth: (.*)/)) {
      connection.security = line.match(/[ ]*link auth: (.*)/)[1];
      connection.security_flags = [];
    } else if (line.match(/[ ]*channel: (.*)/)) {
      connection.channels = parseInt(line.match(/[ ]*channel: (.*)/)[1].split(',')[0], 10);
      connection.frequency = parseInt(networkUtils.frequencyFromChannel(line.match(/[ ]*channel: (.*)/)[1].split(',')[0]), 10);
      connections.push(connection);
      connection = {};
    }
  });

  return connections;
};

const getCurrentConnections = (config: WifiConfig) => (
  new Promise(async (resolve, reject) => {
    try {
      exec(`${airport} -I`, { env }, (error, results) => {
        if (error) {
          throw error;
        }
        resolve(parseAirport(results));
      });
    } catch (error) {
      reject(error);
    }
  })
);

export default getCurrentConnections;
