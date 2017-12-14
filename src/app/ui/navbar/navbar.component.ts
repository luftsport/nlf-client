import { Component, OnInit } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) {}

  isCollapsed = true;

  ngOnInit() {
  }


}
