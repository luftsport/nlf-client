import { Component, OnInit } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AuthService } from '../../auth/auth.service';
import { Observable } from "rxjs";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn : Observable<boolean>;

  constructor(public authService: AuthService) {
     this.isLoggedIn = authService.isAuthenticated();
  }

  isCollapsed = true;

  ngOnInit() {
  }


}
