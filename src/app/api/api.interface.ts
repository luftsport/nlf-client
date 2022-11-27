/**
 * The api interface definitions
 *
 * Note naming:
 *
 * All interfaces defining a List or Item should end in Item or List (not Interface)
 * All other which is not a List or Item should end in Interface
 * Examples:
 * - ApiQueryInterface
 * - ApiUserItem
 * - ApiUserList
 */

import { ApiEveLinks, ApiEveBaseItem, ApiEveBaseList, ApiEveQueryInterface } from './api-eve.interface';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http/src/params';


export interface ApiOptionsInterface {
  query?: ApiEveQueryInterface;
  body?: any;
  params?: HttpParams | { [param: string]: string | string[]; };
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  observe?: 'body';
}

export interface ApiHeartbeat {
  _status: boolean;
  message?: {
    mongo?: number;
    auth?: boolean;
    lungo?: boolean;
  }
}

export interface ApiUserAcl {
  activity: number;
  org: number;
  role: number;
  type?: number;
  //func?: number;
  //name?: string;

}
/**
 * The api resources
 */
export interface ApiUserAuthItem {
  success: boolean;
  token: string;
  token64: string;
  message?: string;
  valid?: any;
  activities?: string[];
  acl?: ApiUserAcl[];
}

export interface AuthDataSubjectInterface {
  token: string;
  person_id: number;
  valid: Date;
}


export interface ApiUserORSItem extends ApiEveBaseItem {
  id: number;
  title?: string;
  discipline?: number;
  state?: string;
  when?: Date;
  rating?: ApiObservationRatingInterface;
}

export interface ApiUserORSList extends ApiEveBaseList {
  _items: ApiUserORSItem[];
}

/**
 * Membership specific interfaces
 *
 * ApiNlf*
 */

export interface ApiNlfMembershipInterface {

  clubs: string[];
  enrolled?: Date;
  valid?: Date;
  type?: string;
  fee?: number;
  balance?: number;

}

export interface ApiNlfMembershipItem extends ApiEveBaseItem {
  _id: string;
  id: string;
  name: string;
}

export interface ApiNlfMembershipList {
  _items: ApiNlfMembershipItem[];

}
export interface ApiNlfClubItem extends ApiEveBaseItem {
  _id?: string;
  id?: string;
  name?: string;
}

export interface ApiNlfClubList extends ApiEveBaseList {
  _items: ApiNlfClubItem[];

}

export interface ApiNlfUserList extends ApiEveBaseList {
  _items: ApiNlfUserItem[];
}

export interface ApiNlfLicenseInterface {
  rights: string[];
  expiry?: Date;
}

export interface ApiNlfUserItem extends ApiEveBaseItem {
  id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  updated: Date;

  phone?: string;
  email?: string;
  gender?: string;
  birthdate?: Date;

  membership: ApiNlfMembershipInterface;
  licenses: ApiNlfLicenseInterface;
  location: ApiLocationItem;
}

export interface ApiNlfLicenseItem extends ApiEveBaseItem {
  _id: string;
  id: string;
  name: string;
}

export interface ApiNlfLicenseList extends ApiEveBaseList {
  _items: ApiNlfLicenseItem[];
}

/**
 * Api User item
 */
export interface ApiUserDefaultSettingsItem {
  default_club?: number; // gruppe/klubb type 6
  default_discipline?: number; // gren type 14
  default_activity?: number; // seksjon
}
export interface ApiUserSettingsItem extends ApiUserDefaultSettingsItem {
  ors?: any; // ors: {has_reported?: boolean, cache?: {}, last_edited: [{activity:, id:}] }
}

export interface ApiUserDataSubjectItem {
  settings?: ApiUserSettingsItem;
  person_id?: number;
  activities?: string[];
  acl?: ApiUserAcl[];
  _etag?: string;
  _id?: string;
}
export interface ApiUserItem extends ApiEveBaseItem {
  id: number;
  avatar?: any;
  settings?: ApiUserSettingsItem;
  custom?: any;
  info?: any;
  stastistics?: any;
  acl?: ApiUserAcl[];
}

export interface ApiUserList extends ApiEveBaseList {
  _items: ApiUserItem[];
}


/**
 * Api Acl and groups and roles
 */

export interface ApiAclGroupItem extends ApiEveBaseItem {
  name: string;
  description: string;
  ref: string;
}

export interface ApiAclGroupList extends ApiEveBaseList {
  _items: ApiAclGroupItem[];

}
export interface ApiAclRoleItem extends ApiEveBaseItem {
  name: string;
  description?: string;
  ref?: string;
  group?: any;
}

