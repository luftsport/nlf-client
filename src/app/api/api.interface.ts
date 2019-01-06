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

import { ApiEveLinks, ApiEveMeta, ApiEveBaseItem, ApiEveBaseList } from './api-eve.interface';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http/src/params';


/**
 * The api query and options interface
 */

export interface ApiQueryInterface {
    where?: any; // string
    max_results?: number; // number
    page?: number; // number
    sort?: Object[]; // string or array? [{key: 1}] or ["-key", "key2", ...]
    aggregate?: any; // string
    projection?: any;
    version?: number | string;
}


export interface ApiOptionsInterface {
    query?: ApiQueryInterface;
    body?: any;
    params?: HttpParams | { [param: string]: string | string[]; };
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    observe?: 'body';
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
    location: ApiLocationInterface;
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
export interface ApiUserItem extends ApiEveBaseItem {
    id: number;

    avatar?: any;
    settings?: any;
    custom?: any;
    info?: any;
    stastistics?: any;

    acl?: ApiAclInterface;

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
export interface ApiAclInterface {
    read?: { groups?: string[], roles?: string[], users?: number[] };
    write?: { groups?: string[], roles?: string[], users?: number[] };
    execute?: { groups?: string[], roles?: string[], users?: number[] };
}

/**
 * Checking acl for user for resource item
 * @Todo: Need to get _id as string from backend
 */
export interface ApiAclUserInterface {
    w?: boolean;
    x?: boolean;
    r?: boolean;
    resource: string;
    u: number;
    _id?: { '$oid': string } | string;

}
/**
 * Observations interface
 * - All 2. level list items or lists must be declared in seperate *Interface
 * - Components can then use these sub Interfaces directly
 */

export interface ApiObservationsItem extends ApiEveBaseItem {

    id: number;
    type?: string;
    flags?: ApiObservationFlagsInterface;
    ask?: ApiObservationAskInterface;
    tags?: string[];
    club: string;
    location: ApiLocationInterface;
    owner: number;
    reporter: number;
    when: Date;
    involved?: ApiObservationInvolvedInterface;
    organization?: ApiObservationOrganizationInterface;
    rating?: ApiObservationRatingInterface;
    weather?: ApiObservationWeatherInterface;
    components?: ApiObservationComponentInterface[];
    files?: ApiObservationFileInterface[];
    related?: number[];
    actions?: ApiObservationActionsInterface;
    comments?: ApiObservationCommentInterface[];
    workflow?: ApiWorkflowInterface;
    watchers?: number[];
    acl?: ApiAclInterface;
}

export interface ApiObservationsList extends ApiEveBaseList {
    _items: ApiObservationsItem[];
}

export interface ApiObervationComponentsInterface {
    temp: string;
}

export interface ApiObservationInvolvedInterface {
    id?: number;
    tmpname?: string;
    gear?: ApiObservationInvolvedGearInterface;
    licenses?: { rights: string[], expiry?: Date };
    numberOfJumps?: number;
    yearsOfExperience?: number;
    jumptypeSelected?: string;
    jumptypeTags?: string[];
    aircraft?: string;
    jumpAltitude?: number;
    verdict?: { fu?: boolean; ph?: boolean; mh?: boolean };
}

export interface ApiObservationInvolvedGearInterface {

    harnessExperience?: number;
    harnessType?: string;
    aadType?: string;
    mainCanopyExperience?: number;
    reserveCanopySize?: number;
    reserveCanopyType?: string;
    mainCanopyType?: string;
    mainCanopySize?: number;
    rigger?: [{ id?: number, tmpname?: string }];
    riggerdate?: Date;
    other?: string[];

}

export interface ApiObservationOrganizationInterface {
    hm?: [{ id?: number, tmpname?: string }];
    pilot?: [{ id?: number, tmpname?: string }];
    hfl?: [{ id?: number, tmpname?: string }];
    hl?: [{ id?: number, tmpname?: string }];
    hi: number[];

}

export interface ApiObservationWeatherInterface {
    manual?: {
        wind: { max: number, avg: number, min: number, turbulence: boolean, gusting?: boolean },
        clouds: { base?: number, rain?: boolean, fog?: boolean, hail?: boolean, snow?: boolean, thunder?: boolean },
        temp: { ground?: number, altitude?: number },
        description?: string
    };
    auto?: { yr: any, metar?: string, taf?: string, shorttaf?: string };

}

export interface ApiObservationComponentInterface {
    when?: Date;
    where?: { at?: string, altitude?: number };
    how?: string;
    what?: string;
    involved?: [{ id?: number, tmpname?: string }];
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
export interface ApiWorkflowInterface {
    state: string;
    comment?: string;
    last_transition?: Date;
    expires?: Date;
    name?: string;
    audit?: ApiWorkflowAuditInterface[];
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
    coordinates: [number, number];
}

export interface ApiLocationInterface {

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
    locations?: ApiLocationInterface[];
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
    freq: number;
    group: string;
    related: string[];
    tag: string;
 }

 export interface ApiTagList extends ApiEveBaseList {
     _items: ApiTagItem[];
 }

/**
 * Lungo!
 */

 export interface LungoSyncdaemonWorkersStatusItem {
    name?: string;
    id?: number;
    status?: boolean;
    state?: string;
    mode?: string;
    reason?: string;
    index?: number;
    uptime?: number[];
    started?: Date;
    messages: number;
    sync_type?: string;
    sync_interval?: Date[];
    sync_misfires?: number;
    sync_errors?: number;
    next_run_time?: Date;
 }

 export interface LungoSyncdaemonWorkersStatusList extends LungoSyncdaemonWorkersStatusItem {
    _items: LungoSyncdaemonWorkersStatusItem[];
}

export interface LungoSyncdaemonWorkersLogsItem {
    id: number;
    log: string[];
}
export interface LungoSyncdaemonWorkersLogsList extends LungoSyncdaemonWorkersLogsItem {
    _items: LungoSyncdaemonWorkersLogsItem[];

}

export interface LungoSyncdaemonProcessInfoItem {
    uids?: number[];
    cpu_percent?: number;
    username?: string;
    name?: string;
    threads?: [number[]];
    num_ctx_switches?: number[];
    cpu_num?: number;
    cpu_times?: number[];
    io_counters?: number[];
    create_time?: number;
    exe?: string;
    gids?: number[];
    num_threads?: number;
    connections?: [[]];
    cpu_affinity?: number[];
    memory_percent?: number;
    ionice?: number[];
    nice?: number;
    cwd?: string;
    ppid?: number;
    memory_full_info?: number[];
    pid?: number;
    cmdline?: string[];
    status?: string;

}

export interface LungoIntegrationChangesStatusItem {
    _id?: string;
    count?: number;
}

export interface LungoIntegrationChangesStatusList extends LungoIntegrationChangesStatusItem {
    _items: LungoIntegrationChangesStatusItem[];
}

export interface AggregateByDateItem {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
}
export interface LungoIntegrationChangesAggregateItem extends AggregateByDateItem {
    _id?: AggregateByDateItem;
    count?: number;
}

export interface LungoIntegrationChangesAggregateList extends LungoIntegrationChangesAggregateItem {
    _items: LungoIntegrationChangesAggregateItem[];
}

