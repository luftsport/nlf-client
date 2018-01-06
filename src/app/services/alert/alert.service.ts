import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {

    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
    private dismissible = true;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false, dismissible = true) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.dismissible = dismissible;
        this.subject.next({ type: 'success', text: message });
    }

    info(message: string, keepAfterNavigationChange = false, dismissible = true) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.dismissible = dismissible;
        this.subject.next({ type: 'info', text: message });
    }

    warning(message: string, keepAfterNavigationChange = false, dismissible = true) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.dismissible = dismissible;
        this.subject.next({ type: 'warning', text: message });
    }

    error(message: string, keepAfterNavigationChange = false, dismissible = true) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.dismissible = dismissible;
        this.subject.next({ type: 'danger', text: message });
    }

    danger(message: string, keepAfterNavigationChange = false, dismissible = true) {
        this.error(message, keepAfterNavigationChange);
    }

    clear() {
      this.subject.next();
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
