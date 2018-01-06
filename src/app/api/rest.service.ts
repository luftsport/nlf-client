import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
//import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EveItem, EveList } from "./eve.interface";
import { OptionsInterface } from './options.interface';


export abstract class RestService {

  //Api same address
  protected baseUrl: string = '/api/v1';

  constructor(private http: HttpClient
              //, private cookieService: CookieService
            ){}

  /**
  @TODO: needs to have a parameter parser
  Use typical geojson, where methods to generate the correct parameters.

  **/
  protected getOptions(options?: OptionsInterface) {

    if(!options) {
        options = {};
    }

    if(!!options.headers) {
      options.headers = Object.assign(options.headers, this.getDefaultHeaders());
    }
    else if(!!options){
      options.headers = this.getDefaultHeaders();
    }
    else {
      options = { headers: this.getDefaultHeaders() };
    }

    if(!!options.query){

      let params = new HttpParams();

      // sort is a different animal, make string first.
      if(!!options.query.sort && options.query.sort instanceof Object) {
        options.query.sort = JSON.stringify(options.query.sort).replace(/[{]/g, '(').replace(/[}]/g,')').replace(/:/g, ',');
      }

      Object.keys(options.query).forEach((k)=>{

        if(typeof options.query[k] == 'string' || typeof options.query[k] == 'number'){
          params = params.append(k,options.query[k]+'');
        }
        else {
          params = params.append(k,JSON.stringify(options.query[k]));
        }
      });

      options.params=params;

    }

    //options.responseType = 'application/json';
    //options.headers = new HttpHeaders().set(options.headers);
    return options;
  }

  protected getDefaultHeaders() {

    return {
      'Content-Type': 'application/json; charset=utf8',
      //'Accept': 'application/json',
      'Accept' : '*/*',
      'X-Angular-Rules': 'True'
    }
  }

  /**
  Get item by _id
  **/
  protected getItem(relativeUrl: string, id: number|string, options: OptionsInterface = {}): Observable<any> {
    console.log(relativeUrl);
    console.log(options);
    return this.http.get(this.baseUrl + relativeUrl + id.toString(), this.getOptions(options));
  }

  /**
  Get item by id (custom Number(id))
  **/
  protected getItemById(relativeUrl: string, id: number, options: OptionsInterface = {}): Observable<any> {
    console.log(relativeUrl);
    console.log(options);
    return this.http.get(this.baseUrl + relativeUrl + id.toString(), this.getOptions(options));
  }

  protected getList(relativeUrl: string, options: OptionsInterface = {}): Observable<any> {
    return this.http.get(this.baseUrl + relativeUrl, this.getOptions(options));
  }



  protected post(relativeUrl: string, data: any, options: OptionsInterface = {}): Observable<any> {

    return this.http.post(this.baseUrl + relativeUrl, JSON.stringify(data), this.getOptions(options));
    // and so on for every http method that your API supports
  }

  /**
  Needs _etag support in Headers
  **/
  protected put(relativeUrl: string, data: any, options: any, etag: any) {}
  protected patch(relativeUrl: string, data: any, options: any, etag: any) {}

}
