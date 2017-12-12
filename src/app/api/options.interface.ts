import { QueryInterface } from './query.interface';

export interface OptionsInterface {

  body?: any;
  params?: QueryInterface; //HttPrams or {key=>val} object
  headers?: any; //HttpHeaders or {key=>val} object
  reportProgress?: boolean;
  responseType?: string;
  withCredentials?: boolean;

}
