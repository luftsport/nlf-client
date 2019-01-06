import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';
// import { Observable } from 'rxjs/';
import { NlfLocalStorageService } from 'app/services/storage/local-storage.service';

@Injectable()
export class NlfAuthSubjectService {


  private auth: BehaviorSubject<boolean>;

  observableAuth: Observable<boolean>;

  constructor(private storage: NlfLocalStorageService) {

    this.auth = new BehaviorSubject<boolean>(true); //this.storage.hasToken());
    this.observableAuth = this.auth.asObservable();
  }

  public update(auth: boolean) {

    this.auth.next(auth);
  }

}
