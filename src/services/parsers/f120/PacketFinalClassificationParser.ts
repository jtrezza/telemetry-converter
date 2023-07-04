import { Parser } from "binary-parser";
import PacketHeaderParser from "./PacketHeaderParser.js";

export class FinalClassificationParser extends Parser {
  constructor() {
    super();
    this.uint8("m_position")
      .uint8("m_numLaps")
      .uint8("m_gridPosition")
      .uint8("m_points")
      .uint8("m_numPitStops")
      .uint8("m_resultStatus")

      .floatle("m_bestLapTime")
      .doublele("m_totalRaceTime")

      .uint8("m_penaltiesTime")
      .uint8("m_numPenalties")
      .uint8("m_numTyreStints")
      .array("m_tyreStintsActual", {
        length: 8,
        type: new Parser().uint8(""),
      })
      .array("m_tyreStintsVisual", {
        length: 8,
        type: new Parser().uint8(""),
      });
  }
}

export default class PacketFinalClassificationParser extends Parser {
  constructor() {
    super();
    this.endianess("little")
      .nest("m_header", {
        type: new PacketHeaderParser(),
      })
      .uint8("m_numCars")
      .array("m_classificationData", {
        length: 22,
        type: new FinalClassificationParser(),
      });
  }
}
