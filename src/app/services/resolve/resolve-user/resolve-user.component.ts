import { Component, OnInit, Input } from '@angular/core';
import { ApiNlfUserService } from '../../../api/api-nlf-user.service';
import { ApiOptionsInterface } from '../../../api/api.interface';

@Component({
  selector: 'nlf-resolve-user',
  templateUrl: './resolve-user.component.html',
  styleUrls: ['./resolve-user.component.css']
})
export class NlfResolveUserComponent implements OnInit {

  @Input() id: number;
  @Input() link?: boolean;
  @Input() avatar?: boolean;

  fullname = '';

  constructor(private melwinUserService: ApiNlfUserService) { }

  ngOnInit() {

    if (this.id < 0) {

      this.fullname = 'Hopper ' + (-1 * this.id);
    }
    else {

      let options: ApiOptionsInterface = {
        params: { projection: '{"fullname": 1}' }
      };

      this.melwinUserService.getUser(this.id, options).subscribe(
        data => {
          console.log(data);
          this.fullname = data.fullname;
        },
        err => {
          console.error(err);

          switch (err.status) {

            case 404: {
              this.fullname = err.statusText;
            }
            case 403: {
              this.fullname = 'Ikke tilgang';
            }
            default: {
              this.fullname = err.statusText;
            }
          }


        },
        () => console.log('Done')
      );
    }

  }

}
