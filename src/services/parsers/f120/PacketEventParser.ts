import { Parser } from "binary-parser";
import PacketHeaderParser from "./PacketHeaderParser.js";
import { PacketEventData } from "./types.js";

export type EventCode = string;

export const EVENT_CODES: { [index: string]: EventCode } = {
  SessionStarted: "SSTA",
  SessionEnded: "SEND",
  FastestLap: "FTLP",
  Retirement: "RTMT",
  DRSEnabled: "DRSE",
  DRSDisabled: "DRSD",
  TeammateInPits: "TMPT",
  ChequeredFlag: "CHQF",
  RaceWinner: "RCWN",
  PenaltyIssued: "PENA",
  SpeedTrapTriggered: "SPTP",
};

export class FastestLapParser extends Parser {
  constructor() {
    super();
    this.endianess("little").uint8("vehicleIdx").floatle("lapTime");
  }
}

export class RetirementParser extends Parser {
  constructor() {
    super();
    this.endianess("little").uint8("vehicleIdx");
  }
}

export class TeamMateInPitsParser extends Parser {
  constructor() {
    super();
    this.endianess("little").uint8("vehicleIdx");
  }
}

export class RaceWinnerParser extends Parser {
  constructor() {
    super();
    this.endianess("little").uint8("vehicleIdx");
  }
}

export class PenaltyParser extends Parser {
  constructor() {
    super();

    this.endianess("little")
      .uint8("penaltyType")
      .uint8("infringementType")
      .uint8("vehicleIdx")
      .uint8("otherVehicleIdx")
      .uint8("time")
      .uint8("lapNum")
      .uint8("placesGained");
  }
}

export class SpeedTrapParser extends Parser {
  constructor() {
    super();
    this.endianess("little").uint8("vehicleIdx").floatle("speed");
  }
}

export default class PacketEventDataParser extends Parser {
  constructor() {
    super();
    this.endianess("little")
      .nest("m_header", {
        type: new PacketHeaderParser(),
      })
      .string("m_eventStringCode", { length: 4 });
  }

  parse = (buffer: Buffer) => {
    const eventStringCode = this.getEventStringCode(buffer);

    if (eventStringCode === EVENT_CODES.FastestLap) {
      this.nest("FastestLap", { type: new FastestLapParser() });
    } else if (eventStringCode === EVENT_CODES.Retirement) {
      this.nest("Retirement", { type: new RetirementParser() });
    } else if (eventStringCode === EVENT_CODES.TeammateInPits) {
      this.nest("TeamMateInPits", { type: new TeamMateInPitsParser() });
    } else if (eventStringCode === EVENT_CODES.RaceWinner) {
      this.nest("RaceWinner", { type: new RaceWinnerParser() });
    } else if (eventStringCode === EVENT_CODES.PenaltyIssued) {
      this.nest("Penalty", { type: new PenaltyParser() });
    } else if (eventStringCode === EVENT_CODES.SpeedTrapTriggered) {
      this.nest("SpeedTrap", { type: new SpeedTrapParser() });
    }

    return super.parse(buffer);
  };

  getEventStringCode = (buffer: Buffer) => {
    const headerParser = new Parser()
      .endianess("little")
      .nest("m_header", { type: new PacketHeaderParser() })
      .string("m_eventStringCode", { length: 4 });
    const { m_eventStringCode } = headerParser.parse(buffer);
    return m_eventStringCode;
  };
}
