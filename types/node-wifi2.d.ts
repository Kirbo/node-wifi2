export interface WifiWrapper {
  connectToWifi:          (config: WifiConfig, accessPoint: WifiAccessPointConnect) => Promise<string>;
  disconnectFromWifi:     (config: WifiConfig) => Promise<string>;
  deleteConnection:       (config: WifiConfig, accessPoint: WifiAccessPointDelete) => Promise<string>;
  getCurrentConnections:  (config: WifiConfig) => Promise<string>;
  scan:                   (config: WifiConfig) => Promise<string>;
}

export interface WifiConfig {
  debug?: boolean,
  iface?: string | null,
}

export interface WifiAccessPointConnect {
  ssid: string,
  password: string,
}

export interface WifiAccessPointDelete {
  ssid: string,
}
