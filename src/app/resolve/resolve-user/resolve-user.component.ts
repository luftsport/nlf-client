import { Component, OnInit, Input } from '@angular/core';
import { MelwinUserService } from '../../api/melwin-user.service';
import { OptionsInterface } from '../../api/options.interface';

@Component({
  selector: 'app-resolve-user',
  templateUrl: './resolve-user.component.html',
  styleUrls: ['./resolve-user.component.css']
})
export class ResolveUserComponent implements OnInit {

  @Input() id: number;
  @Input() link?: boolean;
  @Input() avatar?: boolean;

  fullname: string = '';

  constructor(private melwinUserService: MelwinUserService) { }

  ngOnInit() {

    if(this.id < 0) {

      this.fullname = 'Hopper ' + (-1*this.id);
    }
    else {

      let options: OptionsInterface = {
          params: { projection: '{"fullname": 1}'}
      }

      this.melwinUserService.getUser(this.id, options).subscribe(
        data => {
          console.log(data);
          this.fullname = data.fullname;
        },
        err => {
          console.error(err);

          switch(err.status) {

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
        () => console.log("Done")
        );
    }

  }

}