export interface ApiAclRoleList extends ApiEveBaseList {
  _items: ApiAclRoleItem[];
}

/**
 * All objects can have this interface
 */
export interface ApiAclRoleInterface {
  activity: number;
  club: number;
  role: number;
}
export interface ApiAclInterface {
  read?: { roles?: ApiAclRoleInterface[], users?: number[] };
  write?: { roles?: ApiAclRoleInterface[], users?: number[] };
  execute?: { roles?: ApiAclRoleInterface[], users?: number[] };
  delete?: { roles?: ApiAclRoleInterface[], users?: number[] };
}
export interface ApiAclUsersInterface {
  read?: number[];
  write?: number[];
  execute?: number[];
  delete?: number[];
}
export interface ApiAclObjectUserInterface {
  read?: boolean;
  write?: boolean;
  execute?: boolean;
  delete?: boolean;
}

/**
 * Checking acl for user for resource item
 * @Todo: Need to get _id as string from backend
 */
export interface ApiAclUserPermissions {
  w?: boolean;
  x?: boolean;
  r?: boolean;
  d?: boolean;
}
export interface ApiAclUserInterface extends ApiAclUserPermissions {

  resource?: string;
  u?: number;
  id?: number;
  _id?: { '$oid': string } | string;

}

export interface ApiObservationsModel {
  type: string;
  version: number;
}
/**
 * Observations interface
 * - All 2. level list items or lists must be declared in seperate *Interface
 * - Components can then use these sub Interfaces directly
 */

export interface ApiObservationsItem extends ApiEveBaseItem {
  // Mandatory
  id: number;
  club: number;
  discipline: number;
  location: ApiLocationItem;
  owner: number;
  reporter: number;
  when: Date;

  type?: string;
  flags?: ApiObservationFlagsInterface;
  tags?: string[];
  ask?: ApiObservationAskInterface;
  rating?: ApiObservationRatingInterface;

  components?: ApiObservationComponentInterface[];
  files?: ApiObservationFileInterface[];
  actions?: ApiObservationActionsInterface;
  involved?: ApiObservationFallskjermInvolvedInterface[];
  // MISC
  related?: number[];
  media?: string[];
  // Removal
  comments?: ApiObservationCommentInterface[];
  watchers?: number[];
  // Mandatory after init
  workflow?: ApiWorkflowInterface;
  acl?: ApiAclInterface; // | ApiAclUserPermissions;
  acl_user?: ApiAclUserPermissions;
  _model?: ApiObservationsModel;

  // Fallskjerm
  // organization?: ApiObservationFallskjermOrganizationInterface || ApiObservationMotorflyOrganizationInterface;
  weather?: ApiObservationWeatherInterface;

  // Motor
  aircrafts?: ApiObservationAircraftsItem[];
  // E5X
  e5x?: any;
  occurrence?: any;

}


export interface ApiObservationsFallskjermItem extends ApiObservationsItem {
  // Fallskjerm
  organization?: ApiObservationFallskjermOrganizationInterface;
  weather?: ApiObservationWeatherInterface;
}
export interface ApiObservationsFallskjermList extends ApiEveBaseList {
  _items: ApiObservationsFallskjermItem[];
}
export interface ApiObservationsMotorflyItem extends ApiObservationsItem {
  // Motor
  aircrafts?: ApiObservationAircraftsItem[];
  organization?: ApiObservationMotorflyOrganizationInterface;
  // E5X
  e5x?: any;
  occurrence?: any;
}
export interface ApiObservationsMotorflyList extends ApiEveBaseList {
  _items: ApiObservationsMotorflyItem[];
}

export interface ApiObservationsSeilflyItem extends ApiObservationsItem {
  // SEILFLY
  aircrafts?: ApiObservationAircraftsItem[];
  organization?: ApiObservationMotorflyOrganizationInterface;
  // E5X
  e5x?: any;
  occurrence?: any;
}
export interface ApiObservationsSeilflyList extends ApiEveBaseList {
  _items: ApiObservationsSeilflyItem[];
}

export interface ApiObservationsSportsflyItem extends ApiObservationsItem {
  // SEILFLY
  aircrafts?: ApiObservationAircraftsItem[];
  organization?: ApiObservationSportsflyOrganizationInterface;
  // E5X
  e5x?: any;
  occurrence?: any;
}
export interface ApiObservationsSportsflyList extends ApiEveBaseList {
  _items: ApiObservationsSportsflyItem[];
}



