import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthDataSubjectInterface } from 'app/api/api.interface';

@Injectable()
export class NlfAuthSubjectService {


  private auth: BehaviorSubject<boolean>;
  observableAuth: Observable<boolean>;
  private authData: BehaviorSubject<AuthDataSubjectInterface>;
  observableAuthData: Observable<AuthDataSubjectInterface>;

  constructor() {

    this.auth = new BehaviorSubject<boolean>(false);
    this.observableAuth = this.auth.asObservable();

    this.authData = new BehaviorSubject<AuthDataSubjectInterface>(null);
    this.observableAuthData = this.authData.asObservable();

    const token = localStorage.getItem('auth-token');
    if (!!token) {
      try {
        this.update(true);
        this.updateAuthData(
          {
            person_id: +localStorage.getItem('auth-id'),
            token: token,
            valid: new Date(localStorage.getItem('auth-valid'))
          });
      } catch (e) {
        this.update(false);
        this.updateAuthData(null);
      }
    }
  }

  public update(auth: boolean) {

    this.auth.next(auth);
  }
  public updateAuthData(data: AuthDataSubjectInterface) {

    this.authData.next(data);
  }

}
