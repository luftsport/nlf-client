import { Component, OnInit, Input } from '@angular/core';
import { ApiNlfClubsService } from '../../../api/api-nlf-clubs.service';
import { ApiOptionsInterface } from '../../../api/api.interface';

@Component({
  selector: 'nlf-resolve-club',
  // templateUrl: './resolve-club.component.html',
  template: '{{ clubName }}',
  styleUrls: ['./resolve-club.component.css']
})
export class NlfResolveClubComponent implements OnInit {

  @Input() clubid: string;

  clubName: string;

  constructor(private nlfClubsService: ApiNlfClubsService) { }

  ngOnInit() {

    let options: ApiOptionsInterface = {
        query: { projection: {name: 1}}
      };

    this.nlfClubsService.getClub(this.clubid, options).subscribe(
      data => {
        console.log(data);
        this.clubName = data.name;
      },
      err => this.clubName = 'Ukjent klubb',
      () => console.log('Done')
    );
  }

}
