import { Component, OnInit } from '@angular/core';
import { faCheck, faInfoCircle, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { NlfAlertService } from './alert.service';

@Component({
    moduleId: module.id,
    selector: 'nlf-alert-service',
    templateUrl: 'alert.component.html'
})
export class NlfAlertComponent implements OnInit {
    faCheck = faCheck;
    faInfoCircle = faInfoCircle;
    faExclamationCircle = faExclamationCircle;
    faExclamationTriangle = faExclamationTriangle;

    message: any;

    constructor(private alertService: NlfAlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }

    close() {
        this.alertService.clear();
    }
}
