import { Component, OnInit } from '@angular/core';

import { NlfAlertService } from './alert.service';

@Component({
    moduleId: module.id,
    selector: 'nlf-alert-service',
    templateUrl: 'alert.component.html'
})
export class NlfAlertComponent {
    message: any;
  
    constructor(private alertService: NlfAlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
