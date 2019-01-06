import { ApiFilesService } from 'app/api/api-files.service';
import { ApiObservationFileInterface, ApiFileItem, ApiOptionsInterface } from 'app/api/api.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-ors-fallskjerm-report-files',
  templateUrl: './report-files.component.html',
  styleUrls: ['./report-files.component.css']
})
export class NlfOrsFallskjermReportFilesComponent implements OnInit {

  @Input() files: ApiObservationFileInterface[]; // [{f: string, r: boolean}]

  filelist = []; // : ApiFileItem[] = []; // Not list since list is Eve, we build our own list
  dataReady = false;

  constructor(private apiFile: ApiFilesService) { }

  ngOnInit() {

    if (this.files.length > 0) {
      this.getFiles();
    } else {
      this.dataReady = true;
    }

  }

  public getFiles() {

    let processed = 0;
    this.dataReady = false;

    // Do not download files
    const options: ApiOptionsInterface = {
      query: { projection: { file: 0 } }
    };

    this.files.forEach(f => {

      this.apiFile.getFile(f.f, options).subscribe(
        data => {
          data['r'] = f.r;
          this.filelist.push(data);
        },
        err => processed++,
        () => {
          processed++;
          if (processed === this.files.length) {
            console.log(processed);
            this.dataReady = true;
          }
        }
      );
    });
  }


}