export interface ApiObservationsList extends ApiEveBaseList {
  _items: ApiObservationsItem[];
}

export interface ApiObervationComponentsInterface {
  temp: string;
}

/**
id: number;
tmp_name?: string;
full_name?: string;
data?: {
  date?: Date,
  licenses?: Object[],
  memberships?: Object[],
  clubs?: any[],
  functions?: any[],
  competences?: Object[],
  private?: Object,
  gear?: Object
};


id?: number;
tmp_name?: string;
data?: {
  gear?: ApiObservationFallskjermInvolvedGearInterface;
  licenses?: { rights: string[], expiry?: Date };
  numberOfJumps?: number;
  yearsOfExperience?: number;
  jumptypeSelected?: string;
  jumptypeTags?: string[];
  aircraft?: string;
  jumpAltitude?: number;
  verdict?: { fu?: boolean; ph?: boolean; mh?: boolean };
}

**/
export interface ApiObservationFallskjermInvolvedInterface {
  id: number;
  tmp_name?: string;
  full_name?: string;
  data?: {
    date?: Date,
    licenses?: Object[],
    memberships?: Object[],
    clubs?: any[],
    functions?: any[],
    competences?: Object[],
    private?: Object,
    gear?: Object
  };


}

export interface ApiObservationFallskjermInvolvedGearInterface {

  harnessExperience?: number;
  harnessType?: string;
  aadType?: string;
  mainCanopyExperience?: number;
  reserveCanopySize?: number;
  reserveCanopyType?: string;
  mainCanopyType?: string;
  mainCanopySize?: number;
  rigger?: [{ id?: number, tmp_name?: string }];
  riggerdate?: Date;
  other?: string[];

}

export interface ApiObservationFallskjermOrganizationInterface {
  hm?: [{ id?: number, tmp_name?: string }];
  pilot?: [{ id?: number, tmp_name?: string }];
  hfl?: [{ id?: number, tmp_name?: string }];
  hl?: [{ id?: number, tmp_name?: string }];
  hi: number[];

}

export interface ApiObservationMotorflyOrganizationInterface {
  dto?: ApiPersonInterface[];
  ors?: ApiPersonInterface[];
}

export interface ApiObservationSeilflyOrganizationInterface {
  dto?: ApiPersonInterface[];
  ors?: ApiPersonInterface[];
}

export interface ApiObservationSportsflyOrganizationInterface {
  ftu?: ApiPersonInterface[];
  ors?: ApiPersonInterface[];
}

export interface ApiPersonInterface {
  id: number;
  tmp_name?: string;
  full_name?: string;
}

export interface ApiAircraftPersonInterface {
  person?: ApiPersonInterface;
  e5x?: {
    FlightCrewLicenses?: E5XFlightCrewLicenses;
    FlightCrewMember?: E5XFlightCrewMember;
    Incapacitation?: E5XIncapacitation;
  };
  snapshot?: {
    functions?: any;
    competences?: any;
    licenses?: any;
    memberships?: any;
  };
  notes?: string;
}

/** MOTOR INVOLVED */
export interface ApiObservationMotorflyInvolvedInterface {
  id?: number;
  tmp_name?: string;
  aircraft?: string;
  role?: string;
  role_attr?: {
    intructor?: boolean;
    student?: boolean;
  }
  licenses?: any;
  snapshot?: {
    competences?: any;
    licenses?: any;
    memberships?: any;
  }


}
export interface ApiObservationWeatherManualInterface {
  wind?: { dir?: string, max?: number, avg?: number, min?: number, turbulence?: boolean, gusting?: boolean },
  clouds?: { base?: number, rain?: boolean, fog?: boolean, hail?: boolean, snow?: boolean, thunder?: boolean },
  temp?: { ground?: number, altitude?: number },
  description?: string
}
export interface ApiObservationWeatherAutoInterface {
  yr?: any,
  metar?: string | string[],
  metar_nearest?: { metar?: string, parsed?: string };
  taf?: string | string[],
  shorttaf?: string | string[]
}
export interface ApiObservationWeatherInterface {
  manual?: ApiObservationWeatherManualInterface;
  auto?: ApiObservationWeatherAutoInterface;
}

export interface ApiObservationComponentInterface {
  when?: Date;
  where?: { at?: string, altitude?: number };
  how?: string;
  what?: string;
  involved?: [{ id?: number, tmp_name?: string }];
  flags?: ApiObservationFlagsInterface;
  attributes?: ApiObservationComponentAttributesInterface;
  tags?: string[];
}

