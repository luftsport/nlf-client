import { EveLink, EveLinks, EveMeta } from './eve.interface';
import { LocationInterface } from './location.interface';
import { MembershipInterface } from './membership.interface';
import { LicenseInterface } from './license.interface';

export interface UserItem {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    updated: Date;

    phone?: string;
    email?: string;
    gender?: string;
    birthdate?: Date;

    membership: MembershipInterface;
    licenses: LicenseInterface;
    location: LocationInterface;

    _version?: number;
    _etag: string;
    _created: Date;
    _id: string;
    //_latest_version: number;
    _updated: Date;
    _links: EveLinks;
}

export interface UserList {
  _items: UserItem[];
  _links: EveLinks;
  _meta: EveMeta;
}
