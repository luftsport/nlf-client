import { TestBed, inject } from '@angular/core/testing';

import { ApiUserAuthService } from './api-user-auth.service';

describe('ApiUserAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUserAuthService]
    });
  });

  it('should be created', inject([ApiUserAuthService], (service: ApiUserAuthService) => {
    expect(service).toBeTruthy();
  }));
});
