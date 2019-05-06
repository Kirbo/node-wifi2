const channels = {} as {
  [key: string]: string,
};

// cf [wlan channels frequency](https://en.wikipedia.org/wiki/List_of_WLAN_channels)

let frequency = 2412;

for (let i = 1; i < 15; i++) {
  channels[i] = `${frequency}`;
  frequency += 5;
}

frequency = 5180;

for (let i = 36; i <= 64; i += 2) {
  channels[i] = `${frequency}`;
  frequency += 10;
}

frequency = 5500;

for (let i = 100; i <= 144; i += 2) {
  channels[i] = `${frequency}`;
  frequency += 10;
}

frequency = 5745;

for (let i = 149; i <= 161; i += 2) {
  channels[i] = `${frequency}`;
  frequency += 10;
}

frequency = 5825;

for (let i = 165; i <= 173; i += 4) {
  channels[i] = `${frequency}`;
  frequency += 20;
}


export const frequencyFromChannel = (channelId: string) => (
  channels[parseInt(channelId, 10)]
);

export const dBFromQuality = (quality: string) => (
  (parseFloat(quality) / 2 - 100)
);

export const qualityFromDB = (db: string) => (
  2 * (parseFloat(db) + 100)
);

export const normalizeBssid = (bssid: string = '0:0:0:0:0:0') => (
  bssid
    .trim()
    .split(':')
    .map((notation) => (
      notation.length < 2
        ? `0${notation}`
        : notation
    ))
    .join(':')
    .toUpperCase()
);


export default {
  frequencyFromChannel,
  dBFromQuality,
  qualityFromDB,
  normalizeBssid,
};
