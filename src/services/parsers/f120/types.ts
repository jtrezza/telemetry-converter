export interface PacketHeader {
  m_packetFormat: number;
  m_gameMajorVersion: number;
  m_gameMinorVersion: number;
  m_packetVersion: number;
  m_packetId: number;
  m_sessionUID: bigint;
  m_sessionTime: number;
  m_frameIdentifier: number;
  m_playerCarIndex: number;
  m_secondaryPlayerCarIndex: number;
}

export interface CarTelemetryData {
  m_speed: number;
  m_throttle: number;
  m_steer: number;
  m_brake: number;
  m_clutch: number;
  m_gear: number;
  m_engineRPM: number;
  m_drs: number;
  m_revLightsPercent: number;
  m_brakesTemperature: [number, number, number, number];
  m_tyresSurfaceTemperature: [number, number, number, number];
  m_tyresInnerTemperature: [number, number, number, number];
  m_engineTemperature: number;
  m_tyresPressure: [number, number, number, number];
  m_surfaceType: [number, number, number, number];
}

export interface PacketCarTelemetryData {
  m_header: PacketHeader;
  m_buttonStatus: number;
  m_carTelemetryData: CarTelemetryData[];
  m_mfdPanelIndex: number;
  m_mfdPanelIndexSecondaryPlayer: number;
  m_suggestedGear: number;
}

export interface CarMotionData {
  m_worldPositionX: number;
  m_worldPositionY: number;
  m_worldPositionZ: number;
  m_worldVelocityX: number;
  m_worldVelocityY: number;
  m_worldVelocityZ: number;
  m_worldForwardDirX: number;
  m_worldForwardDirY: number;
  m_worldForwardDirZ: number;
  m_worldRightDirX: number;
  m_worldRightDirY: number;
  m_worldRightDirZ: number;
  m_gForceLateral: number;
  m_gForceLongitudinal: number;
  m_gForceVertical: number;
  m_yaw: number; // radians
  m_pitch: number; // radians
  m_roll: number; // radians
}

export interface PacketMotionData {
  m_header: PacketHeader;
  m_carMotionData: CarMotionData[];

  // Extra player car ONLY data
  m_suspensionPosition: number[]; // Note: All wheel arrays have the following order:
  m_suspensionVelocity: number[]; // RL, RR, FL, FR
  m_suspensionAcceleration: number[]; // RL, RR, FL, FR
  m_wheelSpeed: number[];
  m_wheelSlip: number[];
  m_localVelocityX: number;
  m_localVelocityY: number;
  m_localVelocityZ: number;
  m_angularVelocityX: number;
  m_angularVelocityY: number;
  m_angularVelocityZ: number;
  m_angularAccelerationX: number;
  m_angularAccelerationY: number;
  m_angularAccelerationZ: number;
  m_frontWheelsAngle: number; // radians
}

export interface MarshalZone {
  m_zoneStart: number; // Fraction (0..1) of way through the lap the marshal zone starts
  m_zoneFlag: number; // -1 = invalid/unknown, 0 = none, 1 = green, 2 = blue, 3 = yellow, 4 = red
}

export interface WeatherForecastSample {
  m_sessionType: number; // 0 = unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short P, 5 = Q1
  // 6 = Q2, 7 = Q3, 8 = Short Q, 9 = OSQ, 10 = R, 11 = R2
  // 12 = Time Trial
  m_timeOffset: number; // Time in minutes the forecast is for
  m_weather: number; // Weather - 0 = clear, 1 = light cloud, 2 = overcast
  // 3 = light rain, 4 = heavy rain, 5 = storm
  m_trackTemperature: number; // Track temp. in degrees celsius
  m_airTemperature: number; // Air temp. in degrees celsius
}

