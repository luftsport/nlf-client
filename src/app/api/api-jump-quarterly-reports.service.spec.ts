import { TestBed, inject } from '@angular/core/testing';

import { ApiJumpQuarterlyReportsService } from './api-jump-quarterly-reports.service';

describe('JumpQuarterlyReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiJumpQuarterlyReportsService]
    });
  });

  it('should be created', inject([ApiJumpQuarterlyReportsService], (service: ApiJumpQuarterlyReportsService) => {
    expect(service).toBeTruthy();
  }));
});
