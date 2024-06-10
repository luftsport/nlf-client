import { ApiFilesService } from 'app/api/api-files.service';
import { ApiObservationFileInterface, ApiFileItem, ApiOptionsInterface } from 'app/api/api.interface';
import { Component, Input, OnInit } from '@angular/core';
import { faDownload, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { NlfAuthSubjectService } from 'app/services/auth/auth-subject.service';

@Component({
  selector: 'nlf-ors-report-files',
  templateUrl: './report-files.component.html',
  styleUrls: ['./report-files.component.css']
})
export class NlfOrsReportFilesComponent implements OnInit {

  @Input() files: ApiObservationFileInterface[]; // [{f: string, r: boolean}]
  @Input() state: string;
  @Input() doNotShowRestricted: boolean = false;
  filelist = []; // : ApiFileItem[] = []; // Not list since list is Eve, we build our own list
  dataReady = false;

  faDownload = faDownload;
  faLock = faLock;
  faUnlock = faUnlock;
  token: string;

  constructor(
    private apiFile: ApiFilesService,
    private authDataSubject: NlfAuthSubjectService
  ) {

    this.authDataSubject.observableAuthData.subscribe(
      data => {
        if (!!data) {
          this.token = data.token;
        }
      },
      err => console.log('Problem getting token: ', err)
    );
  }

  ngOnInit() {

    if (this.doNotShowRestricted) {
      console.log('Onlypublic');
      this.files = this.files.filter(x => x['r'] === false)
    }

    if (this.files.length > 0) {
      this.getFiles();
    } else {
      this.dataReady = true;
    }

  }

  public download(_id: string) {

    this.apiFile.downloadFile(_id);
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
          data['download'] = this.apiFile.getDirectLink(data._id) + '?token=' + this.token;
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
