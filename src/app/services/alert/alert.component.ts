import { Component, OnInit } from '@angular/core';

import { AlertService } from './alert.service';

@Component({
    moduleId: module.id,
    selector: 'alert-service',
    templateUrl: 'alert.component.html'
})
export class AlertComponent {
    message: any;
    dismissible = true;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
