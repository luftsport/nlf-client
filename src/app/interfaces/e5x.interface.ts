
// Total definition
//export interface E5X {
//    ATMStaff: E5XATMStaffItem[];
//}

export interface E5XATMStaffItem {
  CISMOffered?: any;
  Category?: any;
  DutyTimeInPosition?: any;
}

export interface E5XAerodromeGeneral {

  AerodromeLatitude?: number;
  AerodromeLongitude?: number;
  AerodromeStatus?: string;
  AerodromeType?: string;
  AreaConfiguration?: string;
  ElevationAboveMSL?: number;
  LandingAreaType?: string;
  LocationIndicator?: string;
  LocationOnNearAerodrome?: string;
  SurfaceType?: string;
}

export interface E5XAerodromeWeatherReports {
  WxReport?: any;
}

export interface E5XAirNavigationService {
  ANSPName?: string;
  APWAlerting?: string;
  MSAWCurrentAlerting?: string;
  RIMCASAlerting?: string;
  STCACurrentAlerting?: string;
}

export interface E5XAirSpace {
  AirspaceClass?: string;
  AirspaceName?: string;
  AirspaceType?: string;
  FIRUIRName?: string;
  SpecialActivities?: string;
}

export interface E5XAircraft {


  CallSign?: string;
  AircraftCategory?: string;
  ManufacturerModel?: string;
  Annex2ACType?: string;
  AircraftRegistration?: string;
  SerialNumber?: string;
  TotalCyclesAC?: number;
  YearBuilt?: number;
  StateOfRegistry?: string;

  PropulsionType?: string;
  NumberOfEngines?: number;

  AircraftTotalTime?: number;

  Operator?: string;

  TypeOfAirspeed?: string;

  OccOnGround?: string;

  // Wildlife
  BirdSize?: string;
  BirdsWildlifeSeen?: string;
  BirdsWildlifeStruck?: string;
  PilotAdvisedOfBirds?: boolean;
  SpeciesDescription?: string;
  // WX
  TurbulenceIntensity?: string;
  VisibRestrictions?: string;
  // AC properties
  SpeedFirstEvent?: number;
  PartsDamaged?: string;
  PartsStruck?: string;
  RelWindDirection?: number;
  // Injuries
  TotalNumberFatalities?: number;
  TotalNumberMinorInjuries?: number;
  TotalNumberOfPersons?: number;
  TotalNumberSeriousInjuries?: number;
  // FLight
  PlannedDestination?: string;
  ClearanceValidity?: string;
  ClearedAltitude?: number;
  ClearedFLAfter?: number;
  ClearedFlightLevel?: number;
  ControllingAgency?: string;
  CurrentFlightRules?: string;
  CurrentTrafficType?: string;
  FiledFlightRules?: string;
  FiledTrafficType?: string;
  FlightNumber?: string;
  FlightPhase?: string;
  FlightPlanType?: string;
  InstrumentApprType?: string;
  LastDeparturePoint?: string;
  SIDRoute?: string;
  SSRMode?: string;
  TimeDeviatingFL?: number;
  ACFlightLevel?: number;
  ATSRouteName?: string;
  AircraftAltitude?: number;

  WakeTurbCategory?: string;
  LandingGearType?: string;
  MassGroup?: string;
  MaximumTOMass?: number;
  RotorcraftMassGroup?: string;


}

export interface E5XDangerousGoods {
  AirWaybillConsignmentTrackingNumber?: string;
  DangerousGood?: string;
  NumberOfInnerPackages?: number;
  OriginOfGoods?: string;
  PackingGroupClass7Category?: string;
  QuantityPerInnerPackaging?: number;
  ShipperName?: string;
  SubsidiaryRisk?: string;
  TotalNumberOfPackagesInConsignment?: number;
  TypeOfInnerPackaging?: string;
  TypeOfOuterPackaging?: string;
}

export interface E5XEngine {
  ATAChapterInvolved?: any;
  CyclesSinceInsp?: number;
  CyclesSinceNew?: number;
  CyclesSinceOverhaul?: number;
  DateOfInspection?: Date;
  DateOfManufacturing?: Date;
  DateOverhaul?: Date;
  TimeSinceInspection?: number;
  TimeSinceNew?: number;
  TimeSinceOverhaul?: number;
  EnginePosition?: number;
  EngineSerialNumber?: string;
  HazardEngEffect?: string;
  ManufacturerModel?: string;
  NatureOfEngineInvolvement?: string;
}

