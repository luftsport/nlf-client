import { TestBed, inject } from '@angular/core/testing';

import { ApiGearService } from './api-gear.service';

describe('GearService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiGearService]
    });
  });

  it('should be created', inject([ApiGearService], (service: ApiGearService) => {
    expect(service).toBeTruthy();
  }));
});
