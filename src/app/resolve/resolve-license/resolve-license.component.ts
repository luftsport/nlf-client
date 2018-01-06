import { Component, OnInit, Input } from '@angular/core';
import { MelwinLicensesService } from '../../api/melwin-licenses.service';
import { OptionsInterface } from '../../api/options.interface';

@Component({
  selector: 'app-resolve-license',
  // templateUrl: './resolve-license.component.html',
  template: '{{ licenseName }}',
  styleUrls: ['./resolve-license.component.css']
})
export class ResolveLicenseComponent implements OnInit {

  @Input() licenseid: string;

  licenseName: string = '';

  constructor(private melwinLicensesService: MelwinLicensesService) { }

  ngOnInit() {

    let options: OptionsInterface = {
        params: { projection: '{"name": 1}'}
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
