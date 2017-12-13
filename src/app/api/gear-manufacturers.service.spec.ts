import { TestBed, inject } from '@angular/core/testing';

import { GearManufacturersService } from './gear-manufacturers.service';

describe('GearManufacturersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GearManufacturersService]
    });
  });

  it('should be created', inject([GearManufacturersService], (service: GearManufacturersService) => {
    expect(service).toBeTruthy();
  }));
});
