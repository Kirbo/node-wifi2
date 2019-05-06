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
