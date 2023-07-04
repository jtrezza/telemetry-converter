import UDP from 'dgram';
import parseArgs from 'minimist';
import { propOr } from 'ramda';
import { f120Parser } from './services/f120-parser.js';
import { Buffer } from 'node:buffer';
import { packetSize, PacketCarTelemetryData } from './services/parsers/f120/types.js';

const server = UDP.createSocket('udp4');

const argv = parseArgs(process.argv.slice(2));
const udpPort = propOr('20888', 'udp-port', argv);

console.log('hey', argv);

server.on('listening', () => {
  // Server address it’s using to listen

  const address = server.address();

  console.log('Listining to ', 'Address: ', address.address, 'Port: ', address.port);
});

server.on('message', (message, info) => {
  //console.log('Message', info.size);

  if (!(info.size in packetSize)) {
    console.log(info.size);
  } else {
    const responseBuffer = f120Parser(message, info, 'f120');
    if (responseBuffer) {
      server.setBroadcast;
      //server.send(new Uint8Array(responseBuffer), info.port, info.address, (err) => {
      server.send(new Uint8Array(responseBuffer), 20777, '255.255.255.255', (err) => {
        if (err) {
          console.error('Failed to send response !!');
        } else {
          console.log('Response send Successfully to port', info.port);
        }
      });
    }
  }
});

server.bind(udpPort, function () {
  server.setBroadcast(true);
});
