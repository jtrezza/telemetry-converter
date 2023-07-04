import UDP from 'dgram';
import parseArgs from 'minimist';
import { propOr } from 'ramda';
import { f120Parser } from './services/f120-parser.js';
import { f123Parser } from './services/f123-parser.js';
import { packetSize as f120Sizes } from './services/parsers/f120/types.js';
import { packetSize as f123Sizes } from './services/parsers/f123/types.js';

const server = UDP.createSocket('udp4');

const argv = parseArgs(process.argv.slice(2));
const listenPort = propOr('20777', 'udp-port', argv);
const targetPort: number = parseInt(propOr(20888, 'target-port', argv), 10);
const sourceSim: string = propOr('f123', 'source-sim', argv);
const targetSim: string = propOr('f120', 'target-sim', argv);

console.log('args:', argv);

server.on('listening', () => {
  // Server address it’s using to listen

  const address = server.address();

  console.log('Listining to ', 'Address: ', address.address, 'Port: ', address.port);
});

const simsSizes = {
  f120: f120Sizes,
  f123: f123Sizes,
};

const simsParsers = {
  f120: f120Parser,
  f123: f123Parser,
};

server.on('message', (message, info) => {
  if (!(info.size in simsSizes[sourceSim])) {
    console.warn(`Package of size ${info.size} not identified from souce ${sourceSim}.`);
  } else {
    const responseBuffer = sourceSim in simsParsers ? simsParsers[sourceSim](message, info, targetSim) : false;
    if (responseBuffer) {
      server.setBroadcast;
      //server.send(new Uint8Array(responseBuffer), info.port, info.address, (err) => {
      server.send(new Uint8Array(responseBuffer), targetPort, '255.255.255.255', (err) => {
        if (err) {
          console.error('Failed to send response !!');
        } else {
          console.log('Response send Successfully to port', targetPort);
        }
      });
    }
  }
});

server.bind(listenPort, function () {
  server.setBroadcast(true);
});
