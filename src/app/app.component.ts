import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly title = 'NLF';
  //For navbar!|
  isLoggedIn : Observable<boolean>;
  isCollapsed = false;

  public constructor(private titleService: Title,
                     public authService: AuthService) {
    this.isLoggedIn = authService.isAuthenticated();
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( this.title + ' ' + newTitle );
  }




}
