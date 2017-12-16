import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    //options.responseType = 'application/json';
    //options.headers = new HttpHeaders().set(options.headers);
    return options;
  }

  protected getDefaultHeaders() {

    return {
      'Content-Type': 'application/json; charset=utf8',
      'Accept': 'application/json',
      'X-Angular-Rules': 'True'
    }
  }

  protected getItem(relativeUrl: string, id: number, options: OptionsInterface = {}): Observable<any> {
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
