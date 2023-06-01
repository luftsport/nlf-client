import { TestBed } from '@angular/core/testing';

import { NlfSocketService } from './socket.service';

describe('NlfSocketService', () => {
  let service: NlfSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NlfSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
