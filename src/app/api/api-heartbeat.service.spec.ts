import { TestBed } from '@angular/core/testing';

import { ApiHeartbeatService } from './api-heartbeat.service';

describe('ApiHeartbeatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiHeartbeatService = TestBed.get(ApiHeartbeatService);
    expect(service).toBeTruthy();
  });
});
