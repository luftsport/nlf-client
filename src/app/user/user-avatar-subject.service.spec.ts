import { TestBed } from '@angular/core/testing';

import { NlfUserAvatarSubjectService } from './user-avatar-subject.service';

describe('NlfUserAvatarSubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NlfUserAvatarSubjectService = TestBed.get(NlfUserAvatarSubjectService);
    expect(service).toBeTruthy();
  });
});
