import { TestBed, inject } from '@angular/core/testing';

import { NlfAuthSubjectService } from './auth-subject.service';

describe('NlfAuthSubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NlfAuthSubjectService]
    });
  });

  it('should be created', inject([NlfAuthSubjectService], (service: NlfAuthSubjectService) => {
    expect(service).toBeTruthy();
  }));
});
