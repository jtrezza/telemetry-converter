import { Buffer } from 'node:buffer';

interface F120Header {
  m_packetFormat?: number;
  m_gameMajorVersion?: number;
  m_gameMinorVersion?: number;
  m_packetVersion?: number;
  m_packetId?: number;
  m_sessionUID?: bigint;
  m_sessionTime?: number;
  m_frameIdentifier?: number;
  m_playerCarIndex?: number;
  m_secondaryPlayerCarIndex?: number;
}

interface CarTelemetryDataData {
  m_speed?: number;
  m_throttle?: number;
  m_steer?: number;
  m_brake?: number;
  m_clutch?: number;
  m_gear?: number;
  m_engineRPM?: number;
  m_drs?: number;
  m_revLightsPercent?: number;
  m_brakesTemperature?: number[];
  m_tyresSurfaceTemperature?: number[];
  m_tyresInnerTemperature?: number[];
  m_engineTemperature?: 110;
  m_tyresPressure?: number[];
  m_surfaceType?: number[];
}

interface CarTelemetryData {
  m_header?: F120Header;
  m_carTelemetryData?: CarTelemetryDataData[];
}

export function f120CarTelemetryDataSender(data: CarTelemetryData) {
  const buf1 = Buffer.allocUnsafe(1307);
  let offset = 0;

  // Header
  offset = buf1.writeUint16LE(data.m_header?.m_packetFormat ?? 2020, offset);
  offset = buf1.writeUint8(data.m_header?.m_gameMajorVersion ?? 1, offset);
  offset = buf1.writeUint8(data.m_header?.m_gameMinorVersion ?? 19, offset);
  offset = buf1.writeUint8(data.m_header?.m_packetVersion ?? 1, offset);
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
