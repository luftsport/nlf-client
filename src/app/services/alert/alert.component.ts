import { Component, OnInit } from '@angular/core';
import { NlfAlertService } from './alert.service';
import {
    faExclamation,
    faExclamationTriangle,
    faInfoCircle,
    faCheck,
    faExclamationCircle
  } from '@fortawesome/free-solid-svg-icons';

@Component({
    moduleId: module.id,
    selector: 'nlf-alert-service',
    templateUrl: 'alert.component.html'
})
export class NlfAlertComponent implements OnInit {
    message: any;

    constructor(private alertService: NlfAlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }

    close() {
        this.alertService.clear();
    }

    getIcon(messageType: string) {

        switch(messageType) {

            case 'success':
                return faCheck;
            case 'info':
                return faInfoCircle;
            case 'warning':
                return faExclamationCircle;
            case 'danger':
                return faExclamationTriangle;
            default:
                return faExclamation;

        }
    }
}