export interface ApiObservationComponentAttributesInterface {
  reserve_ride?: boolean;
  aad_fire?: boolean;
  aad_rescue?: boolean;
  packing_error?: boolean;
  gear_malfunction?: boolean;
  damage?: boolean;
  gear_failure?: boolean;
  rigger_error?: boolean;
  violation?: boolean;
  injury?: boolean;
  death?: boolean;
}
export interface ApiObservationFlagsInterface {
  cause?: boolean;
  barrier?: boolean;
  consequence?: boolean;
  root_cause?: boolean;
  incident?: boolean;
  final_consequence?: boolean;
}

export interface ApiObservationAskInterface {
  text?: ApiObservationAskTextInterface;
  skills?: number;
  knowledge?: number;
  attitude?: number;
}

export interface ApiObservationAskTextInterface {
  draft?: string;
  pending_review_hi?: string;
  pending_review_fs?: string;
  pending_review_su?: string;
}
export interface ApiWorkflowSettingsInterface {
  do_not_publish?: boolean;
  do_not_process_in_club?: boolean;
}
export interface ApiWorkflowInterface {
  state: string;
  comment?: string;
  last_transition?: Date;
  expires?: Date;
  name?: string;
  audit?: ApiWorkflowAuditInterface[];
  settings?: ApiWorkflowSettingsInterface;
}
export interface ApiWorkflowPayloadInterface {
  comment: string;
  do_not_publish?: boolean;
  do_not_process_in_club?: boolean;
}

export interface ApiWorkflowAuditInterface {
  c?: string;
  s: string;
  v: number;
  d: string;
  r: string;
  u: number;
  t: Date;
  a: string;
}

export interface ApiObservationCommentInterface {
  date?: Date;
  user?: number;
  comment?: string;
}
/**
 * Generic interfaces
 */

export interface ApiGeoInterface {

  type: string;
  coordinates: number[];
}

export interface ApiLocationItem {

  street?: string;
  city?: string;
  zip?: string;
  country?: string;
  state?: string;
  geo_class?: string;
  geo_type?: string;
  geo_place_id?: number;
  geo_importance?: number;
  geo?: ApiGeoInterface;

  nickname?: string;
  name?: string;
  county?: string;
  municipality?: string;
  icao?: string;

}

export interface ApiLocationList extends ApiEveBaseList {
  _items?: ApiLocationItem[];
}

export interface ApiObservationActionsInterface {
  local?: string[];
  central?: string[];
}
export interface ApiObservationRatingInterface {
  actual?: number;
  potential?: number;
}

export interface ApiObservationFlagsInterface {
  insurance?: boolean;
  aviation?: boolean;
  school?: boolean;
  flight_service?: boolean;
  e5x?: boolean;
}

export interface ApiObservationFileInterface {
  f?: string;
  r?: boolean;
}
export interface ApiFileItem extends ApiEveBaseItem {
  name?: string;
  description?: string;
  tags?: string[];
  content_type?: string;
  size?: number;
  owner?: number;
  ref: string;
  ref_id: string;
  file: any;
  activity?: string[];
  acl: ApiAclInterface;
}

export interface ApiFileList extends ApiEveBaseList {
  _items: ApiFileItem[];
}

/**
 * Clubs (our local club collection)
 */

export interface ApiClubItem extends ApiEveBaseItem {
  id: string;
  name?: string;
  active?: boolean;
  org?: string;
  locations?: ApiLocationItem[];
  planes?: Object;
  roles?: Object;
  ot?: number; // enum 1 and 2
  ci?: number;
  logo?: string; // base64 string
  url?: string;
}

export interface ApiClubList extends ApiEveLinks {
  _items: ApiClubItem[];
}

/**
 * Help
 */

export interface ApiHelpItem extends ApiEveBaseItem {
  title: string;
  key: string;
  body: string;
}

export interface ApiHelpList extends ApiEveBaseList {
  _items: ApiHelpItem[];
}

/**
 * Content
 */

export interface ApiContentItem extends ApiEveBaseItem {
  title: string;
  slug?: string;
  body: string;
  space_key: string;
  parent?: string;
  order?: number;
  ref?: string;
}

export interface ApiContentList extends ApiEveBaseList {
  _items: ApiContentItem[];
}
/**
 * TAGS
 */

export interface ApiTagItem extends ApiEveBaseItem {
  freq?: number;
  group?: string;
  activity?: string;
  related?: string[];
  tag: string;
}

