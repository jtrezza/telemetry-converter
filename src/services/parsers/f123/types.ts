export interface PacketHeader {
  m_packetFormat?: number; // 2023
  m_gameYear?: number; // Game year - last two digits e.g. 23
  m_gameMajorVersion?: number; // Game major version - "X.00"
  m_gameMinorVersion?: number; // Game minor version - "1.XX"
  m_packetVersion?: number; // Version of this packet type, all start from 1
  m_packetId?: number; // Identifier for the packet type, see below
  m_sessionUID?: bigint; // Unique identifier for the session
  m_sessionTime?: number; // Session timestamp
  m_frameIdentifier?: number; // Identifier for the frame the data was retrieved on
  m_overallFrameIdentifier?: number; // Overall identifier for the frame the data was retrieved
  // on, doesn't go back after flashbacks
  m_playerCarIndex?: number; // Index of player's car in the array
  m_secondaryPlayerCarIndex?: number; // Index of secondary player's car in the array (splitscreen)
  // 255 if no second player
}

export interface CarTelemetryData {
  m_speed?: number;
  m_throttle?: number;
  m_steer?: number;
  m_brake?: number;
  m_clutch?: number;
  m_gear?: number;
  m_engineRPM?: number;
  m_drs?: number;
  m_revLightsPercent?: number;
  m_revLightsBitValue?: number;
  m_brakesTemperature?: [number, number, number, number];
  m_tyresSurfaceTemperature?: [number, number, number, number];
  m_tyresInnerTemperature?: [number, number, number, number];
  m_engineTemperature?: number;
  m_tyresPressure?: [number, number, number, number];
  m_surfaceType?: [number, number, number, number];
}

export interface PacketCarTelemetryData {
  m_header: PacketHeader;
  m_carTelemetryData: CarTelemetryData[];
  m_mfdPanelIndex: number;
  m_mfdPanelIndexSecondaryPlayer: number;
  m_suggestedGear: number;
}

export interface CarMotionData {
  m_worldPositionX?: number;
  m_worldPositionY?: number;
  m_worldPositionZ?: number;
  m_worldVelocityX?: number;
  m_worldVelocityY?: number;
  m_worldVelocityZ?: number;
  m_worldForwardDirX?: number;
  m_worldForwardDirY?: number;
  m_worldForwardDirZ?: number;
  m_worldRightDirX?: number;
  m_worldRightDirY?: number;
  m_worldRightDirZ?: number;
  m_gForceLateral?: number;
  m_gForceLongitudinal?: number;
  m_gForceVertical?: number;
  m_yaw?: number; // radians
  m_pitch?: number; // radians
  m_roll?: number; // radians
}

export interface PacketMotionData {
  m_header: PacketHeader;
  m_carMotionData: CarMotionData[];
}

export interface MarshalZone {
  m_zoneStart?: number; // Fraction (0..1) of way through the lap the marshal zone starts
  m_zoneFlag?: number; // -1 = invalid/unknown, 0 = none, 1 = green, 2 = blue, 3 = yellow, 4 = red
}

