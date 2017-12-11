import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {EveItem} from "./eve.interface";


export abstract class RestService {

  //Api same address
  protected baseUrl: string = '/api/v1';

  constructor(private http: HttpClient
              //, private cookieService: CookieService
            ){}

  protected get headers(): Headers {

    // for example, add an authorization token to each request,
    // take it from some CookieService, for example

    //const token: string = this.cookieService.get('token');
    return new Headers({token: 'abcde'});
  }


  /**
  @TODO: needs to have a parameter parser
  Use typical geojson, where methods to generate the correct parameters.

  **/
  protected getOptions(options: any) {

    if(options && options.length > 0) {
      return options.concat({headers: this.getHeaders()});
    }
    else {
      return {headers: this.getHeaders()};
    }
  }

  protected getHeaders() {

    let headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json; charset=utf8');
    headers.append('Accept', 'application/json');

    return headers;

  }

  protected getItem(relativeUrl: string, id: number, options: any): Observable<any> {
    return this.http.get(this.baseUrl + relativeUrl + id.toString(), this.getOptions(options));
    //, new RequestOptions({headers: this.headers})
      //.subscribe(data => {
      //  console.log(data);
      //}
  }

  protected getList(relativeUrl: string, params: QueryParams): Observable<any> {
    return this.http.get(this.baseUrl + relativeUrl + this.toQuery(params), this.getOptions(params.options));
  }

  toQuery(params: QueryParams) : string{
    let wherePart = '';
    if(params.where){
      wherePart = JSON.stringify(params.where)+'&';
    }
    return '?'+wherePart+'page='+params.page+'&max_results='+params.max_results
  }

  protected getOptions(options?: any) {

    if(options && options.length > 0) {
      return options.concat({headers: this.getHeaders()});
    }
    else {
      return {headers: this.getHeaders()};
    }
  }

  protected getHeaders() {

    let headers = new HttpHeaders();
    console.log("Test");
    return headers.set('Content-Type', 'application/json; charset=utf8').set('Accept', 'application/json');

  }
  protected post(relativeUrl: string, data: any, options: any) {

    return this.http.post(this.baseUrl + relativeUrl, JSON.stringify(data),
  {headers: this.getHeaders()});
    // and so on for every http method that your API supports
  }

  /**
  Needs _etag support in Headers
  **/
  protected put(relativeUrl: string, data: any, options: any, etag: any) {}
  protected patch(relativeUrl: string, data: any, options: any, etag: any) {}
export interface QueryParams {
  where? : {};
  max_results: number;
  page: number;
  options? : any;

}

