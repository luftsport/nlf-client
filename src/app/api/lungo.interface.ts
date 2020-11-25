
import { ApiEveLinks, ApiEveBaseItem, ApiEveBaseList, ApiEveQueryInterface } from './api-eve.interface';


export interface LungoLocation {

    geo?: { type: string, coordinates: [number, number] };
    score?: number;
    confidence?: number;
    quality?: string;
    distance?: number;
}

export interface LungoContact {

    city?: string;
    contact_id?: number;
    contact_information_id?: number;
    country_id?: number;
    email?: string[];
    phone_home?: string;
    phone_mobile?: string;
    phone_work?: string;
    secret_address?: boolean;
    secret_email?: boolean;
    secret_phone_home?: boolean;
    secret_phone_mobile?: boolean;
    secret_phone_work?: boolean;
    street_address?: string;
    zip_code?: string;
    location?: LungoLocation;
}

export interface LungoActivity {
    name?: string;
    id: number;
    code?: string;
}

export interface LungoPersonsSettings {
    restricted_address?: boolean;
    is_validated?: boolean;
    is_person_info_locked?: boolean;
    automatic_data_cleansing_reservation?: boolean;
    approve_publishing?: boolean;
    approve_marketing?: boolean;
}

/**
 * Functions
 */

export interface LungoFunctionsItem extends ApiEveBaseItem {
    id: number;
    type_id?: number;
    from_date?: Date;
    to_date?: Date;
    // active in org to become legacy
    active_in_org_id?: number;
    org_id?: number;
    org_type_id?: number;
    contact_id?: number;
    contact_information_id?: number;
    fa_function_id?: number;
    has_paid_membership?: boolean;
    is_deleted?: boolean;
    is_passive?: boolean;
    person_id?: number;
    role_level_id?: number;
    update_permission?: boolean;
    type_is_license?: boolean;
    type_publish?: boolean;
    type_name?: string;
}
export interface LungoFunctionsList extends ApiEveBaseList {
    _items: LungoFunctionsItem[];
}

export interface LungoFunctionsTypesItem extends ApiEveBaseItem {
    is_license?: boolean;
    is_valid?: boolean;
    name?: string;
    org_id_owner?: number;
    org_name_owner?: string;
    publish?: boolean;
    category_id?: number;
    category_name?: string;
    id: number;
    type_no?: string;
}
export interface LungoFunctionsTypesList extends ApiEveBaseList {
    _items: LungoFunctionsTypesItem[];
}

/**
 * Organizations
 */
export interface LungoOrganizationsItem extends ApiEveBaseItem {

    id: number;
    type_id?: number;
    parent_id?: number;
    authority_id?: number;
    name?: string;
    short_name?: string;
    comment?: string;
    created?: Date;
    modified?: Date;
    nif_organization_number?: string;
    describing_name?: string;
    is_active?: boolean;
    local_council_id?: number;
    local_council_name?: string;
    _up?: [{ id: number; type: number }];
    _down?: [{ id: number; type: number }];
    activities?: LungoActivity[];
    main_activity?: LungoActivity;
    contact?: LungoContact;
    account?: { account_id: number; account_no: string; };
}
export interface LungoOrganizationsList extends ApiEveBaseList {
    _items: LungoOrganizationsItem[];
}

export interface LungoOrganizationsTypesItem extends ApiEveBaseItem {
    is_legal?: boolean;
    org_type_id?: number;
    org_type_no?: string;
    org_type_text?: string;
}
export interface LungoOrganizationsTypesList extends ApiEveBaseList {
    _items: LungoOrganizationsTypesItem[];
}
/**
 * Competences
 */

export interface LungoCompetencesItem extends ApiEveBaseItem {
    id: number;
    person_id: number;
    approved_by_person_id?: number;
    title?: string;
    type_id?: number;
    date?: Date;
    valid_until?: Date;
    approved_by_org_id?: number;
    course_id?: number;
    passed?: boolean;
    sald?: number;
    additional_title?: string;
}
export interface LungoCompetencesList extends ApiEveBaseList {
    _items: LungoCompetencesItem[];
}

/**
 * Licenses
 */

export interface LungoLicensesItem extends ApiEveBaseItem {
    id: number;
    person_id?: number;
    expiry?: Date;
    type_id?: number;
    type_name?: string;
    status_date?: Date;
    status_id?: number;
    competitor_id?: number;
    invoice_type_id?: number;
    invoice_type_name?: string;
    kid?: number;
    online_payment?: boolean;
    org_id_owner?: number;
    paid_date?: Date;
    registered_date?: Date;
    total_paid_amount?: number;
    update_permission?: boolean;
    period_from_date?: Date;
    period_function_type_count?: number;
    period_id?: number;
    period_name?: string;
    period_owner_account_id?: number;
    period_owner_contact_id?: number;
    period_owner_org_id?: number;
    period_owner_org_name?: string;
    period_to_date?: Date;
    status_text?: string;
    type_price?: number;
}
export interface LungoLicensesList extends ApiEveBaseList {
    _items: LungoLicensesItem[];
}

