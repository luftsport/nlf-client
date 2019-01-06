import { ApiNlfClubItem } from 'app/api/api.interface';
import { ApiCacheService } from 'app/api/api-cache.service';
import { Component, OnInit, Input } from '@angular/core';
import { ApiNlfClubsService } from 'app/api/api-nlf-clubs.service';
import { ApiOptionsInterface } from 'app/api/api.interface';

@Component({
  selector: 'nlf-resolve-club',
  templateUrl: './resolve-club.component.html',
  //template: '{{ clubName }}',
  styleUrls: ['./resolve-club.component.css']
})
export class NlfResolveClubComponent implements OnInit {

  @Input() clubid: string;
  @Input() link: boolean;
  @Input() long: boolean;

  club: ApiNlfClubItem;
  dataReady = false;

  constructor(private nlfClubsService: ApiNlfClubsService,
    private apiCache: ApiCacheService) { }

  ngOnInit() {

    let options: ApiOptionsInterface = {
      query: { projection: { name: 1, id: 1 } }
    };

    this.apiCache.get(['resolve-club', this.clubid, options.query], this.nlfClubsService.getClub(this.clubid, options)).subscribe(
      data => {
        this.club = data;

        /* @TODO: see if long should be used? BFSK, Bergen, Bergen Fallskjermklubb
        if (this.long = true) {
          this.clubName = data.name;
        }
        else {
          this.clubName = data.name.replace(' Fallskjermklubb', '');
        }
        */
      },
      err => this.club = { name: 'Ukjent klubb', id: '', _id: '' },
      () => this.dataReady = true
    );
  }

}
