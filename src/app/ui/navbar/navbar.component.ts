import { Component, OnInit } from '@angular/core';
import { NlfAuthSubjectService } from '../../services/auth/auth-subject.service';
import { NlfAuthService } from './../../services/auth/auth.service';

// import { Observable } from "rxjs";

@Component({
  selector: 'nlf-ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NlfUiNavbarComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(public authSubject: NlfAuthSubjectService,
              public authService: NlfAuthService) {

    this.authSubject.observableAuth.subscribe(
      auth => this.isLoggedIn = auth,
      err => this.isLoggedIn = false
    );
  }

  isCollapsed = true;

  ngOnInit() {
  }


}
