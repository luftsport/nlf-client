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

  protected getItem(relativeUrl: string, id: number, options: any): Observable<any> {
    return this.http.get(this.baseUrl + relativeUrl + id.toString(), this.getOptions(options));
    //, new RequestOptions({headers: this.headers})
      //.subscribe(data => {
      //  console.log(data);
      //}
  }

  protected getOptions(options: any) {

    if(options && options.length > 0) {
      return options.concat({headers: this.getHeaders()});
    }
    else {
      return {headers: this.getHeaders()};
    }
  }
  protected getList(relativeUrl: string, options: any): Observable<any> {


    return this.http.get(this.baseUrl + relativeUrl, this.getOptions(options));
  }

  protected getHeaders() {

    let headers = new HttpHeaders();
    console.log("Test");
    if(localStorage.getItem('token64')) {
      console.log("Inside token");
        return headers.set('Authorization', 'Basic ' + localStorage.getItem('token64')).set('Content-Type', 'application/json; charset=utf8').set('Accept', 'application/json');;
    }
    console.log(headers);
    return headers.set('Content-Type', 'application/json; charset=utf8').set('Accept', 'application/json');

  }
  protected post(relativeUrl: string, data: any, options: any) {

    return this.http.post(this.baseUrl + relativeUrl, JSON.stringify(data),
  {headers: this.getHeaders()});
    // and so on for every http method that your API supports
  }

}