export interface WeatherForecastSample {
  m_sessionType?: number; // 0 = unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short P, 5 = Q1
  // 6 = Q2, 7 = Q3, 8 = Short Q, 9 = OSQ, 10 = R, 11 = R2
  // 12 = Time Trial
  m_timeOffset?: number; // Time in minutes the forecast is for
  m_weather?: number; // Weather - 0 = clear, 1 = light cloud, 2 = overcast
  // 3 = light rain, 4 = heavy rain, 5 = storm
  m_trackTemperature?: number; // Track temp. in degrees celsius
  m_trackTemperatureChange?: number; // Track temp. change – 0 = up, 1 = down, 2 = no change
  m_airTemperature?: number; // Air temp. in degrees celsius
  m_airTemperatureChange?: number; // Air temp. change – 0 = up, 1 = down, 2 = no change
  m_rainPercentage?: number; // Rain percentage (0-100)
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
  m_forecastAccuracy?: number; // 0 = Perfect, 1 = Approximate
  m_aiDifficulty?: number; // AI Difficulty rating – 0-110
  m_seasonLinkIdentifier?: number; // Identifier for season - persists across saves
  m_weekendLinkIdentifier?: number; // Identifier for weekend - persists across saves
  m_sessionLinkIdentifier?: number; // Identifier for session - persists across saves
  m_pitStopWindowIdealLap?: number; // Ideal lap to pit on for current strategy (player)
  m_pitStopWindowLatestLap?: number; // Latest lap to pit on for current strategy (player)
  m_pitStopRejoinPosition?: number; // Predicted position to rejoin at (player)
  m_steeringAssist?: number; // 0 = off, 1 = on
  m_brakingAssist?: number; // 0 = off, 1 = low, 2 = medium, 3 = high
  m_gearboxAssist?: number; // 1 = manual, 2 = manual & suggested gear, 3 = auto
  m_pitAssist?: number; // 0 = off, 1 = on
  m_pitReleaseAssist?: number; // 0 = off, 1 = on
  m_ERSAssist?: number; // 0 = off, 1 = on
  m_DRSAssist?: number; // 0 = off, 1 = on
  m_dynamicRacingLine?: number; // 0 = off, 1 = corners only, 2 = full
  m_dynamicRacingLineType?: number; // 0 = 2D, 1 = 3D
  m_gameMode?: number; // Game mode id - see appendix
  m_ruleSet?: number; // Ruleset - see appendix
  m_timeOfDay?: number; // Local time of day - minutes since midnight
  m_sessionLength?: number; // 0 = None, 2 = Very Short, 3 = Short, 4 = Medium
  // 5 = Medium Long, 6 = Long, 7 = Full
  m_speedUnitsLeadPlayer?: number; // 0 = MPH, 1 = KPH
  m_temperatureUnitsLeadPlayer?: number; // 0 = Celsius, 1 = Fahrenheit
  m_speedUnitsSecondaryPlayer?: number; // 0 = MPH, 1 = KPH
  m_temperatureUnitsSecondaryPlayer?: number; // 0 = Celsius, 1 = Fahrenheit
  m_numSafetyCarPeriods?: number; // Number of safety cars called during session
  m_numVirtualSafetyCarPeriods?: number; // Number of virtual safety cars called
  m_numRedFlagPeriods?: number; // Number of red flags called during session
}

export interface LapData {
  m_lastLapTimeInMS?: number; // Last lap time in milliseconds
  m_currentLapTimeInMS?: number; // Current time around the lap in milliseconds
  m_sector1TimeInMS?: number; // Sector 1 time in milliseconds
  m_sector1TimeMinutes?: number; // Sector 1 whole minute part
  m_sector2TimeInMS?: number; // Sector 2 time in milliseconds
  m_sector2TimeMinutes?: number; // Sector 2 whole minute part
  m_deltaToCarInFrontInMS?: number; // Time delta to car in front in milliseconds
  m_deltaToRaceLeaderInMS?: number; // Time delta to race leader in milliseconds
  m_lapDistance?: number; // Distance vehicle is around current lap in metres – could
  // be negative if line hasn’t been crossed yet
  m_totalDistance?: number; // Total distance travelled in session in metres – could
  // be negative if line hasn’t been crossed yet
  m_safetyCarDelta?: number; // Delta in seconds for safety car
  m_carPosition?: number; // Car race position
  m_currentLapNum?: number; // Current lap number
  m_pitStatus?: number; // 0 = none, 1 = pitting, 2 = in pit area
  m_numPitStops?: number; // Number of pit stops taken in this race
  m_sector?: number; // 0 = sector1, 1 = sector2, 2 = sector3
  m_currentLapInvalid?: number; // Current lap invalid - 0 = valid, 1 = invalid
  m_penalties?: number; // Accumulated time penalties in seconds to be added
  m_totalWarnings?: number; // Accumulated number of warnings issued
  m_cornerCuttingWarnings?: number; // Accumulated number of corner cutting warnings issued
  m_numUnservedDriveThroughPens?: number; // Num drive through pens left to serve
  m_numUnservedStopGoPens?: number; // Num stop go pens left to serve
  m_gridPosition?: number; // Grid position the vehicle started the race in
  m_driverStatus?: number; // Status of driver - 0 = in garage, 1 = flying lap
  // 2 = in lap, 3 = out lap, 4 = on track
  m_resultStatus?: number; // Result status - 0 = invalid, 1 = inactive, 2 = active
  // 3 = finished, 4 = didnotfinish, 5 = disqualified
  // 6 = not classified, 7 = retired
  m_pitLaneTimerActive?: number; // Pit lane timing, 0 = inactive, 1 = active
  m_pitLaneTimeInLaneInMS?: number; // If active, the current time spent in the pit lane in ms
  m_pitStopTimerInMS?: number; // Time of the actual pit stop in ms
  m_pitStopShouldServePen?: number; // Whether the car should serve a penalty at this stop
}

