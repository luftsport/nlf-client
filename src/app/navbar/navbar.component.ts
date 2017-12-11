import { Component, OnInit } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {

 }
  isCollapsed = true;
  ngOnInit() {
  }

  //Temporary!
  logout() {
    localStorage.clear();

  }
}
