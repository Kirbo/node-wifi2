import wifi from './src/wifi';

wifi.init();

const start = async () => {
  // const scan = await wifi.scan();
  // console.log('scan', scan);
  // const currentConnections = await wifi.getCurrentConnections();
  // console.log('currentConnections', currentConnections);
  // console.log('connecting...');
  // await wifi.connect({ ssid: 'Pingu', password: 'hulabaloobalai' });
  // console.log('connected.');
  // console.log('sleeping 5 seconds');
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // console.log('disconnecting...');
  // await wifi.disconnect();
  // console.log('disconnected.');
  // console.log('sleeping 5 seconds');
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // console.log('connecting...');
  // await wifi.connect({ ssid: 'Pingu', password: 'hulabaloobalai' });
  // console.log('connected.');
};

start();
