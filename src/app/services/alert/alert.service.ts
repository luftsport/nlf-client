import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class NlfAlertService {

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

    private alert(type: string, message: string, keepAfterNavigationChange = false, dismissible = true, timeout = 0) {
        if (timeout > 0) { this.debounceRemove(timeout); }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.dismissible = dismissible;
        this.subject.next({ type: type, text: message });
    }
    success(message: string, keepAfterNavigationChange = false, dismissible = true, timeout = 0) {
        this.alert('success', message, keepAfterNavigationChange, dismissible, timeout);
    }
    info(message: string, keepAfterNavigationChange = false, dismissible = true, timeout = 0) {
        this.alert('info', message, keepAfterNavigationChange, dismissible, timeout);
    }
    warning(message: string, keepAfterNavigationChange = false, dismissible = true, timeout = 0) {
        this.alert('warning', message, keepAfterNavigationChange, dismissible, timeout);
    }
    error(message: string, keepAfterNavigationChange = false, dismissible = true, timeout = 0) {
        this.alert('danger', message, keepAfterNavigationChange, dismissible, timeout);
    }
    danger(message: string, keepAfterNavigationChange = false, dismissible = true, timeout = 0) {
        this.error(message, keepAfterNavigationChange, dismissible, timeout);
    }
    primary(message: string, keepAfterNavigationChange = false, dismissible = true, timeout = 0) {
        this.alert('primary', message, keepAfterNavigationChange, dismissible, timeout);
    }
    secondary(message: string, keepAfterNavigationChange = false, dismissible = true, timeout = 0) {
        this.alert('secondary', message, keepAfterNavigationChange, dismissible, timeout);

    }
    light(message: string, keepAfterNavigationChange = false, dismissible = true, timeout = 0) {
        this.alert('light', message, keepAfterNavigationChange, dismissible, timeout);
    }
    dark(message: string, keepAfterNavigationChange = false, dismissible = true, timeout = 0) {
        this.alert('dark', message, keepAfterNavigationChange, dismissible, timeout);
    }
    clear() {
        this.subject.next();
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    debounceRemove(timeout: number) {
        this.subject.pipe(
            debounceTime(timeout * 1000)
        ).subscribe(() => this.clear());
    }
}