/** From forløpet */
export interface E5XEvents {
  EventType?: any;
  Phase?: any;
}
export interface E5XFlightCrewLicenses {

  DateOfLicense?: Date;
  LicenseIssuedBy?: string;
  LicenseType?: number;
  Ratings?: number[];
  Validity?: number;
}
export interface E5XFlightCrewMember {
  Category?: number;
  DutyLast24Hours?: number;
  ExperienceAllAC?: number;
  ExperienceThisAC?: number;
  RestBeforeDuty?: number;
}
export interface E5XIncapacitation {
  PersonIncapacitated?: boolean;
  ReasonForIncapacity?: string;
}

export interface E5XNarrative {
  NarrativeLanguage?: any;
  NarrativeText?: string;
}

export interface E5XOccurrence {
  ATMContribution?: any;
  AirTemperature?: number;
  AuthorityOccClosure?: any;
  AviationSector?: any;
  CloudAmount?: any;
  DamageNotToAC?: any;
  DangGoodsInvolved?: any;
  DetectionPhase?: any;
  DewPoint?: number;
  EffectOnATMService?: any;
  FileNumber?: any;
  GroundRepeatability?: boolean;
  GroundSeverity?: any;
  GroundSeverityApplied?: any;
  Headline?: string;
  HeightOfCloudBase?: number;
  HighestDamage?: any;
  InjuryLevel?: any;
  LatitudeOfOcc?: number;
  LightConditions?: any;
  LocalDate?: Date;
  LocalTime?: string;
  LocationName?: string;
  LongitudeOfOcc?: number;
  MaximumGust?: number;
  ObjectDamaged?: boolean;
  OccurrenceCategory?: any;
  OccurrenceClass?: any;
  OccurrenceStatus?: any;
  OverallRepeatability?: boolean;
  OverallSeverity?: any;
  OverallSeverityApplied?: any;
  ResponsibleEntity?: any;
  SpecTechRepeatability?: any;
  SpecTechSeverity?: any;
  SpecTechSeverityApplied?: any;
  SpeedMeasuredAt?: any;
  StateAreaOfOcc?: any;
  ThirdPartyDamage?: boolean;
  TotalFatalitiesGround?: number;
  TotalInjuriesGround?: number;
  TotalMinorInjuriesGround?: number;
  TotalOnBoardAC?: number;
  TotalSeriousInjuriesGround?: number;
  UTCDate?: Date;
  UTCTime?: string;
  Visibility?: any;
  WeatherRelevant?: boolean;
  WindDirection?: number;
  WindGusts?: number;
  WindSpeed?: number;
  WxConditions?: string;
}

export interface E5XPartInformation {
  ATAChapterNumber?: any;
  CyclesSinceInsp?: number;
  CyclesSinceNew?: number;
  CyclesSinceOverhaul?: number;
  DateOfManufacturing?: Date;
  DateOfOverhaul?: Date;
  DateRepairInsp?: Date;
  Manufacturer?: string;
  PartName?: string;
  PartNumber?: string;
  SerialNumber?: string;
  TimeSinceInspection?: number;
  TimeSinceNew?: number;
  TimeSinceOverhaul?: number;
}

export interface E5XPropeller {
  ATAChapterInvolved?: boolean;
  CyclesSinceInsp?: number;
  CyclesSinceNew?: number;
  CyclesSinceOverh?: number;
  DateOfManufacturing?: Date;
  DateOfOverhaul?: Date;
  DateRepairInsp?: Date;
  HazardousPropEffects?: any;
  MakeOfPropeller?: string;
  PropInvolvement?: string;
  PropPosition?: string;
  PropSerial?: string;
  PropellerModel?: string;
  TimeSinceInspection?: number;
  TimeSinceNew?: number;
  TimeSinceOverhaul?: number;
}

