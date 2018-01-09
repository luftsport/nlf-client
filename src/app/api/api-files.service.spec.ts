import { TestBed, inject } from '@angular/core/testing';

import { ApiFilesService } from './api-files.service';

describe('FilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiFilesService]
    });
  });

  it('should be created', inject([ApiFilesService], (service: ApiFilesService) => {
    expect(service).toBeTruthy();
  }));
});
