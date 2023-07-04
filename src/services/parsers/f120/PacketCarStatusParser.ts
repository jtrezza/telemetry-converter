import { Parser } from 'binary-parser';
import PacketHeaderParser from './PacketHeaderParser.js';

export class CarStatusParser extends Parser {
  constructor() {
    super();
    this.uint8('m_tractionControl') // 0 (off) - 2 (high)
      .uint8('m_antiLockBrakes') // 0 (off) - 1 (on)
      .uint8('m_fuelMix') // Fuel mix - 0 = lean, 1 = standard, 2 = rich, 3 = max
      .uint8('m_frontBrakeBias') // Front brake bias (percentage)
      .uint8('m_pitLimiterStatus') // Pit limiter status - 0 = off, 1 = on
      .floatle('m_fuelInTank') // Current fuel mass
      .floatle('m_fuelCapacity') // Fuel capacity
      .floatle('m_fuelRemainingLaps') // Fuel remaining in terms of laps (value on MFD)
      .uint16le('m_maxRPM') // Cars max RPM, point of rev limiter
      .uint16le('m_idleRPM') // Cars idle RPM
      .uint8('m_maxGears') // Maximum number of gears
      .uint8('m_drsAllowed') // 0 = not allowed, 1 = allowed, -1 = unknown

      // Added in Beta3:
      .uint16le('m_drsActivationDistance') // 0 = DRS not available, non-zero - DRS will be available
      // in [X] metres
      .array('m_tyresWear', {
        length: 4,
        type: new Parser().uint8(''),
      }) // Tyre wear percentage
      .uint8('m_actualTyreCompound') // F1 Modern - 16 = C5, 17 = C4, 18 = C3, 19 = C2, 20 = C1
      // 7 = inter, 8 = wet
      // F1 Classic - 9 = dry, 10 = wet
      // F2 – 11 = super soft, 12 = soft, 13 = medium, 14 = hard
      // 15 = wet
      .uint8('m_visualTyreCompound') // F1 visual (can be different from actual compound)
      // 16 = soft, 17 = medium, 18 = hard, 7 = inter, 8 = wet
      // F1 Classic – same as above
      // F2 – same as above
      .uint8('m_tyresAgeLaps') // Age in laps of the current set of tyres
      .array('m_tyresDamage', {
        length: 4,
        type: new Parser().uint8(''),
      }) // Tyre damage (percentage)
      .uint8('m_frontLeftWingDamage') // Front left wing damage (percentage)
      .uint8('m_frontRightWingDamage') // Front right wing damage (percentage)
      .uint8('m_rearWingDamage') // Rear wing damage (percentage)

      // Added Beta 3:
      .uint8('m_drsFault') // Indicator for DRS fault, 0 = OK, 1 = fault

      .uint8('m_engineDamage') // Engine damage (percentage)
      .uint8('m_gearBoxDamage') // Gear box damage (percentage)
      .int8('m_vehicleFiaFlags') // -1 = invalid/unknown, 0 = none, 1 = green
      // 2 = blue, 3 = yellow, 4 = red
      .floatle('m_ersStoreEnergy') // ERS energy store in Joules
      .uint8('m_ersDeployMode') // ERS deployment mode, 0 = none, 1 = medium
      // 2 = overtake, 3 = hotlap
      .floatle('m_ersHarvestedThisLapMGUK') // ERS energy harvested this lap by MGU-K
      .floatle('m_ersHarvestedThisLapMGUH'); // ERS energy harvested this lap by MGU-H
    //.floatle('m_ersDeployedThisLap'); // ERS energy deployed this lap
  }
}

export default class PacketCarStatusParser extends Parser {
  constructor() {
    super();
    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .array('m_carStatusData', {
        length: 22,
        type: new CarStatusParser(),
      });
  }
}
