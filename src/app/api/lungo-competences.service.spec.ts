import { TestBed } from '@angular/core/testing';

import { LungoCompetencesService } from './lungo-competences.service';

describe('LungoCompetencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LungoCompetencesService = TestBed.get(LungoCompetencesService);
    expect(service).toBeTruthy();
  });
});
