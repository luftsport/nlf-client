import { TestBed, inject } from '@angular/core/testing';

import { ApiContentService } from './api-content.service';

describe('ApiContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiContentService]
    });
  });

  it('should be created', inject([ApiContentService], (service: ApiContentService) => {
    expect(service).toBeTruthy();
  }));
});
