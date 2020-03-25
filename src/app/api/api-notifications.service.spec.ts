import { TestBed } from '@angular/core/testing';

import { ApiNotificationsService } from './api-notifications.service';

describe('ApiNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiNotificationsService = TestBed.get(ApiNotificationsService);
    expect(service).toBeTruthy();
  });
});