export interface ApiTagList extends ApiEveBaseList {
  _items: ApiTagItem[];
}

// AIP, airspace, airports etc

export interface ApiAircraftsItem extends ApiEveBaseItem {
  callsign?: string;
  manufacturer?: string;
  model?: string;
  msn?: string;
  status?: string;
  type?: string;
  image?: string;
  e5x?: any;
}

export interface ApiAircraftsList extends ApiEveBaseList {
  _items: ApiAircraftsItem[];
}

export interface ApiNotificationsItem extends ApiEveBaseItem{
  type?: string;
  recepient?: number;
  sender?: number;
  event_id?: string;
  event_created?: Date;
  event_from?: string;
  event_from_id?: string;
  dismissable?: boolean;
  dismissed?: boolean|Date;
  transport?: string;
  status?: string;
  data?: any;
  acl?: ApiAclInterface;
}

export interface  ApiNotificationsList extends ApiEveBaseList{
  _items: ApiNotificationsItem[];

}

/**
 * E5X Interfaces!
 */
import {
  E5X,
  E5XAircraft,
  E5XEngine,
  E5XPropeller,
  E5XAirSpace,
  E5XFlightCrewMember,
  E5XFlightCrewLicenses,
  E5XIncapacitation,
  E5XRunway,
  E5XRunwayIncursion,
  E5XSeparation,
  E5XSeparationAircraft,
  E5XVehicle
} from 'app/interfaces/e5x.interface';
import { NlfAipAirspaceComponent } from 'app/aip/aip-airspace/aip-airspace.component';

// Choices
export interface ApiE5XChoicesItem extends ApiEveBaseItem {
  key?: string;
  value?: number;
  id?: number;
  label?: string;
  descr?: string;
  expl?: string;
  fir?: string;
  iata?: string;
  icao?: string;
  category?: string;
  sub_category?: string;
  cert_country?: string;
  easa_certificate?: string;
  icao_type?: string;
  tc_holder?: string;
  tc_name?: string;
  cictt_td?: string;
  tch_country?: string;
  type_description?: string;
  rit_version?: string;
}

export interface ApiE5XChoicesList extends ApiEveBaseList {
  _items: ApiE5XChoicesItem[];
}

export interface ApiE5XAttributesItem extends ApiEveBaseItem {
  attribute?: string;
  attribute_id?: number;
  parent_id?: number;
  datatype?: number;
  default?: number;
  special_attribute_id?: number;
  min?: number;
  max?: number;
  choices_key?: number;
  type?: string;
  restrictions?: { type?: string, min?: number, max?: number, inc?: number };
  rit_version?: string;
}
export interface ApiE5XAttributesList extends ApiEveBaseList {
  _items: ApiE5XAttributesItem[];
}
export interface ApiE5XTreeItem extends ApiEveBaseItem {
  name?: string;
  rit_version?: number;
  domain?: number;
  Occurrence?: any;
}

/**
 * Motorfly aircraft item
 *
 */
export interface ApiObservationAircraftsItem {

  aircraft?: ApiAircraftsItem;
  crew?: any[];
  parts?: any[];
  flight?: any[];
  airspace?: any;
  aerodrome?: any;
  occurrence?: {};
  wx?: {};

}

export interface ApiObservationAircraftsItemold extends ApiAircraftsItem {


  flight?: any;
  // E5X parts
  aircraft?: E5XAircraft;
  engines?: E5XEngine[];
  propellers?: E5XPropeller[];
  other?: any;

  pic?: ApiAircraftPersonInterface;
  fo?: ApiAircraftPersonInterface;
  so?: ApiAircraftPersonInterface;
  fe?: ApiAircraftPersonInterface;
  nav?: ApiAircraftPersonInterface;
  instructor?: ApiAircraftPersonInterface;
  student?: ApiAircraftPersonInterface;
  pax?: ApiAircraftPersonInterface[];
}

export interface Polygon {
  coordinates: [[[number, number]]];
  type: string;
}
export interface AipAirspaceLimit {
  altitude?: number;
  reference?: string;
  unit?: string;
}

export interface ApiAirspace extends ApiEveBaseItem {
  id?: number;
  name?: string;
  geometry?: Polygon;
  altlimit_bottom?: AipAirspaceLimit;
  altlimit_top?: AipAirspaceLimit;
  version?: string;
  type?: string;
  category?: string;
  country?: string;
}

export interface ApiAirspaces extends ApiEveBaseList {
  _items: ApiAirspace[];
}

