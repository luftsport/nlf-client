
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

export interface ApiEveBaseItem {
  _version?: number;
  _etag?: string;
  _created?: Date;
  _id?: string;
  _latest_version?: number;
  _updated?: Date;
  _links?: ApiEveLinks;
}

export interface ApiEveBaseList {
  _meta?: ApiEveMeta;
  _links?: ApiEveLinks;
}

export interface ApiEveItem {
  id?: string;
  _id: string;
}

export interface ApiEveList extends ApiEveBaseList {
  _items: ApiEveItem[];

}
