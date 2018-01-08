import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { LocalStorageService } from '../../services/storage/local-storage.service';
import { OptionsInterface } from '../../api/options.interface';
import { MelwinClubsService } from '../../api/melwin-clubs.service';
import { MelwinUserService } from '../../api/melwin-user.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-club-selector',
  templateUrl: './user-club-selector.component.html',
  styleUrls: ['./user-club-selector.component.css']
})
export class AppUserClubSelectorComponent implements OnInit {
  @Input() id: number;
  @Input() defaultClub: string; // = '375-F';
  // Needs true because we might change default club if defaultClub is undefined
  @Output() getSelected = new EventEmitter<string>(true);

  private userClubs: string[];
  private selected: string;

  something: string = "";

  userClubChooser: FormControl;

  // public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  constructor(private storage: LocalStorageService,
              private clubService: MelwinUserService){

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

    let options: OptionsInterface = {query: {projection: {'membership.clubs': 1}}};
    this.clubService.getUser(this.storage.getId(), options).subscribe(
      data => {
        console.log("USER SELCTOR");
        console.log(data.membership.clubs);
        this.userClubs = data.membership.clubs;

        if(this.defaultClub=='' || this.defaultClub===undefined) {
          if(this.userClubs.length > 0) {
            this.selected = this.userClubs[0];
          }
        }
        else {
          this.selected = this.defaultClub;
        }

      },
      err => console.error(err),
      () => console.log("Done")
    );

  }


}
