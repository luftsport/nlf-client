
export interface ApiEveLink {
  href: string;
  title: string;
}

export interface ApiEveLinks {
  parent: ApiEveLink;
  self: ApiEveLink;
  collection: ApiEveLink;
}

export interface ApiEveMeta {
  page: number;
  max_results: number;
  total: number;
}

export interface ApiEveBaseList {
  _meta?: ApiEveMeta;
  _links?: ApiEveLinks;
}

export interface ApiEveList extends ApiEveBaseList {
  _items: ApiEveItem[];

}

export interface ApiEveBaseItem {
  _id?: string;
  _etag?: string;
  _created?: Date;
  _version?: number;
  _latest_version?: number;
  _updated?: Date;
  _links?: ApiEveLinks;
}

export interface ApiEveItem {
  _id: string;
  id?: string;
}

export interface ApiEveBaseAggregateItem {
  _id: number | string;
  count: number | string;
}
export interface ApiEveBaseAggregateList {
  _items: ApiEveBaseAggregateItem[];
}

export interface ApiEveQueryInterface {
  where?: any; // string
  max_results?: number; // number
  page?: number; // number
  sort?: Object[] | string; // string or array? [{key: 1}] or ["-key", "key2", ...]
  aggregate?: any; // string
  projection?: any;
  version?: number | string; // 4 for v4 or 'DIFFS' for all diffs
  embedded?: any;
}


