import { Parser } from 'binary-parser';
import PacketHeaderParser from './PacketHeaderParser.js';

export class CarDamageParser extends Parser {
  constructor() {
    super();
    this.array('m_tyresWear', {
      length: 4,
      type: new Parser().floatle(''),
    });
    this.array('m_tyresDamage', {
      length: 4,
      type: new Parser().uint8(''),
    });
    this.array('m_brakesDamage', {
      length: 4,
      type: new Parser().uint8(''),
    })
      .uint8('m_frontLeftWingDamage') // Front left wing damage (percentage)
      .uint8('m_frontRightWingDamage') // Front right wing damage (percentage)
      .uint8('m_rearWingDamage') // Rear wing damage (percentage)
      .uint8('m_floorDamage') // Floor damage (percentage)
      .uint8('m_diffuserDamage') // Diffuser damage (percentage)
      .uint8('m_sidepodDamage') // Sidepod damage (percentage)
      .uint8('m_drsFault') // Indicator for DRS fault, 0 = OK, 1 = fault
      .uint8('m_ersFault') // Indicator for ERS fault, 0 = OK, 1 = fault
      .uint8('m_gearBoxDamage') // Gear box damage (percentage)
      .uint8('m_engineDamage') // Engine damage (percentage)
      .uint8('m_engineMGUHWear') // Engine wear MGU-H (percentage)
      .uint8('m_engineESWear') // Engine wear ES (percentage)
      .uint8('m_engineCEWear') // Engine wear CE (percentage)
      .uint8('m_engineICEWear') // Engine wear ICE (percentage)
      .uint8('m_engineMGUKWear') // Engine wear MGU-K (percentage)
      .uint8('m_engineTCWear') // Engine wear TC (percentage)
      .uint8('m_engineBlown') // Engine blown, 0 = OK, 1 = fault
      .uint8('m_engineSeized'); // Engine seized, 0 = OK, 1 = fault
  }
}

export default class PacketCarDamageParser extends Parser {
  constructor() {
    super();
    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .array('m_carDamageData', {
        length: 22,
        type: new CarDamageParser(),
      });
  }
}
