
export interface EveLink {
  href: string;
  title: string;
}

export interface EveLinks {
  parent: EveLink;
  self: EveLink;
  collection: EveLink;
}

export interface EveMeta {
  page: number;
  max_results: number;
  total: number;
}

export interface EveItem {
  id : string;
  _id : string;
}

export interface EveItems {
  _items : EveItem[];
  _meta : EveMeta;
  _links : EveLinks;
}
