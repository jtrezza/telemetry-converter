import { RemoteInfo } from 'dgram';
import { f120CarTelemetryDataSender } from './f120-sender.js';
import {
  packetSize,
  PacketMotionData,
  PacketSessionData,
  PacketLapData,
  PacketEventData,
  PacketParticipantsData,
  PacketCarSetupData,
  PacketCarTelemetryData,
  PacketCarStatusData,
  PacketFinalClassificationData,
  PacketLobbyInfoData,
} from './parsers/f120/types.js';
import {
  PacketMotionParser,
  PacketSessionParser,
  PacketLapParser,
  PacketEventParser,
  PacketParticipantsParser,
  PacketCarSetupParser,
  PacketCarTelemetryParser,
  PacketCarStatusParser,
  PacketFinalClassificationParser,
  PacketLobbyInfoParser,
} from './parsers/f120/parsers.js';

type SendTo = 'f120' | 'f121' | 'f122' | 'f123' | 'fm7';

export const f120Parser = (msg: ArrayBuffer, rinfo: RemoteInfo, sendTo: SendTo = 'f120') => {
  const buffer = Buffer.from(msg);
  switch (rinfo.size) {
    case packetSize.Motion: {
      const parser = new PacketMotionParser();
      return parser.parse(buffer);
    }
    case packetSize.Session: {
      const parser = new PacketSessionParser();
      return parser.parse(buffer);
    }
    case packetSize.LapData: {
      const parser = new PacketLapParser();
      return parser.parse(buffer);
    }
    case packetSize.Event: {
      const parser = new PacketEventParser();
      return parser.parse(buffer);
    }
    case packetSize.Participants: {
      const parser = new PacketParticipantsParser();
      return parser.parse(buffer);
    }
    case packetSize.CarSetups: {
      const parser = new PacketCarSetupParser();
      return parser.parse(buffer);
    }
    case packetSize.CarTelemetry: {
      const parser = new PacketCarTelemetryParser();
      const data = parser.parse(buffer);
      return f120CarTelemetryDataSender(data);
    }
    case packetSize.CarStatus: {
      console.log('before desaster');
      const parser = new PacketCarStatusParser();
      return parser.parse(buffer);
    }
    case packetSize.FinalClassification: {
      const parser = new PacketFinalClassificationParser();
      return parser.parse(buffer);
    }
    case packetSize.LobbyInfo: {
      const parser = new PacketLobbyInfoParser();
      return parser.parse(buffer);
    }
    default:
      break;
  }
};
