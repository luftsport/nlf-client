import { Component, OnInit, Input } from '@angular/core';
import { ApiNlfLicensesService } from '../../../api/api-nlf-licenses.service';
import { ApiOptionsInterface } from '../../../api/api.interface';

@Component({
  selector: 'nlf-resolve-license',
  // templateUrl: './resolve-license.component.html',
  template: '{{ licenseName }}',
  styleUrls: ['./resolve-license.component.css']
})
export class NlfResolveLicenseComponent implements OnInit {

  @Input() licenseid: string;

  licenseName: string;

  constructor(private melwinLicensesService: ApiNlfLicensesService) { }

  ngOnInit() {

    let options: ApiOptionsInterface = {
        query: { projection: {name: 1}}
      };

    this.melwinLicensesService.getLicense(this.licenseid, options).subscribe(
      data => {
        console.log(data);
        this.licenseName = data.name;
      },
      err => this.licenseName = 'Ukjent lisens (' + this.licenseid + ')',
      () => console.log('Done')
    );
  }

}
