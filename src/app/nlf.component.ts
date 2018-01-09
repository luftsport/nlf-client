import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NlfAuthService } from './services/auth/auth.service';
import { Observable } from "rxjs";

@Component({
  selector: 'nlf-root',
  templateUrl: './nlf.component.html',
  styleUrls: ['./nlf.component.css']
})
export class NlfComponent {

  readonly title = 'NLF';
  // For navbar!|
  isLoggedIn: Observable<boolean>;
  isCollapsed = false;

  public constructor(private titleService: Title,
                     public authService: NlfAuthService) {
    this.isLoggedIn = authService.isAuthenticated();
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( this.title + ' ' + newTitle );
  }




}