export interface PacketSessionData {
  m_header: PacketHeader;
  m_weather: number; // Weather - 0 = clear, 1 = light cloud, 2 = overcast
  // 3 = light rain, 4 = heavy rain, 5 = storm
  m_trackTemperature: number; // Track temp. in degrees celsius
  m_airTemperature: number; // Air temp. in degrees celsius
  m_totalLaps: number; // Total number of laps in this race
  m_trackLength: number; // Track length in metres
  m_sessionType: number; // 0 = unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short P
  // 5 = Q1, 6 = Q2, 7 = Q3, 8 = Short Q, 9 = OSQ
  // 10 = R, 11 = R2, 12 = Time Trial
  m_trackId: number; // -1 for unknown, 0-21 for tracks, see appendix
  m_formula: number; // Formula, 0 = F1 Modern, 1 = F1 Classic, 2 = F2,
  // 3 = F1 Generic
  m_sessionTimeLeft: number; // Time left in session in seconds
  m_sessionDuration: number; // Session duration in seconds
  m_pitSpeedLimit: number; // Pit speed limit in kilometres per hour
  m_gamePaused: number; // Whether the game is paused
  m_isSpectating: number; // Whether the player is spectating
  m_spectatorCarIndex: number; // Index of the car being spectated
  m_sliProNativeSupport: number; // SLI Pro support, 0 = inactive, 1 = active
  m_numMarshalZones: number; // Number of marshal zones to follow
  m_marshalZones: MarshalZone[]; // List of marshal zones – max 21
  m_safetyCarStatus: number; // 0 = no safety car, 1 = full safety car
  // 2 = virtual safety car
  m_networkGame: number; // 0 = offline, 1 = online
  m_numWeatherForecastSamples: number; // Number of weather samples to follow
  m_weatherForecastSamples: WeatherForecastSample[]; // Array of weather forecast samples
}

export interface LapData {
  m_lastLapTime: number; // Last lap time in seconds
  m_currentLapTime: number; // Current time around the lap in seconds

  //UPDATED in Beta 3:
  m_sector1TimeInMS: number; // Sector 1 time in milliseconds
  m_sector2TimeInMS: number; // Sector 2 time in milliseconds
  m_bestLapTime: number; // Best lap time of the session in seconds
  m_bestLapNum: number; // Lap number best time achieved on
  m_bestLapSector1TimeInMS: number; // Sector 1 time of best lap in the session in milliseconds
  m_bestLapSector2TimeInMS: number; // Sector 2 time of best lap in the session in milliseconds
  m_bestLapSector3TimeInMS: number; // Sector 3 time of best lap in the session in milliseconds
  m_bestOverallSector1TimeInMS: number; // Best overall sector 1 time of the session in milliseconds
  m_bestOverallSector1LapNum: number; // Lap number best overall sector 1 time achieved on
  m_bestOverallSector2TimeInMS: number; // Best overall sector 2 time of the session in milliseconds
  m_bestOverallSector2LapNum: number; // Lap number best overall sector 2 time achieved on
  m_bestOverallSector3TimeInMS: number; // Best overall sector 3 time of the session in milliseconds
  m_bestOverallSector3LapNum: number; // Lap number best overall sector 3 time achieved on
  m_lapDistance: number; // Distance vehicle is around current lap in metres – could
  // be negative if line hasn’t been crossed yet
  m_totalDistance: number; // Total distance travelled in session in metres – could
  // be negative if line hasn’t been crossed yet
  m_safetyCarDelta: number; // Delta in seconds for safety car
  m_carPosition: number; // Car race position
  m_currentLapNum: number; // Current lap number
  m_pitStatus: number; // 0 = none, 1 = pitting, 2 = in pit area
  m_sector: number; // 0 = sector1, 1 = sector2, 2 = sector3
  m_currentLapInvalid: number; // Current lap invalid - 0 = valid, 1 = invalid
  m_penalties: number; // Accumulated time penalties in seconds to be added
  m_gridPosition: number; // Grid position the vehicle started the race in
  m_driverStatus: number; // Status of driver - 0 = in garage, 1 = flying lap
  // 2 = in lap, 3 = out lap, 4 = on track
  m_resultStatus: number; // Result status - 0 = invalid, 1 = inactive, 2 = active
  // 3 = finished, 4 = disqualified, 5 = not classified
  // 6 = retired
}

export interface PacketLapData {
  m_header: PacketHeader;
  m_lapData: LapData[];
}

export interface FastestLap {
  vehicleIdx: number;
  lapTime: number;
}

export interface Retirement {
  vehicleIdx: number;
}

