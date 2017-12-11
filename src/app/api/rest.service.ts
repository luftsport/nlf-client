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


  /**
  @TODO: needs to have a parameter parser
  Use typical geojson, where methods to generate the correct parameters.

  **/

  protected getItem(relativeUrl: string, id: number, options: any): Observable<any> {
    return this.http.get(this.baseUrl + relativeUrl + id.toString(), this.getOptions(options));
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

}

export interface QueryParams {
  where? : {};
  max_results: number;
  page: number;
  options? : any;

}