export interface E5XReportingHistory {
  Conclusions?: string;
  CorrectiveActions?: string;
  DescriptionInvestigation?: string;
  ExportControl?: any;
  OtherReportInform?: any;
  PartiesInformed?: any;
  Report?: any;
  ReportIdentification?: any;
  ReportSource?: any;
  ReportStatus?: any;
  ReportVersion?: any;
  ReporterSDescription?: any;
  ReporterSLanguage?: any;
  ReportingDate?: Date;
  ReportingEntity?: any;
  ReportingFormType?: any;
  RiskAssessment?: any;
  RiskClassification?: any;
  RiskMethodology?: any;
  TrackingSheetNumber?: any;
}

export interface E5XRiskAssessment {
  AircraftEquipmentAndInfrastructure?: any;
  ERCSCalculatedBS?: any;
  ERCSColumnScore?: any;
  ERCSComments?: any;
  ERCSFinalBS?: any;
  ERCSNumericalEquivalentScore?: any;
  ERCSRiskGrade?: any;
  ERCSRowScore?: any;
  ERCSScore?: any;
  KeyRiskArea?: any;
  Protections?: any;
  RecoveryAction?: any;
  RegulationsProceduresAndCompliance?: any;
  RiskGrade?: any;
  RiskLevel?: any;
  RiskMethod?: any;
  SituationalAwarenessAndActions?: any;
  TacticalPlanning?: any;
  Unspecified?: any;
  WarningSystemOperationAndCompliance?: any;

}

export interface E5XPrecipitationAndOtherWeatherPhenomena {
  PhenomenonIntensity?: any;
  PhenomenonType?: any;
}

export interface E5XRunway {
  RunwayIdentifier?: string;
  SurfaceType?: string;
}
export interface E5XRunwayIncursion {
  EntityInvolved?: any;
}

export interface E5XSector {
  RTFFrequency?: number;
  SectorName?: string;
  ServicesProvided?: any;
  WorkloadController?: any;
}

export interface E5XSeparation {
  EstMinimumHorizSep?: number;
  EstVertSeparation?: number;
  HorizontalRelMvmt?: any;
  MilitaryACInvolved?: boolean;
  MinHorizSepRec?: number;
  RateOfClosure?: number;
  ReqMinimumHorizSep?: number;
  ReqVertSeparation?: number;
  VerticalSepRecorded?: number;
}

export interface E5XSeparationAircraft {
  SeparationACAvoidingAction
  SeparationATMAction
  SeparationHeightAltitude
  SeparationOtherAircraftSeen
  SeparationPilotResponseToRA
  SeparationRAClassification
  SeparationRAType
  SeparationRiskReductionAC
  SeparationVerticalProfileOfSeparation
}
export interface E5XSeparationTrafficInfoTypeQuality {
  TrafficInfoQuality
}

export interface E5XVehicle {

  TypeOfVehicle?: string;
  VehicleControlled?: any;
}

export interface E5XDataLink {
  EmbeddedData?: any;
}




/**
 * "airTemperature": {
          "TYPE_NAME": "E5X.Occurrence.ATTRIBUTES.AirTemperature",
          "unit": "C",
          "value": 20
        },
 */
export interface E5X {
  _status?: any;
  _audit?: any; //list of generations et al?
  Occurence?: Occurrence;
}

export interface _StringVal {
  //TYPE_NAME
  value: string;
}
export interface _NumberVal {
  //TYPE_NAME
  value: number;
}
export interface _ArrNumberVal {
  //TYPE_NAME
  value: number[];
}

export interface _StringUnit {
  //TYPE_NAME
  value: string;
  unit: string;
}
export interface _NumberUnit {
  //TYPE_NAME
  value: number;
  unit: string;
}
export interface _ArrNumberUnit {
  //TYPE_NAME
  value: number[];
  unit: string;
}

