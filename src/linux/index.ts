import { WifiWrapper } from 'node-wifi2';

import connectToWifi from './connect';
import disconnectFromWifi from './disconnect';
import deleteConnection from './delete';
import getCurrentConnections from './current-connections';
import scan from './scan';

export default {
  connectToWifi,
  disconnectFromWifi,
  deleteConnection,
  getCurrentConnections,
  scan,
} as WifiWrapper;
