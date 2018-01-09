import { Component, OnInit } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NlfAuthService } from '../../services/auth/auth.service';
import { Observable } from "rxjs";

@Component({
  selector: 'nlf-ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NlfUiNavbarComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(public authService: NlfAuthService) {
     this.isLoggedIn = authService.isAuthenticated();
  }

  isCollapsed = true;

  ngOnInit() {
  }


}
