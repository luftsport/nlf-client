
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
