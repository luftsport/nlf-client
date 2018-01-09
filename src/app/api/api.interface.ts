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

import { ApiEveLinks, ApiEveMeta } from './api-eve.interface';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http/src/params';


/**
 * The api query and options interface
 */

export interface ApiQueryInterface {
    where?: any; // string
    max_results?: number; // number
    page?: number; // number
    sort?: any; // string or array? [{key: 1}] or ["-key", "key2", ...]
    aggregate?: any; // string
    projection?: any;
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

export interface ApiNlfMembershipItem {
    _id: string;
    id: string;
    name: string;
}

export interface ApiNlfMembershipList {
    _items: ApiNlfMembershipItem[];

}
export interface ApiNlfClubItem {
    _id: string;
    id: string;
    name: string;
}

export interface ApiNlfClubList {
    _items: ApiNlfClubItem[];

}

export interface ApiNlfUserList {
    _items: ApiNlfUserItem[];
    _links: ApiEveLinks;
    _meta: ApiEveMeta;
}

export interface ApiNlfLicenseInterface {
    rights: string[];
    expiry?: Date;
}

export interface ApiNlfUserItem {
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

    _version?: number;
    _etag: string;
    _created: Date;
    _id: string;
    //_latest_version: number;
    _updated: Date;
    _links: ApiEveLinks;
}

export interface ApiNlfLicenseItem {
    _id: string;
    id: string;
    name: string;
}

export interface ApiNlfLicenseList {
    _items: ApiNlfLicenseItem[];

}

/**
 * Api User item
 */
export interface ApiUserItem {
    id: number;

    avatar?: any;
    settings?: any;
    custom?: any;
    info?: any;
    stastistics?: any;

    acl: any;

    _etag: string;
    _created: Date;
    _id: string;
    _updated: Date;
    _links: ApiEveLinks;
}

export interface ApiUserList {
    _items: ApiUserItem[];
    _links: ApiEveLinks;
    _meta: ApiEveMeta;
}


/**
 * Api Acl and groups and roles
 */

export interface ApiAclGroupItem {
    _id: string;
    name: string;
    description: string;
    ref: string;
}

export interface ApiAclGroupList {
    _items: ApiAclGroupItem[];

}
export interface ApiAclRoleItem {
    _id: string;
    name: string;
    description?: string;
    ref?: string;
    group?: any;
}

export interface ApiAclRoleList {
    _items: ApiAclRoleItem[];
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

}
