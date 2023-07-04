import { Parser } from "binary-parser";
import PacketHeaderParser from "./PacketHeaderParser.js";

export class LobbyInfoParser extends Parser {
  constructor() {
    super();
    this.uint8("m_aiControlled")
      .uint8("m_teamId")
      .uint8("m_nationality")
      .string("m_name", {
        length: 48,
        stripNull: true,
      })
      .uint8("m_readyStatus");
  }
}

export default class PacketLobbyInfoParser extends Parser {
  constructor() {
    super();
    this.endianess("little")
      .nest("m_header", {
        type: new PacketHeaderParser(),
      })
      .uint8("m_numPlayers")
      .array("m_lobbyPlayers", {
        length: 22,
        type: new LobbyInfoParser(),
      });
  }
}
