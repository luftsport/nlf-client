import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfirmService } from 'app/services/confirm/confirm.service';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

    constructor(private confirmService: ConfirmService) { }

    canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
        // if there are no pending changes, just allow deactivation; else confirm first



        //return component.canDeactivate() ?
        //true :
        // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
        // when navigating away from your angular app, the browser will show a generic warning message
        // see http://stackoverflow.com/a/42207299/7307355
        //confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
        return component.canDeactivate() ?
            true :
            // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
            // when navigating away from your angular app, the browser will show a generic warning message
            // see http://stackoverflow.com/a/42207299/7307355
            confirm('ADVARSEL: Du har endringer som ikke er lagret. Velg OK for å forkaste endringene og naviger vekk fra siden eller Cancel for å forbli på siden.');

        //component.canDeactivate() ? true : this.confirmation();
    }

    private confirmation() {

        const confirmMsg = {
            title: 'Please confirm',
            message: 'Du holder på å navigere vekk fra denne observasjonen men du har endringer i som ikke er lagret, ønsker du å forkaste disse?',
            yes: 'Ja',
            no: 'Nei'
        };
        this.confirmService.confirm(confirmMsg).then(
            () => { // Yes
                return true;
            },
            () => { // No
                return false;
            }
        );
    }
}