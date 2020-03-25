import { Component, OnInit, Input } from '@angular/core';
import { ApiFilesService } from 'app/api/api-files.service';
import { ApiOptionsInterface, ApiFileList, ApiFileItem } from 'app/api/api.interface';

@Component({
  selector: 'nlf-resolve-reverse-file',
  templateUrl: './resolve-reverse-file.component.html',
  styleUrls: ['./resolve-reverse-file.component.css']
})
export class NlfResolveReverseFileComponent implements OnInit {

  @Input() fs_file_id: string;

  data: ApiFileItem;
  dataReady: boolean = false;

  constructor(private apiFile: ApiFilesService) { }

  ngOnInit() {
    const options: ApiOptionsInterface = {
      query: {
        where: { file: this.fs_file_id },
        projection: { file: 0 }
      },
    };

    this.apiFile.getFiles(options).subscribe(
      data => {
        if (data._meta.total > 1) {
          console.log('Too many files there is said Yoda')
          this.data = data._items[0];
        } else {
          this.data = data._items[0];
        }

        if (['motorfly_observations', 'fallskjerm_observations', 'observations', '_obseravtions'].indexOf(this.data.ref) > -1) {
          if (this.data.ref != 'motorfly_observations') {
            this.data.ref = 'fallskjerm_observations';
          }

          const fopt: ApiOptionsInterface = {
            query: {
              where: { 'files.f': { $in: [this.data._id] } },
              projection: { id: 1 }
            },
          };
          this.apiFile.getGeneric('/' + this.data.ref.replace(/_/gi, '/'), fopt).subscribe(
            data => {
              if (data._meta.total_results > 0) {
                this.data['exists'] = true;
              }
            },
            err => console.log(err)
            );
        }

        this.dataReady = true;
      },
      err => console.error(err),
    );
  }


}