export interface TeamMateInPits {
  vehicleIdx: number;
}

export interface RaceWinner {
  vehicleIdx: number;
}

export interface Penalty {
  penaltyType: number;
  infringementType: number;
  vehicleIdx: number;
  otherVehicleIdx: number;
  time: number;
  lapNum: number;
  placesGained: number;
}

export interface SpeedTrap {
  vehicleIdx: number;
  speed: number;
}
export interface PacketEventData {
  m_header: PacketHeader;
  m_eventStringCode: string;
  FastestLap?: FastestLap;
  Retirement?: Retirement;
  TeamMateInPits?: TeamMateInPits;
  RaceWinner?: RaceWinner;
  Penalty?: Penalty;
  SpeedTrap?: SpeedTrap;
}

export interface ParticipantData {
  m_aiControlled: number; // Whether the vehicle is AI (1) or Human (0) controlled
  m_driverId: number; // Driver id - see appendix
  m_teamId: number; // Team id - see appendix
  m_raceNumber: number; // Race number of the car
  m_nationality: number; // Nationality of the driver
  m_name: string; // Name of participant in UTF-8 format – null terminated
  // Will be truncated with … (U+2026) if too long
  m_yourTelemetry: number; // The player's UDP setting, 0 = restricted, 1 = public
}

export interface PacketParticipantsData {
  m_header: PacketHeader; // Header
  m_numActiveCars: number; // Number of active cars in the data – should match number of cars on HUD
  m_participants: ParticipantData[];
}

export interface CarSetupData {
  m_frontWing: number; // Front wing aero
  m_rearWing: number; // Rear wing aero
  m_onThrottle: number; // Differential adjustment on throttle (percentage)
  m_offThrottle: number; // Differential adjustment off throttle (percentage)
  m_frontCamber: number; // Front camber angle (suspension geometry)
  m_rearCamber: number; // Rear camber angle (suspension geometry)
  m_frontToe: number; // Front toe angle (suspension geometry)
  m_rearToe: number; // Rear toe angle (suspension geometry)
  m_frontSuspension: number; // Front suspension
  m_rearSuspension: number; // Rear suspension
  m_frontAntiRollBar: number; // Front anti-roll bar
  m_rearAntiRollBar: number; // Front anti-roll bar
  m_frontSuspensionHeight: number; // Front ride height
  m_rearSuspensionHeight: number; // Rear ride height
  m_brakePressure: number; // Brake pressure (percentage)
  m_brakeBias: number; // Brake bias (percentage)
  m_rearLeftTyrePressure: number; // Rear left tyre pressure (PSI)
  m_rearRightTyrePressure: number; // Rear right tyre pressure (PSI)
  m_frontLeftTyrePressure: number; // Front left tyre pressure (PSI)
  m_frontRightTyrePressure: number; // Front right tyre pressure (PSI)
  m_ballast: number; // Ballast
  m_fuelLoad: number; // Fuel load
}

export interface PacketCarSetupData {
  m_header: PacketHeader; // Header
  m_carSetups: CarSetupData[];
}

