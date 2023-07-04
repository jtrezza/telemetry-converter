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
  m_revLightsBitValue: number;
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
  m_worldPositionX: number; // World space X position
  m_worldPositionY: number; // World space Y position
  m_worldPositionZ: number; // World space Z position
  m_worldVelocityX: number; // Velocity in world space X
  m_worldVelocityY: number; // Velocity in world space Y
  m_worldVelocityZ: number; // Velocity in world space Z
  m_worldForwardDirX: number; // World space forward X direction (normalised)
  m_worldForwardDirY: number; // World space forward Y direction (normalised)
  m_worldForwardDirZ: number; // World space forward Z direction (normalised)
  m_worldRightDirX: number; // World space right X direction (normalised)
  m_worldRightDirY: number; // World space right Y direction (normalised)
  m_worldRightDirZ: number; // World space right Z direction (normalised)
  m_gForceLateral: number; // Lateral G-Force component
  m_gForceLongitudinal: number; // Longitudinal G-Force component
  m_gForceVertical: number; // Vertical G-Force component
  m_yaw: number; // Yaw angle in radians
  m_pitch: number; // Pitch angle in radians
  m_roll: number; // Roll angle in radians
}

export interface PacketMotionData {
  m_header: PacketHeader; // Header
  m_carMotionData: CarMotionData[]; // Data for all cars on track

  // Extra player car ONLY data
  m_suspensionPosition: number[]; // Note: All wheel arrays have the following order:
  m_suspensionVelocity: number[]; // RL, RR, FL, FR
  m_suspensionAcceleration: number[]; // RL, RR, FL, FR
  m_wheelSpeed: number[]; // Speed of each wheel
  m_wheelSlip: number[]; // Slip ratio for each wheel
  m_localVelocityX: number; // Velocity in local space
  m_localVelocityY: number; // Velocity in local space
  m_localVelocityZ: number; // Velocity in local space
  m_angularVelocityX: number; // Angular velocity x-component
  m_angularVelocityY: number; // Angular velocity y-component
  m_angularVelocityZ: number; // Angular velocity z-component
  m_angularAccelerationX: number; // Angular velocity x-component
  m_angularAccelerationY: number; // Angular velocity y-component
  m_angularAccelerationZ: number; // Angular velocity z-component
  m_frontWheelsAngle: number; // Current front wheels angle in radians
}

export interface MarshalZone {
  m_zoneStart: number;
  m_zoneFlag: number;
}

interface WeatherForecastSample {
  m_sessionType: number;
  m_timeOffset: number;
  m_weather: number;
  m_trackTemperature: number;
  m_trackTemperatureChange: number;
  m_airTemperature: number;
  m_airTemperatureChange: number;
  m_rainPercentage: number;
}

export interface PacketSessionData {
  m_header: PacketHeader;
  m_weather: number;
  m_trackTemperature: number;
  m_airTemperature: number;
  m_totalLaps: number;
  m_trackLength: number;
  m_sessionType: number;
  m_trackId: number;
  m_formula: number;
  m_sessionTimeLeft: number;
  m_sessionDuration: number;
  m_pitSpeedLimit: number;
  m_gamePaused: number;
  m_isSpectating: number;
  m_spectatorCarIndex: number;
  m_sliProNativeSupport: number;
  m_numMarshalZones: number;
  m_marshalZones: MarshalZone[];
  m_safetyCarStatus: number;
  m_networkGame: number;
  m_numWeatherForecastSamples: number;
  m_weatherForecastSamples: WeatherForecastSample[];
  m_forecastAccuracy: number;
  m_aiDifficulty: number;
  m_seasonLinkIdentifier: number;
  m_weekendLinkIdentifier: number;
  m_sessionLinkIdentifier: number;
  m_pitStopWindowIdealLap: number;
  m_pitStopWindowLatestLap: number;
  m_pitStopRejoinPosition: number;
  m_steeringAssist: number;
  m_brakingAssist: number;
  m_gearboxAssist: number;
  m_pitAssist: number;
  m_pitReleaseAssist: number;
  m_ERSAssist: number;
  m_DRSAssist: number;
  m_dynamicRacingLine: number;
  m_dynamicRacingLineType: number;
  m_gameMode: number;
  m_ruleSet: number;
  m_timeOfDay: number;
  m_sessionLength: number;
}

