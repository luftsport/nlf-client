import { TestBed } from '@angular/core/testing';

import { LungoActivitiesService } from './lungo-activities.service';

describe('LungoActivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LungoActivitiesService = TestBed.get(LungoActivitiesService);
    expect(service).toBeTruthy();
  });
});