export interface CarStatusData {
  m_tractionControl: number; // 0 (off) - 2 (high)
  m_antiLockBrakes: number; // 0 (off) - 1 (on)
  m_fuelMix: number; // Fuel mix - 0 = lean, 1 = standard, 2 = rich, 3 = max
  m_frontBrakeBias: number; // Front brake bias (percentage)
  m_pitLimiterStatus: number; // Pit limiter status - 0 = off, 1 = on
  m_fuelInTank: number; // Current fuel mass
  m_fuelCapacity: number; // Fuel capacity
  m_fuelRemainingLaps: number; // Fuel remaining in terms of laps (value on MFD)
  m_maxRPM: number; // Cars max RPM, point of rev limiter
  m_idleRPM: number; // Cars idle RPM
  m_maxGears: number; // Maximum number of gears
  m_drsAllowed: number; // 0 = not allowed, 1 = allowed, -1 = unknown
  m_drsActivationDistance: number; // 0 = DRS not available, non-zero - DRS will be available
  // in [X] metres
  m_tyresWear: number[]; // Tyre wear percentage
  m_actualTyreCompound: number; // F1 Modern - 16 = C5, 17 = C4, 18 = C3, 19 = C2, 20 = C1
  // 7 = inter, 8 = wet
  // F1 Classic - 9 = dry, 10 = wet
  // F2 – 11 = super soft, 12 = soft, 13 = medium, 14 = hard
  // 15 = wet
  m_visualTyreCompound: number; // F1 visual (can be different from actual compound)
  // 16 = soft, 17 = medium, 18 = hard, 7 = inter, 8 = wet
  // F1 Classic – same as above
  // F2 – same as above
  m_tyresAgeLaps: number; // Age in laps of the current set of tyres
  m_tyresDamage: number[]; // Tyre damage (percentage)
  m_frontLeftWingDamage: number; // Front left wing damage (percentage)
  m_frontRightWingDamage: number; // Front right wing damage (percentage)
  m_rearWingDamage: number; // Rear wing damage (percentage)
  m_drsFault: number; // Indicator for DRS fault, 0 = OK, 1 = fault
  m_engineDamage: number; // Engine damage (percentage)
  m_gearBoxDamage: number; // Gear box damage (percentage)
  m_vehicleFiaFlags: number; // -1 = invalid/unknown, 0 = none, 1 = green
  // 2 = blue, 3 = yellow, 4 = red
  m_ersStoreEnergy: number; // ERS energy store in Joules
  m_ersDeployMode: number; // ERS deployment mode, 0 = none, 1 = medium
  // 2 = overtake, 3 = hotlap
  m_ersHarvestedThisLapMGUK: number; // ERS energy harvested this lap by MGU-K
  m_ersHarvestedThisLapMGUH: number; // ERS energy harvested this lap by MGU-H
  m_ersDeployedThisLap: number; // ERS energy deployed this lap
}

export interface PacketCarStatusData {
  m_header: PacketHeader; // Header
  m_carStatusData: CarStatusData[];
}

export interface FinalClassificationData {
  m_position: number; // Finishing position
  m_numLaps: number; // Number of laps completed
  m_gridPosition: number; // Grid position of the car
  m_points: number; // Number of points scored
  m_numPitStops: number; // Number of pit stops made
  m_resultStatus: number; // Result status - 0 = invalid, 1 = inactive, 2 = active
  // 3 = finished, 4 = disqualified, 5 = not classified
  // 6 = retired
  m_bestLapTime: number; // Best lap time of the session in seconds
  m_totalRaceTime: number; // Total race time in seconds without penalties
  m_penaltiesTime: number; // Total penalties accumulated in seconds
  m_numPenalties: number; // Number of penalties applied to this driver
  m_numTyreStints: number; // Number of tyres stints up to maximum
  m_tyreStintsActual: number[]; // Actual tyres used by this driver
  m_tyreStintsVisual: number[]; // Visual tyres used by this driver
}

export interface PacketFinalClassificationData {
  m_header: PacketHeader;
  m_numCars: number;
  m_classificationData: FinalClassificationData[];
}

export interface LobbyInfoData {
  m_aiControlled: number; // Whether the vehicle is AI (1) or Human (0) controlled
  m_teamId: number; // Team id - see appendix (255 if no team currently selected)
  m_nationality: number; // Nationality of the driver
  m_name: string; // Name of participant in UTF-8 format – null terminated
  // Will be truncated with ... (U+2026) if too long
  m_readyStatus: number; // 0 = not ready, 1 = ready, 2 = spectating
}

export interface PacketLobbyInfoData {
  m_header: PacketHeader;
  m_numPlayers: number;
  m_lobbyPlayers: LobbyInfoData[];
}

export enum packetID {
  Motion,
  Session,
  LapData,
  Event,
  Participants,
  CarSetups,
  CarTelemetry,
  CarStatus,
  FinalClassification,
  LobbyInfo,
}

export enum packetSize {
  Motion = 1464,
  Session = 251,
  LapData = 1190,
  Event = 35,
  Participants = 1213,
  CarSetups = 1102,
  CarTelemetry = 1307,
  CarStatus = 1344,
  FinalClassification = 839,
  LobbyInfo = 1169,
}
