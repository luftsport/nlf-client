import { Component, OnInit, Input } from '@angular/core';
import { MelwinClubsService } from '../../api/melwin-clubs.service';
import { OptionsInterface } from '../../api/options.interface';

@Component({
  selector: 'app-resolve-club',
  //templateUrl: './resolve-club.component.html',
  template: '{{clubName}}',
  styleUrls: ['./resolve-club.component.css']
})
export class ResolveClubComponent implements OnInit {

  @Input() clubid: string;

  clubName: string = '';

  constructor(private melwinClubsService: MelwinClubsService) { }

  ngOnInit() {

    let options: OptionsInterface = {
        query: { projection: {name: 1}}
      };

    this.melwinClubsService.getClub(this.clubid, options).subscribe(
      data => {
        console.log(data);
        this.clubName = data.name;
      },
      err => this.clubName = 'Ukjent klubb',
      () => console.log("Done")
    );
  }

}
