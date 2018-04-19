import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs/';
import { NlfLocalStorageService } from './../storage/local-storage.service';

@Injectable()
export class NlfAuthSubjectService {


  private auth: BehaviorSubject<boolean>;

  observableAuth: Observable<boolean>;

  constructor(private storage: NlfLocalStorageService) {

    this.auth = new BehaviorSubject<boolean>(this.storage.hasToken());
    this.observableAuth = this.auth.asObservable();
  }

  public update(auth: boolean) {

    this.auth.next(auth);
  }

}
