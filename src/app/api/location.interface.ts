import { GeoInterface } from './geo.interface';

export interface LocationInterface {

  street?: string;
  city?: string;
  zip?: string;
  country?: string;
  state?: string;
  geo_class?: string;
  geo_type?: string;
  geo_place_id?: number;
  geo_importance?: number;
  geo?: GeoInterface;

}