export interface LapData {
  m_lastLapTimeInMS: number; // uint32le
  m_currentLapTimeInMS: number; // uint32le
  m_sector1TimeInMS: number; // uint16le
  m_sector2TimeInMS: number; // uint16le
  m_lapDistance: number; // floatle
  m_totalDistance: number; // floatle
  m_safetyCarDelta: number; // floatle
  m_carPosition: number; // uint8
  m_currentLapNum: number; // uint8
  m_pitStatus: number; // uint8
  m_numPitStops: number; // uint8
  m_sector: number; // uint8
  m_currentLapInvalid: number; // uint8
  m_penalties: number; // uint8
  m_warnings: number; // uint8
  m_numUnservedDriveThroughPens: number; // uint8
  m_numUnservedStopGoPens: number; // uint8
  m_gridPosition: number; // uint8
  m_driverStatus: number; // uint8
  m_resultStatus: number; // uint8
  m_pitLaneTimerActive: number; // uint8
  m_pitLaneTimeInLaneInMS: number; // uint16le
  m_pitStopTimerInMS: number; // uint16le
  m_pitStopShouldServePen: number; // uint8
}

export interface PacketLapData {
  m_header: PacketHeader; // PacketHeader
  m_lapData: LapData[]; // LapData[22]
  m_timeTrialPBCarIdx: number; // uint8
  m_timeTrialRivalCarIdx: number; // uint8
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
  overallFastestInSession: number;
  driverFastestInSession: number;
}

export interface StartLIghts {
  numLights: number;
}

export interface StartLightsOutParser {
  numLights: number;
}

export interface DriveThroughPenaltyServed {
  vehicleIdx: number;
}

export interface StopGoPenaltyServed {
  vehicleIdx: number;
}

export interface Flashback {
  flashbackFrameIdentifier: number;
  flashbackSessionTime: number;
}

export interface Buttons {
  m_buttonStatus?: number;
  bit1?: number;
  bit2?: number;
  bit3?: number;
  bit4?: number;
  bit5?: number;
  bit6?: number;
  bit7?: number;
  bit8?: number;
  Right_Stick_Right?: number;
  Right_Stick_Up?: number;
  Right_Stick_Down?: number;
  Special?: number;
  bit13?: number;
  bit14?: number;
  bit15?: number;
  bit16?: number;
  Options_or_Menu?: number;
  L1_or_LB?: number;
  R1_or_RB?: number;
  L2_or_LT?: number;
  R2_or_RT?: number;
  Left_Stick_Click?: number;
  Right_Stick_Click?: number;
  Right_Stick_Left?: number;
  Cross_or_A?: number;
  Triangle_or_Y?: number;
  Circle_or_B?: number;
  Square_or_X?: number;
  D_Pad_Left?: number;
  D_Pad_Right?: number;
  D_Pad_Up?: number;
  D_Pad_Down?: number;
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
  StartLIghts?: StartLIghts;
  StartLightsOut?: StartLightsOutParser;
  DriveThroughPenaltyServed?: DriveThroughPenaltyServed;
  StopGoPenaltyServed?: StopGoPenaltyServed;
  Flashback?: Flashback;
  Buttons?: Buttons;
}

