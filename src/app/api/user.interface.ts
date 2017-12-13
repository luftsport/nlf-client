import { EveLink, EveLinks, EveMeta } from './eve.interface';
import { LocationInterface } from './location.interface';
import { MembershipInterface } from './membership.interface';
import { LicenseInterface } from './license.interface';

export interface UserItem {
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
    _links: EveLinks;
}

export interface UserList {
  _items: UserItem[];
  _links: EveLinks;
  _meta: EveMeta;
}
