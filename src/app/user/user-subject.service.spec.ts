import { TestBed } from '@angular/core/testing';

import { NlfUserSubjectService } from './user-subjects.service';

describe('NlfUserSubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NlfUserSubjectService = TestBed.get(NlfUserSubjectService);
    expect(service).toBeTruthy();
  });
});