export interface ButtonFlags {
  bit1: number;
  bit2: number;
  bit3: number;
  bit4: number;
  bit5: number;
  bit6: number;
  bit7: number;
  bit8: number;
  Right_Stick_Right: number;
  Right_Stick_Up: number;
  Right_Stick_Down: number;
  Special: number;
  bit13: number;
  bit14: number;
  bit15: number;
  bit16: number;
  Options_or_Menu: number;
  L1_or_LB: number;
  R1_or_RB: number;
  L2_or_LT: number;
  R2_or_RT: number;
  Left_Stick_Click: number;
  Right_Stick_Click: number;
  Right_Stick_Left: number;
  Cross_or_A: number;
  Triangle_or_Y: number;
  Circle_or_B: number;
  Square_or_X: number;
  D_Pad_Left: number;
  D_Pad_Right: number;
  D_Pad_Up: number;
  D_Pad_Down: number;
}

export interface ParticipantData {
  m_aiControlled: number;
  m_driverId: number;
  m_networkId: number;
  m_teamId: number;
  m_myTeam: number;
  m_raceNumber: number;
  m_nationality: number;
  m_name: String;
  m_yourTelemetry: number;
}

interface CarSetupData {
  m_frontWing: number;
  m_rearWing: number;
  m_onThrottle: number;
  m_offThrottle: number;
  m_frontCamber: number;
  m_rearCamber: number;
  m_frontToe: number;
  m_rearToe: number;
  m_frontSuspension: number;
  m_rearSuspension: number;
  m_frontAntiRollBar: number;
  m_rearAntiRollBar: number;
  m_frontSuspensionHeight: number;
  m_rearSuspensionHeight: number;
  m_brakePressure: number;
  m_brakeBias: number;
  m_rearLeftTyrePressure: number;
  m_rearRightTyrePressure: number;
  m_frontLeftTyrePressure: number;
  m_frontRightTyrePressure: number;
  m_ballast: number;
  m_fuelLoad: number;
}

export interface PacketCarSetupData {
  m_header: PacketHeader;
  m_carSetups: CarSetupData[];
}

export interface CarStatusData {
  m_tractionControl: number;
  m_antiLockBrakes: number;
  m_fuelMix: number;
  m_frontBrakeBias: number;
  m_pitLimiterStatus: number;
  m_fuelInTank: number;
  m_fuelCapacity: number;
  m_fuelRemainingLaps: number;
  m_maxRPM: number;
  m_idleRPM: number;
  m_maxGears: number;
  m_drsAllowed: number;
  m_drsActivationDistance: number;
  m_actualTyreCompound: number;
  m_visualTyreCompound: number;
  m_tyresAgeLaps: number;
  m_vehicleFiaFlags: number;
  m_ersStoreEnergy: number;
  m_ersDeployMode: number;
  m_ersHarvestedThisLapMGUK: number;
  m_ersHarvestedThisLapMGUH: number;
  m_ersDeployedThisLap: number;
  m_networkPaused: number;
}

export interface PacketCarStatusData {
  m_header: PacketHeader;
  m_carStatusData: CarStatusData[];
}

interface FinalClassificationData {
  m_position: number;
  m_numLaps: number;
  m_gridPosition: number;
  m_points: number;
  m_numPitStops: number;
  m_resultStatus: number;
  m_bestLapTimeInMS: number;
  m_totalRaceTime: number;
  m_penaltiesTime: number;
  m_numPenalties: number;
  m_numTyreStints: number;
  m_tyreStintsActual: number[];
  m_tyreStintsVisual: number[];
  m_tyreStintsEndLaps: number[];
}

export interface PacketFinalClassificationData {
  m_header: PacketHeader;
  m_numCars: number;
  m_classificationData: FinalClassificationData[];
}

export interface LobbyInfoData {
  m_aiController: number;
  m_teamId: number;
  m_nationality: number;
  m_name: string;
  m_carNumber: number;
  m_readyStatus: number;
}

export interface PacketLobbyInfoData {
  m_header: PacketHeader;
  m_numPlayers: number;
  m_lobbyPlayers: LobbyInfoData[];
}

export interface PacketParticipantsData {
  m_header: PacketHeader;
  m_numActiveCars: number;
  m_participants: ParticipantData[];
}