export interface Occurrence {
  ATTRIBUTES?: {
    ATMContribution?: any;
    AirTemperature?: any;
    AuthorityOccClosure?: any;
    AviationSector?: any;
    CloudAmount?: any;
    DamageNotToAC?: any;
    DangGoodsInvolved?: any;
    DetectionPhase?: any;
    DewPoint?: any;
    EffectOnATMService?: any;
    FileNumber?: any;
    GroundRepeatability?: any;
    GroundSeverity?: any;
    GroundSeverityApplied?: any;
    Headline?: any;
    HeightOfCloudBase?: any;
    HighestDamage?: any;
    InjuryLevel?: any;
    LatitudeOfOcc?: any;
    LightConditions?: any;
    LocalDate?: any;
    LocalTime?: any;
    LocationName?: any;
    LongitudeOfOcc?: any;
    MaximumGust?: any;
    ObjectDamaged?: any;
    OccurrenceCategory?: any;
    OccurrenceClass?: any;
    OccurrenceStatus?: any;
    OverallRepeatability?: any;
    OverallSeverity?: any;
    OverallSeverityApplied?: any;
    ResponsibleEntity?: any;
    SpecTechRepeatability?: any;
    SpecTechSeverity?: any;
    SpecTechSeverityApplied?: any;
    SpeedMeasuredAt?: any;
    StateAreaOfOcc?: any;
    ThirdPartyDamage?: any;
    TotalFatalitiesGround?: any;
    TotalInjuriesGround?: any;
    TotalMinorInjuriesGround?: any;
    TotalOnBoardAC?: any;
    TotalSeriousInjuriesGround?: any;
    UTCDate?: any;
    UTCTime?: any;
    Visibility?: any;
    WeatherRelevant?: any;
    WindDirection?: any;
    WindGusts?: any;
    WindSpeed?: any;
    WxConditions?: any;
  };
  ENTITIES?: any;
}

/**
* E5X stuff functions
**/
// 34!
function getE5XId() {
  return 'ID'
    + Math.random().toString(36).substring(2, 12).toUpperCase()
    + Math.random().toString(36).substring(2, 12).toUpperCase()
    + Math.random().toString(36).substring(2, 12).toUpperCase()
    + Math.random().toString(36).substring(2, 4).toUpperCase();
}


/**
 * E5X top level
 */
export class E5XClass {
  //var E5X = {
  //Occurrence:
  occurrence =
    {
      attributes: {
        // Time and date
        headline: { value: undefined },
        uTCDate: { value: undefined },
        uTCTime: { value: undefined },
        localDate: { value: undefined },
        localTime: { value: undefined },

        // Location
        locationName: { value: undefined },
        latitudeOfOcc: { value: undefined },
        longitudeOfOcc: { value: undefined },
        stateAreaOfOcc: { additionalText: undefined, value: undefined },

        // Occ definition
        occurrenceCategory: { value: undefined },
        occurrenceClass: { value: undefined },
        occurrenceStatus: { value: undefined },
        overallRepeatability: { value: undefined },
        overallSeverity: { value: undefined },
        overallSeverityApplied: { value: undefined },
        responsibleEntity: { value: undefined },

        // Occ detected
        detectionPhase: { value: undefined },
        speedMeasuredAt: { value: undefined },
        speedFirstEvent: { unit: 'kt', value: undefined },

        // ??
        specTechRepeatability: { value: undefined },
        specTechSeverity: { value: undefined },
        specTechSeverityApplied: { value: undefined },

        // Ground
        groundRepeatability: { value: undefined },
        groundSeverity: { value: undefined },
        groundSeverityApplied: { value: undefined },

        // Damage
        highestDamage: { value: undefined },
        thirdPartyDamage: { value: undefined },
        damageNotToAC: { value: undefined },
        objectDamaged: { value: undefined },

        dangGoodsInvolved: { value: undefined },

        // Injuries & damage
        totalOnBoardAC: { value: undefined },
        injuryLevel: { value: undefined },
        totalFatalitiesGround: { value: undefined },
        totalInjuriesGround: { value: undefined },
        totalMinorInjuriesGround: { value: undefined },
        totalSeriousInjuriesGround: { value: undefined },

        // Weather
        weatherRelevant: { value: undefined },
        windDirection: { unit: 'Degree(s)', value: undefined },
        windGusts: { unit: 'kt', value: undefined },
        windSpeed: { unit: 'kt', value: undefined },
        maximumGust: { unit: 'kt', value: undefined },
        heightOfCloudBase: { unit: 'ft', value: undefined },
        visibility: { unit: 'm', value: undefined },
        cloudAmount: { value: undefined },
        wxConditions: { value: undefined },
        airTemperature: { unit: 'C', value: undefined },
        dewPoint: { unit: 'C', value: undefined },
        lightConditions: { value: undefined },

        //
        authorityOccClosure: { value: undefined },
        aviationSector: { value: undefined },



        fileNumber: { value: undefined },

        // If checked stuff
        atmContribution: { value: undefined },
        effectOnATMService: { value: undefined },

      },
      /**"propertiesOrder":[
          "aerodromeGeneral",
          "aerodromeWeatherReports",
          "airSpace",
          "aircraft",
          "airNavigationService",
          "events",
          "narrative",
          "precipitationAndOtherWeatherPhenomena",
          "separation",
          "dangerousGoods",
          "runwayIncursion",
          "reportingHistory",
          "riskAssessment"] */
      entities: {
        events: [],
        runwayIncursion: [],
        aerodromeGeneral: [],
        aerodromeWeatherReports: [],
        precipitationAndOtherWeatherPhenomena: [],
        airNavigationService: [],
        airSpace: [],
        aircraft: [],
        dangerousGoods: [],
        narrative: [],
        reportingHistory: [],
        riskAssessment: [],
        separation: [],
      }
    }
}

