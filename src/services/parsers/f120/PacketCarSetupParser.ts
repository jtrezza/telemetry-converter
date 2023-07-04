import { Parser } from "binary-parser";
import PacketHeaderParser from "./PacketHeaderParser.js";

export class CarSetupParser extends Parser {
  constructor() {
    super();
    this.uint8("m_frontWing") // Front wing aero
      .uint8("m_rearWing") // Rear wing aero
      .uint8("m_onThrottle") // Differential adjustment on throttle (percentage)
      .uint8("m_offThrottle") // Differential adjustment off throttle (percentage)
      .floatle("m_frontCamber") // Front camber angle (suspension geometry)
      .floatle("m_rearCamber") // Rear camber angle (suspension geometry)
      .floatle("m_frontToe") // Front toe angle (suspension geometry)
      .floatle("m_rearToe") // Rear toe angle (suspension geometry)
      .uint8("m_frontSuspension") // Front suspension
      .uint8("m_rearSuspension") // Rear suspension
      .uint8("m_frontAntiRollBar") // Front anti-roll bar
      .uint8("m_rearAntiRollBar") // Front anti-roll bar
      .uint8("m_frontSuspensionHeight") // Front ride height
      .uint8("m_rearSuspensionHeight") // Rear ride height
      .uint8("m_brakePressure") // Brake pressure (percentage)
      .uint8("m_brakeBias") // Brake bias (percentage)
      .floatle("m_rearLeftTyrePressure") // Rear left tyre pressure (PSI)
      .floatle("m_rearRightTyrePressure") // Rear right tyre pressure (PSI)
      .floatle("m_frontLeftTyrePressure") // Front left tyre pressure (PSI)
      .floatle("m_frontRightTyrePressure") // Front right tyre pressure (PSI)
      .uint8("m_ballast") // Ballast
      .floatle("m_fuelLoad"); // Fuel load
  }
}

export default class PacketCarSetupsParser extends Parser {
  constructor() {
    super();
    this.endianess("little")
      .nest("m_header", {
        type: new PacketHeaderParser(),
      })
      .array("m_carSetups", {
        length: 22,
        type: new CarSetupParser(),
      });
  }
}
