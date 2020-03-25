import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'nlf-permalinks',
  template: '    {{ redirectUrl }}'
})
export class NlfPermaLinksComponent implements OnInit {

  redirectUrl = '';
  orsId = 0;
  orsUrl = '';
  private subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        // You only receive NavigationStart events
        console.log('URLA', event);
        if (!!event.url) {

          try {

            // Get after shebang!
            const url = event.url.split('#!/');
            console.log('Url splitted: ' + JSON.stringify(url));
            if (url.length === 2) {
              this.orsUrl = url[1];
            } else if (url.length === 1) {
              this.orsUrl = url[0];
            }

            // ORS REDIRECTING
            if (this.orsUrl.indexOf('observation') > -1) {
              // Get number
              let id = '0';
              if (this.orsUrl.length > 0) {
                id = this.orsUrl.replace(/^\D+/g, '');
              }

              this.orsId = +id;

              if (url.length === 0) {
                this.router.navigate(['/ors', 'fallskjerm']);
              } else if (this.orsId < 1) {
                this.router.navigate(['/ors', 'fallskjerm']);
              } else if (this.orsUrl.indexOf('report') > -1) {
                this.router.navigate(['/ors', 'fallskjerm', 'report', this.orsId]);
              } else if (this.orsUrl.indexOf('editor') > -1) {
                this.router.navigate(['/ors', 'fallskjerm', 'edit', this.orsId]);
              } else {
                this.router.navigate(['/home']);
              }
            }

          } catch (error) {
            console.log(error);
          }

          
        }
      });
  }
  // http://127.0.0.1:4200/app/obs/#!/observation/report/283

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
