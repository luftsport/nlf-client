import { Component } from '@angular/core';
import { faCheck, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { NlfUserSubjectService } from 'app/user/user-subject.service';

@Component({
  selector: 'nlf-ors-editor-first',
  templateUrl: './ors-editor-first.component.html',
  styleUrls: ['./ors-editor-first.component.css']
})
export class NlfOrsEditorFirstComponent {

  userData;

  faQuestion = faQuestion;
  faCheck = faCheck;

  constructor(private userSubject: NlfUserSubjectService) {

    this.userSubject.observable.subscribe(
      data => {
        if (!!data) {

          this.userData = data;
          if(!this.userData.settings.hasOwnProperty('ors')) {
            this.userData['settings']['ors'] = {first_report: undefined};
          }
        }
      }
    );
  }

  public close() {
    this.userData['settings']['ors']['first_report'] = true;
    this.userSubject.update(this.userData);
  }
}
