import { TestBed, inject } from '@angular/core/testing';

import { MelwinUserService } from './melwin-user.service';

describe('MelwinUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MelwinUserService]
    });
  });

  it('should be created', inject([MelwinUserService], (service: MelwinUserService) => {
    expect(service).toBeTruthy();
  }));
});