/**
 * Aircraft ENTITY
 */
export class E5XAircraftClass {

  aircraft = {
    attributes: {


      // Details
      callSign: { value: undefined },
      aircraftRegistration: { value: undefined },
      aircraftCategory: { value: undefined },
      annex2ACType: { value: undefined },
      wakeTurbCategory: { value: undefined },
      yearBuilt: { value: undefined },
      stateOfRegistry: { value: undefined },
      serialNumber: { value: undefined },
      operator: { value: undefined },
      propulsionType: { value: undefined },
      manufacturerModel: { additionalText: undefined, value: undefined },
      massGroup: { value: undefined },
      maximumTOMass: { unit: 'kg', value: undefined },
      landingGearType: { value: undefined },
      numberOfEngines: { value: undefined },
      rotorcraftMassGroup: { value: undefined },

      // Dynamic times
      aircraftTotalTime: { unit: 'Hour(s)', value: undefined },
      totalCyclesAC: { value: undefined },

      // Attributes non-aircraft but occurrence!
      operationType: { value: undefined },

      // Occurrence
      typeOfAirspeed: { value: undefined },
      speedFirstEvent: { value: undefined },
      occOnGround: { value: undefined },

      // Wildlife
      birdSize: { value: undefined },
      birdsWildlifeSeen: { value: undefined },
      birdsWildlifeStruck: { value: undefined },
      pilotAdvisedOfBirds: { value: undefined },
      speciesDescription: { value: undefined },
      partsDamaged: { value: undefined },
      partsStruck: { value: undefined },

      // WX
      relWindDirection: { value: undefined },
      turbulenceIntensity: { value: undefined },
      visibRestrictions: { value: undefined },

      // Injuries
      totalNumberFatalities: { value: undefined },
      totalNumberMinorInjuries: { value: undefined },
      totalNumberOfPersons: { value: undefined },
      totalNumberSeriousInjuries: { value: undefined },

      // FLight
      lastDeparturePoint: { value: undefined, additionalText: undefined, additionalTextEncoding: 'xs:string' },
      plannedDestination: { value: undefined, additionalText: undefined, additionalTextEncoding: 'xs:string' },
      aircraftAltitude: { unit: 'ft', value: undefined },
      acFlightLevel: { unit: 'FL', value: undefined },
      clearanceValidity: { value: undefined },
      clearedAltitude: { unit: 'ft', value: undefined },
      clearedFLAfter: { value: undefined },
      clearedFlightLevel: { unit: 'FL', value: undefined },
      controllingAgency: { value: undefined },
      currentFlightRules: { value: undefined },
      currentTrafficType: { value: undefined },
      filedFlightRules: { value: undefined },
      filedTrafficType: { value: undefined },
      flightNumber: { value: undefined },
      flightPhase: { value: undefined },
      flightPlanType: { value: undefined },
      instrumentApprType: { value: undefined },
      sidRoute: { value: undefined },
      ssrMode: { value: undefined },
      timeDeviatingFL: { unit: 'Hour(s)', value: undefined },

      atsRouteName: { value: undefined },

    },
    entities: {

      engine: [],
      propeller: [],

      partInformation: [],

      flightCrewMember: [],
      incapacitation: [],

      narrative: [],
    },
    links: {
      airSpace: { ref: undefined },
      events: [],
      runway: { ref: undefined },
      sector: { ref: undefined },
      dagerousGoods: [],
    },
    id: getE5XId()
    //entityId
  };

