import { TestBed } from '@angular/core/testing';

import { NlfEventQueueService } from './nlf-event-queue.service';

describe('NlfEventQueueService', () => {
  let service: NlfEventQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NlfEventQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