export interface LungoLicensesTypesItem extends ApiEveBaseList {
    id: number;
    org_id_owner: number;
    period_id: number;
    class_id: number;
    born_after?: Date;
    born_before?: Date;
    description?: string;
    gender_id?: number;
    is_deleted?: boolean;
    is_payable?: boolean;
    is_valid?: boolean;
    price?: number;
    text?: string;
}
export interface LungoLicensesTypesList extends ApiEveBaseList {
    _items: LungoLicensesTypesItem[];
}

/**
export interface LungoLicensesItem extends ApiEveBaseItem {
    id: number;
    name: string;
}
export interface LungoLicensesList extends ApiEveBaseList {
    _items: LungoLicensesItem[];
}
 */

/**
 * Activities
 */

export interface LungoActivitiesItem extends ApiEveBaseItem {
    id: number;
    org_id_owner?: number;
    org_name_owner?: string;
    code?: number;
    name?: string;
    parent_activity_id?: number;
}
export interface LungoActivitiesList extends ApiEveBaseList {
    _items: LungoActivitiesItem[];
}

/**
 * Counties
 */
export interface LungoCountiesItem extends ApiEveBaseItem {
    id: number;
    name: string;
    parent_id: number;
    region_no: string;
}
export interface LungoCountiesList extends ApiEveBaseList {
    _items: LungoCountiesItem[];
}
/**
 * Countries
 */
export interface LungoCountriesItem extends ApiEveBaseItem {
    iso_alpha2: string;
    iso_alpha3: string;
    id: number;
    name: string;
}
export interface LungoCountriesList extends ApiEveBaseList {
    _items: LungoCountriesItem[];
}

/**
 * Persons
 */
export interface LungoPersonsMembershipsPaymentItem {
  id?: number;
  year?: number;
  exception?: string;
  type?: string;
  amount?: number;
  paid?: Date;
}

export interface LungoPersonsMembershipsItem {
    id?: number;
    club?: number;
    discipline?: number;
    activity?: number;
    from_date?: Date;
    payment?: LungoPersonsMembershipsPaymentItem;
}

export interface LungoPersonsCompetenceItem {
    id: number;
    _code?: number;
    issuer?: number;
    expiry?: Date;
    paid?: Date;
}
export interface LungoPersonsLicenseItem {
    id: number;
    status_id?: number;
    status_date?: Date;
    expiry?: Date;
    type_id?: number;
    type_name?: string;
}
export interface LungoPersonsItem extends ApiEveBaseItem {
    id: number;
    _merged_to?: number;
    birth_date?: Date;
    date_of_death?: Date;
    created_date?: Date;
    last_changed_date?: Date;
    file_upload_id?: number;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    functions?: number[] | LungoFunctionsItem[];
    clubs?: number[] | LungoOrganizationsItem[];
    activities?: number[] | LungoActivitiesItem[];
    memberships?: LungoPersonsMembershipsItem[];
    competences?: LungoPersonsCompetenceItem[] | LungoCompetencesItem[];
    licenses?: LungoPersonsLicenseItem[] | LungoLicensesItem[];
    nationality_id?: number;
    sport_no?: string;
    user_id?: number;
    gender?: string;
    address?: LungoContact;
    settings?: LungoPersonsSettings;
}
export interface LungoPersonsList extends ApiEveBaseList {
    _items: LungoPersonsItem[];
}

export interface LungoPersonsSearchItem extends ApiEveBaseItem {
    full_name?: string;
    id: number;
    _score?: number;
}
export interface LungoPersonsSearchList extends ApiEveBaseList {
    _items: LungoPersonsSearchItem[];
}


/**
 * Integration
 * Syncdaemon
 * Syncdaemon/workers
 * Aggregations
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

export interface LungoSyncdaemonWorkerLogList {
    _items: string[];
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

/**
 * integration:
 * _changes
 * _changes_entity_types
 * _changes_clubs
 * _changes_status
 * _changes_change_type
 */

export interface LungoIntegrationChangesItem extends ApiEveBaseItem {
    change_type: string;
    created: Date;
    entity_type: string;
    id: number;
    merge_result_of?: number[];
    modified: Date;
    name?: string;
    sequence_ordinal: Date;
    _ordinal?: string;
    _status?: string;
    _org_id: number;
    _realm?: string;
}
export interface LungoIntegrationChangesList extends ApiEveBaseList {
    _items: LungoIntegrationChangesItem[];
}

export interface LungoIntegrationUsersItem extends ApiEveBaseItem {
    username: string;
    password?: string;
    function_id: number;
    modified: Date;
    id: number;
    app_id: number;
    club_id: number;
    _active: boolean;
    _realm: string;
}
export interface LungoIntegrationUsersList extends ApiEveBaseList {
    _items: LungoIntegrationUsersItem[];
}


export interface LungoIntegrationChangesStatusItem {
    _id?: string;
    count?: number;
}

export interface LungoIntegrationChangesStatusList extends LungoIntegrationChangesStatusItem {
    _items: LungoIntegrationChangesStatusItem[];
}

/**
 * Aggregate day, haour, day_hour
 */
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
