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
} from './parsers/f123/types.js';
import { PacketCarTelemetryParser, PacketCarStatusParser } from './parsers/f123/parsers.js';

type TargetSim = 'f120' | 'f121' | 'f122' | 'f123' | 'fm7';

export const f123Parser = (msg: ArrayBuffer, rinfo: RemoteInfo, targetSim: TargetSim = 'f120') => {
  const buffer = Buffer.from(msg);
  switch (rinfo.size) {
    /*case packetSize.Motion: {
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
    }*/
    case packetSize.CarTelemetry: {
      const parser = new PacketCarTelemetryParser();
      const data: PacketCarTelemetryData = parser.parse(buffer);
      if (targetSim === 'f123') {
        return data;
      }
      if (targetSim === 'f120') {
        return f120CarTelemetryDataSender({
          m_header: {
            m_packetFormat: data.m_header.m_packetFormat,
            m_gameMajorVersion: data.m_header.m_gameMajorVersion,
            m_gameMinorVersion: data.m_header.m_gameMinorVersion,
            m_packetVersion: data.m_header.m_packetVersion,
            m_packetId: data.m_header.m_packetId,
            m_sessionUID: data.m_header.m_sessionUID,
            m_sessionTime: data.m_header.m_sessionTime,
            m_frameIdentifier: data.m_header.m_frameIdentifier,
            m_playerCarIndex: data.m_header.m_playerCarIndex,
            m_secondaryPlayerCarIndex: data.m_header.m_secondaryPlayerCarIndex,
          },
          m_carTelemetryData: data.m_carTelemetryData.map((ctd, idx) => {
            return {
              m_speed: data.m_carTelemetryData[idx].m_speed,
              m_throttle: data.m_carTelemetryData[idx].m_throttle,
              m_steer: data.m_carTelemetryData[idx].m_steer,
              m_brake: data.m_carTelemetryData[idx].m_brake,
              m_clutch: data.m_carTelemetryData[idx].m_clutch,
              m_gear: data.m_carTelemetryData[idx].m_gear,
              m_engineRPM: data.m_carTelemetryData[idx].m_engineRPM,
              m_drs: data.m_carTelemetryData[idx].m_drs,
              m_revLightsPercent: data.m_carTelemetryData[idx].m_revLightsPercent,
              m_brakesTemperature: data.m_carTelemetryData[idx].m_brakesTemperature,
              m_tyresSurfaceTemperature: data.m_carTelemetryData[idx].m_tyresSurfaceTemperature,
              m_tyresInnerTemperature: data.m_carTelemetryData[idx].m_tyresInnerTemperature,
              m_engineTemperature: data.m_carTelemetryData[idx].m_engineTemperature,
              m_tyresPressure: data.m_carTelemetryData[idx].m_tyresPressure,
              m_surfaceType: data.m_carTelemetryData[idx].m_surfaceType,
            };
          }),
        });
      }
      break;
    }
    case packetSize.CarStatus: {
      console.log('before desaster 23');
      const parser = new PacketCarStatusParser();
      return parser.parse(buffer);
    }
    // case packetSize.FinalClassification: {
    //   const parser = new PacketFinalClassificationParser();
    //   return parser.parse(buffer);
    // }
    // case packetSize.LobbyInfo: {
    //   const parser = new PacketLobbyInfoParser();
    //   return parser.parse(buffer);
    // }
    default:
      break;
  }
};