export interface PacketLapData {
  m_header: PacketHeader;
  m_lapData: LapData[];
  m_timeTrialPBCarIdx?: number; // Index of Personal Best car in time trial (255 if invalid)
  m_timeTrialRivalCarIdx?: number; // Index of Rival car in time trial (255 if invalid)
}

export interface FastestLap {
  vehicleIdx?: number;
  lapTime?: number;
}

export interface Retirement {
  vehicleIdx?: number;
}

export interface TeamMateInPits {
  vehicleIdx?: number;
}

export interface RaceWinner {
  vehicleIdx?: number;
}

export interface Penalty {
  penaltyType?: number;
  infringementType?: number;
  vehicleIdx?: number;
  otherVehicleIdx?: number;
  time?: number;
  lapNum?: number;
  placesGained?: number;
}

export interface SpeedTrap {
  vehicleIdx?: number; // Vehicle index of the vehicle triggering speed trap
  speed?: number; // Top speed achieved in kilometres per hour
  isOverallFastestInSession?: number; // Overall fastest speed in session = 1, otherwise 0
  isDriverFastestInSession?: number; // Fastest speed for driver in session = 1, otherwise 0
  fastestVehicleIdxInSession?: number; // Vehicle index of the vehicle that is the fastest
  // in this session
  fastestSpeedInSession?: number; // Speed of the vehicle that is the fastest
  // in this session
}

export interface StartLights {
  numLights?: number;
}

export interface DriveThroughPenaltyServed {
  vehicleIdx?: number;
}

export interface StopGoPenaltyServed {
  vehicleIdx?: number;
}

export interface Flashback {
  flashbackFrameIdentifier?: number;
  flashbackSessionTime?: number;
}

export interface Buttons {
  buttonStatus?: number;
}

export interface Overtake {
  overtakingVehicleIdx?: number;
  beingOvertakenVehicleIdx?: number;
}

export interface PacketEventData {
  m_header: PacketHeader;
  m_eventStringCode: string;
  m_eventDetails?:
    | FastestLap
    | Retirement
    | TeamMateInPits
    | RaceWinner
    | Penalty
    | SpeedTrap
    | StartLights
    | DriveThroughPenaltyServed
    | StopGoPenaltyServed
    | Flashback
    | Buttons
    | Overtake;
}