  // ENTITIES
  engine = {
    attributes: {
      enginePosition: { value: undefined },
      engineSerialNumber: { value: undefined },
      manufacturerModel: { value: undefined },

      dateOfInspection: { value: undefined },
      dateOfManufacturing: { value: undefined },
      dateOverhaul: { value: undefined },

      cyclesSinceInsp: { value: undefined },
      cyclesSinceNew: { value: undefined },
      cyclesSinceOverhaul: { value: undefined },

      timeSinceInspection: { unit: 'Hour(s)', value: undefined },
      timeSinceNew: { unit: 'Hour(s)', value: undefined },
      timeSinceOverhaul: { unit: 'Hour(s)', value: undefined },

      ataChapterInvolved: { value: undefined },
      hazardEngEffect: { value: undefined },
      natureOfEngineInvolvement: { value: undefined },

    }

  };

  propeller = {
    attributes: {
      propPosition: { value: undefined },
      makeOfPropeller: { value: undefined },
      propSerial: { value: undefined },
      propellerModel: { value: undefined },

      dateOfManufacturing: { value: undefined },
      dateOfOverhaul: { value: undefined },
      dateRepairInsp: { value: undefined },

      cyclesSinceInsp: { value: undefined },
      cyclesSinceNew: { value: undefined },
      cyclesSinceOverh: { value: undefined },

      timeSinceInspection: { unit: 'Hour(s)', value: undefined },
      timeSinceNew: { unit: 'Hour(s)', value: undefined },
      timeSinceOverhaul: { unit: 'Hour(s)', value: undefined },

      ataChapterInvolved: { value: undefined },
      propInvolvement: { value: undefined },
      hazardousPropEffects: { value: undefined },


    }
  };

  flightCrewMember = {
    attributes: {
      category: { value: undefined },
      dutyLast24Hours: { unit: 'Hour(s)', value: undefined },
      experienceAllAC: { unit: 'Hour(s)', value: undefined },
      experienceThisAC: { unit: 'Hour(s)', value: undefined },
      restBeforeDuty: { unit: 'Hour(s)', value: undefined },
    },
    entities: {
      flightCrewLicenses: []
    }
  };
  flightCrewLicenses = {
    attributes: {
      dateOfLicense: { value: undefined },
      licenseIssuedBy: { value: undefined },
      licenseType: { value: undefined },
      ratings: { value: undefined },
      validity: { value: undefined },
    }
  };

  incapacitation = {
    attributes: {
      personIncapacitated: { value: undefined },
      reasonForIncapacity: { value: undefined }
    }
  };

  partInformation = {
    attributes: {
      ataChapterNumber: { value: undefined },
      cyclesSinceInsp: { value: undefined },
      cyclesSinceNew: { value: undefined },
      cyclesSinceOverhaul: { value: undefined },
      dateOfManufacturing: { value: undefined },
      dateOfOverhaul: { value: undefined },
      dateRepairInsp: { value: undefined },
      manufacturer: { value: undefined },
      partName: { value: undefined },
      partNumber: { value: undefined },
      serialNumber: { value: undefined },
      timeSinceInspection: { unit: 'Hour(s)', value: undefined },
      timeSinceNew: { unit: 'Hour(s)', value: undefined },
      timeSinceOverhaul: { unit: 'Hour(s)', value: undefined }
    }
  };

  narrative = {
    attributes: {
      narrativeLanguage: { value: undefined },
      narrativeText: { plainText: undefined },
    }
  };
}

/**
 * Aerodrome ENTITY
 */
