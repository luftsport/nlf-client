import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { Observable } from 'rxjs';
import { ApiOptionsInterface } from './api.interface';


export abstract class ApiRestService {

  // Api same address
  protected baseUrl = '/api/v1';

  constructor(private http: HttpClient) { }

  /**
  @TODO: needs to have a parameter parser
  Use typical geojson, where methods to generate the correct parameters.

  **/
  protected getOptions(options?: ApiOptionsInterface, etag?: string) {

    if (!options) {
      options = {};
    }

    if (!!options.params) {
      console.log('Use of params is not allowed, use query');
      console.log(options.params);
    }

    if (!!options.headers) {
      options.headers = Object.assign(options.headers, this.getDefaultHeaders(etag));

    } else if (!!options) {
      options.headers = this.getDefaultHeaders(etag);

    } else {
      options = { headers: this.getDefaultHeaders(etag) };
    }

    if (!!options.query) {

      let params = new HttpParams();


      // sort is a different animal, make string first.
      //if (!!options.query.sort && options.query.sort instanceof Object) {
      //  options.query.sort = JSON.stringify(options.query.sort).replace(/[{]/g, '(').replace(/[}]/g, ')').replace(/:/g, ',');
      //}

      Object.keys(options.query).forEach((k) => {

        if (k === 'sort') {

          params = params.append(k, JSON.stringify(options.query.sort).replace(/[{]/g, '(').replace(/[}]/g, ')').replace(/:/g, ','));

        } else if (typeof options.query[k] === 'string' || typeof options.query[k] === 'number') {

          params = params.append(k, options.query[k] + '');

        } else {

          params = params.append(k, JSON.stringify(options.query[k]));

        }
      });

      if (!(options.params instanceof HttpParams)) {
        options.params = params;
      } else {
        try {
          options.params = Object.assign(options.params, params);

        } catch (e) {
          console.log(e);
        }
      }



    }

    // options.responseType = 'application/json';
    // options.headers = new HttpHeaders().set(options.headers);
    return options;
  }

  protected getDefaultHeaders(etag?: string) {
    let headers = {
      'Content-Type': 'application/json; charset=utf8',
      // 'Accept': 'application/json',
      'Accept': '*/*',
      'X-Angular-Rules': 'True'
    };

    if (!!etag) {
      headers['If-Match'] = etag;
    }
    return headers;
  }

  /**
  Get item by _id
  **/
  protected getItem(relativeUrl: string, id: number | string, options: ApiOptionsInterface = {}): Observable<any> {
    // console.log(relativeUrl);
    // console.log(options);
    return this.http.get(this.baseUrl + relativeUrl + id.toString(), this.getOptions(options));
  }

  /**
  Get item by id (custom Number(id))
  **/
  protected getItemById(relativeUrl: string, id: number, options: ApiOptionsInterface = {}): Observable<any> {
    // console.log(relativeUrl);
    // console.log(options);
    return this.http.get(this.baseUrl + relativeUrl + id.toString(), this.getOptions(options));
  }

  protected getList(relativeUrl: string, options: ApiOptionsInterface = {}): Observable<any> {
    return this.http.get(this.baseUrl + relativeUrl, this.getOptions(options));
  }

  protected post(relativeUrl: string, data: any, options: ApiOptionsInterface = {}): Observable<any> {

    return this.http.post(this.baseUrl + relativeUrl, JSON.stringify(data), this.getOptions(options));
    // and so on for every http method that your API supports
  }

  /**
  Needs _etag support in Headers
  **/
  protected put(relativeUrl: string, _id: string, data: any, options: ApiOptionsInterface = {}, etag?: string): Observable<any> {
    return this.http.put(this.baseUrl + relativeUrl + _id, JSON.stringify(data), this.getOptions(options, etag));
  }

  protected patch(relativeUrl: string, _id: string, data: any, options: ApiOptionsInterface = {}, etag?: string): Observable<any> {

    return this.http.patch(this.baseUrl + relativeUrl + _id, JSON.stringify(data), this.getOptions(options, etag));

  }

  protected delete(relativeUrl: string, _id: string, options: ApiOptionsInterface = {}, etag?: string): Observable<any> {
    return this.http.delete(this.baseUrl + relativeUrl + _id, this.getOptions(options, etag));
  }

}
