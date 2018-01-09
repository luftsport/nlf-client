
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

export interface ApiEveItem {
  id?: string;
  _id: string;
}

export interface ApiEveList {
  _items: ApiEveItem[];
  _meta: ApiEveMeta;
  _links: ApiEveLinks;
}
