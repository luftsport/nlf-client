import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { ApiNlfClubsService } from 'app/api/api-nlf-clubs.service';
import { ApiNlfUserService } from 'app/api/api-nlf-user.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NlfUserSubjectService } from 'app/user/user-subject.service';

@Component({
  selector: 'nlf-user-club-selector',
  templateUrl: './user-club-selector.component.html',
  styleUrls: ['./user-club-selector.component.css']
})
export class NlfUserClubSelectorComponent implements OnInit {
  @Input() defaultClub: string; // = '375-F';
  // Needs true because we might change default club if defaultClub is undefined
  @Output() getSelected = new EventEmitter<string>(true);

  public userClubs: string[];
  public selected: string;
  private userData;

  dataReady = false;

  something = '';

  userClubChooser: FormControl;

  // public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  constructor(
    private userSubject: NlfUserSubjectService,
    private clubService: ApiNlfUserService
  ) {
    this.userSubject.observable.subscribe(userData => this.userData = userData);

  }

  ngOnInit() {
    this.userClubChooser = new FormControl();
  }

  ngAfterViewInit() {


    this.getUserClubs();

    //Subscribe to changes!
    this.userClubChooser.valueChanges
      .subscribe(term => {
        this.getSelected.emit(term);
      });

  }

  public getUserClubs() {

    let options: ApiOptionsInterface = { query: { projection: { 'membership.clubs': 1 } } };

    this.clubService.getUser(this.userData.person_id, options).subscribe(
      data => {
        console.log('USER SELCTOR');
        console.log(data.membership.clubs);
        this.userClubs = data.membership.clubs;

        if (this.defaultClub === '' || this.defaultClub === undefined) {
          if (this.userClubs.length > 0) {
            this.selected = this.userClubs[0];
          }
        }
        else {
          this.selected = this.defaultClub;
        }

        this.dataReady = true;

      },
      err => console.error(err),
      () => console.log('Done')
    );

  }


}
