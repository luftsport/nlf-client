import { HttpClient, HttpHeaders} from '@angular/common/http';
//import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';


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

  protected getItem(relativeUrl: string, id: number): Observable<any> {
    return this.http.get(this.baseUrl + relativeUrl + id.toString());
    //, new RequestOptions({headers: this.headers})
      //.subscribe(data => {
      //  console.log(data);
      //}
  }

  protected getList(relativeUrl: string): Observable<any> {
      return this.http.get(this.baseUrl + relativeUrl);
  }


  protected post(relativeUrl: string, data: any) {
    // and so on for every http method that your API supports
  }

}