export class E5XAerodromeGeneralClass {
  aerodromeGeneral = {
    attributes: {
      aerodromeLatitude: { value: undefined },
      aerodromeLongitude: { value: undefined },
      aerodromeStatus: { value: undefined },
      aerodromeType: { value: undefined },
      areaConfiguration: { value: undefined },
      elevationAboveMSL: { unit: 'ft', value: undefined },
      landingAreaType: { value: undefined },
      locationIndicator: { additionalText: undefined, value: undefined },
      locationOnNearAerodrome: { value: undefined },
      surfaceType: { value: undefined },
    },
    entities: {
      runway: [],
      vehicle: [],
      narrative: [],
    },
    links: {
      events: []
    },
    id: getE5XId(),
    //entityId
  };

  // Entities
  runway = {
    attributes: {
      runwayIdentifier: { value: undefined },
      surfaceType: { value: undefined },
    },
    links: {
      aircraft: { ref: undefined }
    },
    id: getE5XId()
  };

  vehicle = {
    attributes: {
      typeOfVehicle: { value: undefined },
      vehicleControlled: { value: undefined },
    },
    id: getE5XId()
  };

  narrative = {
    attributes: {
      narrativeLanguage: { value: undefined },
      narrativeText: { plainText: undefined },
    }
  };

}

export class E5XSeparationClass {

  separation = {
    attributes: {
      militaryACInvolved: { value: undefined },
      rateOfClosure: { unit: 'kt', value: undefined },
      // Horizontal
      horizontalRelMvmt: { value: undefined },
      minHorizSepRec: { unit: 'NM', value: undefined },
      reqMinimumHorizSep: { unit: 'NM', value: undefined },
      estMinimumHorizSep: { unit: 'NM', value: undefined },
      // Vertical
      estVertSeparation: { unit: 'ft', value: undefined },
      reqVertSeparation: { unit: 'ft', value: undefined },
      verticalSepRecorded: { unit: 'ft', value: undefined }
    },
    entities: {
      separationAircraft: []
    }
  };
  // ENTITIES
  separationAircraft = {
    attributes: {
      acAvoidingAction: { value: undefined },
      atmAction: { value: undefined },
      heightAltitude: { unit: 'ft', value: undefined },
      otherAircraftSeen: { value: undefined },
      pilotResponseToRA: { value: undefined },
      raClassification: { value: undefined },
      raType: { value: undefined },
      riskReductionAC: { value: undefined },
      verticalProfileOfSeparation: { value: undefined }
    },
    entities: {
      separationTrafficInfoTypeQuality: [],
    },
    links: {
      aircraft: [{ ref: undefined }] // {id: <id_string>}?
    }

  };

  separationTrafficInfoTypeQuality = {
    attributes: {
      trafficInfoQuality: { value: undefined }
    }
  };

  links = undefined;

}

export class E5XAerodromeWeatherReportsClass {
  aerodromeWeatherReports = {
    attributes: {
      wxReport: { plainText: undefined }
    }
  };
}

export class E5XRiskAssessmentClass {
  riskAssessment = {
    attributes: {
      aircraftEquipmentAndInfrastructure: { value: undefined },
      ercsCalculatedBS: { value: undefined },
      ercsColumnScore: { value: undefined },
      ercsComments: { value: undefined },
      ercsFinalBS: { value: undefined },
      ercsNumericalEquivalentScore: { value: undefined },
      ercsRiskGrade: { value: undefined },
      ercsRowScore: { value: undefined },
      ercsScore: { value: undefined },
      keyRiskArea: { value: undefined },
      protections: { value: undefined },
      recoveryAction: { value: undefined },
      regulationsProceduresAndCompliance: { value: undefined },
      riskGrade: { value: undefined },
      riskLevel: { value: undefined },
      riskMethod: { value: undefined },
      situationalAwarenessAndActions: { value: undefined },
      tacticalPlanning: { value: undefined },
      unspecified: { value: undefined },
      warningSystemOperationAndCompliance: { value: undefined }
    }
  };
}