export interface ParticipantData {
  m_aiControlled?: number; // Whether the vehicle is AI (1) or Human (0) controlled
  m_driverId?: number; // Driver id - see appendix, 255 if network human
  m_networkId?: number; // Network id – unique identifier for network players
  m_teamId?: number; // Team id - see appendix
  m_myTeam?: number; // My team flag – 1 = My Team, 0 = otherwise
  m_raceNumber?: number; // Race number of the car
  m_nationality?: number; // Nationality of the driver
  m_name?: string; // Name of participant in UTF-8 format – null terminated
  // Will be truncated with ... (U+2026) if too long
  m_yourTelemetry?: number; // The player's UDP setting, 0 = restricted, 1 = public
  m_showOnlineNames?: number; // The player's show online names setting, 0 = off, 1 = on
  m_platform?: number; // 1 = Steam, 3 = PlayStation, 4 = Xbox, 6 = Origin, 255 = unknown
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
  m_tractionControl?: number; // Traction control - 0 = off, 1 = medium, 2 = full
  m_antiLockBrakes?: number; // 0 (off) - 1 (on)
  m_fuelMix?: number; // Fuel mix - 0 = lean, 1 = standard, 2 = rich, 3 = max
  m_frontBrakeBias?: number; // Front brake bias (percentage)
  m_pitLimiterStatus?: number; // Pit limiter status - 0 = off, 1 = on
  m_fuelInTank?: number; // Current fuel mass
  m_fuelCapacity?: number; // Fuel capacity
  m_fuelRemainingLaps?: number; // Fuel remaining in terms of laps (value on MFD)
  m_maxRPM?: number; // Cars max RPM, point of rev limiter
  m_idleRPM?: number; // Cars idle RPM
  m_maxGears?: number; // Maximum number of gears
  m_drsAllowed?: number; // 0 = not allowed, 1 = allowed
  m_drsActivationDistance?: number; // 0 = DRS not available, non-zero - DRS will be available
  // in [X] metres
  m_actualTyreCompound?: number; // F1 Modern - 16 = C5, 17 = C4, 18 = C3, 19 = C2, 20 = C1
  // 21 = C0, 7 = inter, 8 = wet
  // F1 Classic - 9 = dry, 10 = wet
  // F2 – 11 = super soft, 12 = soft, 13 = medium, 14 = hard
  // 15 = wet
  m_visualTyreCompound?: number; // F1 visual (can be different from actual compound)
  // 16 = soft, 17 = medium, 18 = hard, 7 = inter, 8 = wet
  // F1 Classic – same as above
  // F2 ‘19, 15 = wet, 19 – super soft, 20 = soft
  // 21 = medium , 22 = hard
  m_tyresAgeLaps?: number; // Age in laps of the current set of tyres
  m_vehicleFiaFlags?: number; // -1 = invalid/unknown, 0 = none, 1 = green
  // 2 = blue, 3 = yellow
  m_enginePowerICE?: number; // Engine power output of ICE (W)
  m_enginePowerMGUK?: number; // Engine power output of MGU-K (W)
  m_ersStoreEnergy?: number; // ERS energy store in Joules
  m_ersDeployMode?: number; // ERS deployment mode, 0 = none, 1 = medium
  // 2 = hotlap, 3 = overtake
  m_ersHarvestedThisLapMGUK?: number; // ERS energy harvested this lap by MGU-K
  m_ersHarvestedThisLapMGUH?: number; // ERS energy harvested this lap by MGU-H
  m_ersDeployedThisLap?: number; // ERS energy deployed this lap
  m_networkPaused?: number; // Whether the car is paused in a network game
}

export interface PacketCarStatusData {
  m_header: PacketHeader; // Header
  m_carStatusData: CarStatusData[];
}