export interface ApiAirport extends ApiEveBaseItem {
  id: number;
  icao: string;
  type?: string;
  name?: string;
  continent?: string;
  iso_country?: string;
  iso_region?: string;
  municipality?: string;
  scheduled_service?: string;
  gps_code?: string;
  iata_code?: string;
  local_code?: string;
  home_link?: string;
  wikipedia_link?: string;
  keywords?: string;
  location: ApiGeoInterface;
  e5x?: number;
}

export interface ApiAirports extends ApiEveBaseList {
  _items: ApiAirport[];
}

export interface ApiMetarDictItem {
  code?: string;
  type: string;
  mod: string;
  station_id: string;
  time: Date;
  cycle: number;
  wind_dir: { _compass: string, _degrees: number };
  wind_speed: { _units: string, _gtlt: any, _value: number };
  wind_gust: any;
  wind_dir_from: any;
  wind_dir_to: any;
  vis: { _units: string, _gtlt: any, _value: number, _num: any, _den: any };
  vis_dir: any;
  max_vis: any;
  max_vis_dir: any;
  temp: { _units: string, _value: number };
  dewpt: { _units: string, _value: number };
  press: { _value: number, _units: string };
  runway: string[];
  weather: [any[]];
  recent: any[];
  sky: [any[]];
  windshear: any[];
  wind_speed_peak: any;
  wind_dir_peak: any;
  peak_wind_time: any;
  wind_shift_time: any;
  max_temp_6hr: number;
  min_temp_6hr: number;
  max_temp_24hr: number;
  min_temp_24hr: number;
  press_sea_level: any;
  precip_1hr: any;
  precip_3hr: any;
  precip_6hr: any;
  precip_24hr: any;
}

export interface ApiMetarDict {
  icao: string;
  metar: ApiMetarDictItem;
}

export interface ApiTafMetar {
  taf?: string[];
  metar?: string[];
}

export interface ApiGeoAdminItem extends ApiEveBaseItem {
  id?: number;
  name?: string;
  local_id?: number;
  type?: string;
  country?: string;
  e5x?: number;
  geometry?: Polygon;

}

export interface ApiGeoAdminList extends ApiEveBaseList {
  _items: ApiGeoAdminItem[];

}

/**
API APP CONFIG
**/


export interface NlfConfigOrgItem {
  name?: string;
  letter?: string;
  key?: string;
  id?: number;
  org_id?: number;

  observation?: {
    create?: {local?: boolean, dev?: boolean, beta?: boolean, prod?: boolean},
    components?: { attributes: Object, flags: Object },
    flagsArr?: Array<string>,
    flags?: Object,
    rating?: Object,
    stateArr?: Array<string>,
    stateRoles?: Object,
    state?: Object,
    typesArr?: Array<string>,
    types?: Object,
    ask?: Object,
    e5x?: {
      enabled?: boolean,
      rit_version?: string,
      //submission?: boolean
    },
    categories?: Array<string>,
    operational?: {club?: boolean, op?: boolean, jumping?: boolean, flying?: boolean};
  };

}

export interface NlfAppsContentConfig {
  top_story?: string; // use unique key
}

export interface NlfApps {
  content?: NlfAppsContentConfig;
}
export interface NlfConfigItem {
  environment?: string;
  apiEndpoint?: string;
  nlf_org_id?: number;
  activities?: number[];
  activity_orgs?: Object;
  nif_roles?: Object;
  mapping?: Object;
  inv_mapping?: Object;
  luftsport?: NlfConfigOrgItem;
  fallskjerm?: NlfConfigOrgItem;
  motorfly?: NlfConfigOrgItem;
  sportsfly?: NlfConfigOrgItem;
  seilfly?: NlfConfigOrgItem;
  ballong?: NlfConfigOrgItem;
  hps?: NlfConfigOrgItem;
  modellfly?: NlfConfigOrgItem;
  apps?: NlfApps;
}

export interface NlfConfigRating {
  label?: string;
  value?: any;
  badge?: string;
}


export interface NIFRoles {
  klubbmedlem?: number,
  medlemsansvarlig?: number,
  leder?: number,
  utdanningskontakt?: number,
  integrasjonsbruker?: number,
  kursarrangør?: number,
  organsvarlig?: number,
  lisensansvarlig?: number,
  politiattest?: number,
  hovedinstruktør?: number,
  skolesjef?: number,
  operativleder?: number,
  orskoordinator?: number,
  fornyelse?: number,
  sikkerhetsansvarlig?: number,
}
