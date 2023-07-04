import { Parser } from "binary-parser";
import PacketHeaderParser from "./PacketHeaderParser.js";

export class ParticipantParser extends Parser {
  constructor() {
    super();
    this.uint8("m_aiControlled") // Whether the vehicle is AI (1) or Human (0) controlled
      .uint8("m_driverId") // Driver id - see appendix
      .uint8("m_teamId") // Team id - see appendix
      .uint8("m_raceNumber") // Race number of the car
      .uint8("m_nationality") // Nationality of the driver
      .string("m_name", { length: 48, stripNull: true })
      .uint8("m_yourTelemetry"); // The player's UDP setting, 0 = restricted, 1 = public
  }
}

export default class PacketParticipantsParser extends Parser {
  constructor() {
    super();
    this.endianess("little")
      .nest("m_header", {
        type: new PacketHeaderParser(),
      })
      .uint8("m_numActiveCars")
      .array("m_participants", { type: new ParticipantParser(), length: 22 });
  }
}
