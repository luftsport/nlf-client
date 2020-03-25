import { Component, OnInit, Input } from '@angular/core';
import { ApiFilesService } from 'app/api/api-files.service';
import { ApiOptionsInterface, ApiFileList, ApiFileItem } from 'app/api/api.interface';

@Component({
  selector: 'nlf-resolve-file',
  templateUrl: './resolve-file.component.html',
  styleUrls: ['./resolve-file.component.css']
})
export class NlfResolveFileComponent implements OnInit {

  @Input() file_id: string;

  data: ApiFileItem;
  dataReady: boolean = false;

  constructor(private apiFile: ApiFilesService) { }

  ngOnInit() {
    const options: ApiOptionsInterface = {
      query: {
        projection: { file: 0 }
      },
    };

    this.apiFile.getFile(this.file_id, options).subscribe(
      data => {
        this.data = data;
      },
      err => console.error(err),
      () => this.dataReady = true
    );
  }

  public checkRef(ref, ref_id) {

    // Trenger en blueprint for å sjekke filen der!!!
  }

}
