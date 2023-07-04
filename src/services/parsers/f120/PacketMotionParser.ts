import { Parser } from "binary-parser";
import PacketHeaderParser from "./PacketHeaderParser.js";

export class MotionParser extends Parser {
  constructor() {
    super();
    this.floatle("m_worldPositionX")
      .floatle("m_worldPositionY")
      .floatle("m_worldPositionZ")
      .floatle("m_worldVelocityX")
      .floatle("m_worldVelocityY")
      .floatle("m_worldVelocityZ")
      .int16le("m_worldForwardDirX")
      .int16le("m_worldForwardDirY")
      .int16le("m_worldForwardDirZ")
      .int16le("m_worldRightDirX")
      .int16le("m_worldRightDirY")
      .int16le("m_worldRightDirZ")
      .floatle("m_gForceLateral")
      .floatle("m_gForceLongitudinal")
      .floatle("m_gForceVertical")
      .floatle("m_yaw")
      .floatle("m_pitch")
      .floatle("m_roll");
  }
}

export default class PacketMotionParser extends Parser {
  constructor() {
    super();
    this.endianess("little")
      .nest("m_header", {
        type: new PacketHeaderParser(),
      })
      .array("m_carMotionData", {
        length: 22,
        type: new MotionParser(),
      })
      .array("m_suspensionPosition", { type: "floatle", length: 4 })
      .array("m_suspensionVelocity", { type: "floatle", length: 4 })
      .array("m_suspensionAcceleration", { type: "floatle", length: 4 })
      .array("m_wheelSpeed", { type: "floatle", length: 4 })
      .array("m_wheelSlip", { type: "floatle", length: 4 })
      .floatle("m_localVelocityX")
      .floatle("m_localVelocityY")
      .floatle("m_localVelocityZ")
      .floatle("m_angularVelocityX")
      .floatle("m_angularVelocityY")
      .floatle("m_angularVelocityZ")
      .floatle("m_angularAccelerationX")
      .floatle("m_angularAccelerationY")
      .floatle("m_angularAccelerationZ")
      .floatle("m_frontWheelsAngle");
  }
}
