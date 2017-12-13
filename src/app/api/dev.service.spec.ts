import { TestBed, inject } from '@angular/core/testing';

import { DevService } from './dev.service';

describe('DevService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevService]
    });
  });

  it('should be created', inject([DevService], (service: DevService) => {
    expect(service).toBeTruthy();
  }));
});