export interface FinalClassificationData {
  m_position?: number; // Finishing position
  m_numLaps?: number; // Number of laps completed
  m_gridPosition?: number; // Grid position of the car
  m_points?: number; // Number of points scored
  m_numPitStops?: number; // Number of pit stops made
  m_resultStatus?: number; // Result status - 0 = invalid, 1 = inactive, 2 = active
  // 3 = finished, 4 = didnotfinish, 5 = disqualified
  // 6 = not classified, 7 = retired
  m_bestLapTimeInMS?: number; // Best lap time of the session in milliseconds
  m_totalRaceTime?: number; // Total race time in seconds without penalties
  m_penaltiesTime?: number; // Total penalties accumulated in seconds
  m_numPenalties?: number; // Number of penalties applied to this driver
  m_numTyreStints?: number; // Number of tyres stints up to maximum
  m_tyreStintsActual?: number[]; // Actual tyres used by this driver
  m_tyreStintsVisual?: number[]; // Visual tyres used by this driver
  m_tyreStintsEndLaps?: number[]; // The lap number stints end on
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
  m_platform: number; // 1 = Steam, 3 = PlayStation, 4 = Xbox, 6 = Origin, 255 = unknown
  m_name: string; // Name of participant in UTF-8 format – null terminated
  // Will be truncated with ... (U+2026) if too long
  m_carNumber?: number; // Car number of the player
  m_readyStatus: number; // 0 = not ready, 1 = ready, 2 = spectating
}

export interface PacketLobbyInfoData {
  m_header: PacketHeader;
  m_numPlayers: number;
  m_lobbyPlayers: LobbyInfoData[];
}

export interface CarDamageData {
  m_tyresWear?: [number, number, number, number]; // Tyre wear (percentage)
  m_tyresDamage?: [number, number, number, number]; // Tyre damage (percentage)
  m_brakesDamage?: [number, number, number, number]; // Brakes damage (percentage)
  m_frontLeftWingDamage?: number; // Front left wing damage (percentage)
  m_frontRightWingDamage?: number; // Front right wing damage (percentage)
  m_rearWingDamage?: number; // Rear wing damage (percentage)
  m_floorDamage?: number; // Floor damage (percentage)
  m_diffuserDamage?: number; // Diffuser damage (percentage)
  m_sidepodDamage?: number; // Sidepod damage (percentage)
  m_drsFault?: number; // Indicator for DRS fault, 0 = OK, 1 = fault
  m_ersFault?: number; // Indicator for ERS fault, 0 = OK, 1 = fault
  m_gearBoxDamage?: number; // Gear box damage (percentage)
  m_engineDamage?: number; // Engine damage (percentage)
  m_engineMGUHWear?: number; // Engine wear MGU-H (percentage)
  m_engineESWear?: number; // Engine wear ES (percentage)
  m_engineCEWear?: number; // Engine wear CE (percentage)
  m_engineICEWear?: number; // Engine wear ICE (percentage)
  m_engineMGUKWear?: number; // Engine wear MGU-K (percentage)
  m_engineTCWear?: number; // Engine wear TC (percentage)
  m_engineBlown?: number; // Engine blown, 0 = OK, 1 = fault
  m_engineSeized?: number; // Engine seized, 0 = OK, 1 = fault
}

export interface PacketCarDamageData {
  m_header: PacketHeader; // Header
  m_carDamageData: CarDamageData[];
}

export interface LapHistoryData {
  m_lapTimeInMS?: number; // Lap time in milliseconds
  m_sector1TimeInMS?: number; // Sector 1 time in milliseconds
  m_sector1TimeMinutes?: number; // Sector 1 whole minute part
  m_sector2TimeInMS?: number; // Sector 2 time in milliseconds
  m_sector2TimeMinutes?: number; // Sector 2 whole minute part
  m_sector3TimeInMS?: number; // Sector 3 time in milliseconds
  m_sector3TimeMinutes?: number; // Sector 3 whole minute part
  m_lapValidBitFlags?: number; // 0x01 bit set-lap valid, 0x02 bit set-sector 1 valid
  // 0x04 bit set-sector 2 valid, 0x08 bit set-sector 3 valid
}

export interface TyreStintHistoryData {
  m_endLap?: number; // Lap the tyre usage ends on (255 of current tyre)
  m_tyreActualCompound?: number; // Actual tyres used by this driver
  m_tyreVisualCompound?: number; // Visual tyres used by this driver
}

