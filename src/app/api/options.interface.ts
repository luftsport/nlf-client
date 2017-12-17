import { QueryInterface } from './query.interface';
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http/src/params";

export interface OptionsInterface {
  query?: QueryInterface;
  body?: any;
  params?: HttpParams | { [param: string]: string | string[];};
  headers?: HttpHeaders | { [header: string]: string | string[]; }
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  observe?: 'body';
}
