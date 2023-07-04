import { Buffer } from 'node:buffer';

import {
  packetSize,
  PacketHeader,
  CarTelemetryData,
  PacketMotionData,
  PacketSessionData,
  PacketLapData,
  PacketEventData,
  PacketParticipantsData,
  PacketCarSetupData,
  PacketCarStatusData,
  PacketFinalClassificationData,
  PacketLobbyInfoData,
} from './parsers/f120/types.js';

interface PacketCarTelemetryData {
  m_header?: PacketHeader;
  m_carTelemetryData?: CarTelemetryData[];
}

export function f120CarTelemetryDataSender(data: PacketCarTelemetryData) {
  const buf1 = Buffer.allocUnsafe(1307);
  let offset = 0;
  //console.log('sending', data);
  // Header
  offset = buf1.writeUint16LE(2020, offset);
  offset = buf1.writeUint8(1, offset);
  offset = buf1.writeUint8(19, offset);
  offset = buf1.writeUint8(1, offset);
  offset = buf1.writeUint8(data.m_header?.m_packetId ?? 6, offset);
  offset = buf1.writeBigUInt64LE(data.m_header?.m_sessionUID ?? 6444400806942569751n, offset);
  offset = buf1.writeFloatLE(data.m_header?.m_sessionTime ?? 226.80303955078125, offset);
  offset = buf1.writeUInt32LE(data.m_header?.m_frameIdentifier ?? 1111, offset);
  offset = buf1.writeUint8(data.m_header?.m_playerCarIndex ?? 0, offset);
  offset = buf1.writeUint8(data.m_header?.m_secondaryPlayerCarIndex ?? 255, offset);

  // Body
  if (data.m_carTelemetryData && data.m_carTelemetryData.length > 0) {
    for (let i = 0; i < data.m_carTelemetryData.length; i++) {
      offset = buf1.writeUint16LE(data.m_carTelemetryData[i].m_speed ?? 0, offset);
      offset = buf1.writeFloatLE(data.m_carTelemetryData[i].m_throttle ?? 0, offset);
      offset = buf1.writeFloatLE(data.m_carTelemetryData[i].m_steer ?? 0, offset);
      offset = buf1.writeFloatLE(data.m_carTelemetryData[i].m_brake ?? 0, offset);
      offset = buf1.writeUint8(data.m_carTelemetryData[i].m_clutch ?? 0, offset);
      offset = buf1.writeInt8(data.m_carTelemetryData[i].m_gear ?? 0, offset);
      offset = buf1.writeUint16LE(data.m_carTelemetryData[i].m_engineRPM ?? 0, offset);
      offset = buf1.writeUint8(data.m_carTelemetryData[i].m_drs ?? 0, offset);
      offset = buf1.writeUint8(data.m_carTelemetryData[i].m_revLightsPercent ?? 0, offset);

      for (let j = 0; j < 4; j++) {
        offset = buf1.writeUint16LE(data.m_carTelemetryData[i].m_brakesTemperature[j] ?? 0, offset);
      }
      for (let j = 0; j < 4; j++) {
        offset = buf1.writeUint8(data.m_carTelemetryData[i].m_tyresSurfaceTemperature[j] ?? 0, offset);
      }
      for (let j = 0; j < 4; j++) {
        offset = buf1.writeUint8(data.m_carTelemetryData[i].m_tyresInnerTemperature[j] ?? 0, offset);
      }
      offset = buf1.writeUint16LE(data.m_carTelemetryData[i].m_engineTemperature ?? 0, offset);
      for (let j = 0; j < 4; j++) {
        offset = buf1.writeFloatLE(data.m_carTelemetryData[i].m_tyresPressure[j] ?? 0, offset);
      }
      for (let j = 0; j < 4; j++) {
        offset = buf1.writeUint8(data.m_carTelemetryData[i].m_surfaceType[j] ?? 0, offset);
      }
    }
  }
  return buf1;
}