export interface PacketSessionHistoryData {
  m_header: PacketHeader; // Header
  m_carIdx: number; // Index of the car this lap data relates to
  m_numLaps: number; // Num laps in the data (including current partial lap)
  m_numTyreStints: number; // Number of tyre stints in the data
  m_bestLapTimeLapNum: number; // Lap the best lap time was achieved on
  m_bestSector1LapNum: number; // Lap the best Sector 1 time was achieved on
  m_bestSector2LapNum: number; // Lap the best Sector 2 time was achieved on
  m_bestSector3LapNum: number; // Lap the best Sector 3 time was achieved on
  m_lapHistoryData: LapHistoryData[]; // 100 laps of data max
  TyreStintHistoryData: TyreStintHistoryData[];
}

export interface TyreSetData {
  m_actualTyreCompound?: number; // Actual tyre compound used
  m_visualTyreCompound?: number; // Visual tyre compound used
  m_wear?: number; // Tyre wear (percentage)
  m_available?: number; // Whether this set is currently available
  m_recommendedSession?: number; // Recommended session for tyre set
  m_lifeSpan?: number; // Laps left in this tyre set
  m_usableLife?: number; // Max number of laps recommended for this compound
  m_lapDeltaTime?: number; // Lap delta time in milliseconds compared to fitted set
  m_fitted?: number; // Whether the set is fitted or not
}
export interface PacketTyreSetsData {
  m_header: PacketHeader; // Header
  m_carIdx: number; // Index of the car this data relates to
  m_tyreSetData: TyreSetData[]; // 13 (dry) + 7 (wet)
  m_fittedIdx: number; // Index into array of fitted tyre
}

export interface PacketMotionExData {
  m_header: PacketHeader; // Header
  // Extra player car ONLY data
  m_suspensionPosition: [number, number, number, number]; // Note: All wheel arrays have the following order:
  m_suspensionVelocity: [number, number, number, number]; // RL, RR, FL, FR
  m_suspensionAcceleration: [number, number, number, number]; // RL, RR, FL, FR
  m_wheelSpeed: [number, number, number, number]; // Speed of each wheel
  m_wheelSlipRatio: [number, number, number, number]; // Slip ratio for each wheel
  m_wheelSlipAngle: [number, number, number, number]; // Slip angles for each wheel
  m_wheelLatForce: [number, number, number, number]; // Lateral forces for each wheel
  m_wheelLongForce: [number, number, number, number]; // Longitudinal forces for each wheel
  m_heightOfCOGAboveGround: number; // Height of centre of gravity above ground
  m_localVelocityX: number; // Velocity in local space – metres/s
  m_localVelocityY: number; // Velocity in local space
  m_localVelocityZ: number; // Velocity in local space
  m_angularVelocityX: number; // Angular velocity x-component – radians/s
  m_angularVelocityY: number; // Angular velocity y-component
  m_angularVelocityZ: number; // Angular velocity z-component
  m_angularAccelerationX: number; // Angular acceleration x-component – radians/s/s
  m_angularAccelerationY: number; // Angular acceleration y-component
  m_angularAccelerationZ: number; // Angular acceleration z-component
  m_frontWheelsAngle: number; // Current front wheels angle in radians
  m_wheelVertForce: [number, number, number, number]; // Vertical forces for each wheel
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
  CarDamage,
  TyreStintHistory,
  TyreSets,
  MotionEx,
}

export enum packetSize {
  Motion = 1349,
  Session = 644,
  LapData = 1131,
  Event = 45,
  Participants = 1306,
  CarSetups = 1107,
  CarTelemetry = 1352,
  CarStatus = 1239,
  FinalClassification = 1020,
  LobbyInfo = 1218,
  CarDamage = 953,
  TyreStintHistory = 1460,
  TyreSets = 231,
  MotionEx = 217,
}
