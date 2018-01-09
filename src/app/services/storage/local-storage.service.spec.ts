import { TestBed, inject } from '@angular/core/testing';

import { NlfLocalStorageService } from './local-storage.service';

describe('NlfLocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NlfLocalStorageService]
    });
  });

  it('should be created', inject([NlfLocalStorageService], (service: NlfLocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});
