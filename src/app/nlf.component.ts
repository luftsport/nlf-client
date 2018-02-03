import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
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
    public authService: NlfAuthService,
    private router: Router) {
    this.isLoggedIn = authService.isAuthenticated();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(this.title + ' ' + newTitle);
  }

  /**
   * @TODO: MUST REMOVE TO OTHER STRATEGY!
   */
  public isPublicPage() {

    this.router.events.subscribe((event: NavigationEnd) => {
      try {
        if (event.url.substring(1, 6) === 'error') { 
          return true
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    });
    /** 
    this.router.events.subscribe(res => {
      
      if( this.router.url.substring(1,6) === 'error') {
        return true;
      } else {
        return false;
      }
    });

    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(e => {
        console.log(this.router.routerState.root.firstChild.url['_value'][0]['path']);
      });
      **/
  }




}
