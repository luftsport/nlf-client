import { TestBed, inject } from '@angular/core/testing';

import { GearService } from './gear.service';

describe('GearService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GearService]
    });
  });

  it('should be created', inject([GearService], (service: GearService) => {
    expect(service).toBeTruthy();
  }));
});
