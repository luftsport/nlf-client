import { TestBed, inject } from '@angular/core/testing';

import { ApiGearManufacturersService } from './api-gear-manufacturers.service';

describe('GearManufacturersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiGearManufacturersService]
    });
  });

  it('should be created', inject([ApiGearManufacturersService], (service: ApiGearManufacturersService) => {
    expect(service).toBeTruthy();
  }));
});
