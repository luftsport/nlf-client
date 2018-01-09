import { TestBed, inject } from '@angular/core/testing';

import { ApiNlfUserService } from './api-nlf-user.service';

describe('NlfUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiNlfUserService]
    });
  });

  it('should be created', inject([ApiNlfUserService], (service: ApiNlfUserService) => {
    expect(service).toBeTruthy();
  }));
});
