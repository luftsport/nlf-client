import { TestBed, inject } from '@angular/core/testing';

import { ApiTagsService } from './api-tags.service';

describe('ApiTagsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiTagsService]
    });
  });

  it('should be created', inject([ApiTagsService], (service: ApiTagsService) => {
    expect(service).toBeTruthy();
  }));
});
