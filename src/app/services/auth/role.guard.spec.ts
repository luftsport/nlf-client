import { TestBed } from '@angular/core/testing';

import { NlfRoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: NlfRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NlfRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