export class E5XReportingHistoryClass {
  reportingHistory = {
    attributes: {

      exportControl: { value: undefined },

      partiesInformed: { value: undefined },
      report: { attributes: { resourceLocator: []} }, //attributes.resourceLocator[].{name, description} value: undefined,

      // Report management
      // CAMO OR NLF OR CLUB?
      reportingEntity: { additionalText: 'NLF', additionalTextEncoding: 'xs:string', value: undefined },
      // Custom field - NLF_motorfly_19_v18
      reportIdentification: { value: undefined },
      // Add this!
      reportingDate: { value: undefined },

      // Stuff
      conclusions: { plainText: undefined },
      correctiveActions: { plainText: undefined },
      descriptionInvestigation: { plainText: undefined },

      // ??
      reportSource: { value: undefined },
      reportStatus: { value: undefined },
      reportVersion: { value: undefined },
      reporterSDescription: { value: undefined, plainText: undefined },
      reporterSLanguage: { value: undefined },

      reportingFormType: { value: undefined },
      trackingSheetNumber: { value: undefined },
      otherReportInform: { value: undefined },

      // INTERNAL
      riskAssessment: { value: undefined },
      riskClassification: { value: undefined },
      riskMethodology: { value: undefined },


    }
  };
}

export class E5XNarrativeClass {
  narrative = {
    attributes: {
      narrativeLanguage: { value: undefined },
      narrativeText: { plainText: undefined },
    }
  };
}

export class E5XDangerousGoodsClass {
  dangerousGoods = {
    attributes: {
      airWaybillConsignmentTrackingNumber: { value: undefined },
      dangerousGood: { value: undefined },
      numberOfInnerPackages: { value: undefined },
      originOfGoods: { value: undefined },
      packingGroupClass7Category: { value: undefined },
      quantityPerInnerPackaging: { value: undefined },
      shipperName: { value: undefined },
      subsidiaryRisk: { value: undefined },
      totalNumberOfPackagesInConsignment: { value: undefined },
      typeOfInnerPackaging: { value: undefined },
      typeOfOuterPackaging: { value: undefined }
    }
  };
}

export class E5XAirspaceClass {
  airSpace = {
    attributes: {
      airspaceClass: { value: undefined },
      airspaceName: { value: undefined },
      airspaceType: { value: undefined },
      firuirName: { value: undefined },
      specialActivities: { value: undefined },
    },
    entities: {
      narrative: {
        narrativeLanguage: { value: undefined },
        narrativeText: { plainText: undefined }
      }
    },
    links: {
      aircraft: { ref: undefined },
      events: []
    },
    id: getE5XId()
    //entityId
  };
}

export class E5XAirNavigationServiceClass {
  airNavigationService = {
    attributes: {
      anspName: { value: undefined },
      apwAlerting: { value: undefined },
      msawCurrentAlerting: { value: undefined },
      rimcasAlerting: { value: undefined },
      stcaCurrentAlerting: { value: undefined },

    },
    entities: {
      narrative: [],
      sector: [],
    },
    links: {
      events: []
    },
    id: getE5XId()
    //entityId
  };

  // Object attribute
  sector = {
    attributes: {
      rtfFrequency: { unit: 'MHz', value: undefined },
      sectorName: { value: undefined },
      servicesProvided: { value: undefined },
      workloadController: { value: undefined }
    },
    entities: {
      atmStaff: [],
    },
    links: {
      aircraft: { ref: undefined }
    },
    id: getE5XId()
  };
  // Entities for object attr
  atmStaff = {
    attributes: {
      cismOffered: { value: undefined },
      category: { value: undefined },
      dutyTimeInPosition: { unit: 'Minute(s)', value: undefined },
    }
  };
}

export class E5XPrecipitationAndOtherWeatherPhenomenaClass {
  precipitationAndOtherWeatherPhenomena = {
    attributes: {
      phenomenonIntensity: { value: undefined },
      phenomenonType: { value: undefined },
    }
  };
}

export class E5XRunwayIncursionClass {
  runwayIncursion = {
    attributes:
    {
      entityInvolved: { value: undefined },
    },
    links: {
      runway: { ref: undefined },
      aircraft: [],
      vehicle: { ref: undefined }
    }
    //entityId

  };

  links = {
    aircraft: [],
    runway: [],
    vehicle: []
  }
}

export class E5XVehicleClass {
  vehicle = {
    attributes: {
      typeOfVehicle: { value: undefined },
      vehicleControlled: { value: undefined }
    },
    id: getE5XId()
  };

}

export class E5XEventsClass {
  events = {
    attributes:
    {
      eventType: { value: undefined },
      phase: { value: undefined },

    },
    id: getE5XId()
  };
}
