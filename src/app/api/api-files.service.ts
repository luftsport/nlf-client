import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiFileItem, ApiFileList } from './api.interface';
import { saveAs } from 'file-saver';
// import { getFileNameFromResponseContentDisposition, saveFile } from './api-file-server.component';

@Injectable()
export class ApiFilesService extends ApiRestService {

  private relativeUrl = '/files/'; // Eve resource
  private downloadUrl = '/download/'; // Blueprint resource

  constructor(http: HttpClient) { super(http); }

  public getFile(id: string, options?: ApiOptionsInterface): Observable<ApiFileItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getFiles(options?: ApiOptionsInterface): Observable<ApiFileList> {

    return this.getList(this.relativeUrl, options);
  }

  /**
   *
   * @param _id MongoId
   * @param string optional size small|medium|large
   * @param options
   * @returns Observable
   * {'mimetype': 'image/png',
   * 'encoding': 'base64',
   * 'src': encoded_img}
   * All images will be converted to png
   */
  public getImage(_id: string, size?: string, options?: ApiOptionsInterface): Observable<any> {
    return this.getItem(this.downloadUrl + 'image/' + _id + '/' + size, ' ', options);
  }

  public getDirectLink(_id: string) {

    return this.baseUrl + this.downloadUrl + _id;
  }

  /**
   *
   * @param _id Downloads from eve files
   * @param options
   */
  public downloadFile(_id: string, options?: ApiOptionsInterface): void {

    this.getItem(this.relativeUrl, _id, options).subscribe(
      response => {
        const blob = new Blob([response.file], { type: response.content_type });
        saveAs(blob, response.name);
        //window.location.href = response.url;
      },
      err => console.log(err)
    );
  }

  public getOrphan(options?: ApiOptionsInterface): Observable<any> {
    return this.getList(this.relativeUrl + 'orphan', options);
  }

  public getDuplicates(options?: ApiOptionsInterface): Observable<any> {
    return this.getList(this.relativeUrl + 'duplicates', options);
  }

  /**
  * To reverse check files
  **/
  public getGeneric(url: string, options?: ApiOptionsInterface): Observable<any> {
    return this.getList(url, options);
  }

}
