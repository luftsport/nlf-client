import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NlfAuthSubjectService } from 'app/services/auth/auth-subject.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';


import { filter, map } from "rxjs/operators";

@Component({
  selector: 'nlf-root',
  templateUrl: './nlf.component.html',
  styleUrls: ['./nlf.component.css']
})
export class NlfComponent {

  readonly prefix_title = 'NLF';
  private config: NlfConfigItem;

  loggedInObservable;

  public constructor(
    private titleService: Title,
    private authSubject: NlfAuthSubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private configService: NlfConfigService) {

    this.loggedInObservable = this.authSubject.observableAuth;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe((data: any) => {
      if (data) {
        this.titleService.setTitle(data);
      }
    });

    /**
        this.configService.observableConfig.subscribe(
          data => {
            this.config = data;
          }
        );
        **/

  }

  public setTitle(new_title: string, prefix='NLF', seperator = '-') {
    this.titleService.setTitle(prefix + ' ' + seperator + ' ' + new_title);
  }

  /**
   * @TODO: MUST REMOVE TO OTHER STRATEGY!
   */
  public isPublicPage() {

    this.router.events.subscribe((event: NavigationEnd) => {
      try {
        if (event.url.substring(1, 6) === 'error') {
          return true;
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
