import { TestBed, inject } from '@angular/core/testing';

import { ApiDevService } from './api-dev.service';

describe('ApiDevService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiDevService]
    });
  });

  it('should be created', inject([ApiDevService], (service: ApiDevService) => {
    expect(service).toBeTruthy();
  }));
});
